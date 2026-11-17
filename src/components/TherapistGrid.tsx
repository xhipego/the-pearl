import React, { useState } from 'react';
import { Therapist } from '../types';
import { useTherapists } from '../context/TherapistContext';
import { TherapistModal } from './TherapistModal';
import { MessageCircle, Images } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface TherapistGridProps {
  onSelectBooking: (therapistName: string) => void;
  title?: string;
  subtitle?: string;
}

export const TherapistGrid: React.FC<TherapistGridProps> = ({
  onSelectBooking,
  title = 'Our Ladies',
  subtitle = 'Discreet, Attentive & Unhurried Company',
}) => {
  const { therapists, getVisibleLadyPhotos } = useTherapists();

  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState<number>(0);

  const getWhatsAppBookingLink = (therapistName: string) => {
    const text = `Hi The Pearl, I would like to book a session with ${therapistName}. Please let me know what times are available today.`;
    return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  const handleOpenPhoto = (therapist: Therapist, index = 0) => {
    setSelectedTherapist(therapist);
    setInitialPhotoIndex(index);
  };

  return (
    <section id="therapists" className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#F6F3ED] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2.5">
          <p className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#9A7440]">
            Private Sanctuary &middot; Strictly Confidential
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#121C2B] tracking-tight">
            {title}
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#7D664B]">
            {subtitle}
          </p>
        </div>

        {/* 6 Ladies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {therapists.map((therapist) => {
            const visiblePhotos = getVisibleLadyPhotos(therapist);
            const mainItem = visiblePhotos[0];
            const mainPhoto = mainItem?.src || therapist.image;
            const galleryPhotos = visiblePhotos.slice(1);

            return (
              <article
                key={therapist.id}
                id={`therapist-card-${therapist.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-[#E4DDD1] hover:border-[#9A7440]/60 transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl group"
              >
                {/* Main Picture */}
                <div
                  className="relative aspect-[3/4] overflow-hidden bg-[#0E1622] cursor-pointer"
                  onClick={() => handleOpenPhoto(therapist, 0)}
                >
                  <img
                    src={mainPhoto}
                    alt={therapist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B121E]/90 via-transparent to-transparent opacity-85 pointer-events-none" />

                  <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-3xl font-normal tracking-wide text-white">
                        {therapist.name}
                      </h3>
                      <p className="text-xs text-[#E5C55C] mt-0.5 tabular-nums">
                        {therapist.age} yrs &middot; {therapist.height} &middot; {therapist.bodyType}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPhoto(therapist, 0);
                      }}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-slate-200 bg-black/50 hover:bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0"
                    >
                      <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{visiblePhotos.length} Photos</span>
                    </button>
                  </div>
                </div>

                {/* Card Details & Additional Photos Selector */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-4">
                    <p className="font-serif italic text-sm sm:text-base text-[#121C2B] leading-relaxed">
                      &ldquo;{therapist.sexyQuote}&rdquo;
                    </p>

                    {galleryPhotos.length > 0 && (
                      <div className="pt-3 border-t border-[#EFEAE0] space-y-2">
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#7D664B]">
                          <span>Gallery</span>
                          <button
                            type="button"
                            onClick={() => handleOpenPhoto(therapist, 1)}
                            className="text-[#121C2B] hover:text-[#9A7440] font-medium cursor-pointer"
                          >
                            View all {visiblePhotos.length} &rarr;
                          </button>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          {galleryPhotos.map((item, idx) => (
                            <button
                              key={item.originalIndex}
                              type="button"
                              onClick={() => handleOpenPhoto(therapist, idx + 1)}
                              className="aspect-[3/4] rounded-lg overflow-hidden bg-[#121C2B] border border-[#E4DDD1] hover:border-[#9A7440] transition-all cursor-pointer group/thumb"
                              title={`View ${therapist.name} photo ${idx + 2}`}
                            >
                              <img
                                src={item.src}
                                alt={`${therapist.name} photo ${idx + 2}`}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#EFEAE0] grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleOpenPhoto(therapist, 0)}
                      className="py-2.5 px-3 rounded-lg border border-[#121C2B]/25 hover:border-[#121C2B] text-xs font-medium tracking-[0.1em] uppercase text-[#121C2B] transition-colors cursor-pointer"
                    >
                      View {visiblePhotos.length} Photos
                    </button>

                    <a
                      href={getWhatsAppBookingLink(therapist.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg bg-[#121C2B] hover:bg-[#1E2E45] text-white text-xs font-medium tracking-[0.1em] uppercase flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Book {therapist.name}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Discreet Notice */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-[#E4DDD1] text-center max-w-2xl mx-auto shadow-xs">
          <p className="text-xs sm:text-sm text-[#5A626A] font-light leading-relaxed">
            Private appointments with Kylie, Bliss, Kitkate, Faith, Barbie, or Channel are strictly confidential.
            WhatsApp reception directly on <strong className="text-[#121C2B] font-semibold">063 551 9026</strong>.
          </p>
        </div>
      </div>

      {/* Interactive Photo & Profile Viewer Modal */}
      {selectedTherapist && (
        <TherapistModal
          therapist={therapists.find((t) => t.id === selectedTherapist.id) || selectedTherapist}
          initialPhotoIndex={initialPhotoIndex}
          onClose={() => setSelectedTherapist(null)}
          onSelectBooking={onSelectBooking}
        />
      )}
    </section>
  );
};
