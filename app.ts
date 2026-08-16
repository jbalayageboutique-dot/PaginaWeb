import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { Resend } from "resend";
import crypto from "crypto";
import postgres from "postgres";

dotenv.config();

export const app = express();

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
// CLOUDINARY ROUTES
// ==========================================

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

app.post("/api/cloudinary/upload", async (req, res) => {
  try {
    const { image, folder = "maison-balayage" } = req.body;
    if (!image) {
      res.status(400).json({ success: false, error: "No se proporcionó imagen" });
      return;
    }

    const { cloudName, apiSecret } = getCloudinaryInstance();

    if (apiSecret) {
      const result = await cloudinary.uploader.upload(image, {
        folder,
        resource_type: "auto",
        transformation: [
          { quality: "auto", fetch_format: "auto" }
        ]
      });

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

    // Fallback if API secret is not set yet: Cloudinary Fetch URL streaming
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
  if (process.env.RESEND_AUDIENCE_ID && process.env.RESEND_AUDIENCE_ID.trim() !== "") {
    return process.env.RESEND_AUDIENCE_ID.trim();
  }

  try {
    const { data: list } = await resend.audiences.list();
    const existing = list?.data?.find((a: any) => a.name === "JBalayage Newsletter");
    if (existing) return existing.id;

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
const unsubTokens: Map<string, string> = new Map();

app.post("/api/newsletter/subscribe", async (req, res) => {
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
      if (contactError.message?.toLowerCase().includes("already") || (contactError as any)?.statusCode === 409) {
        res.json({ success: true, alreadySubscribed: true, message: "¡Ya estás suscripta! Revisa tu bandeja de entrada." });
        return;
      }
      throw contactError;
    }

    const unsubToken = crypto.randomBytes(32).toString("hex");
    unsubTokens.set(email.toLowerCase(), unsubToken);
    unsubTokens.set(unsubToken, email.toLowerCase());

    const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || `https://www.jbbalayage.cl`;

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

app.get("/api/newsletter/unsubscribe", async (req, res) => {
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
      const { data: contactData } = await resend.contacts.list({ audienceId });
      const contact = contactData?.data?.find((c: any) => c.email === email);
      if (contact?.id) {
        await resend.contacts.update({ audienceId, id: contact.id, unsubscribed: true });
      }
    }

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
        <p><a href="https://www.jbbalayage.cl">Volver al sitio →</a></p>
      </div></body></html>`);
  } catch (error: any) {
    console.error("Error darse de baja:", error);
    res.status(500).send("<html><body><h2>Error al procesar la solicitud.</h2></body></html>");
  }
});

app.post("/api/newsletter/send-campaign", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];
    const expectedKey = process.env.ADMIN_PASSWORD || process.env.NEWSLETTER_ADMIN_KEY || "ava1967";
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

    const { data: contactsData } = await resend.contacts.list({ audienceId });
    const activeContacts = contactsData?.data?.filter((c: any) => !c.unsubscribed) || [];

    if (activeContacts.length === 0) {
      res.json({ success: true, message: "No hay suscriptores activos", sent: 0 });
      return;
    }

    const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || `https://www.jbbalayage.cl`;
    let sent = 0;
    let errors = 0;

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

app.get("/api/newsletter/stats", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];
    const expectedKey = process.env.ADMIN_PASSWORD || process.env.NEWSLETTER_ADMIN_KEY || "ava1967";
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
// SUPABASE — BASE DE DATOS DE CLIENTAS
// ==========================================

const db = postgres(
  process.env.SUPABASE_DB_URL ||
  "postgresql://postgres.ktjrfedcoagfcaifhgmf:41vKpWTzMmjVezof@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",
  { ssl: "require", max: 5, idle_timeout: 30 }
);

// ── Contraseña del panel /admin (se puede sobreescribir con la env var ADMIN_PASSWORD en Vercel) ──
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ava1967";

// ── Helper: chequear admin key (contraseña del panel /admin) ──
function isAdmin(req: any): boolean {
  return req.headers["x-admin-key"] === ADMIN_PASSWORD;
}

// Migración idempotente: asegura que la tabla clientas tenga todas las columnas
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

// Login del panel admin — valida la contraseña y devuelve las stats si es correcta
app.post("/api/admin/login", async (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    res.status(401).json({ success: false, error: "Contraseña incorrecta" });
    return;
  }
  try {
    await ensureClientasSchema();
    res.json({ success: true, data: await getAdminStats() });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// GET /api/admin/stats — Dashboard (protegido)
app.get("/api/admin/stats", async (req, res) => {
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

// GET /api/admin/cumpleanos — Clientas que cumplen años hoy
app.get("/api/admin/cumpleanos", async (req, res) => {
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

// POST /api/clientas/register — Registrar nueva clienta
app.post("/api/clientas/register", async (req, res) => {
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
          await resend.contacts.create({
            audienceId,
            email: email.toLowerCase().trim(),
            firstName: firstName || undefined,
            lastName: apellido || undefined,
            unsubscribed: false,
          });

          const baseUrl = process.env.APP_URL?.replace(/\/$/, "") || `https://www.jbbalayage.cl`;
          const unsubToken = crypto.randomBytes(32).toString("hex");

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
    if (error?.code === "23505") {
      res.json({ success: true, message: "¡Ya tenías un registro con nosotras! Nos contactamos pronto." });
      return;
    }
    res.status(500).json({ success: false, error: error?.message || "Error al registrar" });
  }
});

// POST /api/clientas/delete — Borrar registro (admin, ruta fija para Vercel)
app.post("/api/clientas/delete", async (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ success: false, error: "No autorizado" });
    return;
  }
  try {
    const { id } = req.body;
    const deleted = await db`DELETE FROM public.clientas WHERE id = ${id} RETURNING id`;
    if (deleted.length === 0) {
      res.status(404).json({ success: false, error: "No encontrada" });
      return;
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error?.message });
  }
});

// GET /api/clientas — Listar clientas (protegida)
app.get("/api/clientas", async (req, res) => {
  if (!isAdmin(req)) {
    res.status(401).json({ success: false, error: "No autorizado" });
    return;
  }

  try {
    const { search, newsletter } = req.query as { search?: string; newsletter?: string };

    let clientas;
    if (search) {
      const q = `%${search}%`;
      clientas = await db`
        SELECT * FROM public.clientas
        WHERE nombre ILIKE ${q} OR apellido ILIKE ${q} OR whatsapp ILIKE ${q} OR email ILIKE ${q}
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
