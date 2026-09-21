import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Shield,
  ChevronDown,
  MapPin,
  Clock,
} from 'lucide-react';
import { CONTACT_INFO, VENUE_SNIPPETS } from '../data/spaData';
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

  const snippets = movingSnippets && movingSnippets.length > 0 ? movingSnippets : VENUE_SNIPPETS;
  const safeSnippetIndex = currentSnippetIndex % snippets.length;
  const activeSnippet = snippets[safeSnippetIndex] || snippets[0];

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
      className="relative min-h-[95vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#162234]"
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
                className={`w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05] ${
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

      {/* Decorative Floating Pearl Accents */}
      <div className="absolute top-28 left-8 w-12 h-12 rounded-full pearl-sphere opacity-40 blur-[1px] hidden md:block animate-pulse z-20" />
      <div className="absolute bottom-36 right-10 w-16 h-16 rounded-full pearl-sphere opacity-50 blur-[1px] hidden md:block z-20" />



      {/* Central Content Container */}
      <div className="relative z-30 max-w-4xl mx-auto text-center flex flex-col items-center my-auto py-6">
        {/* Central Logo Motif with exact shell & pearl emblem */}
        <div className="mb-4">
          <PearlLogo size="xl" showText={false} />
        </div>

        {/* Brand Headline matching the exact company logo */}
        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.16em] uppercase leading-tight drop-shadow-lg"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
        >
          THE PEARL
        </h1>
        <p
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#F3E5AB] tracking-widest mt-1 mb-5 drop-shadow"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
        >
          Wellness Spa
        </p>

        {/* Artistic Gold Divider with Center Pearl Bead */}
        <div className="flex items-center justify-center gap-3 w-full max-w-md my-1">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
          <div className="w-4 h-4 rounded-full pearl-sphere shrink-0 border border-[#D4AF37]/80 shadow-md" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]" />
        </div>

        {/* Tagline */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-100 font-light max-w-2xl leading-relaxed drop-shadow">
          Indulge in a Journey of Deep Relaxation &amp; Sensual Bodywork
        </p>

        {/* Key Highlights Micro-Bar */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-300">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#D4AF37]" /> 100% Discreet &amp; Confidential
          </span>
          <span className="hidden sm:inline text-[#D4AF37]">&bull;</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Welgelen, Polokwane
          </span>
          <span className="hidden sm:inline text-[#D4AF37]">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#D4AF37]" /> Daily 10:00 – 20:00
          </span>
        </div>

        {/* Two Primary CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => onNavigate?.('rates')}
            id="hero-cta-rates"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-[#F3E5AB] cursor-pointer"
          >
            Experiences from R500
          </button>

          <a
            href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
              `Hi The Pearl Wellness Spa, I would like to inquire about booking a session in your ${activeSnippet.title}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-whatsapp"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-white bg-[#1B2B42]/90 hover:bg-[#152234] border border-[#D4AF37]/80 hover:border-[#D4AF37] shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Book via WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Subtle Luxury Scroll Indicator */}
      <div className="relative z-30 flex justify-center pb-2 pt-4">
        <button
          onClick={() => onNavigate?.('about')}
          className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors flex flex-col items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-medium cursor-pointer group"
        >
          <span className="group-hover:tracking-[0.24em] transition-all">Explore The Experience</span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce" />
        </button>
      </div>
    </section>
  );
};
