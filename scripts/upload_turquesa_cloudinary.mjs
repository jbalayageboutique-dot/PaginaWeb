import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const caseDir = '/Users/janet/Downloads/carpeta sin título';
const outputPath = path.join(root, 'src', 'data', 'turquesaCloudinary.json');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'apssuuqy';
const apiKey = process.env.CLOUDINARY_API_KEY || '714586942776954';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '_O3C7rtIDKx60TwplWD1BwljykQ';

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const folder = 'maison-balayage/casos/barrido-color-turquesa-punta-arenas';

const caseContext = {
  title: 'Barrido de Color Turquesa con Corte Escalonado | JB Balayage',
  caption: 'Decoloración limpia a altura 9-10 para color de fantasía turquesa parejo y corte escalonado para resaltar el movimiento.',
  salon: 'JB Balayage Peluqueria boutique',
  location: 'Punta Arenas, Magallanes, Chile',
  address: 'Roberto Rasmussen Fernandez 187 (esquina Iris Munoz), Valle Los Sauces',
  gps: '-53.15,-70.923333',
};

const tags = [
  'barrido-color',
  'turquesa',
  'decoloracion-altura-10',
  'corte-escalonado',
  'fantasia',
  'peluqueria-punta-arenas',
  'jb-balayage-boutique',
  'antes-y-despues',
];

async function upload(file) {
  const publicId = path.basename(file, path.extname(file));
  let role = 'after';
  const name = publicId.toLowerCase();
  if (name.includes('1858')) role = 'before-main';
  if (name.includes('1870')) role = 'after-main';
  if (name.includes('1872')) role = 'after';
  if (name.includes('1875')) role = 'after';
  if (name.includes('1877')) role = 'after';
  
  console.log(`Subiendo a Cloudinary: ${path.basename(file)} (como ${role})`);
  const result = await cloudinary.uploader.upload(file, {
    folder,
    public_id: publicId,
    resource_type: 'image',
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
    secure_url: result.secure_url,
    optimized_url: cloudinary.url(result.public_id, {
      secure: true,
      transformation: [{ quality: 'auto:best', fetch_format: 'auto' }],
    }),
    thumbnail_url: cloudinary.url(result.public_id, {
      secure: true,
      transformation: [{ width: 500, height: 650, crop: 'fill', gravity: 'auto', quality: 'auto', fetch_format: 'auto' }],
    })
  };
}

const filesToUpload = [
  path.join(caseDir, 'IMG_1858.JPG'),
  path.join(caseDir, 'IMG_1870.jpg'),
  path.join(caseDir, 'IMG_1872.jpg'),
  path.join(caseDir, 'IMG_1875.jpg'),
  path.join(caseDir, 'IMG_1877.jpg'),
];

const uploadedPhotos = [];

for (const file of filesToUpload) {
  try {
    const result = await upload(file);
    uploadedPhotos.push(result);
  } catch (err) {
    console.error(`Error subiendo ${file}:`, err);
  }
}

const payload = {
  cloud_name: cloudName,
  folder,
  uploaded_at: new Date().toISOString(),
  case: {
    id: 'barrido-color-turquesa-corte-escalonado',
    title: 'Barrido de Color Turquesa con Corte Escalonado',
    before_public_id: uploadedPhotos.find((item) => item.role === 'before-main')?.public_id,
    after_public_id: uploadedPhotos.find((item) => item.role === 'after-main')?.public_id,
  },
  photos: uploadedPhotos,
};

await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
console.log(`Listo: ${outputPath}`);
