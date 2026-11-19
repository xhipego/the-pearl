import React, { useState, useEffect } from 'react';
import { Shield, Clock, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';
import { PearlLogo } from './PearlLogo';
import { PageId } from './Navbar';
import { useVenuePhotos } from '../context/VenuePhotoContext';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { heroSlides } = useVenuePhotos();

  const safeIndex = heroSlides.length > 0 ? currentSlideIndex % heroSlides.length : 0;

  useEffect(() => {
    if (heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleNext = () => {
    if (heroSlides.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    if (heroSlides.length <= 1) return;
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-[86vh] flex flex-col justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0E1622]"
    >
      {/* Background Moving Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {heroSlides.map((slide, idx) => {
          const isCurrent = idx === safeIndex;
          const animClass =
            idx % 3 === 0
              ? 'animate-kenburns-1'
              : idx % 3 === 1
              ? 'animate-kenburns-2'
              : 'animate-kenburns-3';

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt="The Pearl Wellness Spa"
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${
                  slide.isPortrait ? 'object-top' : 'object-center'
                } filter brightness-[0.58] contrast-[1.06] ${
                  isCurrent ? animClass : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#0E1622]/80 via-[#0E1622]/55 to-[#0E1622]/95" />
      </div>

      {/* Central Discrete Luxury Statement — Just "The Pearl" */}
      <div className="relative z-30 max-w-3xl mx-auto text-center flex flex-col items-center my-auto py-8">
        <div className="mb-5">
          <PearlLogo size="xl" showText={false} />
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold text-white tracking-[0.14em] uppercase leading-tight mb-5 max-w-4xl">
          The Pearl Spa Polokwane
        </h1>

        <div className="flex items-center justify-center gap-3 w-full max-w-xs my-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
          <div className="w-2.5 h-2.5 rounded-full pearl-sphere shrink-0 border border-[#D4AF37]/70" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
        </div>

        <p className="mt-5 text-sm sm:text-base text-slate-200 font-light max-w-xl leading-relaxed text-balance">
          Understated elegance, private en-suite rooms, and attentive company behind closed gates.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Daily 08:00 – 22:00
          </span>
          <span aria-hidden="true" className="text-[#D4AF37]/70">&middot;</span>
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#D4AF37]" /> By Appointment Only
          </span>
        </div>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onNavigate?.('ladies')}
            id="hero-cta-ladies"
            className="w-full sm:w-auto px-8 py-3.5 rounded text-xs font-semibold tracking-[0.16em] uppercase text-[#121C2B] bg-[#D4AF37] hover:bg-[#E5C55C] transition-colors cursor-pointer whitespace-nowrap"
          >
            View Our Ladies
          </button>

          <a
            href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
              "Hi The Pearl, I'd like to inquire about availability today."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-whatsapp"
            className="w-full sm:w-auto px-8 py-3.5 rounded text-xs font-semibold tracking-[0.16em] uppercase text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>WhatsApp Reception</span>
          </a>
        </div>
      </div>

      {/* Minimal Carousel Controls */}
      {heroSlides.length > 1 && (
        <div className="relative z-30 max-w-6xl w-full mx-auto flex items-center justify-end gap-2.5 pt-4 border-t border-white/10 text-xs text-slate-300">
          <div className="flex items-center gap-2.5 ml-auto">
            <span className="text-[11px] text-slate-400 tabular-nums mr-1">
              {safeIndex + 1} / {heroSlides.length}
            </span>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="p-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
