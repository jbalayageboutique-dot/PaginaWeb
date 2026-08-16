// Sonda: ¿se puede requerir express en runtime?
module.exports = async (req: any, res: any) => {
  const results: Record<string, string> = {};
  for (const mod of ["express", "postgres", "resend", "cloudinary", "dotenv"]) {
    try {
      const m: any = require(mod);
      results[mod] = "OK" + (m?.default?.version ? ` v${m.default.version}` : "");
    } catch (e: any) {
      results[mod] = "FALLO: " + String(e?.message || e).slice(0, 120);
    }
  }
  res.status(200).json(results);
};
