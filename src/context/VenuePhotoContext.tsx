import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { getAllVenuePhotos, saveVenuePhoto, clearVenuePhotos, deleteVenuePhoto } from '../utils/photoStorage';
import { VENUE_PHOTO_SLOTS, VenuePhotoSlot } from '../data/venuePhotoSlots';
import { VENUE_SNIPPETS } from '../data/spaData';
import { VENUE_IMAGES } from '../data/venueImages';
import { VenueSnippet } from '../types';
import savedVenueConfig from '../data/savedVenueConfig.json';

const STORAGE_ENABLED_KEY = 'the_pearl_enabled_slots_v1';
const STORAGE_CUSTOM_SLOTS_KEY = 'the_pearl_custom_slots_v1';
const STORAGE_SLOT_ORDER_KEY = 'the_pearl_slot_order_v1';

export interface VenuePhotoContextType {
  photos: Record<string, string>;
  getPhoto: (slotId: string, fallbackDefault?: string) => string;
  updatePhoto: (slotId: string, dataUrl: string) => Promise<void>;
  bulkUpdatePhotos: (filesMap: Record<string, string>) => Promise<void>;
  resetPhotos: () => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  slots: VenuePhotoSlot[];
  allSlots: VenuePhotoSlot[];
  enabledSlotIds: string[];
  toggleSlotVisibility: (slotId: string, enabled?: boolean) => void;
  isSlotEnabled: (slotId: string) => boolean;
  addCustomPhoto: (title: string, dataUrl: string, badge?: string) => Promise<string>;
  removeCustomPhoto: (slotId: string) => Promise<void>;
  reorderSlots: (orderedIds: string[]) => void;
  movingSnippets: VenueSnippet[];
  hasCustomPhotos: boolean;
  activeMovingCount: number;
  bakePhotosToProject: () => Promise<{ success: boolean; message: string; savedCount?: number }>;
  isBaking: boolean;
  bakeResult: { success: boolean | null; message: string } | null;
  lastBakedAt: string | null;
}

const VenuePhotoContext = createContext<VenuePhotoContextType | undefined>(undefined);

export const VenuePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isBaking, setIsBaking] = useState<boolean>(false);
  const [bakeResult, setBakeResult] = useState<{ success: boolean | null; message: string } | null>(null);
  const [lastBakedAt, setLastBakedAt] = useState<string | null>(
    (savedVenueConfig as any).lastBakedAt || null
  );

  // Custom slots added dynamically by user - fallback to saved baked config
  const [customSlots, setCustomSlots] = useState<VenuePhotoSlot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_SLOTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ((savedVenueConfig as any).customSlots as VenuePhotoSlot[]) || [];
  });

  // Ordered list of slot IDs - fallback to saved baked config
  const [slotOrder, setSlotOrder] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SLOT_ORDER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ((savedVenueConfig as any).slotOrder as string[]) || VENUE_PHOTO_SLOTS.map((s) => s.id);
  });

  // Enabled slots for the moving carousel - fallback to saved baked config
  const [enabledSlotIds, setEnabledSlotIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ENABLED_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ((savedVenueConfig as any).enabledSlotIds as string[]) || VENUE_PHOTO_SLOTS.map((s) => s.id);
  });

  useEffect(() => {
    getAllVenuePhotos().then((stored) => {
      setPhotos(stored || {});
      setLoaded(true);
    });

    // Discrete owner access via ?admin=venue in URL
    if (typeof window !== 'undefined' && window.location.search.includes('admin=venue')) {
      setIsModalOpen(true);
    }

    // Owner keyboard shortcut (Alt + V or Ctrl + Shift + V)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'v') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'v')) {
        e.preventDefault();
        setIsModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save custom slots to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_SLOTS_KEY, JSON.stringify(customSlots));
    } catch {
      // ignore
    }
  }, [customSlots]);

  // Save enabled slots to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ENABLED_KEY, JSON.stringify(enabledSlotIds));
    } catch {
      // ignore
    }
  }, [enabledSlotIds]);

  // Save slot order
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SLOT_ORDER_KEY, JSON.stringify(slotOrder));
    } catch {
      // ignore
    }
  }, [slotOrder]);

  // Combined slots (defaults + custom)
  const allSlots = useMemo(() => {
    const defaultAndCustom = [...VENUE_PHOTO_SLOTS, ...customSlots];
    // Reorder according to slotOrder if present
    return defaultAndCustom.sort((a, b) => {
      const idxA = slotOrder.indexOf(a.id);
      const idxB = slotOrder.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.slotNumber - b.slotNumber;
    });
  }, [customSlots, slotOrder]);

  const getPhoto = (slotId: string, fallbackDefault?: string): string => {
    if (photos[slotId]) {
      return photos[slotId];
    }
    if (VENUE_IMAGES[slotId]) {
      return VENUE_IMAGES[slotId];
    }
    const slot = allSlots.find((s) => s.id === slotId);
    if (slot) {
      return fallbackDefault || slot.defaultSrc;
    }
    return fallbackDefault || VENUE_IMAGES.lounge;
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

  const isSlotEnabled = (slotId: string): boolean => {
    return enabledSlotIds.includes(slotId);
  };

  const toggleSlotVisibility = (slotId: string, enabled?: boolean) => {
    setEnabledSlotIds((prev) => {
      const willEnable = enabled !== undefined ? enabled : !prev.includes(slotId);
      if (willEnable) {
        return prev.includes(slotId) ? prev : [...prev, slotId];
      } else {
        // Prevent disabling all photos (keep at least 1)
        if (prev.length <= 1 && prev.includes(slotId)) return prev;
        return prev.filter((id) => id !== slotId);
      }
    });
  };

  const addCustomPhoto = async (
    title: string,
    dataUrl: string,
    badge = 'Custom View'
  ): Promise<string> => {
    const newId = `custom_${Date.now()}`;
    const newSlot: VenuePhotoSlot = {
      id: newId,
      slotNumber: allSlots.length + 1,
      label: title,
      exactFileName: `${title.toLowerCase().replace(/\s+/g, '_')}.jpg`,
      fileMatcher: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      description: `Custom photo view: ${title}`,
      defaultSrc: dataUrl,
      badge,
    };

    await saveVenuePhoto(newId, dataUrl);
    setPhotos((prev) => ({ ...prev, [newId]: dataUrl }));
    setCustomSlots((prev) => [...prev, newSlot]);
    setSlotOrder((prev) => [...prev, newId]);
    setEnabledSlotIds((prev) => [...prev, newId]);
    return newId;
  };

  const removeCustomPhoto = async (slotId: string): Promise<void> => {
    await deleteVenuePhoto(slotId);
    setPhotos((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
    setCustomSlots((prev) => prev.filter((s) => s.id !== slotId));
    setSlotOrder((prev) => prev.filter((id) => id !== slotId));
    setEnabledSlotIds((prev) => prev.filter((id) => id !== slotId));
  };

  const reorderSlots = (orderedIds: string[]) => {
    setSlotOrder(orderedIds);
  };

  const resetPhotos = async (): Promise<void> => {
    await clearVenuePhotos();
    setPhotos({});
    setCustomSlots([]);
    try {
      localStorage.removeItem(STORAGE_CUSTOM_SLOTS_KEY);
      localStorage.removeItem(STORAGE_ENABLED_KEY);
      localStorage.removeItem(STORAGE_SLOT_ORDER_KEY);
    } catch {
      // ignore
    }
    const defaultIds = VENUE_PHOTO_SLOTS.map((s) => s.id);
    setEnabledSlotIds(defaultIds);
    setSlotOrder(defaultIds);
  };

  // Build the live list of moving snippets for the Hero carousel
  const movingSnippets = useMemo<VenueSnippet[]>(() => {
    const activeSlots = allSlots.filter((slot) => enabledSlotIds.includes(slot.id));
    if (activeSlots.length === 0) {
      return VENUE_SNIPPETS;
    }

    return activeSlots.map((slot, index) => {
      const originalSnippet = VENUE_SNIPPETS.find((s) => s.id === slot.id);
      const activeImage = getPhoto(slot.id, slot.defaultSrc);

      if (originalSnippet) {
        return {
          ...originalSnippet,
          videoLabel: `View ${index + 1} • ${slot.badge}`,
          image: activeImage,
        };
      }

      // Dynamic snippet for custom uploaded slots
      return {
        id: slot.id,
        title: slot.label,
        subtitle: `Custom Venue View • ${slot.badge}`,
        image: activeImage,
        badge: slot.badge,
        videoLabel: `View ${index + 1} • ${slot.badge}`,
        description: slot.description || `Custom synchronized photo view at The Pearl Wellness Spa.`,
        highlights: [
          'Authentic real venue photo',
          'Private, peaceful wellness atmosphere',
          'Custom curated client view',
          '112 Genl Beyers Street, Welgelen, Polokwane',
        ],
      };
    });
  }, [allSlots, enabledSlotIds, photos]);

  // Bake photos directly to project files on the server (for permanent deployment)
  const bakePhotosToProject = async (): Promise<{ success: boolean; message: string; savedCount?: number }> => {
    setIsBaking(true);
    try {
      const res = await fetch('/api/save-synced-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photos,
          enabledSlotIds,
          customSlots,
          slotOrder,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBakeResult({ success: true, message: data.message });
        setLastBakedAt(new Date().toISOString());
        setIsBaking(false);
        return { success: true, message: data.message, savedCount: data.savedCount };
      } else {
        throw new Error(data.error || 'Failed to bake photos into project');
      }
    } catch (err: any) {
      const msg = err?.message || 'Unable to connect to server to bake photos.';
      setBakeResult({ success: false, message: msg });
      setIsBaking(false);
      return { success: false, message: msg };
    }
  };

  const hasCustomPhotos = Object.keys(photos).length > 0 || customSlots.length > 0;

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
        allSlots,
        enabledSlotIds,
        toggleSlotVisibility,
        isSlotEnabled,
        addCustomPhoto,
        removeCustomPhoto,
        reorderSlots,
        movingSnippets,
        hasCustomPhotos,
        activeMovingCount: movingSnippets.length,
        bakePhotosToProject,
        isBaking,
        bakeResult,
        lastBakedAt,
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
