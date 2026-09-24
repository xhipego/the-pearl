import React, { useState } from 'react';
import { Therapist } from '../types';
import { useTherapists } from '../context/TherapistContext';
import { TherapistModal } from './TherapistModal';
import { MessageCircle, Eye, Sparkles, ShieldCheck, Image as ImageIcon, Star } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface TherapistGridProps {
  onSelectBooking: (therapistName: string) => void;
  title?: string;
  subtitle?: string;
  showAllInitially?: boolean;
}

export const TherapistGrid: React.FC<TherapistGridProps> = ({
  onSelectBooking,
  title = 'Our Sensual Therapists',
  subtitle = 'Elegance, Warmth & Intuitive Touch',
}) => {
  const { therapists } = useTherapists();

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState<number>(0);

  const getWhatsAppBookingLink = (therapistName: string) => {
    const text = `Hi The Pearl Wellness Spa, I would like to book a session with ${therapistName}. Please let me know what times are available today.`;
    return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  const handleOpenCover = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setInitialPhotoIndex(0);
  };

  const handleOpenOtherPhotos = (therapist: Therapist, index = 1) => {
    setSelectedTherapist(therapist);
    setInitialPhotoIndex(index);
  };

  return (
    <section id="therapists" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Pearl VIP Hostesses</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            {title}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2 mb-4">
            {subtitle}
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {therapists.map((therapist) => {
            const coverPhoto = therapist.photos?.[0] || therapist.image;
            const otherPhotos = [
              therapist.photos?.[1] || therapist.image,
              therapist.photos?.[2] || therapist.image,
              therapist.photos?.[3] || therapist.image,
            ];

            return (
              <div
                key={therapist.id}
                id={`therapist-card-${therapist.id}`}
                className="luxury-card rounded-3xl overflow-hidden border border-[#D4AF37]/40 flex flex-col group hover:shadow-2xl transition-all duration-300 bg-white"
              >
                {/* Photo Frame (Cover Photo) */}
                <div
                  className="relative h-84 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => handleOpenCover(therapist)}
                >
                  <img
                    src={coverPhoto}
                    alt={`${therapist.name} - Cover`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42] via-transparent to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                  {/* Status Badge - All are VIP Hostesses */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#1B2B42] shadow-md flex items-center gap-1.5">
                      <Star className="w-3 h-3 fill-[#1B2B42]" />
                      <span>VIP Hostess</span>
                    </span>
                  </div>

                  {/* Top-Right Action: Quick Profile View */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCover(therapist);
                      }}
                      className="p-2 rounded-full bg-white/90 hover:bg-white text-[#1B2B42] shadow-md transition-all transform active:scale-95 border border-[#D4AF37]/50"
                      title="View Full Profile &amp; Photos"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#1B2B42]" />
                    </button>
                  </div>

                  {/* Cover Photo Indicator Pill on Card */}
                  <div className="absolute bottom-16 right-4 z-10 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#1B2B42]/90 backdrop-blur-md text-[10px] text-[#F3E5AB] font-bold uppercase tracking-wider border border-[#D4AF37]/60 flex items-center gap-1.5 shadow-md">
                      <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                      <span>Cover Photo</span>
                    </span>
                  </div>

                  {/* Name & Title on image */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-2xl font-bold tracking-wide">
                          {therapist.name}
                        </h3>
                        <p className="text-xs text-[#F3E5AB] font-serif italic">
                          {therapist.age} Years &bull; {therapist.height}
                        </p>
                      </div>
                      {therapist.bustOrBody && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white">
                          {therapist.bustOrBody.split('/')[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Attributes / Stats Bar - Eyes and Height (Hair removed) */}
                <div className="grid grid-cols-2 text-center border-y border-[#D4AF37]/20 bg-[#F5EFEB]/60 py-2.5 px-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 block">Eyes</span>
                    <span className="font-semibold text-[#1B2B42]">{therapist.eyes}</span>
                  </div>
                  <div className="border-l border-[#D4AF37]/20">
                    <span className="text-[10px] uppercase text-gray-500 block">Height</span>
                    <span className="font-semibold text-[#1B2B42]">{therapist.height}</span>
                  </div>
                </div>

                {/* Card Content & Photos Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Appearance & Look description */}
                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#F5EFEB] to-white border border-[#D4AF37]/40 shadow-xs">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] mb-1">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        <span>Appearance &amp; Look</span>
                      </div>
                      <p className="font-serif italic text-xs text-[#1B2B42] leading-relaxed line-clamp-3">
                        &ldquo;{therapist.lookDescription}&rdquo;
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-xs text-gray-600 font-light leading-relaxed line-clamp-2">
                      {therapist.bio}
                    </p>

                    {/* The Other Photos: Clean 3-Column Layout, Original Proportions */}
                    <div className="pt-2 border-t border-[#D4AF37]/20">
                      <div className="grid grid-cols-3 gap-2">
                        {otherPhotos.map((photo, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleOpenOtherPhotos(therapist, i + 1)}
                            className="relative h-20 sm:h-22 rounded-xl overflow-hidden bg-slate-900/5 border border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-md transition-all group/thumb cursor-pointer flex items-center justify-center p-1"
                            title="View photo"
                          >
                            <img
                              src={photo}
                              alt=""
                              className="w-full h-full object-contain rounded-lg group-hover/thumb:scale-102 transition-transform duration-200"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t border-[#D4AF37]/15">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleOpenCover(therapist)}
                        className="py-2.5 px-3 rounded-xl border border-[#D4AF37] text-xs font-semibold text-[#1B2B42] hover:bg-[#D4AF37]/15 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Full Profile &amp; Bio</span>
                      </button>

                      <a
                        href={getWhatsAppBookingLink(therapist.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-[#1B2B42] text-white hover:bg-[#152234] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Quick Book</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Discreet Notice */}
        <div className="mt-12 p-4 rounded-xl bg-[#F5EFEB] border border-[#D4AF37]/40 text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
          <p className="text-xs text-[#1B2B42]/80">
            Hostess sessions are strictly confidential and private. WhatsApp us at <strong>073 995 5927</strong> to reserve your session with Bliss, Faith, or KitKate.
          </p>
        </div>
      </div>

      {/* Full Profile & 4-Photo Modal */}
      <TherapistModal
        therapist={selectedTherapist}
        initialPhotoIndex={initialPhotoIndex}
        onClose={() => setSelectedTherapist(null)}
        onSelectBooking={onSelectBooking}
      />
    </section>
  );
};
