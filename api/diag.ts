// Diagnóstico temporal: importa la app Express y devuelve el stack si crashea
export default async function handler(_req: any, res: any) {
  try {
    const mod: any = await import("../../app");
    res.status(200).json({ ok: true, exports: Object.keys(mod) });
  } catch (e: any) {
    res.status(200).json({ crash: String(e?.stack || e).slice(0, 1200) });
  }
}
