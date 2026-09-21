import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Eye, Award } from 'lucide-react';
import { useVenuePhotos } from '../context/VenuePhotoContext';

export const About: React.FC = () => {
  const { getPhoto } = useVenuePhotos();
  const loungeImage = getPhoto('lounge', '/images/venue_grand_lounge.jpg');
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background soft gold wash */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1B2B42]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A Sanctuary of Intimacy &amp; Rejuvenation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            Welcome to The Pearl
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2 mb-4">
            Polokwane&apos;s Premier Sensual Wellness Venue
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-4">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/40" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/40" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl mx-auto font-light">
            Nestled in the prestigious and quiet suburb of Welgelegen, Polokwane, <strong className="text-[#1B2B42] font-semibold">The Pearl Wellness Spa</strong> offers discerning gentlemen a tranquil retreat designed for supreme tactile indulgence, unhurried attention, and deep bodily release.
          </p>
        </div>

        {/* 2-Column Story / Atmosphere Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual Showcase (Imagery + Badge + Interactive Real Photos) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-xl group">
              <img
                src={loungeImage}
                alt="The Pearl Welgelegen Grand Lounge"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover filter brightness-[0.95] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42]/90 via-[#1B2B42]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#1B2B42]/80 border border-[#D4AF37]/50">
                    Real Venue • Welgelegen
                  </span>
                </div>
                <p className="font-serif italic text-lg sm:text-xl text-[#F3E5AB]">
                  Cathedral Timber Ceilings &bull; Pure Seclusion
                </p>
                <p className="text-xs text-slate-200 mt-1">
                  Private temperature-controlled suites, authentic Persian carpets, and discreet off-street parking.
                </p>
              </div>
            </div>

            {/* Floating Luxury Seal */}
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white border border-[#D4AF37] rounded-xl p-3.5 shadow-xl flex items-center gap-3 backdrop-blur-md max-w-xs z-10">
              <div className="w-11 h-11 rounded-full bg-[#1B2B42] flex items-center justify-center shrink-0 border border-[#D4AF37]/60">
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <p className="font-serif text-sm font-bold text-[#1B2B42]">112 General Beyers St</p>
                <p className="text-[11px] text-gray-500">Welgelegen, Polokwane &bull; Total Discretion</p>
              </div>
            </div>
          </div>

          {/* Pillars of Excellence */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="luxury-card p-6 rounded-xl border border-[#D4AF37]/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#1B2B42] text-[#D4AF37] shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2B42] mb-1">
                    The Signature Girlfriend Experience (GFE)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Our therapists pride themselves on providing genuine warmth, tenderness, and connection. Enjoy allowed sweet kisses, tactile full-body exploration, and exquisite body-to-body slides that melt tension away.
                  </p>
                </div>
              </div>
            </div>

            <div className="luxury-card p-6 rounded-xl border border-[#D4AF37]/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#1B2B42] text-[#D4AF37] shrink-0">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2B42] mb-1">
                    Total Discretion &amp; Private Parking
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Your confidentiality is sacred. Located discreetly in Welgelegen with unmarked premises and private secured off-street parking. You enter and exit in complete comfort and privacy.
                  </p>
                </div>
              </div>
            </div>

            <div className="luxury-card p-6 rounded-xl border border-[#D4AF37]/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#1B2B42] text-[#D4AF37] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2B42] mb-1">
                    Pristine Hygiene &amp; Professional Standards
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Each private suite is sanitized between visits, stocked with warm luxury towels, high-grade organic body oils, and private en-suite rainfall showers for your pre- and post-session refreshment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
