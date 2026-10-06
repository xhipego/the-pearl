import React, { useState, useEffect } from 'react';
import { PearlLogo } from './PearlLogo';
import { Phone, Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

export type PageId = 'home' | 'treatments' | 'venue' | 'policies' | 'contact';

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

  const navLinks: { id: PageId; name: string }[] = [
    { id: 'home', name: 'Home' },
    { id: 'treatments', name: 'Treatments & Prices' },
    { id: 'venue', name: 'The Venue' },
    { id: 'policies', name: 'Policies' },
    { id: 'contact', name: 'Contact' },
  ];

  const handleLinkClick = (id: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isTransparentHero = currentPage === 'home' && !isScrolled;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparentHero
          ? 'bg-gradient-to-b from-[#0F172A]/90 via-[#1B2B42]/80 to-[#1B2B42]/50 backdrop-blur-md border-b border-[#D4AF37]/25 py-3.5'
          : 'bg-[#1B2B42]/95 backdrop-blur-xl border-b border-[#D4AF37]/35 shadow-2xl py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 xl:gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <button
            onClick={(e) => handleLinkClick('home', e)}
            id="nav-brand-logo"
            className="hover:opacity-95 transition-opacity text-left cursor-pointer focus:outline-none flex items-center shrink-0"
          >
            <PearlLogo size="md" lightText={true} />
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 mx-auto shrink-0">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(link.id, e)}
                id={`nav-link-${link.id}`}
                className={`text-xs xl:text-sm tracking-[0.12em] uppercase font-medium transition-all relative py-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#F3E5AB] font-bold'
                    : 'text-slate-200 hover:text-[#D4AF37]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] shadow-[0_0_8px_rgba(212,175,55,0.8)] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Direct Call & Session Booking Button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${CONTACT_INFO.phone1}`}
            id="nav-call-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-100 hover:text-white transition-all rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/10 backdrop-blur-sm whitespace-nowrap shrink-0 shadow-sm"
            title="Call The Pearl: 073 995 5927"
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="whitespace-nowrap font-medium select-all">073&nbsp;995&nbsp;5927</span>
          </a>

          <button
            onClick={onOpenBooking}
            id="nav-book-modal-trigger"
            className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 border border-[#F3E5AB] rounded-full transition-all shadow-md cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Session
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={`tel:${CONTACT_INFO.phone1}`}
            className="p-2 rounded-full bg-white/10 text-white border border-white/20 hover:border-[#D4AF37]"
            aria-label="Call Concierge"
            title="Call 073 995 5927"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1B2B42] border-t border-[#D4AF37]/30 px-4 pt-4 pb-6 space-y-3 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleLinkClick(link.id, e)}
              className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm uppercase tracking-wider font-medium transition-colors ${
                currentPage === link.id
                  ? 'bg-gradient-to-r from-[#D4AF37]/20 to-transparent text-[#F3E5AB] font-bold border-l-4 border-[#D4AF37]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] rounded-full shadow-md"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
