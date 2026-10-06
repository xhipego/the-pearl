import { RateItem, PackageItem, VenueSnippet } from '../types';
import { VENUE_IMAGES } from './venueImages';

export interface TreatmentMenuItem {
  id: string;
  category: 'massage' | 'feet' | 'couples' | 'addons';
  name: string;
  durations: { time: string; minutes: number; price: number }[];
  description: string;
  tag?: string;
  whatsAppMsg: string;
}

export const TREATMENT_MENU: TreatmentMenuItem[] = [
  {
    id: 'deep-tissue-massage',
    category: 'massage',
    name: 'Deep Tissue Massage',
    tag: 'Most booked',
    durations: [
      { time: '60 min', minutes: 60, price: 750 },
      { time: '90 min', minutes: 90, price: 1050 },
    ],
    description: 'Firm, slow, focused pressure for chronic tightness, gym workouts, heavy lifting, and sports recovery. Our premier treatment for gentlemen.',
    whatsAppMsg: "Hi, I'd like to book a Deep Tissue massage. Which times are available?",
  },
  {
    id: 'swedish-massage',
    category: 'massage',
    name: 'Swedish Full-Body Massage',
    durations: [
      { time: '60 min', minutes: 60, price: 650 },
      { time: '90 min', minutes: 90, price: 950 },
    ],
    description: 'Medium pressure for relaxation, improved circulation, and stress relief. An ideal first massage.',
    whatsAppMsg: "Hi, I'd like to book a Swedish Full-Body massage. Which times are available?",
  },
  {
    id: 'hot-stone-massage',
    category: 'massage',
    name: 'Hot Stone Massage',
    durations: [
      { time: '60 min', minutes: 60, price: 900 },
    ],
    description: 'Smooth, heated basalt stones gliding along energy pathways for penetrating warmth and deep muscular tension release.',
    whatsAppMsg: "Hi, I'd like to book a Hot Stone massage (60 min). Which times are available?",
  },
  {
    id: 'aromatherapy-massage',
    category: 'massage',
    name: 'Aromatherapy Massage',
    durations: [
      { time: '60 min', minutes: 60, price: 700 },
    ],
    description: 'Deep relaxation infused with therapeutic botanical essential oils. Choose cedarwood, eucalyptus, or citrus.',
    whatsAppMsg: "Hi, I'd like to book an Aromatherapy massage (60 min). Which times are available?",
  },
  {
    id: 'back-neck-shoulders',
    category: 'massage',
    name: 'Back, Neck & Shoulders',
    durations: [
      { time: '30 min', minutes: 30, price: 400 },
    ],
    description: 'Desk tension, long drives, a lunch-break reset that gets you back to work loose and revitalized.',
    whatsAppMsg: "Hi, I'd like to book a Back, Neck & Shoulders massage (30 min). Which times are available?",
  },
  {
    id: 'foot-scrub',
    category: 'feet',
    name: 'Foot Scrub',
    durations: [
      { time: '30 min', minutes: 30, price: 350 },
    ],
    description: 'Warm soak, exfoliating scrub, and a targeted foot and calf massage in the Leadwood Room. Crafted specifically for feet that spend the day in boots or on site.',
    whatsAppMsg: "Hi, I'd like to book a Foot Scrub (30 min). Which times are available?",
  },
  {
    id: 'couples-massage',
    category: 'couples',
    name: 'Couples Massage',
    durations: [
      { time: '60 min (for two)', minutes: 60, price: 1300 },
    ],
    description: 'Side-by-side harmonious treatment in Room 3 for Couples. Each guest can individually select Swedish or Aromatherapy pressure.',
    whatsAppMsg: "Hi, I'd like to book a Couples Massage (60 min). Which times are available?",
  },
];

export const ADDONS_MENU = [
  {
    id: 'pool-lapa',
    title: 'Pool & Lapa Session',
    time: '30 min',
    price: 250,
    description: '30 minutes at the secluded turquoise pool and thatched lapa after your treatment, with fresh coffee, tea, or a cold beverage.',
  },
  {
    id: 'hot-stone-upgrade',
    title: 'Hot Stone Upgrade',
    time: 'Add-on',
    price: 300,
    description: 'Heated basalt stones worked into any full-body or back massage, targeting spinal tension and tight shoulders.',
  },
];

export const SPA_RATES: RateItem[] = [
  {
    duration: '60 min',
    minutes: 60,
    price: 750,
    label: 'Deep Tissue Recovery',
    popular: true,
    features: [
      'Firm, slow focused pressure',
      'Chronic tension & gym soreness relief',
      'Post-sports physical restoration',
      'Private en-suite shower & plush robe',
    ],
  },
  {
    duration: '60 min',
    minutes: 60,
    price: 650,
    label: 'Swedish Full-Body',
    features: [
      'Full-body medium pressure restoration',
      'Calming muscular tension relief',
      'Warm essential botanical oils',
      'Complementary tea, coffee or cold drink',
    ],
  },
  {
    duration: '60 min',
    minutes: 60,
    price: 900,
    label: 'Hot Stone Massage',
    features: [
      'Heated volcanic basalt stones',
      'Penetrating deep muscle thermal release',
      'Full-body soothing circulation therapy',
      'Includes private en-suite shower',
    ],
  },
  {
    duration: '60 min',
    minutes: 60,
    price: 700,
    label: 'Aromatherapy Massage',
    features: [
      'Deep relaxation with essential oils',
      'Cedarwood, eucalyptus, or citrus blends',
      'Nervous system reset & gentle rhythm',
      'Private climate-controlled suite',
    ],
  },
  {
    duration: '30 min',
    minutes: 30,
    price: 400,
    label: 'Back, Neck & Shoulders',
    features: [
      'Targeted desk & driving tension relief',
      'Upper back, trapezius & cervical spine release',
      'Warm botanical massage oils',
      'Private room & en-suite freshen up',
    ],
  },
  {
    duration: '30 min',
    minutes: 30,
    price: 350,
    label: 'Foot Scrub',
    features: [
      'Warm soothing mineral soak',
      'Invigorating exfoliating scrub',
      'Foot & calf acupressure massage',
      'Tailored for active boots & site workers',
    ],
  },
  {
    duration: '60 min',
    minutes: 60,
    price: 1300,
    label: 'Couples Massage (For Two)',
    features: [
      'Side-by-side massage tables in Room 3',
      'Choice of Swedish or Aromatherapy each',
      'Two qualified therapists working simultaneously',
      'Includes refreshments for both guests',
    ],
  },
  {
    duration: '90 min',
    minutes: 90,
    price: 1050,
    label: 'Executive Deep Tissue 90',
    features: [
      'Extended unhurried therapeutic recovery',
      'Complete full-body restoration',
      'Comprehensive focus on problem areas',
      'Full private suite time to unwind',
    ],
  },
];

export const SIGNATURE_PACKAGES: PackageItem[] = [
  {
    title: 'Deep Tissue Muscle Recovery',
    rateInfo: 'From R750 (60 min) / R1,050 (90 min)',
    badge: 'Most Booked by Men',
    highlight: true,
    description:
      'Firm, concentrated pressure designed for gentlemen with chronic desk stiffness, heavy gym training, driving fatigue, or physically demanding site work. Your therapist uses knuckles, forearms, and thumbs to release locked muscle fibers and restore mobility.',
    features: [
      'Focused trigger-point release on back, neck & legs',
      'Customized pressure levels to match your tolerance',
      'Warm botanical muscle-soothing balm',
      'Private en-suite shower & clean linen',
    ],
  },
  {
    title: 'Couples Side-by-Side Massage',
    rateInfo: 'R1,300 for two (60 min)',
    badge: 'Room 3 Dedicated',
    description:
      'Experience a shared unwinding session in our dedicated Room 3 for Couples. Two therapists work simultaneously in a calm, ambient room, allowing you and your partner to relax side by side.',
    features: [
      'Two treatment tables side-by-side in Room 3',
      'Choose Swedish or Aromatherapy individually',
      'Warm essential oils & ambient lighting',
      'Optional pool & lapa session afterwards',
    ],
  },
  {
    title: 'After-Work Unwind & Pool Access',
    rateInfo: 'Add R250 to any treatment',
    badge: 'Evening Favorite',
    description:
      'Add half an hour at our secluded turquoise swimming pool and thatched lapa after your treatment. Sit back with a freshly brewed coffee, warm tea, or a cold beverage in total privacy before heading home.',
    features: [
      '30 minutes access to outdoor pool & thatched lapa',
      'Fresh complimentary coffee, tea, or cold drink',
      'Quiet, private garden courtyard',
      'Open daily until 20:00',
    ],
  },
];

export const POLICY_STATEMENT = {
  headline: 'CODE OF CONDUCT & PROFESSIONAL ETHICS',
  exactText:
    'All treatments at The Pearl Wellness Spa are strictly therapeutic and non-sexual. Any sexual comment, request, or inappropriate behavior will terminate the treatment immediately, charged in full, and the individual will not be permitted to return.',
  rules: [
    {
      title: 'Strictly Therapeutic & Non-Sexual',
      desc: 'Our certified therapists adhere to a strict professional code of conduct. We provide authentic bodywork, deep tissue, and relaxation therapies focused entirely on physical wellness and recovery.',
    },
    {
      title: 'Professional Draping Standard',
      desc: 'Only the specific body area being worked on is uncovered at any time. Clean linen and towels are used throughout. Clients may keep their own underwear on, and disposable underwear is provided for convenience.',
    },
    {
      title: 'Private Suites & Personal En-Suite Facilities',
      desc: 'Each guest enjoys a private treatment room with an en-suite shower or bath to freshen up in total privacy before and after your session.',
    },
    {
      title: '24-Hour Cancellation Courtesy',
      desc: 'Please provide at least 24 hours notice to cancel or reschedule a booking. This allows our therapists to manage their appointments seamlessly.',
    },
    {
      title: 'Health & Medical Consultation',
      desc: 'Please advise your therapist of any physical injuries, medical conditions, hypertension, or recent surgeries on your intake form so your treatment can be tailored safely.',
    },
    {
      title: 'Strict Discretion & Data Confidentiality',
      desc: 'Your identity and booking information remain completely confidential. We never share details or contact you for promotional spam.',
    },
  ],
};

export const CONTACT_INFO = {
  name: "The Pearl Men's Day Spa",
  subtitle: "Men's Day Spa",
  tagline: 'Private Massage & Recovery for Men in Welgelegen, Polokwane',
  phone1: '0739955927',
  phone1Formatted: '073 995 5927',
  whatsappNumber: '27739955927',
  whatsappUrl: 'https://wa.me/27739955927',
  email: 'thepearlwellnessspa@gmail.com',
  address: '112 Genl Beyers Street, Welgelegen, Polokwane',
  city: 'Polokwane',
  suburb: 'Welgelegen',
  postalCode: '0699',
  province: 'Limpopo',
  website: 'www.thepearlspa.co.za',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=112+Genl+Beyers+Street+Welgelegen+Polokwane',
  operatingHours: 'Monday – Sunday: 10:00 – 20:00 (Open 7 Days a Week)',
};

export const VENUE_SNIPPETS: VenueSnippet[] = [
  {
    id: 'room-1',
    title: 'Room 1 (The Baobab Executive Suite)',
    subtitle: 'Warm ambient lighting, timber finishes & heated therapy bed',
    image: VENUE_IMAGES.champagne,
    badge: 'Room 1',
    videoLabel: 'View 1 • Room 1 Executive Suite',
    description:
      'Our largest and most private treatment room. Features warm timber accents, premium ergonomic therapy bed, and soft ambient light for deep relaxation.',
    highlights: [
      'Private heated therapy bed with crisp cotton linen',
      'Aromatherapy essential oil warming station',
      'Quiet, sound-dampened acoustic sanctuary',
      'Ideal for Deep Tissue 90 & Hot Stone treatments',
    ],
  },
  {
    id: 'room-1-ensuite',
    title: 'Room 1 En-Suite Bathroom',
    subtitle: 'Private luxury bath, shower & grooming vanity',
    image: VENUE_IMAGES.bath,
    badge: 'Room 1 En-Suite',
    videoLabel: 'View 2 • Room 1 Private Bath',
    description:
      'Directly connected to Room 1, this private en-suite bathroom allows you to freshen up in total privacy before and after your massage session.',
    highlights: [
      'Full en-suite deep soaking bath & rainfall shower',
      'Clean luxury cotton towels & oversized robes',
      'Natural botanical body wash & grooming amenities',
      '100% private and enclosed within Room 1',
    ],
  },
  {
    id: 'room-2-night',
    title: 'Room 2 (Night Mode / The Marula Room)',
    subtitle: 'Subtle atmospheric evening lighting & calming mood',
    image: VENUE_IMAGES.sapphire,
    badge: 'Room 2 (Night Mode)',
    videoLabel: 'View 3 • Room 2 Evening Atmosphere',
    description:
      'Configured with night-mode ambient lighting for evening sessions after a demanding work day. Unwind between 17:30 and 20:00 in serene seclusion.',
    highlights: [
      'Warm dimmable night-mode illumination',
      'Acoustic chillout soundtrack or pure silence',
      'Therapeutic table with lumbar support',
      'Popular for after-work Swedish & Deep Tissue sessions',
    ],
  },
  {
    id: 'room-3-couples',
    title: 'Room 3 for Couples (The Mopane Suite)',
    subtitle: 'Dual side-by-side therapy tables for shared relaxation',
    image: VENUE_IMAGES.atrium,
    badge: 'Room 3 (Couples)',
    videoLabel: 'View 4 • Room 3 Couples Suite',
    description:
      'Named for the mopane leaf which grows in pairs. Two therapy tables positioned side by side, allowing partners to enjoy simultaneous treatments together.',
    highlights: [
      'Twin massage tables side by side',
      'Two certified therapists working in harmony',
      'Soft champagne tones and soothing background tones',
      'Available for couples massage, Swedish, or Aromatherapy',
    ],
  },
  {
    id: 'room-4-footscrub',
    title: 'Room 4 (Foot Scrub / The Leadwood Room)',
    subtitle: 'Dedicated foot soak, exfoliating scrub & reflexology chairs',
    image: VENUE_IMAGES.lounge,
    badge: 'Room 4 (Foot Scrub)',
    videoLabel: 'View 5 • Room 4 Foot Care',
    description:
      'A specialized care suite designed specifically for tired feet and calves. Features warm copper basin soaks, natural scrubs, and deep lower-leg therapy.',
    highlights: [
      'Ergonomic deep-cushioned therapy seating',
      'Warm mineral foot bath & botanical exfoliating scrub',
      'Targeted calf, ankle & arch acupressure release',
      'Tailored for site boots, athletes, and standing professionals',
    ],
  },
  {
    id: 'room-4-ensuite',
    title: 'Room 4 En-Suite Shower',
    subtitle: 'Modern tiled private shower for quick refreshing',
    image: VENUE_IMAGES.bath,
    badge: 'Room 4 En-Suite Shower',
    videoLabel: 'View 6 • Room 4 En-Suite Shower',
    description:
      'Enclosed en-suite shower directly adjacent to Room 4, providing rapid, seamless freshening up before heading back to meetings or home.',
    highlights: [
      'High-pressure hot rainfall shower system',
      'Fresh luxury towels and complimentary body essentials',
      'Private changing alcove with grooming mirror',
      'Immediate access from the treatment chair',
    ],
  },
  {
    id: 'pool-lapa',
    title: 'Swimming Pool & Thatched Lapa',
    subtitle: 'Outdoor courtyard retreat with sun loungers',
    image: VENUE_IMAGES.pool,
    badge: 'Pool & Lapa',
    videoLabel: 'View 7 • Pool & Thatched Lapa',
    description:
      'Our secluded outdoor sanctuary features a sparkling turquoise pool and thatched lapa surrounded by high perimeter privacy walls. Stay for 30 minutes with coffee or cold drinks for R250.',
    highlights: [
      'Secluded turquoise swimming pool & sun terrace',
      'Authentic African thatched lapa with lounge seating',
      'Fresh coffee, tea, or cold beverage service',
      'Open daily until 20:00 for evening unwinding',
    ],
  },
  {
    id: 'secure-parking',
    title: 'Secure Off-Street Parking & Gate',
    subtitle: 'Discreet residential entrance at 112 Genl Beyers Street',
    image: VENUE_IMAGES.garden,
    badge: 'Parking & Gate',
    videoLabel: 'View 8 • Secure Parking',
    description:
      'Park safely behind our motorized electronic security gate. Discreet unmarked facade ensures complete confidentiality for every visit.',
    highlights: [
      'Motorized security gate with private access',
      'Dedicated off-street parking bays inside the property',
      'Discreet, dignified residential facade',
      'Gate access directions sent immediately upon booking',
    ],
  },
];
