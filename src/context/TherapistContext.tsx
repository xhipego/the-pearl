import React, { createContext, useContext, useState } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';
import { THERAPIST_IMAGES, DEFAULT_GROUP_PHOTOS } from '../data/therapistImages';

export function normalizeTherapistPhotos(therapist: any): string[] {
  if (!therapist) return [];
  const base = INITIAL_THERAPISTS.find((t) => t.id === therapist.id);
  const basePhotos = base?.photos || (therapist.id && (THERAPIST_IMAGES as any)[therapist.id]) || [];

  const rawPhotos = Array.isArray(therapist.photos) && therapist.photos.length > 0
    ? therapist.photos.filter((p: any) => typeof p === 'string' && p.trim() !== '')
    : [];

  const photos: string[] = [];
  for (let idx = 0; idx < 5; idx++) {
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
  getVisibleLadyPhotos: (therapist: Therapist) => { src: string; originalIndex: number }[];
  groupPhotos: string[];
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

export const TherapistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  const getVisibleLadyPhotos = (therapist: Therapist): { src: string; originalIndex: number }[] => {
    const normalized = normalizeTherapistPhotos(therapist);
    return normalized.map((src, originalIndex) => ({ src, originalIndex }));
  };

  return (
    <TherapistContext.Provider
      value={{
        therapists: INITIAL_THERAPISTS,
        selectedTherapist,
        setSelectedTherapist,
        getVisibleLadyPhotos,
        groupPhotos: DEFAULT_GROUP_PHOTOS,
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
