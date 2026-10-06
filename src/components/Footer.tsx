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
              Private massage and recovery for men in Welgelegen, Polokwane. Providing authentic therapeutic massages, deep tissue recovery, private rooms, and an unhurried atmosphere behind the gate.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
              <Shield className="w-4 h-4" />
              <span>Strictly Professional &bull; Confidential &bull; Non-Sexual Therapeutic Spa</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-widest">
              Explore
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
                  onClick={(e) => handleNav('treatments', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Treatments &amp; Prices
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('venue', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  The Venue &amp; Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNav('policies', e)}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  Spa Policies
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
              Contact
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>073 995 5927 (Calls &amp; Inquiries)</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    "Hi, I'd like to book a massage. Which times are available?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-emerald-400"
                >
                  WhatsApp: 073 995 5927
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
        <div className="py-6 border-b border-white/5 text-[11px] text-slate-400 text-center space-y-2">
          <p className="font-serif italic text-slate-300">
            &ldquo;All treatments are strictly therapeutic and non-sexual. Any sexual comment, request, or inappropriate behaviour ends the treatment immediately.&rdquo;
          </p>
          <p className="text-slate-400">
            Open Monday – Sunday, 10:00 – 20:00 &bull; Secure off-street parking behind the gate &bull; Strictly 18+
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col items-center justify-center text-center text-[11px] text-slate-400 gap-0.5">
          <p>&copy; 2026 {CONTACT_INFO.name}</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
