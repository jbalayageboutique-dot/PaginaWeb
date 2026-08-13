import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const caseDir = path.join(root, 'ninoska-balayage-babylights-miel-punta-arenas');
const photosDir = path.join(caseDir, 'fotos');
const videosDir = path.join(caseDir, 'videos');
const outputPath = path.join(root, 'src', 'data', 'ninoskaCloudinary.json');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'apssuuqy';
const apiKey = process.env.CLOUDINARY_API_KEY || '714586942776954';
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!apiSecret) {
  throw new Error('Falta CLOUDINARY_API_SECRET en .env');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const folder = 'maison-balayage/casos/ninoska-balayage-babylights-miel-punta-arenas';
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic']);
const videoExtensions = new Set(['.mov', '.mp4', '.m4v']);

const caseContext = {
  title: 'Balayage y Babylights Tono Miel | Caso Ninoska',
  caption: 'Trabajo de balayage y babylights en color miel, iluminando el contorno del rostro (contouring) en Punta Arenas. Cuidado de la salud capilar con sellado de cuticula e hidratacion profunda.',
  salon: 'Maison Balayage Studio',
  location: 'Punta Arenas, Magallanes, Chile',
  address: 'esquina Iris Munoz / Roberto Rasmussen Fernandez 187',
  gps: '-53.13529,-70.94159',
};

const tags = [
  'ninoska-miel',
  'balayage-miel',
  'babylights',
  'iluminacion-contorno',
  'antes-y-despues',
  'peluqueria-punta-arenas',
  'maison-balayage-studio',
  'jb-balayage-boutique',
  'sellado-cuticula',
  'hidratacion-profunda',
];

async function listMedia(dir, extensions) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => path.join(dir, entry.name))
    .sort();
}

function publicIdFor(file) {
  return path.basename(file, path.extname(file));
}

function roleFor(file) {
  const name = path.basename(file).toLowerCase();
  if (name.includes('antes-del-cambio')) return 'before-main';
  if (name.includes('portada-despues')) return 'after-main';
  if (name.includes('antes')) return 'before';
  if (name.includes('detalle')) return 'detail';
  if (name.includes('movimiento')) return 'movement';
  return 'after';
}

async function upload(file, resourceType) {
  const publicId = publicIdFor(file);
  const role = roleFor(file);
  const result = await cloudinary.uploader.upload(file, {
    folder,
    public_id: publicId,
    resource_type: resourceType,
    overwrite: true,
    invalidate: true,
    tags: [...tags, role],
    context: caseContext,
  });

  return {
    role,
    original_filename: path.basename(file),
    public_id: result.public_id,
    resource_type: result.resource_type,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    duration: result.duration,
    secure_url: result.secure_url,
    optimized_url:
      result.resource_type === 'image'
        ? cloudinary.url(result.public_id, {
            secure: true,
            transformation: [{ quality: 'auto:best', fetch_format: 'auto' }],
          })
        : result.secure_url,
    thumbnail_url:
      result.resource_type === 'image'
        ? cloudinary.url(result.public_id, {
            secure: true,
            transformation: [{ width: 500, height: 650, crop: 'fill', gravity: 'auto', quality: 'auto', fetch_format: 'auto' }],
          })
        : cloudinary.url(result.public_id, {
            secure: true,
            resource_type: 'video',
            format: 'jpg',
            transformation: [{ width: 500, height: 650, crop: 'fill', gravity: 'auto', quality: 'auto' }],
          }),
  };
}

const photos = await listMedia(photosDir, imageExtensions);
const videos = await listMedia(videosDir, videoExtensions);

const uploadedPhotos = [];
for (const file of photos) {
  console.log(`Subiendo foto: ${path.basename(file)}`);
  uploadedPhotos.push(await upload(file, 'image'));
}

const uploadedVideos = [];
for (const file of videos) {
  console.log(`Subiendo video: ${path.basename(file)}`);
  uploadedVideos.push(await upload(file, 'video'));
}

const payload = {
  cloud_name: cloudName,
  folder,
  uploaded_at: new Date().toISOString(),
  case: {
    id: 'ninoska-balayage-babylights-miel',
    title: 'Balayage y Babylights Miel Ninoska',
    before_public_id: uploadedPhotos.find((item) => item.role === 'before-main')?.public_id,
    after_public_id: uploadedPhotos.find((item) => item.role === 'after-main')?.public_id,
  },
  photos: uploadedPhotos,
  videos: uploadedVideos,
};

await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Listo: ${outputPath}`);
