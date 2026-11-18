import React, { createContext, useContext, useState, useMemo } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';
import { THERAPIST_IMAGES, DEFAULT_GROUP_PHOTOS } from '../data/therapistImages';
import savedSiteMediaRaw from '../data/savedSiteMedia.json';
import { PersistedSiteMedia } from '../utils/mediaStorage';

const BAKED_MEDIA = savedSiteMediaRaw as PersistedSiteMedia;

export function normalizeTherapistPhotos(therapist: any): string[] {
  if (!therapist) return [];
  const base = INITIAL_THERAPISTS.find((t) => t.id === therapist.id);
  const basePhotos =
    base?.photos || (therapist.id && (THERAPIST_IMAGES as any)[therapist.id]) || [];

  const rawPhotos =
    Array.isArray(therapist.photos) && therapist.photos.length > 0
      ? therapist.photos
      : [];

  const photos: string[] = [];
  for (let idx = 0; idx < 5; idx++) {
    const raw = rawPhotos[idx];
    if (typeof raw === 'string' && raw.trim().length > 0) {
      photos[idx] = raw;
    } else {
      photos[idx] = basePhotos[idx] || basePhotos[0] || therapist.image || '';
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
  getVisibleLadyPhotos: (therapist: Therapist) => { src: string; originalIndex: number }[];
  groupPhotos: string[];
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

export const TherapistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [groupOverrides] = useState<(string | null)[]>(
    Array.isArray(BAKED_MEDIA.groupPhotos) && BAKED_MEDIA.groupPhotos.length > 0
      ? [
          BAKED_MEDIA.groupPhotos[0] || null,
          BAKED_MEDIA.groupPhotos[1] || null,
          BAKED_MEDIA.groupPhotos[2] || null,
        ]
      : [null, null, null]
  );
  const [ladyPhotoOverrides] = useState<Record<string, (string | null)[]>>(
    BAKED_MEDIA.therapistPhotos && typeof BAKED_MEDIA.therapistPhotos === 'object'
      ? BAKED_MEDIA.therapistPhotos
      : {}
  );

  const groupPhotos = useMemo(() => {
    return [0, 1, 2].map(
      (idx) => groupOverrides[idx] || DEFAULT_GROUP_PHOTOS[idx] || DEFAULT_GROUP_PHOTOS[0]
    );
  }, [groupOverrides]);

  const therapists = useMemo<Therapist[]>(() => {
    return INITIAL_THERAPISTS.map((base) => {
      const overrides = ladyPhotoOverrides[base.id];
      if (!overrides) return base;
      const mergedPhotos = base.photos.map((defPhoto, idx) => overrides[idx] || defPhoto);
      return {
        ...base,
        image: mergedPhotos[0] || base.image,
        photos: mergedPhotos,
      };
    });
  }, [ladyPhotoOverrides]);

  const getVisibleLadyPhotos = (
    therapist: Therapist
  ): { src: string; originalIndex: number }[] => {
    const normalized = normalizeTherapistPhotos(therapist);
    return normalized.map((src, originalIndex) => ({ src, originalIndex }));
  };

  return (
    <TherapistContext.Provider
      value={{
        therapists,
        selectedTherapist,
        setSelectedTherapist,
        getVisibleLadyPhotos,
        groupPhotos,
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
