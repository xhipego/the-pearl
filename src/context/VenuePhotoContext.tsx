import React, { createContext, useContext, useMemo } from 'react';
import { VENUE_PHOTO_SLOTS, VenuePhotoSlot } from '../data/venuePhotoSlots';
import { VENUE_IMAGES } from '../data/venueImages';
import { VenueSnippet } from '../types';

export interface VenuePhotoContextType {
  getPhoto: (slotId: string, fallbackDefault?: string) => string;
  allSlots: VenuePhotoSlot[];
  enabledSlotIds: string[];
  movingSnippets: VenueSnippet[];
}

const VenuePhotoContext = createContext<VenuePhotoContextType | undefined>(undefined);

export const VenuePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const enabledSlotIds = useMemo(() => VENUE_PHOTO_SLOTS.map((s) => s.id), []);

  const getPhoto = (slotId: string, fallbackDefault?: string): string => {
    if (VENUE_IMAGES[slotId]) {
      return VENUE_IMAGES[slotId];
    }
    const slot = VENUE_PHOTO_SLOTS.find((s) => s.id === slotId);
    if (slot && slot.defaultSrc) {
      return slot.defaultSrc;
    }
    return fallbackDefault || VENUE_IMAGES.champagne;
  };

  const movingSnippets = useMemo<VenueSnippet[]>(() => {
    return VENUE_PHOTO_SLOTS.map((slot, index) => ({
      id: slot.id,
      title: slot.label,
      subtitle: '',
      image: getPhoto(slot.id, slot.defaultSrc),
      badge: slot.badge,
      videoLabel: `View ${index + 1}`,
      description: '',
      highlights: [],
    }));
  }, []);

  return (
    <VenuePhotoContext.Provider
      value={{
        getPhoto,
        allSlots: VENUE_PHOTO_SLOTS,
        enabledSlotIds,
        movingSnippets,
      }}
    >
      {children}
    </VenuePhotoContext.Provider>
  );
};

export const useVenuePhotos = (): VenuePhotoContextType => {
  const context = useContext(VenuePhotoContext);
  if (!context) {
    throw new Error('useVenuePhotos must be used within a VenuePhotoProvider');
  }
  return context;
};
