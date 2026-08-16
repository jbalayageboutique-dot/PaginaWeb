import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Resend } from "resend";
import crypto from "crypto";
import postgres from "postgres";

dotenv.config();

const app = express();
const PORT = 3000;

// Increase body limit to support photo uploads (base64)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// In-memory runtime storage for API secret if configured via UI
let dynamicApiSecret = process.env.CLOUDINARY_API_SECRET || "";

// Helper to configure Cloudinary dynamically
function getCloudinaryInstance() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "apssuuqy";
  const apiKey = process.env.CLOUDINARY_API_KEY || "714586942776954";
  const apiSecret = process.env.CLOUDINARY_API_SECRET || dynamicApiSecret || "";

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });

  return { cloudName, apiKey, apiSecret, configured: Boolean(cloudName && apiKey) };
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Cloudinary Config Status
app.get("/api/cloudinary/config", (req, res) => {
  const { cloudName, apiKey, apiSecret } = getCloudinaryInstance();
  res.json({
    success: true,
    cloudName,
    apiKey,
    hasSecret: Boolean(apiSecret && apiSecret.length > 0),
    sampleSecret: apiSecret ? `${apiSecret.substring(0, 4)}...` : null
  });
});

// 2. Set API Secret dynamically (for easy setup)
app.post("/api/cloudinary/update-secret", (req, res) => {
  const { apiSecret } = req.body;
  if (!apiSecret || typeof apiSecret !== "string") {
    res.status(400).json({ success: false, error: "Secret requerido" });
    return;
  }
  dynamicApiSecret = apiSecret.trim();
  res.json({
    success: true,
    message: "API Secret de Cloudinary guardado exitosamente para la sesión."
  });
});

// 3. Upload Image to Cloudinary
app.post("/api/cloudinary/upload", async (req, res) => {
  try {
    const { image, folder = "maison-balayage" } = req.body;
    if (!image) {
      res.status(400).json({ success: false, error: "No se proporcionó imagen" });
      return;
    }

    const { cloudName, apiSecret } = getCloudinaryInstance();

    // If API Secret is provided, use Cloudinary SDK signed uploader
    if (apiSecret) {
      const result = await cloudinary.uploader.upload(image, {
        folder,
        resource_type: "auto",
        transformation: [
          { quality: "auto", fetch_format: "auto" }
        ]
      });

      // Construct streaming URLs
      const optimized_url = cloudinary.url(result.public_id, {
        fetch_format: "auto",
        quality: "auto",
        secure: true
      });

      const thumbnail_url = cloudinary.url(result.public_id, {
        width: 400,
        height: 400,
        crop: "fill",
        gravity: "auto",
        fetch_format: "auto",
        quality: "auto",
        secure: true
      });

      res.json({
        success: true,
        data: {
          public_id: result.public_id,
          secure_url: result.secure_url,
          optimized_url,
          thumbnail_url,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes
        }
      });
      return;
    }

    // Fallback if API secret is not set yet: Cloudinary Fetch API streaming & client base64 fast preview
    // Cloudinary fetch URL converts external images or data images into optimized Cloudinary streams
    let secureUrl = image;
    if (image.startsWith("http")) {
      secureUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${encodeURIComponent(image)}`;
    }

    res.json({
      success: true,
      data: {
        public_id: `temp-${Date.now()}`,
        secure_url: image,
        optimized_url: secureUrl,
        thumbnail_url: secureUrl,
        format: "auto",
        width: 800,
        height: 800,
        bytes: 0,
        note: "Transmitiendo vía Cloudinary Fetch URL. Ingrese el API Secret para subir directamente a su biblioteca."
      }
    });
  } catch (error: any) {
    console.error("Error en upload Cloudinary:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Error al subir la imagen a Cloudinary"
    });
  }
});

// 4. URL Optimizer helper endpoint
app.post("/api/cloudinary/optimize", (req, res) => {
  const { url, width = 800, quality = "auto", crop = "fill" } = req.body;
  const { cloudName } = getCloudinaryInstance();

  if (!url) {
    res.status(400).json({ success: false, error: "URL requerida" });
    return;
  }

  const optimizedUrl = `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_${quality},w_${width},c_${crop}/${encodeURIComponent(url)}`;
  res.json({ success: true, optimizedUrl });
});

// ==========================================
// NEWSLETTER ROUTES (Resend API)
// ==========================================

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: obtener o crear la audiencia JBalayage Newsletter
async function getOrCreateAudience(): Promise<string> {
  // Si ya está en env, usarla directamente
  if (process.env.RESEND_AUDIENCE_ID && process.env.RESEND_AUDIENCE_ID.trim() !== "") {
    return process.env.RESEND_AUDIENCE_ID.trim();
  }

  // Si no, listar audiencias y buscar la nuestra
  try {
    const { data: list } = await resend.audiences.list();
    const existing = list?.data?.find((a: any) => a.name === "JBalayage Newsletter");
    if (existing) return existing.id;

    // Crear audiencia nueva
    const { data: created } = await resend.audiences.create({ name: "JBalayage Newsletter" });
    if (created?.id) {
      console.log("✨ Nueva audiencia Resend creada:", created.id);
      return created.id;
    }
  } catch (e) {
    console.error("Error gestionando audiencia Resend:", e);
  }
  return "";
}

// Template HTML del email de bienvenida
function buildWelcomeEmail(name: string, unsubToken: string, baseUrl: string): string {
  const firstName = name?.trim() || "querida";
  const unsubUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${unsubToken}`;
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenida a JB Balayage Newsletter</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#2E2B27;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(44,40,35,0.10);max-width:600px;width:100%;">
        
        <!-- Header dorado -->
        <tr><td style="background:linear-gradient(135deg,#BFA181 0%,#8C7153 100%);padding:48px 40px 36px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Maison Balayage Studio</p>
          <h1 style="margin:0;font-size:36px;font-weight:300;color:#FFFFFF;font-family:Georgia,serif;letter-spacing:1px;">JB Balayage</h1>
          <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.85);">Peluqueria Boutique &bull; Punta Arenas</p>
        </td></tr>

        <!-- Cuerpo -->
        <tr><td style="padding:44px 48px 36px;">
          <h2 style="margin:0 0 16px;font-size:26px;font-weight:300;color:#1C1917;font-family:Georgia,serif;">Hola, ${firstName} 🤍</h2>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#6B6661;">Gracias por suscribirte al newsletter de <strong style="color:#2E2B27;">JB Balayage Boutique</strong>. ¡Ya sos parte de nuestra comunidad!</p>
          <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#6B6661;">A partir de ahora vas a recibir:</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
            <tr><td style="padding:6px 0;"><span style="color:#BFA181;font-size:18px;margin-right:10px;">&#10022;</span><span style="font-size:14px;color:#2E2B27;">Tendencias exclusivas en coloración y balayage</span></td></tr>
            <tr><td style="padding:6px 0;"><span style="color:#BFA181;font-size:18px;margin-right:10px;">&#10022;</span><span style="font-size:14px;color:#2E2B27;">Fotos antes &amp; después de transformaciones reales</span></td></tr>
            <tr><td style="padding:6px 0;"><span style="color:#BFA181;font-size:18px;margin-right:10px;">&#10022;</span><span style="font-size:14px;color:#2E2B27;">Tips de cuidado del cabello teñido</span></td></tr>
            <tr><td style="padding:6px 0;"><span style="color:#BFA181;font-size:18px;margin-right:10px;">&#10022;</span><span style="font-size:14px;color:#2E2B27;">Promociones especiales solo para suscriptoras</span></td></tr>
          </table>

          <!-- CTA Button -->
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 36px;">
            <tr><td align="center" style="background:linear-gradient(135deg,#BFA181,#8C7153);border-radius:8px;">
              <a href="https://jbalayageboutique.vercel.app" style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;letter-spacing:1px;">Ver nuestro trabajo →</a>
            </td></tr>
          </table>

          <p style="margin:0;font-size:14px;line-height:1.7;color:#6B6661;">Un abrazo caluroso desde el fin del mundo 🏴🇨🇱</p>
          <p style="margin:8px 0 0;font-size:15px;color:#1C1917;font-family:Georgia,serif;font-style:italic;">Janet &mdash; JB Balayage Boutique</p>
        </td></tr>

        <!-- Footer dorado -->
        <tr><td style="background:#F3EFE9;padding:24px 48px;border-top:1px solid #E7E2D8;">
          <p style="margin:0;font-size:11px;color:#9B9591;text-align:center;line-height:1.6;">
            Recibiste este email porque te suscribiste en jbalayageboutique.vercel.app<br/>
            <a href="${unsubUrl}" style="color:#BFA181;text-decoration:underline;">Darse de baja</a> &bull; 
            Punta Arenas, Chile
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Template HTML de campaña
function buildCampaignEmail(subject: string, htmlBody: string, unsubToken: string, baseUrl: string): string {
  const unsubUrl = `${baseUrl}/api/newsletter/unsubscribe?token=${unsubToken}`;
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#2E2B27;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(44,40,35,0.10);max-width:600px;width:100%;">
        <tr><td style="background:linear-gradient(135deg,#BFA181 0%,#8C7153 100%);padding:32px 40px;text-align:center;">
          <h1 style="margin:0;font-size:28px;font-weight:300;color:#FFFFFF;font-family:Georgia,serif;">${subject}</h1>
          <p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.75);">JB Balayage Boutique &bull; Punta Arenas</p>
        </td></tr>
        <tr><td style="padding:44px 48px 36px;">${htmlBody}</td></tr>
        <tr><td style="background:#F3EFE9;padding:24px 48px;border-top:1px solid #E7E2D8;">
          <p style="margin:0;font-size:11px;color:#9B9591;text-align:center;">
            <a href="${unsubUrl}" style="color:#BFA181;">Darse de baja</a> &bull; JB Balayage Boutique, Punta Arenas
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// In-memory token store para unsubscribes (en producción usarías DB)
// Guardamos email->token y token->email
const unsubTokens: Map<string, string> = new Map();

// 5. Suscripción al newsletter
app.post("/api/newsletter/subscribe", async (req: express.Request, res: express.Response) => {
  try {
    const { email, name } = req.body;
    if (!email || typeof email !== "string" || !email.includes("@")) {
      res.status(400).json({ success: false, error: "Email inválido" });
      return;
    }

    const audienceId = await getOrCreateAudience();
    if (!audienceId) {
      res.status(500).json({ success: false, error: "No se pudo configurar la audiencia" });
      return;
    }

    // Agregar contacto a la audiencia de Resend
    const firstName = (name || "").split(" ")[0].trim();
    const lastName = (name || "").split(" ").slice(1).join(" ").trim();

    const { data: contact, error: contactError } = await resend.contacts.create({
      audienceId,
      email: email.toLowerCase().trim(),
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      unsubscribed: false,
    });

    if (contactError) {
      // Si ya está suscripto, retornar mensaje amigable
      if (contactError.message?.toLowerCase().includes("already") || (contactError as any)?.statusCode === 409) {
        res.json({ success: true, alreadySubscribed: true, message: "¡Ya estás suscripta! Revisa tu bandeja de entrada." });
        return;
      }
      throw contactError;
    }

    // Generar token de unsubscribe
    const unsubToken = crypto.randomBytes(32).toString("hex");
    unsubTokens.set(email.toLowerCase(), unsubToken);
    unsubTokens.set(unsubToken, email.toLowerCase());

    // Determinar base URL
    const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || `${req.protocol}://${req.get("host")}`;

    // Enviar email de bienvenida
    const { error: emailError } = await resend.emails.send({
      from: "JB Balayage Boutique <newsletter@jbalayageboutique.com>",
      to: email.toLowerCase().trim(),
      subject: "🤍 ¡Bienvenida a JB Balayage Newsletter!",
      html: buildWelcomeEmail(firstName || name || "", unsubToken, baseUrl),
    });

    if (emailError) {
      console.warn("Contacto creado pero error al enviar email:", emailError);
    }

    res.json({
      success: true,
      message: "¡Gracias por suscribirte! Revisa tu email para un mensaje especial.",
      contactId: contact?.id,
    });
  } catch (error: any) {
    console.error("Error suscripción newsletter:", error);
    res.status(500).json({ success: false, error: error?.message || "Error al procesar la suscripción" });
  }
});

// 6. Darse de baja
app.get("/api/newsletter/unsubscribe", async (req: express.Request, res: express.Response) => {
  try {
    const { token, email: directEmail } = req.query as { token?: string; email?: string };

    let email = "";
    if (token) {
      email = unsubTokens.get(token) || "";
    } else if (directEmail) {
      email = directEmail;
    }

    if (!email) {
      res.status(400).send("<html><body><h2>Link inválido o expirado.</h2></body></html>");
      return;
    }

    const audienceId = await getOrCreateAudience();
    if (audienceId) {
      // Marcar como unsubscribed en Resend
      const { data: contactData } = await resend.contacts.list({ audienceId });
      const contact = contactData?.data?.find((c: any) => c.email === email);
      if (contact?.id) {
        await resend.contacts.update({ audienceId, id: contact.id, unsubscribed: true });
      }
    }

    // Limpiar token
    if (token) unsubTokens.delete(token);

    res.send(`
      <!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Darse de Baja</title>
      <style>body{font-family:Georgia,serif;background:#FAF7F2;color:#2E2B27;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
      .box{text-align:center;max-width:480px;padding:48px;background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.08);}
      h2{color:#BFA181;font-weight:300;font-size:28px;}p{color:#6B6661;line-height:1.7;}
      a{color:#BFA181;}</style></head>
      <body><div class="box">
        <h2>Te diste de baja 🌿</h2>
        <p>Tu email <strong>${email}</strong> fue eliminado de nuestra lista de newsletter.</p>
        <p>Si fue un error, podés volver a suscribirte en nuestro sitio.</p>
        <p><a href="https://jbalayageboutique.vercel.app">Volver al sitio →</a></p>
      </div></body></html>`);
  } catch (error: any) {
    console.error("Error darse de baja:", error);
    res.status(500).send("<html><body><h2>Error al procesar la solicitud.</h2></body></html>");
  }
});

// 7. Enviar campaña (ruta admin — protegida por API key header)
app.post("/api/newsletter/send-campaign", async (req: express.Request, res: express.Response) => {
  try {
    // Protección básica: requerir header de admin key
    const adminKey = req.headers["x-admin-key"];
    const expectedKey = process.env.NEWSLETTER_ADMIN_KEY || "jbalayage-admin-2024";
    if (adminKey !== expectedKey) {
      res.status(401).json({ success: false, error: "No autorizado" });
      return;
    }

    const { subject, htmlBody } = req.body;
    if (!subject || !htmlBody) {
      res.status(400).json({ success: false, error: "Se requiere subject y htmlBody" });
      return;
    }

    const audienceId = await getOrCreateAudience();
    if (!audienceId) {
      res.status(500).json({ success: false, error: "Audiencia no configurada" });
      return;
    }

    // Obtener todos los suscriptores activos
    const { data: contactsData } = await resend.contacts.list({ audienceId });
    const activeContacts = contactsData?.data?.filter((c: any) => !c.unsubscribed) || [];

    if (activeContacts.length === 0) {
      res.json({ success: true, message: "No hay suscriptores activos", sent: 0 });
      return;
    }

    const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || `${req.protocol}://${req.get("host")}`;
    let sent = 0;
    let errors = 0;

    // Enviar batch (con delay para respetar rate limits)
    for (const contact of activeContacts) {
      try {
        const token = unsubTokens.get(contact.email) || crypto.randomBytes(32).toString("hex");
        unsubTokens.set(contact.email, token);
        unsubTokens.set(token, contact.email);

        await resend.emails.send({
          from: "JB Balayage Boutique <newsletter@jbalayageboutique.com>",
          to: contact.email,
          subject,
          html: buildCampaignEmail(subject, htmlBody, token, baseUrl),
        });
        sent++;
        // Pequeño delay para no saturar la API
        await new Promise(r => setTimeout(r, 100));
      } catch (e) {
        errors++;
        console.error("Error enviando a", contact.email, e);
      }
    }

    res.json({ success: true, sent, errors, total: activeContacts.length });
  } catch (error: any) {
    console.error("Error enviando campaña:", error);
    res.status(500).json({ success: false, error: error?.message || "Error al enviar campaña" });
  }
});

// 8. Obtener estadísticas de suscriptores (admin)
app.get("/api/newsletter/stats", async (req: express.Request, res: express.Response) => {
  try {
    const adminKey = req.headers["x-admin-key"];
    const expectedKey = process.env.NEWSLETTER_ADMIN_KEY || "jbalayage-admin-2024";
    if (adminKey !== expectedKey) {
      res.status(401).json({ success: false, error: "No autorizado" });
      return;
    }

    const audienceId = await getOrCreateAudience();
    if (!audienceId) {
      res.json({ success: true, total: 0, active: 0, unsubscribed: 0 });
      return;
    }

    const { data: contactsData } = await resend.contacts.list({ audienceId });
    const contacts = contactsData?.data || [];
    const active = contacts.filter((c: any) => !c.unsubscribed).length;
    const unsubscribed = contacts.filter((c: any) => c.unsubscribed).length;

    res.json({ success: true, total: contacts.length, active, unsubscribed, audienceId });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// ==========================================
// CLIENTAS ROUTES (Supabase)
// ==========================================

// Conexión directa a Supabase via postgres
const db = postgres(
  process.env.SUPABASE_DB_URL ||
  "postgresql://postgres.ktjrfedcoagfcaifhgmf:41vKpWTzMmjVezof@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
  { ssl: "require", max: 5, idle_timeout: 30 }
);

// Migración idempotente: asegura que la tabla clientas tenga todas las columnas
// (se ejecuta una vez al arrancar el server; ADD COLUMN IF NOT EXISTS no rompe nada si ya existe)
async function ensureClientasSchema() {
  try {
    await db`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS apellido TEXT`;
    await db`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS como_nos_conocio TEXT`;
    await db`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS fecha_nacimiento DATE`;
    await db`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS ya_es_clienta BOOLEAN DEFAULT false`;
    await db`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS motivo_consulta TEXT`;
    await db`ALTER TABLE public.clientas ADD COLUMN IF NOT EXISTS whatsapp_url TEXT`;
    await db`CREATE INDEX IF NOT EXISTS idx_clientas_apellido ON public.clientas(apellido)`;
    await db`CREATE INDEX IF NOT EXISTS idx_clientas_nacimiento ON public.clientas(fecha_nacimiento)`;
    console.log("✅ Schema clientas verificado");
  } catch (e) {
    console.error("⚠️ No se pudo verificar el schema de clientas:", e);
  }
}

// POST /api/clientas/register — Registrar nueva clienta
app.post("/api/clientas/register", async (req: express.Request, res: express.Response) => {
  try {
    const {
      nombre, apellido, whatsapp, whatsapp_url, email,
      tipo_cabello, servicios, consulta, motivo_consulta,
      acepta_newsletter, fecha_nacimiento, ya_es_clienta, como_nos_conocio
    } = req.body;

    if (!nombre?.trim() || !whatsapp?.trim()) {
      res.status(400).json({ success: false, error: "Nombre y WhatsApp son obligatorios" });
      return;
    }

    // Insertar en Supabase con todos los campos
    const [clienta] = await db`
      INSERT INTO public.clientas
        (nombre, apellido, whatsapp, whatsapp_url, email,
         tipo_cabello, servicios, consulta, motivo_consulta,
         acepta_newsletter, fecha_nacimiento, ya_es_clienta, como_nos_conocio)
      VALUES
        (${ nombre.trim() }, ${ apellido?.trim() || null }, ${ whatsapp.trim() },
         ${ whatsapp_url || null }, ${ email?.trim() || null },
         ${ tipo_cabello || null }, ${ servicios?.length ? servicios : null },
         ${ consulta?.trim() || null }, ${ motivo_consulta?.trim() || null },
         ${ acepta_newsletter === true }, ${ fecha_nacimiento || null },
         ${ ya_es_clienta === true }, ${ como_nos_conocio || null })
      RETURNING id, nombre, apellido, creado_en
    `;

    // Si quiere newsletter Y tiene email, agregarla a Resend también
    if (acepta_newsletter && email?.trim()) {
      try {
        const audienceId = await getOrCreateAudience();
        if (audienceId) {
          const firstName = (nombre || "").split(" ")[0].trim();
          const lastName = (nombre || "").split(" ").slice(1).join(" ").trim();
          await resend.contacts.create({
            audienceId,
            email: email.toLowerCase().trim(),
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            unsubscribed: false,
          });

          // Email de bienvenida
          const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || `${req.protocol}://${req.get("host")}`;
          const unsubToken = crypto.randomBytes(32).toString("hex");
          unsubTokens.set(email.toLowerCase(), unsubToken);
          unsubTokens.set(unsubToken, email.toLowerCase());

          await resend.emails.send({
            from: "JB Balayage Boutique <newsletter@jbalayageboutique.com>",
            to: email.toLowerCase().trim(),
            subject: "🤍 ¡Bienvenida a JB Balayage Newsletter!",
            html: buildWelcomeEmail(firstName || nombre, unsubToken, baseUrl),
          });
        }
      } catch (newsletterErr) {
        // No fallar el registro si falla el newsletter
        console.warn("Newsletter opt-in error (no crítico):", newsletterErr);
      }
    }

    res.json({
      success: true,
      message: "¡Gracias por registrarte! Nos ponemos en contacto pronto.",
      id: clienta.id,
    });

  } catch (error: any) {
    console.error("Error registrando clienta:", error);
    // Duplicate WhatsApp / email— handle gracefully
    if (error?.code === "23505") {
      res.json({ success: true, message: "¡Ya tenías un registro con nosotras! Nos contactamos pronto." });
      return;
    }
    res.status(500).json({ success: false, error: error?.message || "Error al registrar" });
  }
});

// GET /api/clientas — Listar clientas (protegida)
app.get("/api/clientas", async (req: express.Request, res: express.Response) => {
  try {
    const adminKey = req.headers["x-admin-key"];
    const expectedKey = process.env.NEWSLETTER_ADMIN_KEY || "jbalayage-admin-2024";
    if (adminKey !== expectedKey) {
      res.status(401).json({ success: false, error: "No autorizado" });
      return;
    }

    const { search, newsletter } = req.query as { search?: string; newsletter?: string };

    let clientas;
    if (search) {
      const q = `%${search}%`;
      clientas = await db`
        SELECT * FROM public.clientas
        WHERE nombre ILIKE ${q} OR whatsapp ILIKE ${q} OR email ILIKE ${q}
        ORDER BY creado_en DESC
        LIMIT 200
      `;
    } else if (newsletter === "true") {
      clientas = await db`
        SELECT * FROM public.clientas
        WHERE acepta_newsletter = true
        ORDER BY creado_en DESC
        LIMIT 500
      `;
    } else {
      clientas = await db`
        SELECT * FROM public.clientas
        ORDER BY creado_en DESC
        LIMIT 500
      `;
    }

    res.json({ success: true, total: clientas.length, data: clientas });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// ── Contraseña del panel /admin (se puede sobreescribir con la env var ADMIN_PASSWORD en Vercel) ──
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ava1967";

// ── Helper: chequear admin key (contraseña del panel /admin) ──
function isAdmin(req: express.Request): boolean {
  return req.headers["x-admin-key"] === ADMIN_PASSWORD;
}

// Login del panel admin — valida la contraseña y devuelve las stats si es correcta
app.post("/api/admin/login", async (req: express.Request, res: express.Response) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ success: false, error: "Contraseña incorrecta" });
    return;
  }
  try {
    const stats = await getAdminStats();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// ── Stats para el dashboard admin ──
async function getAdminStats() {
  const [totals] = await db`
    SELECT
      COUNT(*)::int AS total_clientas,
      COUNT(*) FILTER (WHERE acepta_newsletter)::int AS newsletter,
      COUNT(*) FILTER (WHERE ya_es_clienta)::int AS ya_clientas,
      COUNT(*) FILTER (WHERE creado_en > NOW() - INTERVAL '7 days')::int AS nuevas_semana,
      COUNT(*) FILTER (WHERE creado_en > NOW() - INTERVAL '30 days')::int AS nuevas_mes
    FROM public.clientas
  `;

  const por_origen = await db`
    SELECT COALESCE(como_nos_conocio, 'sin_dato') AS origen, COUNT(*)::int AS total
    FROM public.clientas GROUP BY 1 ORDER BY total DESC
  `;

  const por_servicio = await db`
    SELECT servicio, COUNT(*)::int AS total
    FROM public.clientas, unnest(servicios) AS servicio
    GROUP BY 1 ORDER BY total DESC LIMIT 10
  `;

  const cumpleanos_mes = await db`
    SELECT nombre, apellido, whatsapp, whatsapp_url,
           EXTRACT(DAY FROM fecha_nacimiento)::int AS dia
    FROM public.clientas
    WHERE fecha_nacimiento IS NOT NULL
      AND EXTRACT(MONTH FROM fecha_nacimiento) = EXTRACT(MONTH FROM NOW())
    ORDER BY dia
  `;

  const ultimas = await db`
    SELECT nombre, apellido, whatsapp, whatsapp_url, email, acepta_newsletter,
           ya_es_clienta, como_nos_conocio, creado_en
    FROM public.clientas
    ORDER BY creado_en DESC
    LIMIT 5
  `;

  return { totals, por_origen, por_servicio, cumpleanos_mes, ultimas };
}

// GET /api/admin/stats — Dashboard (protegido)
app.get("/api/admin/stats", async (req: express.Request, res: express.Response) => {
  if (!isAdmin(req)) {
    res.status(401).json({ success: false, error: "No autorizado" });
    return;
  }
  try {
    res.json({ success: true, data: await getAdminStats() });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// GET /api/admin/cumpleanos — Clientas que cumplen años hoy (para el recordatorio diario)
app.get("/api/admin/cumpleanos", async (req: express.Request, res: express.Response) => {
  if (!isAdmin(req)) {
    res.status(401).json({ success: false, error: "No autorizado" });
    return;
  }
  try {
    const hoy = await db`
      SELECT nombre, apellido, whatsapp, whatsapp_url
      FROM public.clientas
      WHERE fecha_nacimiento IS NOT NULL
        AND EXTRACT(MONTH FROM fecha_nacimiento) = EXTRACT(MONTH FROM NOW())
        AND EXTRACT(DAY FROM fecha_nacimiento) = EXTRACT(DAY FROM NOW())
    `;
    res.json({ success: true, data: hoy });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// Route for Google Search Console verification
app.get("/google3df15fde543cd005.html", (req, res) => {
  res.send("google-site-verification: google3df15fde543cd005.html");
});

// ==========================================
// VITE & STATIC FILES SERVING
// ==========================================
async function startServer() {
  ensureClientasSchema();

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
