import React, { createContext, useContext, useState } from 'react';
import { Therapist } from '../types';
import { THERAPISTS as INITIAL_THERAPISTS } from '../data/therapists';

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
