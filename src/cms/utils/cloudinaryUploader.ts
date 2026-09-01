/**
 * Cloudinary Direct Signed & Unsigned Uploader Utility
 * Connected to Cloudinary Account: z317zivv (Key Name: sneha)
 * Generates permanent HTTPS Cloudinary CDN URLs for videos and images!
 */

const CLOUD_NAME = 'z317zivv';
const API_KEY = '965628964833624';
const API_SECRET = 'lw4vAKjp3SG6aOj9oo1MJ3vVKvo';

/**
 * Calculates SHA-1 hex hash using native browser Web Crypto API
 */
async function sha1Hex(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function uploadFileToCloudinary(
  file: File,
  onProgress?: (percentage: number) => void
): Promise<string> {
  const isVideo = file.type.startsWith('video');
  const resourceType = isVideo ? 'video' : 'image';
  const timestamp = Math.floor(Date.now() / 1000);

  // 1. Calculate Signed Upload Signature (timestamp=xxx + API_SECRET)
  const stringToSign = `timestamp=${timestamp}${API_SECRET}`;
  const signature = await sha1Hex(stringToSign);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', API_KEY);
  formData.append('timestamp', timestamp.toString());
  formData.append('signature', signature);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  return new Promise<string>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const pct = Math.round((event.loaded / event.total) * 100);
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.secure_url) {
            resolve(data.secure_url);
            return;
          }
        } catch (err) {
          reject(err);
          return;
        }
      }
      try {
        const errData = JSON.parse(xhr.responseText);
        reject(new Error(errData.error?.message || `HTTP ${xhr.status}`));
      } catch {
        reject(new Error(`Cloudinary upload HTTP ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error uploading file to Cloudinary CDN.'));
    xhr.open('POST', endpoint);
    xhr.send(formData);
  });
}
