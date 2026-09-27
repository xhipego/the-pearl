import React, { createContext, useContext, useState, useEffect } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';
import { THERAPIST_IMAGES } from '../data/therapistImages';

// Key bumped to v12: bundled hashed assets imported directly, fallback to THERAPIST_IMAGES
const STORAGE_KEY = 'thepearl_therapists_v12';

interface TherapistContextType {
  therapists: Therapist[];
  updateTherapistPhoto: (id: string, newImage: string) => void;
  updateTherapistPhotos: (id: string, photos: string[]) => void;
  updateTherapist: (updatedTherapist: Therapist) => void;
  addTherapist: (newTherapist: Therapist) => void;
  deleteTherapist: (id: string) => void;
  resetToDefaults: () => void;
  resetTherapistToDefaults: (id: string) => void;
  hasCustomizations: boolean;
  bakePhotosToProject: (overrideTherapists?: Therapist[]) => Promise<{ success: boolean; message: string; savedCount?: number }>;
  isBaking: boolean;
  bakeResult: { success: boolean; message: string } | null;
  isOwnerModalOpen: boolean;
  setIsOwnerModalOpen: (open: boolean) => void;
  isAttachModalOpen: boolean;
  activeAttachTherapistId: string;
  openAttachPhotosModal: (therapistId?: string) => void;
  closeAttachPhotosModal: () => void;
  setActiveAttachTherapistId: (id: string) => void;
  // Edit Profile Modal for Name, Description, Stats & Photos (Barbie & Kylie)
  isEditModalOpen: boolean;
  editingTherapist: Therapist | null;
  openEditModal: (therapistOrId?: Therapist | string) => void;
  closeEditModal: () => void;
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
    const isBrokenPath = typeof raw === 'string' && (raw.startsWith('/src/assets/') || raw.startsWith('/images/'));
    const isUnsplash = typeof raw === 'string' && raw.includes('unsplash.com');

    if (typeof raw === 'string' && raw.trim().length > 0 && !isBrokenPath && !isUnsplash) {
      photos[idx] = raw;
    } else {
      photos[idx] = basePhotos[idx] || (therapist.id && THERAPIST_IMAGES[therapist.id]?.[idx]) || basePhotos[0] || '';
    }
  }

  // Ensure cover photo is never empty
  if (!photos[0]) {
    photos[0] = basePhotos[0] || (therapist.id && THERAPIST_IMAGES[therapist.id]?.[0]) || '';
  }

  return photos;
};

const mapToCanonicalNameAndId = (item: any, index: number) => {
  let id = item.id;
  let name = item.name;

  if (id === 'amber') id = 'barbie';
  if (id === 'zara') id = 'kylie';
  if (name === 'Amber') name = 'Barbie';
  if (name === 'Zara') name = 'Kylie';

  const canonicalIds = ['bliss', 'faith', 'kitkate', 'barbie', 'kylie'];
  const canonicalNames = ['Bliss', 'Faith', 'KitKate', 'Barbie', 'Kylie'];

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

  // If index is within canonical range and id not set
  if (!id && index < canonicalIds.length) {
    id = canonicalIds[index];
    if (!name) name = canonicalNames[index];
  }

  // If name is not set, use canonical fallback
  if (!name && id) {
    const idx = canonicalIds.indexOf(id);
    if (idx !== -1) name = canonicalNames[idx];
  }

  return { id: id || `hostess_${index}`, name: name || 'Hostess' };
};

export const TherapistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [therapists, setTherapists] = useState<Therapist[]>(() => {
    if (typeof window === 'undefined') return INITIAL_THERAPISTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= 3) {
          const canonicalIds = ['bliss', 'faith', 'kitkate', 'barbie', 'kylie'];

          const loaded = canonicalIds.map((cId, idx) => {
            const base = INITIAL_THERAPISTS.find((t) => t.id === cId) || INITIAL_THERAPISTS[idx];
            // Find in parsed list, checking canonical id and legacy ids
            const storedItem = parsed.find(
              (p: any) =>
                p.id === cId ||
                (cId === 'barbie' && (p.id === 'amber' || p.name === 'Amber' || p.name === 'Barbie')) ||
                (cId === 'kylie' && (p.id === 'zara' || p.name === 'Zara' || p.name === 'Kylie'))
            );

            if (!storedItem) {
              return base;
            }

            const photos = normalizeTherapistPhotos({ ...base, ...storedItem, id: cId });
            const coverImage = photos[0] || storedItem.image || base.image;

            return {
              ...base,
              id: cId,
              name: base.name,
              eyes: base.eyes,
              lookDescription: base.lookDescription,
              bio: base.bio,
              age: base.age,
              height: base.height,
              bustOrBody: base.bustOrBody,
              specialties: base.specialties,
              languages: base.languages,
              photos,
              image: coverImage,
              vipHostess: true,
              availableToday: true,
              featured: true,
            };
          });

          // Ensure it's persisted in the current STORAGE_KEY
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(loaded));
          } catch {}

          return loaded;
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
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [activeAttachTherapistId, setActiveAttachTherapistId] = useState<string>('barbie');

  // Edit Profile Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(null);

  const openAttachPhotosModal = (therapistId?: string) => {
    let canonicalId = 'barbie';
    if (therapistId) {
      const lower = therapistId.toLowerCase();
      canonicalId = lower === 'kylie' || lower === 'zara' ? 'kylie' : 'barbie';
    }
    setActiveAttachTherapistId(canonicalId);
    setIsAttachModalOpen(true);
  };

  const closeAttachPhotosModal = () => {
    setIsAttachModalOpen(false);
  };

  const openEditModal = (therapistOrId?: Therapist | string) => {
    let targetId = 'kylie';
    if (typeof therapistOrId === 'string' && therapistOrId.trim()) {
      targetId = therapistOrId.trim().toLowerCase();
    } else if (therapistOrId && typeof therapistOrId === 'object' && therapistOrId.id) {
      targetId = therapistOrId.id.toLowerCase();
    }

    if (targetId === 'amber') targetId = 'barbie';
    if (targetId === 'zara') targetId = 'kylie';

    const found =
      therapists.find((t) => t.id.toLowerCase() === targetId) ||
      (typeof therapistOrId === 'object' ? therapistOrId : null) ||
      therapists.find((t) => t.id === 'kylie') ||
      therapists[0];

    setEditingTherapist(found ? { ...found } : null);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTherapist(null);
  };

  // Bake photos directly to project files on the server (if full-stack server is present)
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

      const contentType = res.headers.get('content-type') || '';
      if (!res.ok || !contentType.includes('application/json')) {
        setIsBaking(false);
        return { success: true, message: 'Saved successfully in local storage' };
      }

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
    } catch {
      setIsBaking(false);
      return { success: true, message: 'Saved successfully in local storage' };
    }
  };

  // Clean old storage versions up to v11, but NEVER delete active STORAGE_KEY (v12)
  useEffect(() => {
    try {
      localStorage.removeItem('thepearl_therapists_v1');
      localStorage.removeItem('thepearl_therapists_v2');
      localStorage.removeItem('thepearl_therapists_v3');
      localStorage.removeItem('thepearl_therapists_v4');
      localStorage.removeItem('thepearl_therapists_v5');
      localStorage.removeItem('thepearl_therapists_v6');
      localStorage.removeItem('thepearl_therapists_v7');
      localStorage.removeItem('thepearl_therapists_v8');
      localStorage.removeItem('thepearl_therapists_v9');
      localStorage.removeItem('thepearl_therapists_v10');
      localStorage.removeItem('thepearl_therapists_v11');

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
    const targetId = updatedTherapist.id.toLowerCase();
    const cleanUpdated: Therapist = {
      ...updatedTherapist,
      name: updatedTherapist.name.trim(),
      lookDescription: updatedTherapist.lookDescription.trim(),
      bio: updatedTherapist.bio.trim(),
      vipHostess: true,
      availableToday: true,
      featured: true,
    };

    const updated = therapists.map((t) =>
      t.id.toLowerCase() === targetId
        ? {
            ...t,
            ...cleanUpdated,
            id: t.id,
          }
        : t
    );
    saveTherapists(updated);
    setEditingTherapist(cleanUpdated);
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
      localStorage.removeItem('thepearl_therapists_v8');
      localStorage.removeItem('thepearl_therapists_v7');
      localStorage.removeItem('thepearl_therapists_v6');
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

  const resetTherapistToDefaults = (id: string) => {
    const defaultHostess = INITIAL_THERAPISTS.find((t) => t.id === id);
    if (!defaultHostess) return;
    const defaultPhotos = defaultHostess.photos || [defaultHostess.image];
    updateTherapistPhotos(id, defaultPhotos);
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
        resetTherapistToDefaults,
        hasCustomizations,
        bakePhotosToProject,
        isBaking,
        bakeResult,
        isOwnerModalOpen,
        setIsOwnerModalOpen,
        isAttachModalOpen,
        activeAttachTherapistId,
        openAttachPhotosModal,
        closeAttachPhotosModal,
        setActiveAttachTherapistId,
        isEditModalOpen,
        editingTherapist,
        openEditModal,
        closeEditModal,
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
