import { RateItem, PackageItem, VenueSnippet } from '../types';

export const SPA_RATES: RateItem[] = [
  {
    duration: '30 min',
    minutes: 30,
    price: 500,
    label: 'Express Sensual Indulgence',
    features: [
      'Full body warm essential oil rub',
      'Targeted tension relief',
      'Sensual touch & tactile exploration',
      'Sensual hand relief finale',
      'Discreet private suite & shower',
    ],
  },
  {
    duration: '45 min',
    minutes: 45,
    price: 700,
    label: 'Deluxe Sensory Unwind',
    features: [
      'Extended therapeutic back & shoulder work',
      'Sensual body-to-body slide introduction',
      'Intimate connection & allowed kissing',
      'Sensual hand relief within session',
      'Complimentary refreshments',
    ],
  },
  {
    duration: '60 min',
    minutes: 60,
    price: 800,
    label: 'Signature Sensual Journey',
    popular: true,
    features: [
      'Complete Girlfriend Experience (GFE)',
      'Exquisite full-body sensual slides',
      'Allowed kissing & mutual tactile discovery',
      'Slow, unhurried sensual hand relief',
      'Full private shower & luxury bath robe',
    ],
  },
  {
    duration: '90 min',
    minutes: 90,
    price: 1100,
    label: 'The Ultimate Pearl VIP Retreat',
    features: [
      'The definitive decadent indulgence',
      'Deep full-body relaxation & slow slides',
      'Tantric breathing & deep intimacy',
      'Multiple rounds of soothing relief',
      'Extended private suite lingering time',
    ],
  },
];

export const SIGNATURE_PACKAGES: PackageItem[] = [
  {
    title: 'Signature Sensual Experience',
    rateInfo: 'Included in 45, 60 & 90 min sessions',
    badge: 'Guest Favorite',
    highlight: true,
    description:
      'Professional massage combined with exquisite, sensual body-to-body slides. Experience our unique Girlfriend Experience (GFE) designed for genuine connection, allowed kissing, tactile exploration, and sensual hand relief within the session. All services are focused on relaxation and sensual enjoyment.',
    features: [
      'Warm oil body-to-body gliding',
      'Authentic Girlfriend Experience (GFE)',
      'Allowed kissing & intimate embrace',
      'Tactile exploration & sensual hand relief',
      'Strictly hygienic, confidential, and safe',
    ],
  },
  {
    title: 'Bachelor Parties & Celebrations',
    rateInfo: 'R500 per lady, per hour',
    badge: 'Group Occasion',
    description:
      'Celebrate your special occasion or milestones in unmatched style. Customize your party with multiple gorgeous hostesses, private lounge access, and unforgettable hospitality.',
    features: [
      'Multiple attentive hostesses of your choice',
      'Custom party packages & private lounge',
      'Discreet celebration with secure parking',
      'R500 per lady per hour base rate',
    ],
  },
  {
    title: 'Doubles Sessions (Two Ladies)',
    rateInfo: 'Less R100 from hourly prices',
    badge: 'Sensory Harmony',
    description:
      'Double the warmth, double the touch. Experience the breathtaking sensation of two attentive therapists synchronizing their soothing strokes and body-to-body slides.',
    features: [
      'Two dedicated sensual therapists together',
      'Synchronized four-hand sensual touch',
      'Discounted package: less R100 from combined hourly rate',
      'An unhurried, unforgettable escape',
    ],
  },
  {
    title: 'Private Pool Sessions',
    rateInfo: 'R500 / hr per lady',
    badge: 'Water Sensory Bliss',
    description:
      'Enhance your experience with a refreshing dip. Enjoy an intimate, aquatic unwinding session in our secluded, heated outdoor pool area with your chosen therapist.',
    features: [
      'Secluded, heated private pool area',
      'Warm water touch & floating relaxation',
      'Add-on to any massage session',
      'R500 / hr per lady',
    ],
  },
];

export const POLICY_STATEMENT = {
  headline: 'IMPORTANT POLICY & CODE OF CONDUCT',
  exactText:
    'The Pearl maintains a strictly professional, therapeutic and sensual environment. Absolutely NO sexual intercourse or oral sex is permitted. We reserve the right to terminate any session immediately if policies are violated.',
  rules: [
    {
      title: 'Discretion & Privacy Assured',
      desc: 'We uphold total confidentiality. Private suites, unmarked entrance, and secure off-street parking guarantee peace of mind.',
    },
    {
      title: 'Zero Tolerance Compliance',
      desc: 'No sexual intercourse or penetrative acts of any kind. Respect for our ladies’ boundaries is strictly enforced.',
    },
    {
      title: 'Personal Hygiene Mandatory',
      desc: 'All clients must shower before commencing any session. Private en-suite showers with luxury soaps and fresh towels are provided.',
    },
    {
      title: 'Bookings Essential',
      desc: 'To preserve confidentiality and therapist preparation, please book in advance via WhatsApp or telephone.',
    },
    {
      title: 'Payment & Pricing',
      desc: 'Transparent pricing with no hidden charges. Cash, card facilities, or verified EFT upon arrival prior to session.',
    },
  ],
};

export const CONTACT_INFO = {
  name: 'The Pearl Wellness Spa',
  subtitle: 'Wellness Spa',
  tagline: 'Wellness Spa — Indulge in a Journey of Deep Relaxation & Intimate Connection',
  phone1: '0739955927',
  phone1Formatted: '073 995 5927',
  whatsappNumber: '27739955927',
  whatsappUrl: 'https://wa.me/27739955927',
  email: 'thepearlwellnessspa@gmail.com',
  address: '112 General Beyers Street, Welgelegen, Polokwane',
  city: 'Polokwane',
  suburb: 'Welgelegen',
  province: 'Limpopo',
  website: 'www.thepearlspa.co.za',
  googleMapsUrl: 'https://maps.google.com/?q=112+General+Beyers+Street,+Welgelegen,+Polokwane',
  operatingHours: 'Monday – Sunday: 10:00 AM – 20:00 PM (Discreet Bookings Daily)',
};

export const VENUE_SNIPPETS: VenueSnippet[] = [
  {
    id: 'entrance',
    title: 'Grand Entrance & Twisted Column Portico',
    subtitle: 'Discrete Private Portico, Classical Twisted Columns & Paved Driveway',
    image: '/images/venue_front_entrance.jpg',
    badge: 'Front Portico',
    videoLabel: 'View 1 • Private Entrance',
    description:
      'The estate welcomes you through an imposing portico framed by classic white twisted Corinthian spiral columns and solid carved timber doors, flanked by paved driveways with total privacy.',
    highlights: [
      'Classical twisted spiral columns',
      'Solid carved timber & glass entry doors',
      'Private secure off-street paved parking',
      'Unmarked discreet residential facade',
    ],
  },
  {
    id: 'lounge',
    title: 'Vaulted Cathedral Ceiling Reception Salon',
    subtitle: 'High Timber Beams, Chandelier & Cream Leather Lounges',
    image: '/images/venue_grand_lounge.jpg',
    badge: 'Grand Salon',
    videoLabel: 'View 2 • Vaulted Timber Lounge',
    description:
      'A breathtaking reception lounge with soaring white vaulted timber cathedral ceilings, hanging chandelier, rich cream leather executive lounges, and authentic Persian carpets for an unhurried arrival.',
    highlights: [
      'Soaring timber cathedral ceiling & beams',
      'Hanging ambient chandelier & fireplace',
      'Plush cream leather executive suites',
      'Warm Persian carpets & floor-to-ceiling drapery',
    ],
  },
  {
    id: 'atrium',
    title: 'Sunlit Glass Conservatory & Atrium Foyer',
    subtitle: 'High Vaulted Glass Skylight, White Porcelain & Recliner',
    image: '/images/venue_atrium_entrance.jpg',
    badge: 'Glass Atrium',
    videoLabel: 'View 3 • Glass Roof Conservatory',
    description:
      'Step into a light-filled conservatory featuring high-vaulted architectural glass skylight ceilings, illuminated glass brick walls, and comfortable leather seating bathed in peaceful natural light.',
    highlights: [
      'High glass vaulted atrium roof & skylight',
      'Architectural glass brick illumination wall',
      'Deep leather recliner seating',
      'Private arrival vestibule & fresh flowers',
    ],
  },
  {
    id: 'pool',
    title: 'Secluded Pool Courtyard & Thatched Lapa',
    subtitle: 'Sparkling Turquoise Swimming Pool & Palm Courtyard',
    image: '/images/venue_pool_lapa.jpg',
    badge: 'Pool Courtyard',
    videoLabel: 'View 4 • Pool & Thatched Lapa',
    description:
      'Our secluded outdoor sanctuary features a heated turquoise swimming pool, palm trees, Mediterranean paved terrace, and authentic thatched lapa surrounded by high perimeter security walls.',
    highlights: [
      'Private crystal-clear swimming pool & steps',
      'Authentic thatched African lapa cabana',
      'Lush palm tree & stone paved courtyard',
      'Secured high perimeter walls & privacy gate',
    ],
  },
  {
    id: 'sapphire',
    title: 'Midnight Sapphire Velvet Treatment Suite',
    subtitle: 'Plush Navy Velvet Bed Dressing & Intimate Mood',
    image: '/images/venue_sapphire_suite.jpg',
    badge: 'Sapphire Suite',
    videoLabel: 'View 5 • Midnight Velvet Suite',
    description:
      'Immerse in pure intimacy within our midnight sapphire treatment suite, featuring a wide therapy bed draped in rich navy velvet, folded towel art, emerald cushions, and soft sheer window lighting.',
    highlights: [
      'Royal navy blue velvet bed dressing',
      'Folded butterfly towel art presentation',
      'Emerald silk accent bolsters',
      'Intimate private temperature control',
    ],
  },
  {
    id: 'champagne',
    title: 'Serene Champagne & Natural Timber Suite',
    subtitle: 'Warm Quilted Linens, Chaise Lounge & Organic Oils',
    image: '/images/venue_champagne_suite.jpg',
    badge: 'Champagne Suite',
    videoLabel: 'View 6 • Champagne Therapy Suite',
    description:
      'A sanctuary of warmth with soft champagne and textured linens, ergonomic support pillows, a private corner chaise lounge, natural wood flooring, and warm aromatherapy oils.',
    highlights: [
      'Champagne quilted luxury linens',
      'Corner chaise relaxation couch',
      'Natural light timber flooring',
      'Aromatherapy oil service station',
    ],
  },
  {
    id: 'gardens',
    title: 'Manicured Estate Gardens & Stone Walkway',
    subtitle: 'Paved Stepping Stones, Trimmed Hedges & High Walls',
    image: '/images/venue_garden_grounds.jpg',
    badge: 'Estate Gardens',
    videoLabel: 'View 7 • Private Estate Grounds',
    description:
      'Stroll through private villa grounds lined with pristine trimmed hedges, stone walkways, and serene white villa architecture ensuring total tranquility and seclusion.',
    highlights: [
      'Lush manicured box hedges & green shrubs',
      'Stone pathway to discreet entrances',
      'High perimeter security with electric fence',
      'Quiet residential Welgelegen setting',
    ],
  },
];

