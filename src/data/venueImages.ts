// Direct bundled imports for permanent venue & hero photos ready for GitHub & production builds
import frontEntrance from '../assets/venue/venue_front_entrance.jpg';
import atriumEntrance from '../assets/venue/venue_atrium_entrance.jpg';
import poolLapa from '../assets/venue/venue_pool_lapa.jpg';
import grandLounge from '../assets/venue/venue_grand_lounge.jpg';
import champagneSuite from '../assets/venue/venue_champagne_suite.jpg';
import sapphireSuite from '../assets/venue/venue_sapphire_suite.jpg';
import mahoganySuite from '../assets/venue/venue_mahogany_suite.jpg';
import suiteBath from '../assets/venue/venue_suite_bath.jpg';
import gardenGrounds from '../assets/venue/venue_garden_grounds.jpg';
import galaxySuite from '../assets/venue/venue_galaxy_suite.jpg';
import leadwoodFootScrub from '../assets/venue/venue_leadwood_footscrub.jpg';
import room1EnsuiteBath from '../assets/venue/venue_room1_ensuite_bath.jpg';
import customVenueSuite from '../assets/venue/venue_custom_suite.jpg';
import heroFeatured1 from '../assets/venue/hero_featured_1.jpg';
import heroFeatured2 from '../assets/venue/hero_featured_2.jpg';
import heroFeatured3 from '../assets/venue/hero_featured_3.jpg';

export const HERO_FEATURED_IMAGES: string[] = [
  heroFeatured1,
  heroFeatured2,
  heroFeatured3,
];

export const VENUE_IMAGES: Record<string, string> = {
  entrance: frontEntrance,
  atrium: atriumEntrance,
  pool: poolLapa,
  lounge: leadwoodFootScrub,
  champagne: champagneSuite,
  sapphire: sapphireSuite,
  mahogany: mahoganySuite,
  bath: room1EnsuiteBath,
  garden: gardenGrounds,
  galaxy: galaxySuite,
  'room-1': champagneSuite,
  'room-1-ensuite': room1EnsuiteBath,
  'room-2-night': sapphireSuite,
  'room-3-couples': atriumEntrance,
  'room-4-footscrub': leadwoodFootScrub,
  'room-4-ensuite': suiteBath,
  'pool-lapa': poolLapa,
  'secure-parking': gardenGrounds,
  'custom-suite': customVenueSuite,
};

export {
  frontEntrance,
  atriumEntrance,
  poolLapa,
  grandLounge,
  leadwoodFootScrub,
  champagneSuite,
  sapphireSuite,
  mahoganySuite,
  suiteBath,
  room1EnsuiteBath,
  gardenGrounds,
  galaxySuite,
  customVenueSuite,
  heroFeatured1,
  heroFeatured2,
  heroFeatured3,
};
