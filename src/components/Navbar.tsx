import React, { useState, useEffect } from 'react';
import { PearlLogo } from './PearlLogo';
import { Phone, Menu, X } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

export type PageId = 'home' | 'venue' | 'ladies' | 'policies' | 'contact';

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
    { id: 'venue', name: 'The Venue' },
    { id: 'ladies', name: 'Our Ladies' },
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
          ? 'bg-gradient-to-b from-[#0E1622]/90 via-[#141F30]/75 to-transparent backdrop-blur-sm border-b border-white/10 py-3.5'
          : 'bg-[#121C2B]/95 backdrop-blur-xl border-b border-[#D4AF37]/25 shadow-xl py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center shrink-0">
          <button
            onClick={(e) => handleLinkClick('home', e)}
            id="nav-brand-logo"
            className="hover:opacity-90 transition-opacity text-left cursor-pointer focus:outline-none flex items-center shrink-0 whitespace-nowrap"
          >
            <PearlLogo size="md" lightText={true} />
          </button>
        </div>

        {/* Zone 2: 5 Single-Line Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9 mx-auto shrink-0">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={(e) => handleLinkClick(link.id, e)}
                id={`nav-link-${link.id}`}
                className={`text-xs xl:text-[13px] tracking-[0.16em] uppercase font-medium transition-colors relative py-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#F3E5AB]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Discreet Call & Primary Action */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a
            href={`tel:${CONTACT_INFO.phone1}`}
            id="nav-call-btn"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-200 hover:text-[#F3E5AB] transition-colors whitespace-nowrap shrink-0 tabular-nums"
            title={`Call ${CONTACT_INFO.phone1Formatted}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span className="whitespace-nowrap">063&nbsp;551&nbsp;9026</span>
          </a>

          <button
            onClick={onOpenBooking}
            id="nav-book-modal-trigger"
            className="px-5 py-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#121C2B] bg-[#D4AF37] hover:bg-[#E5C55C] rounded transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Privately
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <a
            href={`tel:${CONTACT_INFO.phone1}`}
            className="p-2.5 rounded-full bg-white/10 text-white border border-white/15 hover:border-[#D4AF37]"
            aria-label="Call Concierge"
            title={`Call ${CONTACT_INFO.phone1Formatted}`}
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-menu-btn"
            className="p-2.5 text-white hover:text-[#D4AF37] focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121C2B] border-t border-[#D4AF37]/25 px-4 pt-4 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={(e) => handleLinkClick(link.id, e)}
              className={`block w-full text-left py-2.5 px-3 rounded text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
                currentPage === link.id
                  ? 'bg-white/10 text-[#F3E5AB]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#121C2B] bg-[#D4AF37] hover:bg-[#E5C55C] rounded transition-colors cursor-pointer"
            >
              Book Privately
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
