/**
 * IndexedDB Persistent Storage for High-Definition Wedding Video Reels
 * Stores video files (MP4/MOV) directly in IndexedDB (which supports hundreds of MBs/GBs)
 * so device video uploads work 100% reliably without requiring external Cloudinary accounts!
 */

const DB_NAME = 'WeddingReelsMediaDB';
const DB_VERSION = 1;
const STORE_NAME = 'reels_videos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function storeVideoFile(file: File): Promise<string> {
  const db = await openDB();
  const id = `idxdb-video-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    const record = {
      id,
      name: file.name,
      type: file.type,
      size: file.size,
      data: file,
      createdAt: Date.now(),
    };

    const request = store.put(record);

    request.onsuccess = () => {
      // Create lightweight Blob URL for immediate playback
      const objectUrl = URL.createObjectURL(file);
      resolve(objectUrl);
    };

    request.onerror = () => reject(request.error);
  });
}

export async function getVideoFile(id: string): Promise<File | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        if (request.result && request.result.data) {
          resolve(request.result.data as File);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}
