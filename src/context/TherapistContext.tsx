import React, { createContext, useContext, useState } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';

// Helper function required by TherapistModal and EditTherapistModal
export function normalizeTherapistPhotos(therapist: any): string[] {
  if (!therapist) return [];
  if (Array.isArray(therapist.photos) && therapist.photos.length > 0) {
    return therapist.photos.filter((p: any) => typeof p === 'string' && p.trim() !== '');
  }
  if (therapist.image && typeof therapist.image === 'string') {
    return [therapist.image];
  }
  return [];
}

interface TherapistContextType {
  therapists: Therapist[];
  selectedTherapist: Therapist | null;
  setSelectedTherapist: (therapist: Therapist | null) => void;
  hasCustomizations: boolean;
  updateTherapist: (updatedTherapist: Therapist) => void;
  resetTherapists: () => void;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

export const TherapistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [therapists, setTherapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  const updateTherapist = (updatedTherapist: Therapist) => {
    setTherapists((prev) =>
      prev.map((t) => (t.id === updatedTherapist.id ? updatedTherapist : t))
    );
  };

  const resetTherapists = () => {
    setTherapists(INITIAL_THERAPISTS);
  };

  return (
    <TherapistContext.Provider
      value={{
        therapists,
        selectedTherapist,
        setSelectedTherapist,
        hasCustomizations: false,
        updateTherapist,
        resetTherapists,
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
