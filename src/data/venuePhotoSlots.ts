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
    id: 'entrance',
    slotNumber: 1,
    label: 'Grand Entrance & Garden Walkway',
    exactFileName: 'WhatsApp Image 2026-09-16 at 09.06.38 (1).jpeg',
    fileMatcher: /09\.06\.38/i,
    description: 'Stepping stone garden pathway, manicured green hedges, white walls, and classical twisted column portico.',
    defaultSrc: VENUE_IMAGES.entrance,
    badge: 'Front Portico',
  },
  {
    id: 'atrium',
    slotNumber: 2,
    label: 'Glass Roof Conservatory & Atrium',
    exactFileName: 'WhatsApp Image 2026-09-16 at 09.06.39 (1).jpeg',
    fileMatcher: /09\.06\.39.*\(1\)/i,
    description: 'Sunlit glass conservatory with vaulted skylight ceiling, glass brick illuminated wall, and tan leather recliner.',
    defaultSrc: VENUE_IMAGES.atrium,
    badge: 'Glass Conservatory',
  },
  {
    id: 'pool',
    slotNumber: 3,
    label: 'Turquoise Pool & Thatched Lapa',
    exactFileName: 'WhatsApp Image 2026-09-16 at 09.06.39.jpeg',
    fileMatcher: /09\.06\.39(?!\s*\()/i,
    description: 'Crystal turquoise swimming pool with steps, paved courtyard, and palm tree viewed from under the thatched lapa.',
    defaultSrc: VENUE_IMAGES.pool,
    badge: 'Pool & Lapa',
  },
  {
    id: 'lounge',
    slotNumber: 4,
    label: 'Vaulted Cathedral Ceiling Grand Lounge',
    exactFileName: 'WhatsApp Image 2026-09-16 at 09.06.40.jpeg',
    fileMatcher: /09\.06\.40/i,
    description: 'Soaring white vaulted timber cathedral ceiling, chandelier, fireplace, cream leather sofas, and red Persian carpet.',
    defaultSrc: VENUE_IMAGES.lounge,
    badge: 'Grand Lounge',
  },
  {
    id: 'champagne',
    slotNumber: 5,
    label: 'Champagne Brocade Therapy Suite',
    exactFileName: 'WhatsApp Image 2026-09-16 at 09.06.42.jpeg',
    fileMatcher: /09\.06\.42/i,
    description: 'Therapy bed dressed in champagne brocade fabric with silver pillows, corner chaise lounge, and framed art.',
    defaultSrc: VENUE_IMAGES.champagne,
    badge: 'Champagne Suite',
  },
  {
    id: 'sapphire',
    slotNumber: 6,
    label: 'Midnight Navy Velvet VIP Suite',
    exactFileName: 'WhatsApp Image 2026-09-16 at 09.06.44 (1).jpeg',
    fileMatcher: /09\.06\.44/i,
    description: 'VIP therapy bed draped in deep navy velvet with folded butterfly towel art, peacock cushion, and private drapes.',
    defaultSrc: VENUE_IMAGES.sapphire,
    badge: 'Midnight Velvet Suite',
  },
  {
    id: 'mahogany',
    slotNumber: 7,
    label: 'Warm Mahogany Executive Suite',
    exactFileName: 'WhatsApp Image 2026-09-16 at 09.06.45.jpeg',
    fileMatcher: /09\.06\.45/i,
    description: 'Curved dark cherry mahogany headboard bed with crisp white linen, black fleece throw, and rolled towels.',
    defaultSrc: VENUE_IMAGES.mahogany,
    badge: 'Executive Suite',
  },
];
