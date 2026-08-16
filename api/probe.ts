// Sonda: ¿los paquetes de node_modules cargan en runtime?
export default async function handler(_req: any, res: any) {
  const results: Record<string, string> = {};
  for (const mod of ["express", "postgres", "resend", "cloudinary", "dotenv"]) {
    try {
      const m: any = await import(mod);
      results[mod] = "OK";
    } catch (e: any) {
      results[mod] = "FALLO: " + String(e?.message || e).slice(0, 150);
    }
  }
  res.status(200).json(results);
}
