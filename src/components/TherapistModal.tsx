import React from 'react';
import { Therapist } from '../types';
import { X, MessageCircle, Heart, Star, Sparkles, Check, Globe } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface TherapistModalProps {
  therapist: Therapist | null;
  onClose: () => void;
  onSelectBooking: (therapistName: string) => void;
}

export const TherapistModal: React.FC<TherapistModalProps> = ({
  therapist,
  onClose,
  onSelectBooking,
}) => {
  if (!therapist) return null;

  const handleWhatsAppBooking = () => {
    const msg = `Hi The Pearl Wellness Spa, I would like to book a session with ${therapist.name}. Please confirm her available time slots today.`;
    window.open(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1B2B42]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#1B2B42]/80 text-white hover:bg-[#1B2B42] border border-[#D4AF37] transition-all"
          aria-label="Close profile modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Top Banner Image with Stats Overlay */}
          <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#1B2B42]">
            <img
              src={therapist.image}
              alt={therapist.name}
              className="w-full h-full object-cover object-top filter brightness-[0.92]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42] via-transparent to-black/30" />

            {/* Availability Pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B2B42]/90 border border-[#D4AF37] text-white text-xs backdrop-blur-md">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  therapist.availableToday ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              <span className="font-semibold tracking-wider uppercase text-[11px]">
                {therapist.availableToday ? 'Available Today' : 'By Appointment'}
              </span>
            </div>

            {/* Profile Name & Tagline */}
            <div className="absolute bottom-4 left-6 right-6 text-white">
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
              <p className="font-serif italic text-sm text-[#F3E5AB]">
                Sensual Massage &amp; Girlfriend Experience Specialist
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-[#F5EFEB] border-b border-[#D4AF37]/30 text-center">
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
            <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/20">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Hair / Look</span>
              <span className="font-serif text-sm font-bold text-[#1B2B42] line-clamp-1">{therapist.hair}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-6">
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

            {/* Specialities */}
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

            {/* Languages & Discretion notes */}
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
            className="w-full sm:flex-1 py-3 px-6 rounded-xl bg-[#1B2B42] text-white hover:bg-[#152234] border border-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Quick Book {therapist.name} via WhatsApp</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSelectBooking(therapist.name);
            }}
            className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/35 border border-[#D4AF37] text-[#1B2B42] text-xs font-bold uppercase tracking-wider transition-all"
          >
            Online Booking Form
          </button>
        </div>
      </div>
    </div>
  );
};
