import React, { useState, useEffect } from 'react';
import { Therapist } from '../types';
import {
  X,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Images,
} from 'lucide-react';
import { CONTACT_INFO, DURATION_RATES } from '../data/spaData';
import { safeOpenUrl } from '../utils/safeNavigation';
import { useTherapists } from '../context/TherapistContext';

interface TherapistModalProps {
  therapist: Therapist | null;
  onClose: () => void;
  onSelectBooking: (therapistName: string) => void;
  initialPhotoIndex?: number;
}

export const TherapistModal: React.FC<TherapistModalProps> = ({
  therapist,
  onClose,
  onSelectBooking,
  initialPhotoIndex = 0,
}) => {
  const { getVisibleLadyPhotos } = useTherapists();
  const [activePhotoIdx, setActivePhotoIdx] = useState(initialPhotoIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActivePhotoIdx(initialPhotoIndex || 0);
    setLightboxOpen(false);
  }, [therapist?.id, initialPhotoIndex]);

  if (!therapist) return null;

  const photos = getVisibleLadyPhotos(therapist).map((item) => item.src);
  const safeIdx = activePhotoIdx % photos.length;
  const currentPhoto = photos[safeIdx] || therapist.image;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hi The Pearl, I would like to book a session with ${therapist.name}. Please confirm her available time slots today.`;
    safeOpenUrl(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#0E1622]/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl bg-[#F9F6F0] rounded-2xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/55 text-white hover:bg-black/80 border border-white/25 transition-colors cursor-pointer"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto">
            {/* Main Interactive Photo Viewer */}
            <div className="relative h-84 sm:h-[440px] w-full overflow-hidden bg-[#0E1622] flex items-center justify-center">
              <img
                src={currentPhoto}
                alt={`${therapist.name} — Photo ${safeIdx + 1}`}
                referrerPolicy="no-referrer"
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full max-h-[440px] object-contain transition-all duration-300 cursor-zoom-in p-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1622] via-transparent to-transparent pointer-events-none opacity-85" />

              {/* Previous / Next Controls */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/25 transition-transform active:scale-95 cursor-pointer z-20"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white border border-white/25 transition-transform active:scale-95 cursor-pointer z-20"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top Left Zoom Button */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 text-white hover:text-[#F3E5AB] border border-white/25 transition-colors cursor-pointer"
                title="View Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Name, Unboxed Metadata & Photo Counter */}
              <div className="absolute bottom-4 left-5 right-5 text-white z-10 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-wide text-white">
                    {therapist.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E5C55C] mt-0.5 tabular-nums">
                    {therapist.age} yrs &middot; {therapist.height} &middot; {therapist.bodyType}
                  </p>
                </div>

                <div className="px-2.5 py-1 rounded bg-black/60 border border-white/20 text-white text-[11px] font-medium flex items-center gap-1.5 backdrop-blur-sm shrink-0 tabular-nums">
                  <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    {safeIdx + 1} / {photos.length}
                  </span>
                </div>
              </div>
            </div>

            {/* All 5 Thumbnails Strip */}
            <div className="bg-[#121C2B] px-4 py-3 border-b border-[#D4AF37]/25">
              <div className="grid grid-cols-5 gap-2">
                {photos.map((p, idx) => {
                  const isActive = idx === safeIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative aspect-[3/4] sm:h-22 rounded-lg overflow-hidden bg-[#0E1622] border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[#D4AF37] opacity-100 scale-[1.02]'
                          : 'border-white/15 opacity-65 hover:opacity-100 hover:border-white/40'
                      }`}
                      title={`Photo ${idx + 1}`}
                    >
                      <img
                        src={p}
                        alt={`${therapist.name} thumbnail ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clean Editorial Quote & Compact Rates Summary */}
            <div className="p-6 sm:p-7 space-y-6">
              <div className="text-center space-y-2">
                <p className="font-serif italic text-lg sm:text-xl text-[#121C2B] leading-relaxed">
                  &ldquo;{therapist.sexyQuote}&rdquo;
                </p>
              </div>

              {/* Duration & Rates */}
              <div className="pt-5 border-t border-[#D8D1C5]">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#9A7440] font-medium text-center mb-3">
                  Duration &amp; Rates
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  {DURATION_RATES.map((rate) => (
                    <div
                      key={rate.duration}
                      className="py-2.5 px-3 rounded-lg bg-white border border-[#D8D1C5]"
                    >
                      <span className="block text-[11px] uppercase tracking-wider text-[#6B7280]">
                        {rate.duration}
                      </span>
                      <span className="font-serif text-base font-semibold text-[#121C2B] tabular-nums">
                        {rate.formattedPrice}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Bottom Actions */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#D8D1C5] flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleWhatsAppBooking}
              className="w-full sm:flex-1 py-3 px-6 rounded bg-[#1F7A4D] hover:bg-[#18643F] text-white text-xs font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book {therapist.name} via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectBooking(therapist.name);
              }}
              className="w-full sm:w-auto py-3 px-5 rounded border border-[#121C2B]/30 hover:border-[#121C2B] text-[#121C2B] text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Online Request
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Zoom Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[82vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto}
              alt={`${therapist.name} fullscreen`}
              referrerPolicy="no-referrer"
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl border border-white/15"
            />

            <button
              onClick={handlePrevPhoto}
              className="absolute -left-12 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/30 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPhoto}
              className="absolute -right-12 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/30 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 text-center text-white space-y-1" onClick={(e) => e.stopPropagation()}>
            <p className="font-serif text-lg font-normal">
              {therapist.name} &middot; {safeIdx + 1} of {photos.length}
            </p>
            <p className="font-serif italic text-xs text-[#E5C55C]">
              &ldquo;{therapist.sexyQuote}&rdquo;
            </p>
          </div>
        </div>
      )}
    </>
  );
};
