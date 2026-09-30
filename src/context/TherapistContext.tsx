import React, { createContext, useContext, useState, useEffect } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';
import { THERAPIST_IMAGES } from '../data/therapistImages';

const STORAGE_KEY = 'thepearl_therapists_v15';

// Helper function required by TherapistModal and EditTherapistModal
export function normalizeTherapistPhotos(therapist: any): string[] {
  if (!therapist) return [];
  const base = INITIAL_THERAPISTS.find((t) => t.id === therapist.id);
  const basePhotos = base?.photos || (therapist.id && (THERAPIST_IMAGES as any)[therapist.id]) || [];

  const rawPhotos = Array.isArray(therapist.photos) && therapist.photos.length > 0
    ? therapist.photos.filter((p: any) => typeof p === 'string' && p.trim() !== '')
    : [];

  const photos: string[] = [];
  for (let idx = 0; idx < 4; idx++) {
    const raw = rawPhotos[idx];
    if (typeof raw === 'string' && raw.trim().length > 0) {
      photos[idx] = raw;
    } else {
      photos[idx] = basePhotos[idx] || basePhotos[0] || (therapist.image || '');
    }
  }

  if (!photos[0]) {
    photos[0] = therapist.image || basePhotos[0] || '';
  }

  return photos;
}

interface TherapistContextType {
  therapists: Therapist[];
  selectedTherapist: Therapist | null;
  setSelectedTherapist: (therapist: Therapist | null) => void;
  updateTherapistPhoto: (id: string, newImage: string) => void;
  updateTherapistPhotos: (id: string, photos: string[]) => void;
  updateTherapist: (updatedTherapist: Therapist) => void;
  addTherapist: (newTherapist: Therapist) => void;
  deleteTherapist: (id: string) => void;
  resetTherapists: () => void;
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
  isEditModalOpen: boolean;
  editingTherapist: Therapist | null;
  openEditModal: (therapistOrId?: Therapist | string) => void;
  closeEditModal: () => void;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

export const TherapistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [therapists, setTherapists] = useState<Therapist[]>(() => {
    if (typeof window === 'undefined') return INITIAL_THERAPISTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read cached therapists from localStorage:', e);
    }
    return INITIAL_THERAPISTS;
  });

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [hasCustomizations, setHasCustomizations] = useState(false);
  const [isBaking, setIsBaking] = useState(false);
  const [bakeResult, setBakeResult] = useState<{ success: boolean; message: string } | null>(null);

  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [activeAttachTherapistId, setActiveAttachTherapistId] = useState<string>('barbie');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTherapist, setEditingTherapist] = useState<Therapist | null>(null);

  const openAttachPhotosModal = (therapistId?: string) => {
    if (therapistId) {
      const match = therapists.find((t) => t.id.toLowerCase() === therapistId.toLowerCase());
      if (match) {
        setActiveAttachTherapistId(match.id);
      } else {
        setActiveAttachTherapistId(therapistId);
      }
    } else {
      setActiveAttachTherapistId('barbie');
    }
    setIsAttachModalOpen(true);
  };

  const closeAttachPhotosModal = () => {
    setIsAttachModalOpen(false);
  };

  const openEditModal = (therapistOrId?: Therapist | string) => {
    let targetId = 'barbie';
    if (typeof therapistOrId === 'string' && therapistOrId.trim()) {
      targetId = therapistOrId.trim().toLowerCase();
    } else if (therapistOrId && typeof therapistOrId === 'object' && therapistOrId.id) {
      targetId = therapistOrId.id.toLowerCase();
    }

    const found =
      therapists.find((t) => t.id.toLowerCase() === targetId) ||
      (typeof therapistOrId === 'object' ? therapistOrId : null) ||
      therapists[0];

    setEditingTherapist(found ? { ...found } : null);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTherapist(null);
  };

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

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      setHasCustomizations(Boolean(stored));
    } catch (err) {
      console.warn('Storage check failed:', err);
    }

    if (
      typeof window !== 'undefined' &&
      (window.location.search.includes('admin=girls') ||
        window.location.search.includes('admin=hostesses') ||
        window.location.search.includes('admin=therapists'))
    ) {
      setIsOwnerModalOpen(true);
    }
  }, []);

  const saveTherapists = (updated: Therapist[]) => {
    const normalized = updated.map((t) => {
      const photos = normalizeTherapistPhotos(t);
      return {
        ...t,
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
    const targetId = updatedTherapist.id.toLowerCase();
    const cleanUpdated: Therapist = {
      ...updatedTherapist,
      name: updatedTherapist.name.trim(),
      lookDescription: updatedTherapist.lookDescription?.trim() || '',
      bio: updatedTherapist.bio?.trim() || '',
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
      ...therapists,
      { ...newTherapist, vipHostess: true, availableToday: true, featured: true },
    ];
    saveTherapists(updated);
  };

  const deleteTherapist = (id: string) => {
    const updated = therapists.filter((t) => t.id !== id);
    saveTherapists(updated);
  };

  const resetTherapists = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setTherapists(INITIAL_THERAPISTS);
    setHasCustomizations(false);
  };

  const resetToDefaults = () => {
    resetTherapists();
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
        selectedTherapist,
        setSelectedTherapist,
        updateTherapistPhoto,
        updateTherapistPhotos,
        updateTherapist,
        addTherapist,
        deleteTherapist,
        resetTherapists,
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
