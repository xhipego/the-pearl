import { PersistedSiteMedia } from '../utils/mediaStorage';

import hero1 from '../assets/saved/hero_1_1e10ca3b69.jpg';
import hero2 from '../assets/saved/hero_2_d94148b652.jpg';
import hero3 from '../assets/saved/hero_3_d6bfd3d796.jpg';
import hero4 from '../assets/saved/hero_4_eac96bb2f3.jpg';
import hero5 from '../assets/saved/hero_5_1577c50600.jpg';
import hero6 from '../assets/saved/hero_6_6c127fa8d4.jpg';
import hero7 from '../assets/saved/hero_7_97faecf230.jpg';

import group1 from '../assets/saved/group_1_d6bfd3d796.jpg';
import group3 from '../assets/saved/group_3_eac96bb2f3.jpg';

import expDoubleMassages from '../assets/saved/exp_double-massages_18c21b8445.jpg';
import expPoolSessions from '../assets/saved/exp_pool-sessions_b2736ed52f.jpg';

import venueRoom1 from '../assets/saved/venue_room-1_97faecf230.jpg';
import venueRoom1Ensuite from '../assets/saved/venue_room-1-ensuite_1577c50600.jpg';

import bliss2 from '../assets/saved/bliss_2_0f5236962c.jpg';
import bliss3 from '../assets/saved/bliss_3_86be7fde08.jpg';
import bliss4 from '../assets/saved/bliss_4_f864cb093d.jpg';
import bliss5 from '../assets/saved/bliss_5_66418050a5.jpg';

import channel1 from '../assets/saved/channel_1_b5cd36f5d1.jpg';
import channel2 from '../assets/saved/channel_2_ab0888c259.jpg';
import channel3 from '../assets/saved/channel_3_cbb5fd380f.jpg';
import channel5 from '../assets/saved/channel_5_900e12470d.jpg';

import kylie2 from '../assets/saved/kylie_2_77058159eb.jpg';
import kylie3 from '../assets/saved/kylie_3_454ec2402e.jpg';
import kylie4 from '../assets/saved/kylie_4_e2a1af569b.jpg';
import kylie5 from '../assets/saved/kylie_5_d8fc0b24f8.jpg';

export const BAKED_MEDIA: PersistedSiteMedia = {
  heroSlides: [
    { id: 'hero-1', image: hero1, isPortrait: false, label: 'Hero Slide 1' },
    { id: 'hero-2', image: hero2, isPortrait: false, label: 'Hero Slide 2' },
    { id: 'hero-3', image: hero3, isPortrait: true, label: 'Hero Slide 3' },
    { id: 'hero-4', image: hero4, isPortrait: true, label: 'Hero Slide 4' },
    { id: 'hero-5', image: hero5, isPortrait: false, label: 'Hero Slide 5' },
    { id: 'hero-6', image: hero6, isPortrait: false, label: 'Hero Slide 6' },
    { id: 'hero-7', image: hero7, isPortrait: false, label: 'Hero Slide 7' },
  ],
  groupPhotos: [group1, null, group3],
  experiencePhotos: {
    'double-massages': expDoubleMassages,
    'pool-sessions': expPoolSessions,
  },
  venuePhotos: {
    'room-1': venueRoom1,
    'room-1-ensuite': venueRoom1Ensuite,
  },
  therapistPhotos: {
    bliss: [null, bliss2, bliss3, bliss4, bliss5],
    channel: [channel1, channel2, channel3, null, channel5],
    kylie: [null, kylie2, kylie3, kylie4, kylie5],
  },
};
