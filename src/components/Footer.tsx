import React from 'react';
import { PearlLogo } from './PearlLogo';
import { CONTACT_INFO } from '../data/spaData';
import { Phone, MessageCircle, MapPin, Mail, Shield } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1B2B42] text-slate-300 pt-16 pb-12 border-t-2 border-[#D4AF37]/50 relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={(e) => handleNav('home', e)}
              className="text-left cursor-pointer focus:outline-none"
            >
              <PearlLogo size="lg" lightText={true} />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm mt-3">
              Polokwane&apos;s premier wellness spa retreat. Providing authentic full-body massages, body-to-body slides, and intimate relaxation in a safe, hygienic, and fully confidential environment.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <Shield className="w-4 h-4" />
              <span>Strictly 18+ Adult Wellness Venue &bull; Confidential &amp; Discreet</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-widest">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={(e) => handleNav('home', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('about', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  About The Pearl
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('rates', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Services &amp; Rates (From R500)
                </button>
              </li>
              <li>
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    'Hi The Pearl Wellness Spa, please send me photos and profiles of the available hostesses today.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4AF37] transition-colors text-left flex items-center gap-1.5"
                >
                  <span>Our Hostesses (WhatsApp)</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-[#25D366]/20 text-[#25D366] rounded font-medium">View</span>
                </a>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('policies', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Policies &amp; Code of Conduct
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('contact', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Contact &amp; Location
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-widest">
              Venue Inquiries
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>112 Genl Beyers Street, Welgelen, Polokwane</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>073 995 5927</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: +27 73 995 5927</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Policy Disclaimer Bar */}
        <div className="py-6 border-b border-white/5 text-[11px] text-slate-400 text-center space-y-2">
          <p className="font-serif italic text-slate-300">
            &ldquo;The Pearl maintains a strictly professional, therapeutic and sensual environment. Absolutely NO sexual intercourse or oral sex is permitted. We reserve the right to terminate any session immediately if policies are violated.&rdquo;
          </p>
          <p>
            Bookings essential. All visitors must be 18 years of age or older.
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>
            &copy; {new Date().getFullYear()} {CONTACT_INFO.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-3">
            <span>Website: {CONTACT_INFO.website}</span>
            <span>&bull;</span>
            <span>Welgelen, Polokwane</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
