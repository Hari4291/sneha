import { Cloudinary } from '@cloudinary/url-gen';

export const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'z317zivv';
export const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '965628964833624';

// Initialize Cloudinary SDK Instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
});

/**
 * Generate an optimized Cloudinary CDN URL for any image asset.
 * Applies automatic WebP/AVIF format selection and quality compression (f_auto, q_auto).
 */
export function buildCloudinaryUrl(publicIdOrUrl: string, width?: number): string {
  // If it's already a full HTTP Cloudinary URL, inject transformations
  if (publicIdOrUrl.startsWith('http://res.cloudinary.com/') || publicIdOrUrl.startsWith('https://res.cloudinary.com/')) {
    const transformStr = width ? `f_auto,q_auto,w_${width},c_limit` : 'f_auto,q_auto';
    return publicIdOrUrl.replace('/upload/', `/upload/${transformStr}/`);
  }

  // If local asset path, fallback cleanly or map to Cloudinary CDN
  if (publicIdOrUrl.startsWith('/assets/')) {
    const assetName = publicIdOrUrl.replace('/assets/', '').replace(/\.[^/.]+$/, '');
    const transformStr = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/wedding_assets/${assetName}`;
  }

  const transformStr = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformStr}/${publicIdOrUrl}`;
}
