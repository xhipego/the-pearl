import React, { createContext, useContext, useState, useEffect } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';
import { THERAPIST_IMAGES } from '../data/therapistImages';

// Key bumped to v6 to flush any old stock/unsplash placeholders
const STORAGE_KEY = 'thepearl_therapists_v6';

interface TherapistContextType {
  therapists: Therapist[];
  updateTherapistPhoto: (id: string, newImage: string) => void;
  updateTherapistPhotos: (id: string, photos: string[]) => void;
  updateTherapist: (updatedTherapist: Therapist) => void;
  addTherapist: (newTherapist: Therapist) => void;
  deleteTherapist: (id: string) => void;
  resetToDefaults: () => void;
  hasCustomizations: boolean;
  bakePhotosToProject: (overrideTherapists?: Therapist[]) => Promise<{ success: boolean; message: string; savedCount?: number }>;
  isBaking: boolean;
  bakeResult: { success: boolean; message: string } | null;
  isOwnerModalOpen: boolean;
  setIsOwnerModalOpen: (open: boolean) => void;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

// Helper to normalize photos to array of 4 items with authentic default images
export const normalizeTherapistPhotos = (therapist: Partial<Therapist>): string[] => {
  const base = INITIAL_THERAPISTS.find((t) => t.id === therapist.id);
  const basePhotos = base?.photos || (therapist.id && THERAPIST_IMAGES[therapist.id]) || [];

  const rawPhotos = Array.isArray(therapist.photos) && therapist.photos.length > 0
    ? therapist.photos.filter(Boolean)
    : [];

  const photos: string[] = [];

  for (let idx = 0; idx < 4; idx++) {
    const raw = rawPhotos[idx];
    if (typeof raw === 'string' && raw.trim().length > 0 && !raw.includes('unsplash.com')) {
      photos[idx] = raw;
    } else {
      photos[idx] = basePhotos[idx] || basePhotos[0] || (therapist.id && THERAPIST_IMAGES[therapist.id]?.[idx]) || '';
    }
  }

  // Ensure cover photo is never empty
  if (!photos[0]) {
    photos[0] = therapist.image || base?.image || (therapist.id && THERAPIST_IMAGES[therapist.id]?.[0]) || '';
  }

  return photos;
};

const mapToCanonicalNameAndId = (item: any, index: number) => {
  const canonicalIds = ['bliss', 'faith', 'kitkate'];
  const canonicalNames = ['Bliss', 'Faith', 'KitKate'];

  let id = item.id;
  let name = item.name;

  if (id === 'chloe' || (!id && index === 0)) {
    id = 'bliss';
    if (!name || name === 'Chloe') name = 'Bliss';
  } else if (id === 'anastasia' || (!id && index === 1)) {
    id = 'faith';
    if (!name || name === 'Anastasia') name = 'Faith';
  } else if (id === 'isabella' || (!id && index === 2)) {
    id = 'kitkate';
    if (!name || name === 'Isabella') name = 'KitKate';
  }

  // If id is not in canonical and index < 3, map to canonical
  if (index < 3 && !canonicalIds.includes(id)) {
    id = canonicalIds[index];
    name = canonicalNames[index];
  }

  return { id, name };
};

export const TherapistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [therapists, setTherapists] = useState<Therapist[]>(() => {
    if (typeof window === 'undefined') return INITIAL_THERAPISTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const slice3 = parsed.slice(0, 3);
          return slice3.map((item: any, idx: number) => {
            const { id, name } = mapToCanonicalNameAndId(item, idx);
            const base = INITIAL_THERAPISTS.find((t) => t.id === id) || INITIAL_THERAPISTS[idx];
            const photos = normalizeTherapistPhotos({ ...base, ...item, id });
            const coverImage = photos[0];

            return {
              ...base,
              ...item,
              id,
              name,
              image: coverImage,
              photos,
              vipHostess: true,
              availableToday: true,
              featured: true,
              lookDescription: item.lookDescription || base?.lookDescription || '',
            };
          });
        }
      }
    } catch (e) {
      console.error('Failed to load therapists from storage', e);
    }
    return INITIAL_THERAPISTS;
  });

  const [hasCustomizations, setHasCustomizations] = useState<boolean>(false);
  const [isBaking, setIsBaking] = useState(false);
  const [bakeResult, setBakeResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

  // Bake photos directly to project files on the server
  const bakePhotosToProject = async (
    overrideTherapists?: Therapist[]
  ): Promise<{ success: boolean; message: string; savedCount?: number }> => {
    const listToBake = overrideTherapists || therapists;
    setIsBaking(true);
    try {
      const res = await fetch('/api/bake-therapist-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          therapists: listToBake,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.therapists && Array.isArray(data.therapists)) {
          setTherapists(data.therapists);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data.therapists));
          } catch {}
        }
        setBakeResult({ success: true, message: data.message });
        setIsBaking(false);
        return { success: true, message: data.message, savedCount: data.savedPhotoCount };
      } else {
        throw new Error(data.error || 'Failed to bake therapist photos into project files');
      }
    } catch (err: any) {
      const msg = err?.message || 'Unable to connect to server to bake photos.';
      setBakeResult({ success: false, message: msg });
      setIsBaking(false);
      return { success: false, message: msg };
    }
  };

  // Clean old storage versions and check for owner URL params
  useEffect(() => {
    try {
      // Clear out outdated keys that might contain unsplash links
      localStorage.removeItem('thepearl_therapists_v1');
      localStorage.removeItem('thepearl_therapists_v2');
      localStorage.removeItem('thepearl_therapists_v3');
      localStorage.removeItem('thepearl_therapists_v4');
      localStorage.removeItem('thepearl_therapists_v5');

      const stored = localStorage.getItem(STORAGE_KEY);
      setHasCustomizations(Boolean(stored));
    } catch (err) {
      console.warn('Storage check failed:', err);
    }

    // Owner shortcut: ?admin=girls or ?admin=hostesses in URL
    if (
      typeof window !== 'undefined' &&
      (window.location.search.includes('admin=girls') ||
        window.location.search.includes('admin=hostesses') ||
        window.location.search.includes('admin=therapists'))
    ) {
      setIsOwnerModalOpen(true);
    }

    // Owner keyboard shortcut (Alt + G or Ctrl + Shift + G for Girls)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.altKey && e.key.toLowerCase() === 'g') ||
        (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'g')
      ) {
        e.preventDefault();
        setIsOwnerModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const saveTherapists = (updated: Therapist[]) => {
    const normalized = updated.map((t) => {
      const photos = normalizeTherapistPhotos(t);
      return {
        ...t,
        photos,
        vipHostess: true,
        availableToday: true,
        featured: true,
        image: photos[0] || t.image,
      };
    });
    setTherapists(normalized);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
      setHasCustomizations(true);
    } catch (err) {
      console.error('Failed to save therapists to storage', err);
    }

    // Automatically trigger bake so files are instantly saved to disk
    bakePhotosToProject(normalized);
  };

  const updateTherapistPhoto = (id: string, newImage: string) => {
    const updated = therapists.map((t) => {
      if (t.id !== id) return t;
      const photos = [...(t.photos || [t.image])];
      photos[0] = newImage;
      return { ...t, image: newImage, photos };
    });
    saveTherapists(updated);
  };

  const updateTherapistPhotos = (id: string, photos: string[]) => {
    const updated = therapists.map((t) => {
      if (t.id !== id) return t;
      return { ...t, photos, image: photos[0] || t.image };
    });
    saveTherapists(updated);
  };

  const updateTherapist = (updatedTherapist: Therapist) => {
    const updated = therapists.map((t) =>
      t.id === updatedTherapist.id
        ? { ...updatedTherapist, vipHostess: true, availableToday: true, featured: true }
        : t
    );
    saveTherapists(updated);
  };

  const addTherapist = (newTherapist: Therapist) => {
    const updated = [
      { ...newTherapist, vipHostess: true, availableToday: true, featured: true },
      ...therapists,
    ];
    saveTherapists(updated);
  };

  const deleteTherapist = (id: string) => {
    const updated = therapists.filter((t) => t.id !== id);
    saveTherapists(updated);
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('thepearl_therapists_v5');
      localStorage.removeItem('thepearl_therapists_v4');
      localStorage.removeItem('thepearl_therapists_v3');
      localStorage.removeItem('thepearl_therapists_v2');
      localStorage.removeItem('thepearl_therapists_v1');
    } catch {
      // ignore
    }
    setTherapists(INITIAL_THERAPISTS);
    setHasCustomizations(false);
  };

  return (
    <TherapistContext.Provider
      value={{
        therapists,
        updateTherapistPhoto,
        updateTherapistPhotos,
        updateTherapist,
        addTherapist,
        deleteTherapist,
        resetToDefaults,
        hasCustomizations,
        bakePhotosToProject,
        isBaking,
        bakeResult,
        isOwnerModalOpen,
        setIsOwnerModalOpen,
      }}
    >
      {children}
    </TherapistContext.Provider>
  );
};

export const useTherapists = () => {
  const context = useContext(TherapistContext);
  if (!context) {
    throw new Error('useTherapists must be used within a TherapistProvider');
  }
  return context;
};
