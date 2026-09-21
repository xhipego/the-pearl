import React, { useState } from 'react';
import { Therapist } from '../types';
import { THERAPISTS } from '../data/therapists';
import { TherapistModal } from './TherapistModal';
import { MessageCircle, Eye, Sparkles, Filter, ShieldCheck, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface TherapistGridProps {
  onSelectBooking: (therapistName: string) => void;
}

export const TherapistGrid: React.FC<TherapistGridProps> = ({ onSelectBooking }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'featured' | 'vip'>('all');
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  // Dynamic filter logic
  const filteredTherapists = THERAPISTS.filter((t) => {
    if (activeFilter === 'today') return t.availableToday;
    if (activeFilter === 'featured') return t.featured;
    if (activeFilter === 'vip') return t.vipHostess;
    return true;
  });

  const getWhatsAppBookingLink = (therapistName: string) => {
    const text = `Hi The Pearl Wellness Spa, I would like to book a session with ${therapistName}. Please let me know what times are available today.`;
    return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="therapists" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Pearl Hostesses</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            Our Sensual Therapists
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2 mb-4">
            Elegance, Warmth &amp; Intuitive Touch
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto font-light">
            Our ladies are courteous, discreet, and deeply trained in full-body sensual massage, tactile discovery, and the authentic Girlfriend Experience.
          </p>
        </div>

        {/* Dynamic Filtering Tabs (Mimicking QoH Pretoria adult wellness gallery) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === 'all'
                ? 'bg-[#1B2B42] text-white shadow-md border border-[#D4AF37]'
                : 'bg-white text-[#1B2B42] border border-[#D4AF37]/40 hover:border-[#D4AF37]'
            }`}
          >
            All Therapists ({THERAPISTS.length})
          </button>

          <button
            onClick={() => setActiveFilter('today')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeFilter === 'today'
                ? 'bg-[#1B2B42] text-white shadow-md border border-[#D4AF37]'
                : 'bg-white text-[#1B2B42] border border-[#D4AF37]/40 hover:border-[#D4AF37]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available Today ({THERAPISTS.filter((t) => t.availableToday).length})</span>
          </button>

          <button
            onClick={() => setActiveFilter('featured')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === 'featured'
                ? 'bg-[#1B2B42] text-white shadow-md border border-[#D4AF37]'
                : 'bg-white text-[#1B2B42] border border-[#D4AF37]/40 hover:border-[#D4AF37]'
            }`}
          >
            Featured Specialists
          </button>

          <button
            onClick={() => setActiveFilter('vip')}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeFilter === 'vip'
                ? 'bg-[#1B2B42] text-white shadow-md border border-[#D4AF37]'
                : 'bg-white text-[#1B2B42] border border-[#D4AF37]/40 hover:border-[#D4AF37]'
            }`}
          >
            VIP Hostesses
          </button>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTherapists.map((therapist) => (
            <div
              key={therapist.id}
              id={`therapist-card-${therapist.id}`}
              className="luxury-card rounded-2xl overflow-hidden border border-[#D4AF37]/40 flex flex-col group hover:shadow-2xl transition-all duration-300 bg-white"
            >
              {/* Photo Frame */}
              <div className="relative h-80 overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setSelectedTherapist(therapist)}>
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Status Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 items-start">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
                      therapist.availableToday
                        ? 'bg-[#1B2B42]/85 text-emerald-300 border-emerald-500/40'
                        : 'bg-[#1B2B42]/85 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        therapist.availableToday ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    {therapist.availableToday ? 'On Shift Today' : 'Advance Booking'}
                  </span>

                  {therapist.vipHostess && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#1B2B42] shadow-sm">
                      VIP Hostess
                    </span>
                  )}
                </div>

                {/* Quick Profile View Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTherapist(therapist);
                  }}
                  className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/80 hover:bg-white text-[#1B2B42] shadow-md transition-transform transform active:scale-95"
                  title="View Full Profile &amp; Stats"
                >
                  <Eye className="w-4 h-4 text-[#1B2B42]" />
                </button>

                {/* Name & Title on image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h3 className="font-serif text-2xl font-bold tracking-wide">
                    {therapist.name}
                  </h3>
                  <p className="text-xs text-[#F3E5AB] font-serif italic">
                    {therapist.age} Years &bull; {therapist.height}
                  </p>
                </div>
              </div>

              {/* Attributes / Stats Bar */}
              <div className="grid grid-cols-3 text-center border-y border-[#D4AF37]/20 bg-[#F5EFEB]/60 py-2.5 px-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Eyes</span>
                  <span className="font-semibold text-[#1B2B42]">{therapist.eyes}</span>
                </div>
                <div className="border-x border-[#D4AF37]/20">
                  <span className="text-[10px] uppercase text-gray-500 block">Hair</span>
                  <span className="font-semibold text-[#1B2B42] truncate px-1 block">{therapist.hair}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block">Height</span>
                  <span className="font-semibold text-[#1B2B42]">{therapist.height}</span>
                </div>
              </div>

              {/* Bio & Specialties Taglist */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-600 font-light leading-relaxed mb-4 line-clamp-2">
                    {therapist.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {therapist.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#FDFBF7] border border-[#D4AF37]/40 text-[10px] font-medium text-[#1B2B42]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D4AF37]/15">
                  <button
                    onClick={() => setSelectedTherapist(therapist)}
                    className="py-2.5 px-3 rounded-lg border border-[#D4AF37] text-xs font-semibold text-[#1B2B42] hover:bg-[#D4AF37]/15 transition-all text-center"
                  >
                    View Stats
                  </button>

                  <a
                    href={getWhatsAppBookingLink(therapist.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-lg bg-[#1B2B42] text-white hover:bg-[#152234] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Quick Book</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Discreet Notice */}
        <div className="mt-12 p-4 rounded-xl bg-[#F5EFEB] border border-[#D4AF37]/40 text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0" />
          <p className="text-xs text-[#1B2B42]/80">
            Hostess shifts change daily. WhatsApp us at <strong>073 995 5927</strong> to confirm today&apos;s active lineup or request your preferred therapist in advance.
          </p>
        </div>
      </div>

      {/* Full Modal */}
      <TherapistModal
        therapist={selectedTherapist}
        onClose={() => setSelectedTherapist(null)}
        onSelectBooking={onSelectBooking}
      />
    </section>
  );
};
