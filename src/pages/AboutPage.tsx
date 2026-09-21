import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { PageId } from '../components/Navbar';
import {
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Award,
  Lock,
  Flame,
  CheckCircle2,
  ArrowRight,
  Droplet,
  MessageCircle,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';
import { useVenuePhotos } from '../context/VenuePhotoContext';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenBooking }) => {
  const { getPhoto } = useVenuePhotos();
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Page Banner Header */}
      <PageBanner
        title="About The Pearl"
        subtitle="Polokwane's Premier Luxury Sensual Wellness Retreat"
        badge="Discreet &bull; Serene &bull; Unhurried"
        onNavigate={onNavigate}
        currentPageName="About Us"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Intro Story & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Dedicated Adult Oasis</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B2B42] leading-tight">
              Crafted for Gentlemen Seeking True Bodily Release &amp; Tactile Mastery
            </h2>
            <div className="h-[2px] w-20 bg-[#D4AF37]" />
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
              Situated in the quiet, prestigious suburb of Welgelegen, Polokwane, <strong className="text-[#1B2B42] font-semibold">The Pearl Wellness Spa</strong> was established to provide discerning gentlemen with an authentic, high-end alternative to generic massage parlors.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
              Modeled after the opulent aesthetic and executive privacy standards of South Africa’s premier adult venues, our sanctuary is designed from the ground up for full sensory indulgence: unhurried sessions, temperature-controlled private suites, deeply intuitive touch, and unwavering confidentiality.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1B2B42]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Strictly 18+ Adult Venue</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#1B2B42]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Confidential Booking</span>
              </div>
            </div>
          </div>

          {/* Photographic Suite Display */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
              <img
                src={getPhoto('champagne', '/images/venue_champagne_suite.jpg')}
                alt="The Pearl Champagne Suite Ambiance"
                referrerPolicy="no-referrer"
                className="w-full h-[440px] object-cover filter brightness-[0.95] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42]/85 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif italic text-lg text-[#F3E5AB]">Champagne Suite &bull; Luxury &bull; Warmth &bull; Absolute Discretion</p>
                <p className="text-xs text-slate-200 mt-1">Private temperature-controlled suites with en-suite showers &amp; heated massage beds.</p>
              </div>
            </div>

            {/* Quality Seal Pill */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white border border-[#D4AF37] rounded-xl p-4 shadow-xl flex items-center gap-3 max-w-xs">
              <div className="w-12 h-12 rounded-full bg-[#1B2B42] flex items-center justify-center shrink-0 border border-[#D4AF37]/60">
                <Award className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-[#1B2B42]">Executive Standard</p>
                <p className="text-[11px] text-gray-500">Modeled after premier South African luxury spas</p>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Core Sanctuary Pillars */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2B42]">
              The Four Pillars of The Pearl Experience
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Every detail is meticulously curated to guarantee comfort, safety, and sensory bliss.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1B2B42] mb-2">Absolute Discretion</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Unmarked venue in a quiet Welgelegen residential street with secure behind-gate parking and strictly confidential client records.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1B2B42] mb-2">Sensual Tactile Art</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Our hostesses specialize in authentic Swedish bodywork, erotic Nurul slides, and intuitive touch designed to dissolve everyday stress.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1B2B42] mb-2">Impeccable Hygiene</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Medical-grade sanitization between sessions, freshly laundered 600GSM Egyptian cotton towels, and private en-suite showers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1B2B42] mb-2">Clear Code of Conduct</h4>
              <p className="text-xs text-gray-600 leading-relaxed font-light">
                Strict therapeutic &amp; sensual boundaries. Absolutely NO sexual intercourse or oral sex, ensuring mutual safety, trust, and peace of mind.
              </p>
            </div>
          </div>
        </div>

        {/* Atmospheric Venue Photos Gallery */}
        <div className="mb-20 bg-[#1B2B42] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-[#D4AF37]/40 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Venue Atmosphere</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Immerse Yourself in Pure Tranquility
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-2">
              Every room is engineered for thermal warmth, mood lighting, and supreme acoustics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 group">
              <img
                src={getPhoto('lounge', '/images/venue_grand_lounge.jpg')}
                alt="Vaulted Cathedral Lounge"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <h5 className="font-serif font-bold text-sm text-[#F3E5AB]">Vaulted Cathedral Salon</h5>
                <p className="text-[11px] text-slate-300 font-light mt-1">Soaring timber cathedral ceilings, chandelier &amp; cream leather couches.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 group">
              <img
                src={getPhoto('pool', '/images/venue_pool_lapa.jpg')}
                alt="Cabana & Pool"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <h5 className="font-serif font-bold text-sm text-[#F3E5AB]">Heated Pool &amp; Thatched Lapa</h5>
                <p className="text-[11px] text-slate-300 font-light mt-1">Outdoor private plunge pool and relaxing thatched lounge.</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 group">
              <img
                src={getPhoto('atrium', '/images/venue_atrium_entrance.jpg')}
                alt="Lounge Atrium"
                referrerPolicy="no-referrer"
                className="w-full h-56 object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 bg-white/5 backdrop-blur-sm">
                <h5 className="font-serif font-bold text-sm text-[#F3E5AB]">Sunlit Glass Conservatory Atrium</h5>
                <p className="text-[11px] text-slate-300 font-light mt-1">Complimentary teas, sparkling waters &amp; quiet relaxation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Page Navigation Actions */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h4 className="font-serif text-2xl font-bold text-[#1B2B42]">
            Ready to Begin Your Sanctuary Journey?
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 font-light">
            Explore our transparent pricing tiers or contact our concierge on WhatsApp to view available hostesses.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('rates')}
              className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 shadow-lg cursor-pointer transition-all"
            >
              View Services &amp; Rates (From R500)
            </button>
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hi The Pearl Wellness Spa, please send me photos and profiles of the available hostesses today.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-[#1B2B42] border border-[#25D366] hover:bg-[#152234] shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp to View Hostesses</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
