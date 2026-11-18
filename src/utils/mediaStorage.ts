// Persistent browser media storage (IndexedDB) + image compression helper
// Allows editing Hero, Group, Experience, Venue, and Lady photos without hitting localStorage quota limits.

const DB_NAME = 'the_pearl_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'media_store';
const STORE_KEY = 'site_media_v1';

export interface HeroSlideConfig {
  id: string;
  image: string;
  isPortrait?: boolean;
  label?: string;
}

export interface CustomVenueSlotConfig {
  id: string;
  label: string;
  defaultSrc: string;
  badge: string;
  description?: string;
}

export interface PersistedSiteMedia {
  heroSlides?: HeroSlideConfig[];
  groupPhotos?: (string | null)[];
  experiencePhotos?: Record<string, string>;
  venuePhotos?: Record<string, string>;
  customVenueSlots?: CustomVenueSlotConfig[];
  enabledSlotIds?: string[];
  therapistPhotos?: Record<string, (string | null)[]>;
  updatedAt?: string;
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB'));
  });
}

export async function loadPersistedMedia(): Promise<PersistedSiteMedia | null> {
  try {
    const db = await openMediaDb();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(STORE_KEY);
      req.onsuccess = () => resolve((req.result as PersistedSiteMedia) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? (JSON.parse(raw) as PersistedSiteMedia) : null;
    } catch {
      return null;
    }
  }
}

export async function savePersistedMedia(data: PersistedSiteMedia): Promise<PersistedSiteMedia> {
  const payload: PersistedSiteMedia = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  let resolvedPayload = payload;

  // Sync base64 images to permanent repo files on disk (/public/images/saved & savedSiteMedia.json)
  try {
    const res = await fetch('/api/save-media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const json = (await res.json()) as { saved?: boolean; media?: PersistedSiteMedia };
      if (json.saved && json.media) {
        resolvedPayload = json.media;
      }
    }
  } catch {
    // Expected in static-only deployments
  }

  try {
    const db = await openMediaDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(resolvedPayload, STORE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(resolvedPayload));
    } catch {
      // Ignore quota errors if fallback localStorage is full
    }
  }

  return resolvedPayload;
}

let inFlightRepoSync: Promise<PersistedSiteMedia | null> | null = null;

function containsDataUrls(obj: unknown): boolean {
  if (!obj) return false;
  if (typeof obj === 'string') return obj.startsWith('data:image/');
  if (Array.isArray(obj)) return obj.some(containsDataUrls);
  if (typeof obj === 'object') {
    return Object.values(obj as Record<string, unknown>).some(containsDataUrls);
  }
  return false;
}

export async function syncIndexedDbToRepoIfNeeded(): Promise<PersistedSiteMedia | null> {
  if (inFlightRepoSync) return inFlightRepoSync;

  inFlightRepoSync = (async () => {
    const saved = await loadPersistedMedia();
    if (!saved) return null;

    if (containsDataUrls(saved)) {
      return await savePersistedMedia(saved);
    }

    return saved;
  })();

  return inFlightRepoSync;
}

export async function compressImageFile(
  file: File,
  maxDimension = 1600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onerror = () => resolve(dataUrl);
      img.onload = () => {
        const { width, height } = img;
        if (width <= maxDimension && height <= maxDimension && file.size < 450_000) {
          resolve(dataUrl);
          return;
        }
        const scale = Math.min(1, maxDimension / Math.max(width, height));
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  });
}
