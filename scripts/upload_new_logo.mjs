import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'apssuuqy';
const apiKey = process.env.CLOUDINARY_API_KEY || '714586942776954';
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!apiSecret) {
  throw new Error('Falta CLOUDINARY_API_SECRET');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

const filePath = '/Users/janet/.gemini/antigravity/brain/63b2ebbe-af33-44c1-9603-6dd0f98f5941/.user_uploaded/media_1786678026908.jpg';
const publicId = 'maison-balayage-new-logo';
const folder = 'maison-balayage/branding';

async function upload() {
  console.log(`Subiendo nuevo logo: ${filePath}...`);
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    public_id: publicId,
    resource_type: 'image',
    overwrite: true,
    invalidate: true,
    tags: ['Branding', 'Maison Balayage', 'Logo'],
  });
  console.log(`Subida exitosa! URL: ${result.secure_url}`);
}

upload().catch(console.error);
