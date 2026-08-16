// Sonda 1: Express mínimo exportado como handler
import express from "express";
const app = express();
app.all("/api/probe", (_req: any, res: any) => res.json({ ok: "express-ok" }));
export default app;
