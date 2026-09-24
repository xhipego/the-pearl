import React, { createContext, useContext, useState, useEffect } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';

// Key bumped to v4 for Bliss, Faith, KitKate lineup
const STORAGE_KEY = 'thepearl_therapists_v4';

interface TherapistContextType {
  therapists: Therapist[];
  updateTherapistPhoto: (id: string, newImage: string) => void;
  updateTherapistPhotos: (id: string, photos: string[]) => void;
  updateTherapist: (updatedTherapist: Therapist) => void;
  addTherapist: (newTherapist: Therapist) => void;
  deleteTherapist: (id: string) => void;
  resetToDefaults: () => void;
  hasCustomizations: boolean;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

// Helper to normalize photos to array of 4 items
export const normalizeTherapistPhotos = (therapist: Partial<Therapist>): string[] => {
  const base = INITIAL_THERAPISTS.find((t) => t.id === therapist.id);
  const existingPhotos = Array.isArray(therapist.photos) && therapist.photos.length > 0
    ? therapist.photos.filter(Boolean)
    : [];

  const basePhotos = base?.photos || [];
  const primaryImage = therapist.image || base?.image || '';

  const photos: string[] = [];

  // Slot 0 (Cover Photo)
  photos[0] = existingPhotos[0] || primaryImage || basePhotos[0] || '';

  // Slot 1 (Other Photo 1)
  photos[1] = existingPhotos[1] || basePhotos[1] || photos[0];

  // Slot 2 (Other Photo 2)
  photos[2] = existingPhotos[2] || basePhotos[2] || photos[0];

  // Slot 3 (Other Photo 3)
  photos[3] = existingPhotos[3] || basePhotos[3] || photos[0];

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
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('thepearl_therapists_v3') ||
        localStorage.getItem('thepearl_therapists_v2');

      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Take top 3 therapists (Bliss, Faith, KitKate)
          const slice3 = parsed.slice(0, 3);
          return slice3.map((item: any, idx: number) => {
            const { id, name } = mapToCanonicalNameAndId(item, idx);
            const base = INITIAL_THERAPISTS.find((t) => t.id === id) || INITIAL_THERAPISTS[idx];
            const photos = normalizeTherapistPhotos({ ...base, ...item, id });
            const coverImage = photos[0] || item.image || base?.image || '';

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

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('thepearl_therapists_v3') ||
        localStorage.getItem('thepearl_therapists_v2');
      setHasCustomizations(Boolean(stored));
    } catch {
      // ignore
    }
  }, [therapists]);

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
      t.id === updatedTherapist.id ? { ...updatedTherapist, vipHostess: true, availableToday: true, featured: true } : t
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
