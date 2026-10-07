import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  MessageCircle,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';
import { PearlLogo } from './PearlLogo';
import { PageId } from './Navbar';
import { useVenuePhotos } from '../context/VenuePhotoContext';

interface HeroProps {
  onOpenBooking: () => void;
  onNavigate?: (page: PageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onNavigate }) => {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const { getPhoto, movingSnippets } = useVenuePhotos();

  const snippets = movingSnippets && movingSnippets.length > 0 ? movingSnippets : [];
  const safeSnippetIndex = snippets.length > 0 ? currentSnippetIndex % snippets.length : 0;

  // Auto-cycle through venue snippets smoothly every 6.5 seconds in the background
  useEffect(() => {
    if (snippets.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSnippetIndex((prev) => (prev + 1) % snippets.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [snippets.length]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#162234]"
    >
      {/* Background Moving Views Carousel with continuous cinematic Ken Burns animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {snippets.map((snippet, idx) => {
          const isCurrent = idx === safeSnippetIndex;
          const animClass =
            idx % 3 === 0
              ? 'animate-kenburns-1'
              : idx % 3 === 1
              ? 'animate-kenburns-2'
              : 'animate-kenburns-3';
          const activeImgSrc = getPhoto(snippet.id, snippet.image);

          return (
            <div
              key={snippet.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={activeImgSrc}
                alt={snippet.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center filter brightness-[0.68] contrast-[1.08] ${
                  isCurrent ? animClass : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Rich cinematic gradient scrims ensuring pristine typography legibility */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#1B2B42]/85 via-[#1B2B42]/65 to-[#1B2B42]/95" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.14)_0%,transparent_75%)] pointer-events-none" />
      </div>

      {/* Central Content Container */}
      <div className="relative z-30 max-w-4xl mx-auto text-center flex flex-col items-center my-auto py-6">
        {/* Central Logo Motif */}
        <div className="mb-4">
          <PearlLogo size="xl" showText={false} />
        </div>

        {/* Brand Headline */}
        <h1
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.14em] uppercase leading-tight drop-shadow-lg"
        >
          THE PEARL
        </h1>
        <p
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#F3E5AB] tracking-widest mt-1 mb-4 drop-shadow"
        >
          Men&apos;s Day Spa
        </p>

        {/* Artistic Gold Divider */}
        <div className="flex items-center justify-center gap-3 w-full max-w-md my-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
          <div className="w-3.5 h-3.5 rounded-full pearl-sphere shrink-0 border border-[#D4AF37]/80 shadow-md" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
        </div>

        {/* Main Tagline & Description for Gentlemen */}
        <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal max-w-2xl leading-snug drop-shadow">
          Private massage and recovery for men in Polokwane.
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-200 font-light max-w-2xl leading-relaxed drop-shadow">
          Tailored for the gentleman managing demanding responsibilities throughout the week. Step into a tranquil, refined sanctuary designed to help you decompress, release stress, and unwind in complete comfort.
        </p>

        {/* Key Highlights Micro-Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#D4AF37]" /> Open Daily From 10:00 - 20:00
          </span>
          <span className="hidden sm:inline text-[#D4AF37]">&bull;</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Discreet &amp; Therapeutic
          </span>
        </div>

        {/* Hero CTA Buttons: Treatments & Prices + Book on WhatsApp next to it */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onNavigate?.('treatments')}
            id="hero-cta-treatments"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 shadow-lg transition-all duration-300 border border-[#F3E5AB] cursor-pointer"
          >
            Treatments &amp; Prices
          </button>

          <a
            href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
              "Hi, I'd like to book a massage. Which times are available?"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-whatsapp"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-white bg-[#1F7A4D] hover:bg-[#18643F] shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer border border-[#25D366]/40"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Book on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
