import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { TherapistGrid } from '../components/TherapistGrid';
import { PageId } from '../components/Navbar';
import { MessageCircle, ShieldCheck, Sparkles, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface HostessesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectBooking: (therapistName: string) => void;
  onOpenBooking: () => void;
}

export const HostessesPage: React.FC<HostessesPageProps> = ({
  onNavigate,
  onSelectBooking,
  onOpenBooking,
}) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Banner */}
      <PageBanner
        title="Our Sensual Hostesses"
        subtitle="Elegance, Warmth & Intuitive Touch • Meet The Ladies of The Pearl"
        badge="Discreet &bull; Verified &bull; Welgelen, Polokwane"
        onNavigate={onNavigate}
        currentPageName="The Girls"
      />

      {/* Intro Context Banner */}
      <div className="bg-[#F5EFEB]/70 border-b border-[#D4AF37]/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Gentlemen&apos;s Sanctuary Companions</span>
          </span>
          <p className="text-xs sm:text-sm text-gray-700 font-light leading-relaxed">
            Every hostess at The Pearl is personally selected for her warmth, genuine feminine grace, conversational charm, and attentive touch. Browse each profile to see their look descriptions, physical attributes, and specialty sessions.
          </p>
        </div>
      </div>

      {/* Hostesses Grid */}
      <TherapistGrid
        onSelectBooking={onSelectBooking}
        title="Meet Our Ladies"
        subtitle="Verified Photographs &amp; Appearance Details"
      />

      {/* Bottom CTA Banner */}
      <div className="bg-[#1B2B42] text-white py-16 border-t border-[#D4AF37]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F3E5AB]">
            Reserve Your Preferred Hostess Today
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light">
            Shifts and availability update throughout the day. Contact our discreet concierge directly via WhatsApp or phone to confirm her immediate schedule.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hi The Pearl Wellness Spa, I would like to check availability for the hostesses on shift today.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1B2B42] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#1B2B42]" />
              <span>WhatsApp Concierge (073 995 5927)</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-[#D4AF37] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Online Reservation Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
