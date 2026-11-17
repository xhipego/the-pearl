import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { PageId } from '../components/Navbar';
import { CONTACT_INFO, DURATION_RATES } from '../data/spaData';
import { useVenuePhotos } from '../context/VenuePhotoContext';
import { useTherapists } from '../context/TherapistContext';
import {
  ArrowRight,
  MessageCircle,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: (ladyName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { getPhoto, movingSnippets } = useVenuePhotos();
  const { groupPhotos } = useTherapists();

  const [activeVenueIdx, setActiveVenueIdx] = useState(0);
  const [groupLightboxIdx, setGroupLightboxIdx] = useState<number | null>(null);

  const venueSlides = movingSnippets && movingSnippets.length > 0 ? movingSnippets : [];

  useEffect(() => {
    if (venueSlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveVenueIdx((prev) => (prev + 1) % venueSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [venueSlides.length]);

  const safeVenueIdx = venueSlides.length > 0 ? activeVenueIdx % venueSlides.length : 0;

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#141C24]">
      {/* 1. Hero with Permanent Moving Imagery */}
      <Hero onOpenBooking={() => onOpenBooking()} onNavigate={onNavigate} />

      {/* 2. Home Showcase Section */}
      <section className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20">
        {/* Part A: Our Ladies Together — 1 Big Main Photo + 2 Complementary Photos */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E4DDD1]">
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#9A7440] font-semibold">
                The Company
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#121C2B] mt-1 tracking-tight">
                Our Ladies Together
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-light tracking-wide">
                Kylie &middot; Bliss &middot; Kitkate &middot; Faith &middot; Barbie &middot; Channel
              </p>
            </div>
          </div>

          {/* Asymmetric 1 Big Photo + 2 Complementary Photos Grid */}
          <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[540px] gap-4">
            {/* Big Showcase Group Photo (8 cols) */}
            <div
              onClick={() => setGroupLightboxIdx(0)}
              className="lg:col-span-8 relative h-[340px] sm:h-[420px] lg:h-[540px] min-h-0 min-w-0 rounded-2xl overflow-hidden bg-[#0E1622] border border-[#E4DDD1] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer group"
            >
              <img
                src={groupPhotos[0]}
                alt="The Pearl Ladies 1"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B121E]/25 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3.5 right-3.5 z-10">
                <span className="p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md inline-flex">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* 2 Complementary Stacked Photos (4 cols) */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-4 h-[200px] sm:h-[250px] lg:h-[540px] min-h-0 min-w-0 overflow-hidden">
              {[1, 2].map((groupIdx) => (
                <div
                  key={groupIdx}
                  onClick={() => setGroupLightboxIdx(groupIdx)}
                  className="relative w-full h-full min-h-0 min-w-0 rounded-2xl overflow-hidden bg-[#0E1622] border border-[#E4DDD1] shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer group"
                >
                  <img
                    src={groupPhotos[groupIdx]}
                    alt={`The Pearl Ladies ${groupIdx + 1}`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B121E]/20 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-3 right-3 z-10">
                    <span className="p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md inline-flex">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Action CTA to View Ladies Individually */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => onNavigate('ladies')}
              id="home-view-ladies-individually-btn"
              className="px-9 py-4 rounded-lg text-xs font-semibold tracking-[0.18em] uppercase text-[#121C2B] bg-gradient-to-r from-[#D4AF37] via-[#E8CC75] to-[#C8A45D] hover:brightness-105 transition-all inline-flex items-center gap-3 shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>View Ladies Individually</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Part B: Moving Venue Gallery Showcase */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#E4DDD1]">
            <div>
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#9A7440] font-semibold">
                Private Sanctuary
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#121C2B] mt-1 tracking-tight">
                The Venue
              </h2>
            </div>

            <button
              onClick={() => onNavigate('venue')}
              className="self-start sm:self-auto inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-[#121C2B] hover:text-[#9A7440] transition-colors cursor-pointer"
            >
              <span>Explore Full Venue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[440px] gap-4">
            {/* Left Moving Feature Photo */}
            <div
              onClick={() => onNavigate('venue')}
              className="lg:col-span-8 relative h-[260px] sm:h-[340px] lg:h-[440px] min-h-0 min-w-0 rounded-2xl overflow-hidden bg-[#0E1622] border border-[#E4DDD1] shadow-md cursor-pointer group"
            >
              {venueSlides.map((slide, idx) => {
                const isCurrent = idx === safeVenueIdx;
                return (
                  <img
                    key={slide.id}
                    src={getPhoto(slide.id, slide.image)}
                    alt="The Pearl Venue"
                    referrerPolicy="no-referrer"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      isCurrent
                        ? 'opacity-100 animate-kenburns-2 z-10'
                        : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  />
                );
              })}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Right Dual Moving Venue Stills */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] gap-4 h-[180px] sm:h-[220px] lg:h-[440px] min-h-0 min-w-0 overflow-hidden">
              {venueSlides.length > 0 && (
                <div
                  onClick={() => onNavigate('venue')}
                  className="relative w-full h-full min-h-0 min-w-0 rounded-2xl overflow-hidden bg-[#0E1622] border border-[#E4DDD1] shadow-md cursor-pointer group"
                >
                  <img
                    src={getPhoto(
                      venueSlides[(safeVenueIdx + 1) % venueSlides.length].id,
                      venueSlides[(safeVenueIdx + 1) % venueSlides.length].image
                    )}
                    alt="Private Suite"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover animate-kenburns-3 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              {venueSlides.length > 1 && (
                <div
                  onClick={() => onNavigate('venue')}
                  className="relative w-full h-full min-h-0 min-w-0 rounded-2xl overflow-hidden bg-[#0E1622] border border-[#E4DDD1] shadow-md cursor-pointer group"
                >
                  <img
                    src={getPhoto(
                      venueSlides[(safeVenueIdx + 2) % venueSlides.length].id,
                      venueSlides[(safeVenueIdx + 2) % venueSlides.length].image
                    )}
                    alt="Sanctuary Suite"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover animate-kenburns-1 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Discrete Duration & Rates Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0E1622] text-white border-y border-[#D4AF37]/25">
        <div className="max-w-xl mx-auto">
          <div className="bg-[#FAF8F4] text-[#121C2B] rounded-2xl p-8 sm:p-12 border border-[#D4AF37]/50 shadow-2xl text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-[0.16em] uppercase text-[#121C2B]">
              DURATION &amp; RATES
            </h2>

            <div className="flex items-center justify-center gap-3 w-48 mx-auto my-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#B68D65]" />
              <div className="w-2 h-2 rounded-full bg-[#B68D65]" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#B68D65]" />
            </div>

            <ul className="mt-6 space-y-4 text-left max-w-xs mx-auto">
              {DURATION_RATES.map((rate) => (
                <li
                  key={rate.duration}
                  className="flex items-center justify-between text-lg sm:text-xl font-serif text-[#121C2B] pb-3 border-b border-[#E4DDD1] last:border-b-0 last:pb-0"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#121C2B] shrink-0" />
                    <span>{rate.duration}</span>
                  </span>
                  <span className="text-[#8E7A64]" aria-hidden="true">&mdash;</span>
                  <span className="font-semibold tabular-nums">{rate.formattedPrice}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-xs text-[#6B7280] font-light leading-relaxed">
              Private en-suite suites &middot; Complimentary refreshments &middot; Discreet gated parking
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  "Hi The Pearl, I'd like to book a session today."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase text-white bg-[#1F7A4D] hover:bg-[#18643F] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </a>
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase text-[#121C2B] border border-[#121C2B]/25 hover:border-[#121C2B] transition-colors cursor-pointer"
              >
                Online Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Discrete Sanctuary Pillars & Policies Callout */}
      <section className="py-18 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-2 border-t border-[#D4AF37]/30 pt-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A7440] font-semibold">Private</p>
            <h3 className="font-serif text-xl font-normal text-[#121C2B]">En-suite seclusion</h3>
            <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed font-light">
              Every session takes place in an enclosed suite with private shower facilities and crisp linen.
            </p>
          </div>

          <div className="space-y-2 border-t border-[#D4AF37]/30 pt-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A7440] font-semibold">Discreet</p>
            <h3 className="font-serif text-xl font-normal text-[#121C2B]">Unmarked arrival</h3>
            <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed font-light">
              Quiet private setting with exact gate access shared directly once your booking is confirmed.
            </p>
          </div>

          <div className="space-y-2 border-t border-[#D4AF37]/30 pt-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A7440] font-semibold">Unhurried</p>
            <h3 className="font-serif text-xl font-normal text-[#121C2B]">By appointment</h3>
            <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed font-light">
              Staggered booking slots ensure total privacy from arrival behind the gate to departure.
            </p>
          </div>

          <div className="space-y-2 border-t border-[#D4AF37]/30 pt-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#9A7440] font-semibold">Confidential</p>
            <h3 className="font-serif text-xl font-normal text-[#121C2B]">Strict discretion</h3>
            <p className="text-xs sm:text-sm text-[#5A626A] leading-relaxed font-light">
              No public registries or shared records. Open daily from 10:00 until 20:00.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E4DDD1] rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#9A7440] font-semibold">
              House Standards
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#121C2B] mt-1">
              Private, respectful, and strictly confidential.
            </h3>
          </div>
          <button
            onClick={() => onNavigate('policies')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#121C2B] border border-[#121C2B]/30 hover:bg-[#121C2B] hover:text-white cursor-pointer whitespace-nowrap transition-colors rounded-lg shrink-0"
          >
            View Policies &rarr;
          </button>
        </div>
      </section>

      {/* Group Photo Lightbox */}
      {groupLightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setGroupLightboxIdx(null)}
        >
          <button
            type="button"
            onClick={() => setGroupLightboxIdx(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setGroupLightboxIdx((groupLightboxIdx - 1 + 3) % 3);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={groupPhotos[groupLightboxIdx]}
            alt={`Group Photo ${groupLightboxIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[86vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setGroupLightboxIdx((groupLightboxIdx + 1) % 3);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
