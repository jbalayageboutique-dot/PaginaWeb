import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

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
// VITE & STATIC FILES SERVING
// ==========================================
async function startServer() {
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
