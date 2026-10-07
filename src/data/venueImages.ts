// Direct bundled imports for venue photos ensuring zero-cache issues on GitHub/Netlify/production
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
};
