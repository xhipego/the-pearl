import React from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { PageId } from './Navbar';
import { PearlLogo } from './PearlLogo';

interface PageBannerProps {
  title: string;
  subtitle: string;
  badge?: string;
  onNavigate: (page: PageId) => void;
  currentPageName: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  title,
  subtitle,
  badge,
  onNavigate,
  currentPageName,
}) => {
  return (
    <div className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 bg-gradient-to-b from-[#0F172A] via-[#1B2B42] to-[#142032] text-white overflow-hidden border-b border-[#D4AF37]/30">
      {/* Ambient background gold glow & blur orbs */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#D4AF37]/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Decorative subtle pearl shell watermark in background */}
      <div className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none">
        <PearlLogo size="xl" showText={false} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Breadcrumb Bar */}
        <div className="inline-flex items-center gap-2 text-xs text-slate-300 mb-4 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#D4AF37]" />
          <span className="text-[#F3E5AB] font-semibold">{currentPageName}</span>
        </div>

        {/* Optional Category Pill */}
        {badge && (
          <div className="flex items-center justify-center gap-1.5 text-xs tracking-[0.2em] uppercase font-semibold text-[#D4AF37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase text-white drop-shadow-md">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#E5C378] max-w-2xl mx-auto mt-3 drop-shadow">
          {subtitle}
        </p>

        {/* Elegant Gold Divider with Center Pearl Bead */}
        <div className="flex items-center justify-center gap-3 w-48 mx-auto mt-6">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37] shadow" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
};
