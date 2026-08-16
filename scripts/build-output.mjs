// Genera el deployment completo usando la Build Output API de Vercel:
//   .vercel/output/static/    → sitio Vite (dist)
//   .vercel/output/functions/ → funciones serverless bundleadas con esbuild (sin node_modules en runtime)
//   .vercel/output/config.json→ rutas (SPA fallback + filesystem)
// @vercel/static-build detecta .vercel/output después del build y lo usa tal cual.
import { build } from "esbuild";
import { readdirSync, statSync, mkdirSync, writeFileSync, cpSync, rmSync } from "fs";
import path from "path";

const SRC = "api-src";
const OUT = ".vercel/output";

// ── limpiar output anterior ──
rmSync(OUT, { recursive: true, force: true });

// ── 1. FUNCIONES: bundlear cada ruta de api-src a CJS autocontenido ──
function walk(dir) {
  let results = [];
  for (const f of readdirSync(dir)) {
    const full = path.join(dir, f);
    if (statSync(full).isDirectory()) results = results.concat(walk(full));
    else if (f.endsWith(".ts")) results.push(full);
  }
  return results;
}

const files = walk(SRC);
console.log(`📦 Bundleando ${files.length} funciones serverless...`);

for (const file of files) {
  const rel = path.relative(SRC, file).replace(/\.ts$/, "");
  const fnDir = path.join(OUT, "functions", "api", rel + ".func");
  mkdirSync(fnDir, { recursive: true });

  // bundle.js: la app Express con TODAS sus dependencias inlineadas (CJS)
  await build({
    stdin: {
      contents: `const { app } = require(${JSON.stringify(path.resolve(file))}); module.exports = app;`,
      resolveDir: process.cwd(),
      loader: "js",
    },
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    outfile: path.join(fnDir, "bundle.js"),
    sourcemap: false,
    minify: false,
  });

  // index.js: handler que carga el bundle con manejo de errores (reporta crashes de cold start)
  writeFileSync(
    path.join(fnDir, "index.js"),
    `module.exports = async (req, res) => {
  try {
    if (!globalThis.__jbalayageApp) globalThis.__jbalayageApp = require("./bundle.js");
    return await globalThis.__jbalayageApp(req, res);
  } catch (e) {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify({ __crash: String((e && e.stack) || e).slice(0, 1500) }));
  }
};
`
  );

  writeFileSync(
    path.join(fnDir, ".vc-config.json"),
    JSON.stringify({
      runtime: "nodejs22.x",
      handler: "index.js",
      memory: 1024,
      maxDuration: 60,
    })
  );
  writeFileSync(path.join(fnDir, "package.json"), JSON.stringify({ type: "commonjs" }));

  console.log(`   ✅ /api/${rel}`);
}

// ── 2. ESTÁTICO: copiar el build de Vite ──
mkdirSync(path.join(OUT, "static"), { recursive: true });
cpSync("dist", path.join(OUT, "static"), { recursive: true });
console.log("✅ Estático copiado desde dist/");

// ── 3. RUTAS: primero filesystem (estático + funciones), después fallback SPA ──
writeFileSync(
  path.join(OUT, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", "dest": "/index.html" },
    ],
  })
);
console.log("✅ config.json con rutas SPA");

console.log("🎉 Build Output API completo en .vercel/output");
