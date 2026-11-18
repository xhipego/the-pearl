import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { PageId } from '../components/Navbar';
import { CONTACT_INFO } from '../data/spaData';
import { useVenuePhotos } from '../context/VenuePhotoContext';
import {
  MessageCircle,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface VenuePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const VenuePage: React.FC<VenuePageProps> = ({ onNavigate, onOpenBooking }) => {
  const { allSlots, enabledSlotIds, getPhoto } = useVenuePhotos();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const visibleSlots = allSlots.filter((s) => enabledSlotIds.includes(s.id));
  const activeSlots = visibleSlots.length > 0 ? visibleSlots : allSlots;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % activeSlots.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + activeSlots.length) % activeSlots.length);
  };

  // Compute exact editorial bento span classes so every row sums cleanly with zero white gaps
  const getBentoClass = (idx: number, total: number): string => {
    if (total === 1) return 'sm:col-span-2 lg:col-span-3 sm:row-span-2';
    if (idx === 0 && total >= 3) {
      return 'sm:col-span-2 sm:row-span-2';
    }
    if (idx === 1 || idx === 2) {
      return 'col-span-1 row-span-1';
    }
    if (idx >= 3 && idx < 6) {
      const remMid = Math.min(3, total - 3);
      if (remMid === 1 && idx === 3) return 'sm:col-span-2 lg:col-span-3 row-span-1';
      if (remMid === 2 && idx === 3) return 'sm:col-span-2 lg:col-span-2 row-span-1';
      return 'col-span-1 row-span-1';
    }
    const offsetAfter6 = idx - 6;
    const remAfter6 = total - 6;
    const rowStart = Math.floor(offsetAfter6 / 3) * 3;
    const rowCount = Math.min(3, remAfter6 - rowStart);
    if (rowCount === 1) return 'sm:col-span-2 lg:col-span-3 row-span-1';
    if (rowCount === 2 && offsetAfter6 % 3 === 0) return 'sm:col-span-2 lg:col-span-2 row-span-1';
    return 'col-span-1 row-span-1';
  };

  return (
    <div className="min-h-screen bg-[#F6F3ED] text-[#141C24]">
      <PageBanner
        title="The Venue"
        subtitle="Private Sanctuary"
        onNavigate={onNavigate}
        currentPageName="The Venue"
      />

      {/* Editorial Bento Gallery — Compact & Zero White Gaps */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-6">

        {/* Pure Photography Grid — No Descriptions & Zero White Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:auto-rows-[220px] lg:auto-rows-[245px]">
          {activeSlots.map((slot, idx) => {
            const src = getPhoto(slot.id, slot.defaultSrc);
            const spanClass = getBentoClass(idx, activeSlots.length);

            return (
              <div
                key={slot.id}
                onClick={() => setLightboxIdx(idx)}
                className={`relative h-[240px] sm:h-full overflow-hidden rounded-xl bg-[#0E1622] border border-[#E4DDD1] shadow-sm hover:shadow-xl group cursor-pointer ${spanClass}`}
              >
                <img
                  src={src}
                  alt={`The Pearl Venue ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />

                <div className="absolute top-3 right-3 z-10">
                  <span className="p-2 rounded-full bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md inline-flex">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Reservation Footer Bar */}
        <div className="bg-[#121C2B] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-md">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> By Appointment Only &middot; Private Gated Access
            </span>
            <span aria-hidden="true" className="text-[#D4AF37]">&middot;</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Open Daily 10:00 – 20:00
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                "Hi The Pearl, I'd like to inquire about availability today."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase text-white bg-[#1F7A4D] hover:bg-[#18643F] transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book on WhatsApp</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-semibold tracking-[0.14em] uppercase text-white border border-white/25 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Online Request
            </button>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Viewer */}
      {lightboxIdx !== null && activeSlots[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
            aria-label="Close viewer"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
            aria-label="Previous venue picture"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={getPhoto(activeSlots[lightboxIdx].id, activeSlots[lightboxIdx].defaultSrc)}
            alt={`The Pearl Venue ${lightboxIdx + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
          />

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
            aria-label="Next venue picture"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-5 text-xs text-slate-300 tabular-nums">
            {lightboxIdx + 1} / {activeSlots.length}
          </div>
        </div>
      )}
    </div>
  );
};
