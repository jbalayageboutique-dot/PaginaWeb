// Función serverless de Vercel: todas las rutas /api/* pasan por la app Express.
// En desarrollo local, `npm run dev` usa server.ts (Vite + Express en puerto 3000).
import { app } from "../app";

export default app;
