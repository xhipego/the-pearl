import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { TherapistGrid } from '../components/TherapistGrid';
import { PageId } from '../components/Navbar';
import { MessageCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-[#F5F2EC]">
      {/* Page Banner */}
      <PageBanner
        title="Our Ladies"
        subtitle="Discreet, Attentive & Unhurried Company"
        badge="Private by Appointment"
        onNavigate={onNavigate}
        currentPageName="Our Ladies"
      />

      {/* Ladies Grid */}
      <TherapistGrid
        onSelectBooking={onSelectBooking}
        title="Meet Our Ladies"
        subtitle="Select any portrait to view all 5 photos and private booking options"
      />

      {/* Discreet Concierge CTA Banner */}
      <div className="bg-[#121C2B] text-white py-16 border-t border-[#D4AF37]/25">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F3E5AB]">
            Private Appointments by Reservation
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            Confirm today&apos;s schedule directly with our concierge via WhatsApp or submit a quiet request online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hi The Pearl, I would like to check availability for the ladies today.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded bg-[#1F7A4D] hover:bg-[#18643F] text-white font-semibold text-xs uppercase tracking-[0.14em] transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Reception (063 551 9026)</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="py-3 px-6 rounded bg-[#D4AF37] hover:bg-[#E5C55C] text-[#121C2B] font-semibold text-xs uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Book Privately
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
