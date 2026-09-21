import React, { useState, useEffect } from 'react';
import { PearlLogo } from './PearlLogo';
import { Phone, MessageCircle, Menu, X, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

export type PageId = 'home' | 'about' | 'rates' | 'policies' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; name: string; fullLabel?: string }[] = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About Us' },
    { id: 'rates', name: 'Services & Rates' },
    { id: 'policies', name: 'Policies', fullLabel: 'Policies & Safety' },
    { id: 'contact', name: 'Contact', fullLabel: 'Contact & Location' },
  ];

  const handleLinkClick = (id: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The top bar seamlessly integrates:
  // - Transparent subtle dark-glass over the hero on Home page at top
  // - Rich luxury midnight-navy with champagne gold accents when scrolled or on inner pages
  const isTransparentHero = currentPage === 'home' && !isScrolled;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparentHero
          ? 'bg-gradient-to-b from-[#0F172A]/90 via-[#1B2B42]/75 to-[#1B2B42]/40 backdrop-blur-md border-b border-[#D4AF37]/25 py-3.5'
          : 'bg-[#1B2B42]/95 backdrop-blur-xl border-b border-[#D4AF37]/35 shadow-2xl py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-4">
        {/* Left: Brand Logo with exact company clam & pearl emblem */}
        <div className="flex items-center shrink-0">
          <button
            onClick={(e) => handleLinkClick('home', e)}
            id="nav-brand-logo"
            className="hover:opacity-95 transition-opacity text-left cursor-pointer focus:outline-none flex items-center shrink-0"
          >
            <PearlLogo size="md" lightText={true} />
          </button>
        </div>

        {/* Center: Desktop Navigation Links (Centered using mx-auto with equal space on left and right) */}
        <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 2xl:gap-7 mx-auto shrink-0">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(link.id, e)}
                id={`nav-link-${link.id}`}
                className={`text-[11px] xl:text-xs tracking-[0.09em] xl:tracking-[0.14em] uppercase font-medium transition-all relative py-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#F3E5AB] font-bold'
                    : 'text-slate-200 hover:text-[#D4AF37]'
                }`}
              >
                {link.name}
                {/* Active Indicator Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] shadow-[0_0_8px_rgba(212,175,55,0.8)] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Action Controls */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
          {/* Direct Phone Call */}
          <a
            href={`tel:${CONTACT_INFO.phone1}`}
            id="nav-call-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-100 hover:text-white transition-all rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/10 backdrop-blur-sm whitespace-nowrap shrink-0 shadow-sm"
            title="Call The Pearl Concierge: 073 995 5927"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="whitespace-nowrap font-medium select-all">073&nbsp;995&nbsp;5927</span>
          </a>

          {/* WhatsApp Direct Chat */}
          <a
            href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
              'Hi The Pearl Wellness Spa, I would like to inquire about booking a session.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-whatsapp-btn"
            className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-semibold tracking-wide text-white bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/60 rounded-full shadow-sm hover:shadow-md transition-all backdrop-blur-sm whitespace-nowrap shrink-0"
            title="Chat with Concierge on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
            <span className="hidden xl:inline whitespace-nowrap">WhatsApp</span>
          </a>

          {/* Book Session Trigger Button */}
          <button
            onClick={onOpenBooking}
            id="nav-book-modal-trigger"
            className="px-3.5 xl:px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 border border-[#F3E5AB] rounded-full transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Session
          </button>
        </div>

        {/* Mobile Hamburger & Quick Call (Below lg) */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={`tel:${CONTACT_INFO.phone1}`}
            className="p-2 rounded-full bg-white/10 text-white border border-white/20 hover:border-[#D4AF37]"
            aria-label="Call Concierge"
            title="Call 073 995 5927"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
          </a>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-mobile-wa-icon"
            className="p-2 rounded-full bg-white/10 text-white border border-[#25D366]/50"
            aria-label="WhatsApp"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-menu-btn"
            className="p-2 text-white hover:text-[#D4AF37] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#1B2B42]/98 border-b border-[#D4AF37]/35 px-6 py-5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2"
        >
          <nav className="flex flex-col gap-2.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleLinkClick(link.id, e)}
                  className={`text-left text-sm font-semibold tracking-wider uppercase py-2.5 px-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#1B2B42] font-bold shadow-md'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.fullLabel || link.name}
                </button>
              );
            })}

            <div className="pt-3 flex flex-col gap-2.5 border-t border-white/10 mt-1">
              <div className="flex items-center gap-2 text-xs text-slate-300 pb-1">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Discreet &amp; Safe • Welgelegen, Polokwane</span>
              </div>
              <a
                href={`tel:${CONTACT_INFO.phone1}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-[#D4AF37]/50 text-xs font-semibold text-white bg-white/10 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="whitespace-nowrap">Call 073&nbsp;995&nbsp;5927</span>
              </a>
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hi The Pearl Wellness Spa, I would like to inquire about booking a session.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#25D366]/20 border border-[#25D366]/50 text-xs font-semibold text-white"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Chat via WhatsApp
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-xs font-bold uppercase tracking-wider text-[#1B2B42] shadow-md cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
