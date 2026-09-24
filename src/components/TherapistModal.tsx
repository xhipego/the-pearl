import React, { useState, useEffect } from 'react';
import { Therapist } from '../types';
import {
  X,
  MessageCircle,
  Heart,
  Star,
  Sparkles,
  Check,
  Globe,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
} from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';
import { safeOpenUrl } from '../utils/safeNavigation';
import { normalizeTherapistPhotos } from '../context/TherapistContext';

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
  const [activePhotoIdx, setActivePhotoIdx] = useState(initialPhotoIndex);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Sync to initialPhotoIndex or reset to cover photo whenever therapist or initial index updates
  useEffect(() => {
    setActivePhotoIdx(initialPhotoIndex || 0);
    setLightboxOpen(false);
  }, [therapist?.id, initialPhotoIndex]);

  if (!therapist) return null;

  const photos = normalizeTherapistPhotos(therapist);
  const currentPhoto = photos[activePhotoIdx] || therapist.image;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hi The Pearl Wellness Spa, I would like to book a session with ${therapist.name}. Please confirm her available time slots today.`;
    safeOpenUrl(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1B2B42]/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div
          className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-[#1B2B42]/85 text-white hover:bg-[#1B2B42] border border-[#D4AF37] transition-all shadow-md cursor-pointer"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto">
            {/* Interactive Photo Viewer - Original Size with object-contain (No Zoom In / Crop) */}
            <div className="relative h-84 sm:h-[430px] w-full overflow-hidden bg-[#0B132B] flex items-center justify-center group">
              <img
                src={currentPhoto}
                alt={therapist.name}
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full max-h-[430px] object-contain transition-all duration-300 cursor-zoom-in p-1"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42] via-transparent to-transparent pointer-events-none opacity-80" />

              {/* Next & Previous Arrow Controls */}
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1B2B42]/80 hover:bg-[#1B2B42] text-white border border-[#D4AF37]/60 shadow-lg transition-transform active:scale-90 cursor-pointer z-20"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#1B2B42]/80 hover:bg-[#1B2B42] text-white border border-[#D4AF37]/60 shadow-lg transition-transform active:scale-90 cursor-pointer z-20"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top Left Pills */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-20">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#D4AF37] text-[#1B2B42] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#1B2B42]" />
                  <span>VIP Hostess</span>
                </div>
              </div>

              {/* Top Right Zoom Button */}
              <div className="absolute top-4 right-16 z-20 flex items-center gap-1.5">
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-1.5 rounded-full bg-[#1B2B42]/80 text-white hover:text-[#F3E5AB] border border-[#D4AF37]/50 text-xs backdrop-blur-md transition-colors cursor-pointer"
                  title="Zoom Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Name on banner */}
              <div className="absolute bottom-3 left-5 right-5 text-white z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif text-3xl font-bold tracking-wide text-white">
                      {therapist.name}
                    </h3>
                    {therapist.vipHostess && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#D4AF37] text-[#1B2B42] text-[10px] font-bold uppercase tracking-wider">
                        <Star className="w-3 h-3 fill-[#1B2B42]" /> VIP Hostess
                      </span>
                    )}
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-[#F3E5AB]">
                    Sensual Massage &amp; Girlfriend Experience Specialist
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-[#1B2B42]/90 border border-[#D4AF37] text-white text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md self-start sm:self-auto shrink-0 shadow-md">
                  <ImageIcon className="w-3 h-3 text-[#D4AF37]" />
                  <span>
                    {activePhotoIdx + 1} / {photos.length}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Thumbnails Strip - Pure Photos (No Text Badges, Original Proportions) */}
            <div className="bg-[#142132] px-4 py-3 border-b border-[#D4AF37]/30">
              <div className="grid grid-cols-4 gap-2.5">
                {photos.map((p, idx) => {
                  const isActive = idx === activePhotoIdx;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative h-20 sm:h-24 rounded-xl overflow-hidden bg-[#0B132B] flex items-center justify-center border-2 transition-all cursor-pointer group ${
                        isActive
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/60 shadow-lg scale-102'
                          : 'border-white/20 opacity-75 hover:opacity-100 hover:border-white/50'
                      }`}
                      title="Click to view"
                    >
                      <img
                        src={p}
                        alt=""
                        className="w-full h-full object-contain p-0.5"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stats Bar - Age, Height, Eye Color (Hair removed) */}
            <div className="grid grid-cols-3 gap-2.5 p-4 bg-[#F5EFEB] border-b border-[#D4AF37]/30 text-center">
              <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/20">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Age</span>
                <span className="font-serif text-base font-bold text-[#1B2B42]">{therapist.age} yrs</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/20">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Height</span>
                <span className="font-serif text-base font-bold text-[#1B2B42]">{therapist.height}</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/20">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Eye Color</span>
                <span className="font-serif text-base font-bold text-[#1B2B42]">{therapist.eyes}</span>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 space-y-6">
              {/* Appearance & How She Looks Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F5EFEB] to-white border border-[#D4AF37]/60 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Appearance &amp; How She Looks</span>
                  </span>
                  {therapist.bustOrBody && (
                    <span className="text-[11px] font-semibold text-[#1B2B42] bg-white px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                      {therapist.bustOrBody}
                    </span>
                  )}
                </div>
                <p className="font-serif italic text-sm sm:text-base text-[#1B2B42] leading-relaxed">
                  &ldquo;{therapist.lookDescription}&rdquo;
                </p>
              </div>

              {/* Bio */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B2B42] tracking-wider uppercase mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>About {therapist.name}</span>
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed font-light">
                  {therapist.bio}
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B2B42] tracking-wider uppercase mb-2.5 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C5A059]" />
                  <span>Speciality Experiences</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {therapist.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-[#1B2B42]/5 border border-[#D4AF37]/50 text-xs font-semibold text-[#1B2B42] flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-[#D4AF37]" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              {therapist.languages && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Globe className="w-4 h-4 text-[#C5A059]" />
                  <span>Fluent in: {therapist.languages.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Modal Bottom Fixed Actions */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleWhatsAppBooking}
              className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#1B2B42] text-white hover:bg-[#152234] border border-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Quick Book {therapist.name} via WhatsApp</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectBooking(therapist.name);
              }}
              className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/35 border border-[#D4AF37] text-[#1B2B42] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Online Booking Form
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

          {/* Lightbox Main Image - Original Size Proportions */}
          <div
            className="relative max-w-4xl max-h-[82vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentPhoto}
              alt={therapist.name}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />

            {/* Arrows */}
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

          {/* Lightbox Caption */}
          <div className="mt-4 text-center text-white space-y-1" onClick={(e) => e.stopPropagation()}>
            <p className="font-serif text-lg font-bold">
              {therapist.name} &bull; {activePhotoIdx + 1} of {photos.length}
            </p>
            <p className="font-serif italic text-xs text-[#F3E5AB]">
              {therapist.lookDescription}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
