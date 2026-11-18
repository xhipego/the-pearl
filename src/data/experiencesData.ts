import sensualMassageDefault from '../assets/images/aromatherapy_treatment_1791283056501.jpg';
import doubleMassagesDefault from '../assets/images/couples_massage_suite_1791284102314.jpg';
import bachelorPartiesDefault from '../assets/images/bachelor_parties_real.jpeg';
import poolSessionsDefault from '../assets/venue/venue_pool_lapa.jpg';

export interface ExperienceItem {
  id: 'sensual-massage' | 'double-massages' | 'bachelor-parties' | 'pool-sessions';
  title: string;
  description: string;
  priceNote?: string;
  defaultImage: string;
  objectPositionClass?: string;
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'sensual-massage',
    title: 'Sensual Massage',
    description:
      'Unhurried full-body touch with warm oils, designed to dissolve tension and awaken the senses in complete privacy.',
    defaultImage: sensualMassageDefault,
  },
  {
    id: 'double-massages',
    title: 'Double Massages',
    description:
      'Two attentive therapists working in synchronized rhythm for an indulgent, deeply restorative sensory experience.',
    defaultImage: doubleMassagesDefault,
  },
  {
    id: 'bachelor-parties',
    title: 'Bachelor Parties',
    description:
      'Private group bookings tailored for celebrations with exclusive sanctuary access, refreshments, and bespoke arrangements.',
    defaultImage: bachelorPartiesDefault,
    objectPositionClass: 'object-[50%_20%]',
  },
  {
    id: 'pool-sessions',
    title: 'Pool Sessions',
    description:
      'Unwind at our secluded courtyard pool and thatched lapa with chilled drinks and attentive company behind closed gates.',
    priceNote: 'R500 per hour (with one lady)',
    defaultImage: poolSessionsDefault,
  },
];
