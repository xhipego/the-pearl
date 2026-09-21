import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Sparkles,
  Shield,
  ChevronDown,
  MapPin,
  Clock,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Eye,
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
  const [isPlaying, setIsPlaying] = useState(true);
  const { getPhoto } = useVenuePhotos();

  const activeSnippet = VENUE_SNIPPETS[currentSnippetIndex] || VENUE_SNIPPETS[0];

  // Auto-cycle through venue snippets every 6 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSnippetIndex((prev) => (prev + 1) % VENUE_SNIPPETS.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentSnippetIndex((prev) => (prev - 1 + VENUE_SNIPPETS.length) % VENUE_SNIPPETS.length);
  };

  const handleNext = () => {
    setCurrentSnippetIndex((prev) => (prev + 1) % VENUE_SNIPPETS.length);
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#162234]"
    >
      {/* Background Moving Views Carousel with continuous cinematic Ken Burns animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {VENUE_SNIPPETS.map((snippet, idx) => {
          const isCurrent = idx === currentSnippetIndex;
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
                className={`w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.06] ${
                  isCurrent && isPlaying ? animClass : isCurrent ? 'scale-105' : 'scale-100'
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

      {/* Top Real-Time Moving View Indicator */}
      <div className="relative z-30 max-w-5xl mx-auto w-full pt-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B2B42]/85 border border-[#D4AF37]/50 text-[#D4AF37] text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold backdrop-blur-md shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>
            Moving View {currentSnippetIndex + 1} of {VENUE_SNIPPETS.length}:{' '}
            <strong className="text-white font-medium">{activeSnippet.badge}</strong>
          </span>
        </div>

        <button
          onClick={() => onNavigate?.('rates')}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-[#D4AF37] transition-colors bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>View Rates (From R500)</span>
        </button>
      </div>

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
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Welgelegen, Polokwane
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
            View Experiences &amp; Rates (From R500)
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

      {/* Bottom Venue Snippet Navigation Strip (Inspired directly by QoH Pretoria) */}
      <div className="relative z-30 max-w-5xl mx-auto w-full pt-2">
        <div className="bg-[#1B2B42]/80 backdrop-blur-md rounded-2xl border border-[#D4AF37]/40 p-3 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Left: Current Active Snippet Description */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37]/60 hidden sm:block">
                <img
                  src={activeSnippet.image}
                  alt={activeSnippet.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                    Active Venue Background
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                    {activeSnippet.videoLabel}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                  {activeSnippet.title}
                </p>
              </div>
            </div>

            {/* Center/Right: Snippet Selector Pills with Progress Bars */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-center sm:justify-end overflow-x-auto pb-1 sm:pb-0">
              {VENUE_SNIPPETS.map((snippet, idx) => {
                const isActive = idx === currentSnippetIndex;
                return (
                  <button
                    key={snippet.id}
                    id={`hero-view-pill-${snippet.id}`}
                    onClick={() => {
                      setCurrentSnippetIndex(idx);
                    }}
                    className={`relative px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider transition-all whitespace-nowrap overflow-hidden cursor-pointer ${
                      isActive
                        ? 'bg-[#D4AF37] text-[#1B2B42] font-bold shadow-md scale-105'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>0{idx + 1} {snippet.badge.split(' ')[0]}</span>
                    {/* Animated Progress Bar when active and playing */}
                    {isActive && isPlaying && (
                      <span className="absolute bottom-0 left-0 h-0.5 bg-[#1B2B42] w-full animate-progress" />
                    )}
                  </button>
                );
              })}

              {/* Pause/Play Controls */}
              <div className="flex items-center gap-1 pl-2 border-l border-white/10">
                <button
                  id="hero-view-prev-btn"
                  onClick={handlePrev}
                  className="p-1 rounded-md text-slate-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Previous Snippet"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="hero-view-play-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded-md text-slate-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause Background Tour' : 'Play Background Tour'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  id="hero-view-next-btn"
                  onClick={handleNext}
                  className="p-1 rounded-md text-slate-300 hover:text-[#D4AF37] hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="Next Snippet"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation indicator */}
        <div className="flex justify-center mt-3">
          <button
            onClick={() => onNavigate?.('about')}
            className="text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-[10px] tracking-widest uppercase font-medium cursor-pointer"
          >
            <span>Explore The Pearl Experience</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
