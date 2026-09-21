import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { RatesAndServices } from '../components/RatesAndServices';
import { PageId } from '../components/Navbar';
import { UserCheck, MessageCircle, Calendar } from 'lucide-react';
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
        title="Services & Transparent Rates"
        subtitle="Clear, Honest Pricing with No Hidden Fees • Sessions from R500"
        badge="Pure Value &bull; Authentic Care"
        onNavigate={onNavigate}
        currentPageName="Services & Rates"
      />

      {/* Complete Rates & Interactive Estimator Component */}
      <RatesAndServices onSelectBooking={onSelectBooking} />

      {/* Next Step Navigational CTA Banner */}
      <div className="bg-[#1B2B42] text-white py-16 border-t border-[#D4AF37]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Connect With Our Concierge to View Hostesses
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light">
            Our hostesses are available for booking daily. To maintain discreet privacy and see today&apos;s available roster and photographs, text our reception directly on WhatsApp at 073 995 5927.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hi The Pearl Wellness Spa, please send me photos and profiles of the available hostesses today.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-[#25D366]/25 border border-[#25D366] hover:bg-[#25D366]/35 shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp to View Hostesses</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Book by Date &amp; Time</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
