// Pre-bundlea las funciones serverless a un solo archivo autocontenido.
// Necesario porque en Fluid Compute las funciones de Vercel no tienen node_modules en runtime:
// esbuild inlinea TODAS las dependencias (express, postgres, resend, cloudinary) en cada .js.
import { build } from "esbuild";
import { readdirSync, statSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import path from "path";

const SRC = "api-src";
const OUT = "api";

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
  const outPath = path.join(OUT, rel + ".js");
  mkdirSync(path.dirname(outPath), { recursive: true });

  const result = await build({
    entryPoints: [file],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    outfile: outPath,
    sourcemap: false,
    minify: false,
    legalComments: "none",
    // Cloudinary usa require dinámico en algunos lugares; este banner lo mantiene disponible
    banner: { js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);" },
  });

  const kb = Math.round(statSync(outPath).size / 1024);
  console.log(`   ✅ ${rel}.js (${kb} KB)`);
  if (result.warnings.length > 0) {
    console.log(`   ⚠️  ${result.warnings.length} warnings (revisar si algo falla)`);
  }
}

console.log("🎉 Funciones bundleadas en api/");
