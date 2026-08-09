// Cloudinary Client & URL Optimization Utility
// Default Cloudinary configuration from user credentials
export const CLOUDINARY_CONFIG = {
  cloudName: 'apssuuqy',
  apiKey: '714586942776954',
  defaultUploadFolder: 'maison-balayage'
};

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  optimized_url: string;
  thumbnail_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Transforms any image URL or Cloudinary public_id into a Cloudinary optimized streaming URL.
 * Applies auto format (f_auto: WEBP/AVIF), auto quality (q_auto), and optional dimensions/cropping.
 */
export function getCloudinaryUrl(
  imageSource: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'limit' | 'pad';
    quality?: string | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
    gravity?: 'auto' | 'face' | 'center';
  } = {}
): string {
  if (!imageSource) return '';

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto'
  } = options;

  // Build Cloudinary transformation flags
  const transformations: string[] = [`f_${format}`, `q_${quality}`];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) {
    transformations.push(`c_${crop}`);
    transformations.push(`g_${gravity}`);
  }

  const transformString = transformations.join(',');

  // Case 1: Already a Cloudinary URL (e.g., https://res.cloudinary.com/apssuuqy/image/upload/...)
  if (imageSource.includes('res.cloudinary.com')) {
    if (imageSource.includes('/upload/')) {
      return imageSource.replace('/upload/', `/upload/${transformString}/`);
    }
    return imageSource;
  }

  // Case 2: Standard public_id without full URL (e.g. "maison-balayage/case-1")
  if (!imageSource.startsWith('http://') && !imageSource.startsWith('https://') && !imageSource.startsWith('data:')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformString}/${imageSource}`;
  }

  // Case 3: External image URL (Unsplash, etc.) - use Cloudinary Fetch capability for instant streaming & optimization
  // Cloudinary URL format for remote fetch: https://res.cloudinary.com/<cloud_name>/image/fetch/<transformations>/<remote_url>
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/fetch/${transformString}/${encodeURIComponent(imageSource)}`;
}

/**
 * Upload an image file or base64 data to Cloudinary via backend API or direct upload preset.
 */
export async function uploadImageToCloudinary(
  fileOrBase64: File | string,
  folder: string = CLOUDINARY_CONFIG.defaultUploadFolder,
  onProgress?: (percent: number) => void
): Promise<CloudinaryUploadResponse> {
  let fileData: string;

  if (fileOrBase64 instanceof File) {
    fileData = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      if (onProgress) onProgress(20);
      reader.readAsDataURL(fileOrBase64);
    });
  } else {
    fileData = fileOrBase64;
  }

  if (onProgress) onProgress(50);

  // Send to server backend route
  const response = await fetch('/api/cloudinary/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image: fileData,
      folder
    })
  });

  if (onProgress) onProgress(80);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Error al subir la imagen a Cloudinary');
  }

  if (onProgress) onProgress(100);

  return data.data;
}
