// Healthcheck simple para verificar que las funciones serverless responden
export default function handler(_req: any, res: any) {
  res.status(200).json({ ok: true, message: "funciona" });
}
