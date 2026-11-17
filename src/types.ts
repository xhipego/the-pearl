export interface Therapist {
  id: string;
  name: string;
  age: number;
  height: string;
  bodyType: string;
  sexyQuote: string;
  eyes?: string;
  hair?: string;
  bustOrBody?: string;
  lookDescription?: string;
  specialties?: string[];
  bio?: string;
  image: string; // Main cover photo
  photos: string[]; // 5 photos: [mainPhoto, photo2, photo3, photo4, photo5]
  featured?: boolean;
  availableToday: boolean;
  vipHostess?: boolean;
  languages?: string[];
}

export interface DurationRate {
  duration: string;
  price: number;
  formattedPrice: string;
}

export interface RateItem {
  duration: string;
  minutes: number;
  price: number;
  label: string;
  popular?: boolean;
  features: string[];
}

export interface PackageItem {
  title: string;
  rateInfo: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
}

export interface BookingFormState {
  clientName: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  duration: string;
  therapistId?: string;
  addOns: string[];
  notes: string;
}

export interface VenueSnippet {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  videoLabel: string;
  description: string;
  highlights: string[];
}

