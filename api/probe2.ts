// Sonda 2: imports pesados a nivel de módulo (postgres, resend, cloudinary, dotenv)
import express from "express";
import postgres from "postgres";
import { Resend } from "resend";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
const db = postgres(process.env.SUPABASE_DB_URL || "postgresql://x", { ssl: "require", max: 1 });
const resend = new Resend(process.env.RESEND_API_KEY as string);
cloudinary.config({ cloud_name: "t", api_key: "k", api_secret: "s", secure: true });

const app = express();
app.use(express.json());
app.all("/api/probe2", (_req: any, res: any) => {
  res.json({ ok: "imports-ok", hasResend: typeof resend.emails?.send === "function", hasDb: typeof db === "function" });
});
export default app;
