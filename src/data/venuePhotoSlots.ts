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
    label: 'Room 1',
    exactFileName: 'room_1.jpg',
    fileMatcher: /room[_\-\s]*1(?!\s*en-?suite)/i,
    description: 'Executive treatment suite.',
    defaultSrc: VENUE_IMAGES.champagne,
    badge: 'Suite 1',
  },
  {
    id: 'room-1-ensuite',
    slotNumber: 2,
    label: 'Room 1 En-Suite',
    exactFileName: 'room_1_ensuite.jpg',
    fileMatcher: /room[_\-\s]*1[_\-\s]*(en-?suite|bath)/i,
    description: 'Private en-suite bathroom.',
    defaultSrc: VENUE_IMAGES['room-1-ensuite'],
    badge: 'En-Suite Bath',
  },
  {
    id: 'room-2-night',
    slotNumber: 3,
    label: 'Room 2',
    exactFileName: 'room_2_night.jpg',
    fileMatcher: /room[_\-\s]*2/i,
    description: 'Ambient evening suite.',
    defaultSrc: VENUE_IMAGES.sapphire,
    badge: 'Suite 2',
  },
  {
    id: 'room-3-couples',
    slotNumber: 4,
    label: 'Room 3',
    exactFileName: 'room_3_couples.jpg',
    fileMatcher: /room[_\-\s]*3|couple/i,
    description: 'Couples treatment suite.',
    defaultSrc: VENUE_IMAGES.atrium,
    badge: 'Couples Suite',
  },
  {
    id: 'room-4-footscrub',
    slotNumber: 5,
    label: 'Room 4',
    exactFileName: 'room_4_footscrub.jpg',
    fileMatcher: /room[_\-\s]*4(?!\s*en-?suite)|foot/i,
    description: 'Relaxation suite.',
    defaultSrc: VENUE_IMAGES['room-4-footscrub'],
    badge: 'Relaxation Suite',
  },
  {
    id: 'pool-lapa',
    slotNumber: 6,
    label: 'Pool & Lapa',
    exactFileName: 'pool_and_lapa.jpg',
    fileMatcher: /pool|lapa/i,
    description: 'Secluded outdoor pool and thatched lapa.',
    defaultSrc: VENUE_IMAGES.pool,
    badge: 'Pool & Lapa',
  },
];
