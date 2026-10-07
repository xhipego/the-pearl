import { VENUE_IMAGES } from './venueImages';

export interface VenuePhotoSlot {
  id: string;
  slotNumber: number;
  label: string;
  exactFileName: string;
  fileMatcher: RegExp;
  description: string;
  defaultSrc: string;
  badge: string;
}

export const VENUE_PHOTO_SLOTS: VenuePhotoSlot[] = [
  {
    id: 'room-1',
    slotNumber: 1,
    label: 'Room 1 (The Baobab Executive Suite)',
    exactFileName: 'room_1.jpg',
    fileMatcher: /room[_\-\s]*1(?!\s*en-?suite)/i,
    description: 'Executive treatment suite with warm timber finishes, heated massage table, and ambient light.',
    defaultSrc: VENUE_IMAGES.champagne,
    badge: 'Room 1',
  },
  {
    id: 'room-1-ensuite',
    slotNumber: 2,
    label: 'Room 1 En-Suite Bathroom',
    exactFileName: 'room_1_ensuite.jpg',
    fileMatcher: /room[_\-\s]*1[_\-\s]*(en-?suite|bath)/i,
    description: 'En-suite bathroom with deep soaking bathtub, shower, and grooming amenities.',
    defaultSrc: VENUE_IMAGES['room-1-ensuite'],
    badge: 'Room 1 En-Suite',
  },
  {
    id: 'room-2-night',
    slotNumber: 3,
    label: 'Room 2 (Night Mode / Marula Room)',
    exactFileName: 'room_2_night.jpg',
    fileMatcher: /room[_\-\s]*2/i,
    description: 'Atmospheric evening night-mode lighting, therapeutic bed, and calming ambiance.',
    defaultSrc: VENUE_IMAGES.sapphire,
    badge: 'Room 2 (Night Mode)',
  },
  {
    id: 'room-3-couples',
    slotNumber: 4,
    label: 'Room 3 for Couples (The Mopane Suite)',
    exactFileName: 'room_3_couples.jpg',
    fileMatcher: /room[_\-\s]*3|couple/i,
    description: 'Two side-by-side massage tables for simultaneous shared relaxation.',
    defaultSrc: VENUE_IMAGES.atrium,
    badge: 'Room 3 (Couples)',
  },
  {
    id: 'room-4-footscrub',
    slotNumber: 5,
    label: 'Room 4 (Foot Scrub / Leadwood Room)',
    exactFileName: 'room_4_footscrub.jpg',
    fileMatcher: /room[_\-\s]*4(?!\s*en-?suite)|foot/i,
    description: 'Dedicated treatment chairs with warm soak basins and lower-leg therapy station.',
    defaultSrc: VENUE_IMAGES.lounge,
    badge: 'Room 4 (Foot Scrub)',
  },
  {
    id: 'room-4-ensuite',
    slotNumber: 6,
    label: 'Room 4 En-Suite Shower',
    exactFileName: 'room_4_ensuite_shower.jpg',
    fileMatcher: /room[_\-\s]*4[_\-\s]*(en-?suite|shower)/i,
    description: 'Enclosed private rainfall shower directly inside Room 4 for quick freshening up.',
    defaultSrc: VENUE_IMAGES['room-4-ensuite'],
    badge: 'Room 4 En-Suite Shower',
  },
  {
    id: 'pool-lapa',
    slotNumber: 7,
    label: 'Turquoise Pool & Thatched Lapa',
    exactFileName: 'pool_and_lapa.jpg',
    fileMatcher: /pool|lapa/i,
    description: 'Secluded outdoor swimming pool, palm trees, and authentic thatched African lapa.',
    defaultSrc: VENUE_IMAGES.pool,
    badge: 'Pool & Lapa',
  },
  {
    id: 'secure-parking',
    slotNumber: 8,
    label: 'Secure Off-Street Parking & Gate',
    exactFileName: 'secure_parking_gate.jpg',
    fileMatcher: /gate|park/i,
    description: 'Private electronic gate and off-street parking bays inside the residential grounds.',
    defaultSrc: VENUE_IMAGES.garden,
    badge: 'Parking & Gate',
  },
];
