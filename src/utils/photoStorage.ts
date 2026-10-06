// Persistent Storage for Venue Photos using IndexedDB with fallback to localStorage

const DB_NAME = 'the_pearl_venue_db';
const STORE_NAME = 'venue_photos';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveVenuePhoto(slotId: string, dataUrl: string): Promise<void> {
  // 1. Synchronous localStorage persistence for instant, zero-delay retrieval
  try {
    localStorage.setItem(`venue_photo_${slotId}`, dataUrl);
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }

  // 2. IndexedDB persistence for large binary payloads
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, slotId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    // Already safely stored in localStorage
  }
}

export async function getVenuePhoto(slotId: string): Promise<string | null> {
  // Check localStorage first
  try {
    const local = localStorage.getItem(`venue_photo_${slotId}`);
    if (local) return local;
  } catch {}

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(slotId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function getAllVenuePhotos(): Promise<Record<string, string>> {
  const results: Record<string, string> = {};

  // 1. Gather all photos from localStorage
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('venue_photo_')) {
        const slotId = key.replace('venue_photo_', '');
        const val = localStorage.getItem(key);
        if (val) results[slotId] = val;
      }
    }
    const bulkJson = localStorage.getItem('the_pearl_venue_photos_v3');
    if (bulkJson) {
      const parsed = JSON.parse(bulkJson);
      if (parsed && typeof parsed === 'object') {
        Object.assign(results, parsed);
      }
    }
  } catch {}

  // 2. Overlay with IndexedDB if available
  try {
    const db = await openDB();
    const idbResults = await new Promise<Record<string, string>>((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      const res: Record<string, string> = {};
      req.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor) {
          res[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve(res);
        }
      };
      req.onerror = () => resolve({});
    });
    Object.assign(results, idbResults);
  } catch {}

  return results;
}

export async function clearVenuePhotos(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch {
    // fallback
  }
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('venue_photo_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch {
    // ignore
  }
}

export async function deleteVenuePhoto(slotId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(slotId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // fallback
  }
  try {
    localStorage.removeItem(`venue_photo_${slotId}`);
  } catch {
    // ignore
  }
}
