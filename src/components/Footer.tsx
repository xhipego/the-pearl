import React from 'react';
import { PearlLogo } from './PearlLogo';
import { CONTACT_INFO } from '../data/spaData';
import { Phone, MessageCircle, Mail, Shield } from 'lucide-react';
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
    <footer className="bg-[#121C2B] text-slate-300 pt-16 pb-12 border-t border-[#D4AF37]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Brand & Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={(e) => handleNav('home', e)}
              className="text-left cursor-pointer focus:outline-none"
            >
              <PearlLogo size="lg" lightText={true} />
            </button>
            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm mt-3">
              A private, understated gentlemen&apos;s sanctuary. Discreet en-suite suites, attentive company, and secure parking behind closed gates.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <Shield className="w-4 h-4" />
              <span>Private &middot; Confidential &middot; Strictly 18+</span>
            </div>
          </div>

          {/* Quick Nav Links matching top bar */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={(e) => handleNav('home', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('venue', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  The Venue
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('ladies', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Our Ladies
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('policies', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Policies
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('contact', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-widest">
              Contact
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone1}`} className="hover:text-[#F3E5AB] tabular-nums">
                  063 551 9026
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    "Hi The Pearl, I'd like to inquire about availability today."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-emerald-400 tabular-nums"
                >
                  WhatsApp: 063 551 9026
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Code of Conduct Bar */}
        <div className="py-6 border-b border-white/5 text-[11px] text-slate-400 text-center space-y-1.5">
          <p className="text-slate-300">
            Open Monday – Sunday, 10:00 – 20:00 &middot; Private by Appointment &middot; Strictly 18+
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col items-center justify-center text-center text-[11px] text-slate-400 gap-0.5">
          <p>&copy; 2026 {CONTACT_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
