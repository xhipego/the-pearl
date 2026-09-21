import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAllVenuePhotos, saveVenuePhoto, clearVenuePhotos } from '../utils/photoStorage';
import { VENUE_PHOTO_SLOTS, VenuePhotoSlot } from '../data/venuePhotoSlots';

interface VenuePhotoContextType {
  photos: Record<string, string>;
  getPhoto: (slotId: string, fallbackDefault?: string) => string;
  updatePhoto: (slotId: string, dataUrl: string) => Promise<void>;
  bulkUpdatePhotos: (filesMap: Record<string, string>) => Promise<void>;
  resetPhotos: () => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  slots: VenuePhotoSlot[];
  hasCustomPhotos: boolean;
}

const VenuePhotoContext = createContext<VenuePhotoContextType | undefined>(undefined);

export const VenuePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getAllVenuePhotos().then((stored) => {
      setPhotos(stored || {});
      setLoaded(true);
    });

    // Discrete owner access via ?admin=venue in URL
    if (typeof window !== 'undefined' && window.location.search.includes('admin=venue')) {
      setIsModalOpen(true);
    }

    // Discrete owner keyboard shortcut (Alt + V or Ctrl + Shift + V)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'v') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v')) {
        e.preventDefault();
        setIsModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getPhoto = (slotId: string, fallbackDefault?: string): string => {
    if (photos[slotId]) {
      return photos[slotId];
    }
    const slot = VENUE_PHOTO_SLOTS.find((s) => s.id === slotId);
    if (slot) {
      return fallbackDefault || slot.defaultSrc;
    }
    return fallbackDefault || '/images/venue_grand_lounge.jpg';
  };

  const updatePhoto = async (slotId: string, dataUrl: string): Promise<void> => {
    await saveVenuePhoto(slotId, dataUrl);
    setPhotos((prev) => ({ ...prev, [slotId]: dataUrl }));
  };

  const bulkUpdatePhotos = async (filesMap: Record<string, string>): Promise<void> => {
    for (const [slotId, dataUrl] of Object.entries(filesMap)) {
      await saveVenuePhoto(slotId, dataUrl);
    }
    setPhotos((prev) => ({ ...prev, ...filesMap }));
  };

  const resetPhotos = async (): Promise<void> => {
    await clearVenuePhotos();
    setPhotos({});
  };

  const hasCustomPhotos = Object.keys(photos).length > 0;

  return (
    <VenuePhotoContext.Provider
      value={{
        photos,
        getPhoto,
        updatePhoto,
        bulkUpdatePhotos,
        resetPhotos,
        isModalOpen,
        setIsModalOpen,
        slots: VENUE_PHOTO_SLOTS,
        hasCustomPhotos,
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
