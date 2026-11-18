import React, { createContext, useContext, useState, useMemo } from 'react';
import { VENUE_PHOTO_SLOTS, VenuePhotoSlot } from '../data/venuePhotoSlots';
import { VENUE_IMAGES, HERO_FEATURED_IMAGES } from '../data/venueImages';
import { EXPERIENCE_ITEMS } from '../data/experiencesData';
import { channelPhoto3 } from '../data/therapistImages';
import savedSiteMediaRaw from '../data/savedSiteMedia.json';
import { VenueSnippet } from '../types';
import {
  PersistedSiteMedia,
  HeroSlideConfig,
  CustomVenueSlotConfig,
} from '../utils/mediaStorage';

const BAKED_MEDIA = savedSiteMediaRaw as PersistedSiteMedia;

const DEFAULT_HERO_SLIDES: HeroSlideConfig[] = [
  { id: 'hero-1', image: VENUE_IMAGES['room-1'], isPortrait: false, label: 'Hero Slide 1' },
  { id: 'hero-2', image: VENUE_IMAGES['room-1-ensuite'], isPortrait: false, label: 'Hero Slide 2' },
  { id: 'hero-3', image: VENUE_IMAGES['pool-lapa'], isPortrait: false, label: 'Hero Slide 3' },
  { id: 'hero-4', image: VENUE_IMAGES['room-4-footscrub'], isPortrait: false, label: 'Hero Slide 4' },
  { id: 'hero-5', image: HERO_FEATURED_IMAGES[0], isPortrait: true, label: 'Hero Slide 5' },
  { id: 'hero-6', image: HERO_FEATURED_IMAGES[1], isPortrait: true, label: 'Hero Slide 6' },
  { id: 'hero-7', image: HERO_FEATURED_IMAGES[2], isPortrait: true, label: 'Hero Slide 7' },
  { id: 'hero-8', image: channelPhoto3, isPortrait: true, label: 'Hero Slide 8' },
];

export interface VenuePhotoContextType {
  getPhoto: (slotId: string, fallbackDefault?: string) => string;
  allSlots: VenuePhotoSlot[];
  enabledSlotIds: string[];
  movingSnippets: VenueSnippet[];
  heroSlides: HeroSlideConfig[];
  experiencePhotos: Record<string, string>;
  getExperiencePhoto: (id: string, fallback: string) => string;
}

const VenuePhotoContext = createContext<VenuePhotoContextType | undefined>(undefined);

export const VenuePhotoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroSlides] = useState<HeroSlideConfig[]>(
    Array.isArray(BAKED_MEDIA.heroSlides) && BAKED_MEDIA.heroSlides.length > 0
      ? BAKED_MEDIA.heroSlides
      : DEFAULT_HERO_SLIDES
  );
  const [experiencePhotos] = useState<Record<string, string>>(
    BAKED_MEDIA.experiencePhotos && typeof BAKED_MEDIA.experiencePhotos === 'object'
      ? BAKED_MEDIA.experiencePhotos
      : {}
  );
  const [venuePhotos] = useState<Record<string, string>>(
    BAKED_MEDIA.venuePhotos && typeof BAKED_MEDIA.venuePhotos === 'object'
      ? BAKED_MEDIA.venuePhotos
      : {}
  );
  const [customVenueSlots] = useState<CustomVenueSlotConfig[]>(
    Array.isArray(BAKED_MEDIA.customVenueSlots) ? BAKED_MEDIA.customVenueSlots : []
  );
  const [enabledSlotIds] = useState<string[]>(
    Array.isArray(BAKED_MEDIA.enabledSlotIds) && BAKED_MEDIA.enabledSlotIds.length > 0
      ? BAKED_MEDIA.enabledSlotIds
      : VENUE_PHOTO_SLOTS.map((s) => s.id)
  );

  const allSlots = useMemo<VenuePhotoSlot[]>(() => {
    const convertedCustom: VenuePhotoSlot[] = customVenueSlots.map((cs, i) => ({
      id: cs.id,
      slotNumber: VENUE_PHOTO_SLOTS.length + i + 1,
      label: cs.label || `Suite View ${i + 1}`,
      exactFileName: `${cs.id}.jpg`,
      fileMatcher: /$^/,
      description: cs.description || 'Private sanctuary view.',
      defaultSrc: cs.defaultSrc,
      badge: cs.badge || 'Venue View',
    }));
    return [...VENUE_PHOTO_SLOTS, ...convertedCustom];
  }, [customVenueSlots]);

  const getPhoto = (slotId: string, fallbackDefault?: string): string => {
    if (venuePhotos[slotId]) {
      return venuePhotos[slotId];
    }
    const slot = allSlots.find((s) => s.id === slotId);
    if (slot && slot.defaultSrc) {
      return slot.defaultSrc;
    }
    if (VENUE_IMAGES[slotId]) {
      return VENUE_IMAGES[slotId];
    }
    return fallbackDefault || VENUE_IMAGES.champagne;
  };

  const getExperiencePhoto = (id: string, fallback: string): string => {
    if (experiencePhotos[id]) {
      return experiencePhotos[id];
    }
    const matched = EXPERIENCE_ITEMS.find((e) => e.id === id);
    return matched?.defaultImage || fallback;
  };

  const movingSnippets = useMemo<VenueSnippet[]>(() => {
    const active = allSlots.filter((s) => enabledSlotIds.includes(s.id));
    const list = active.length > 0 ? active : allSlots;
    return list.map((slot, index) => ({
      id: slot.id,
      title: slot.label,
      subtitle: '',
      image: getPhoto(slot.id, slot.defaultSrc),
      badge: slot.badge,
      videoLabel: `View ${index + 1}`,
      description: '',
      highlights: [],
    }));
  }, [allSlots, enabledSlotIds, venuePhotos]);

  return (
    <VenuePhotoContext.Provider
      value={{
        getPhoto,
        allSlots,
        enabledSlotIds,
        movingSnippets,
        heroSlides,
        experiencePhotos,
        getExperiencePhoto,
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
