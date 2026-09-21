// Direct hashed imports for venue photos ensuring zero-cache issues on Netlify/production
import frontEntrance from '../assets/venue/venue_front_entrance.jpg';
import atriumEntrance from '../assets/venue/venue_atrium_entrance.jpg';
import poolLapa from '../assets/venue/venue_pool_lapa.jpg';
import grandLounge from '../assets/venue/venue_grand_lounge.jpg';
import champagneSuite from '../assets/venue/venue_champagne_suite.jpg';
import sapphireSuite from '../assets/venue/venue_sapphire_suite.jpg';
import mahoganySuite from '../assets/venue/venue_mahogany_suite.jpg';

export const VENUE_IMAGES: Record<string, string> = {
  entrance: frontEntrance,
  atrium: atriumEntrance,
  pool: poolLapa,
  lounge: grandLounge,
  champagne: champagneSuite,
  sapphire: sapphireSuite,
  mahogany: mahoganySuite,
};

export {
  frontEntrance,
  atriumEntrance,
  poolLapa,
  grandLounge,
  champagneSuite,
  sapphireSuite,
  mahoganySuite,
};
