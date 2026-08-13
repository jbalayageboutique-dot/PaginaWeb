import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const caseDir = '/Users/janet/Downloads/baby lights rubio sin matizar';
const outputPath = path.join(root, 'src', 'data', 'africaCloudinary.json');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'apssuuqy';
const apiKey = process.env.CLOUDINARY_API_KEY || '714586942776954';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '_O3C7rtIDKx60TwplWD1BwljykQ';

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const folder = 'maison-balayage/casos/clienta-africa-expedicion';

const caseContext = {
  title: 'Mechas y Babylights sin Matizar con Olaplex | Expedicion Africa',
  caption: 'Trabajo de mechas con papel y babylights muy finas en base clara, sin necesidad de matizar, utilizando el tratamiento protector Olaplex.',
  salon: 'JB Balayage Peluqueria boutique',
  location: 'Punta Arenas, Magallanes, Chile',
  address: 'Roberto Rasmussen Fernandez 187 (esquina Iris Munoz), Valle Los Sauces',
  gps: '-53.15,-70.923333',
};

const tags = [
  'clienta-africa',
  'babylights',
  'rubio-natural',
  'sin-matizar',
  'olaplex',
  'peluqueria-punta-arenas',
  'jb-balayage-boutique',
  'antes-y-despues',
];

async function upload(file, resourceType) {
  const publicId = path.basename(file, path.extname(file));
  let role = 'after';
  const name = publicId.toLowerCase();
  if (name.includes('1381')) role = 'after-main'; // Let's use 1381 as after-main
  if (name.includes('1387')) role = 'after';
  if (name.includes('1392')) role = 'before-main'; // Let's assume 1392 is before
  
  console.log(`Subiendo a Cloudinary: ${path.basename(file)} (como ${role})`);
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

const filesToUpload = [
  { path: path.join(caseDir, 'IMG_1381.jpg'), type: 'image' },
  { path: path.join(caseDir, 'IMG_1387 2.jpg'), type: 'image' },
  { path: path.join(caseDir, 'IMG_1392 2.jpg'), type: 'image' },
  { path: path.join(caseDir, 'IMG_1380.MOV'), type: 'video' },
  { path: path.join(caseDir, 'IMG_1390.mov'), type: 'video' },
  { path: path.join(caseDir, 'IMG_1393.MOV'), type: 'video' },
];

const uploadedPhotos = [];
const uploadedVideos = [];

for (const file of filesToUpload) {
  try {
    const result = await upload(file.path, file.type);
    if (file.type === 'image') {
      uploadedPhotos.push(result);
    } else {
      uploadedVideos.push(result);
    }
  } catch (err) {
    console.error(`Error subiendo ${file.path}:`, err);
  }
}

const payload = {
  cloud_name: cloudName,
  folder,
  uploaded_at: new Date().toISOString(),
  case: {
    id: 'clienta-africa-expedicion',
    title: 'Mechas y Babylights sin Matizar con Olaplex | Expedición África',
    before_public_id: uploadedPhotos.find((item) => item.role === 'before-main')?.public_id,
    after_public_id: uploadedPhotos.find((item) => item.role === 'after-main')?.public_id,
  },
  photos: uploadedPhotos,
  videos: uploadedVideos,
};

await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Listo: ${outputPath}`);
