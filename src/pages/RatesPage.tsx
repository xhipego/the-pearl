import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { RatesAndServices } from '../components/RatesAndServices';
import { PageId } from '../components/Navbar';
import { MessageCircle, Calendar, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface RatesPageProps {
  onNavigate: (page: PageId) => void;
  onSelectBooking: (duration: string, addOn?: string) => void;
  onOpenBooking: () => void;
}

export const RatesPage: React.FC<RatesPageProps> = ({
  onNavigate,
  onSelectBooking,
  onOpenBooking,
}) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Page Banner Header */}
      <PageBanner
        title="Treatments &amp; Prices"
        subtitle="Transparent Pricing Per Person • No Hidden Fees"
        badge="Quality &bull; Value &bull; Recovery"
        onNavigate={onNavigate}
        currentPageName="Treatments & Prices"
      />

      {/* Complete Rates & Treatments Menu */}
      <RatesAndServices onSelectBooking={onSelectBooking} />

      {/* Bottom Navigational Banner */}
      <div className="bg-[#1B2B42] text-white py-16 border-t border-[#D4AF37]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-mono text-xs tracking-widest uppercase text-[#F3E5AB]">
            Ready to book your session?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Private Sessions Daily from 10:00 to 20:00
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light">
            In by six, out by seven. Contact our Welgelegen reception directly on WhatsApp or book online to receive instant confirmation and gate directions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                "Hi, I'd like to book a massage. Which times are available today?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-[#1F7A4D] hover:bg-[#18643F] shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book on WhatsApp (073 995 5927)</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Book Online Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
