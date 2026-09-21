import React from 'react';
import { AlertTriangle, ShieldCheck, ShowerHead, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { POLICY_STATEMENT } from '../data/spaData';

export const PolicySection: React.FC = () => {
  return (
    <section id="policies" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Safety, Etiquette &amp; Compliance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1B2B42] tracking-wide">
            Policies &amp; Code of Conduct
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#C5A059] mt-2">
            Maintaining a Sophisticated &amp; Respectful Sanctuary
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
          </div>
        </div>

        {/* PROMINENT MANDATORY ALERT BANNER matching flyer */}
        <div
          id="policy-compliance-alert"
          className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-[#1B2B42] via-[#243B55] to-[#1B2B42] text-white border-2 border-[#D4AF37] shadow-2xl overflow-hidden mb-12"
        >
          {/* Subtle gold ornamentation */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 shadow-inner">
              <AlertTriangle className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded bg-[#D4AF37] text-[#1B2B42] text-xs font-extrabold uppercase tracking-[0.2em] mb-2">
                ** IMPORTANT POLICY **
              </div>
              <p className="font-serif text-base sm:text-lg text-[#F5EFEB] leading-relaxed font-normal">
                &ldquo;{POLICY_STATEMENT.exactText}&rdquo;
              </p>
              <p className="text-xs text-slate-300 mt-2 italic">
                We thank our esteemed patrons for upholding our sacred boundaries, ensuring an exceptional, mutual experience of deep relaxation and pleasure.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Etiquette & Safety Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="luxury-card p-6 rounded-xl border border-[#D4AF37]/40 bg-white">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1B2B42] mb-1">
                  100% Confidentiality &amp; Discretion
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  Your identity and visits remain strictly private. Our location in Welgelegen features discreet, private off-street parking and unmarked entry points for total peace of mind.
                </p>
              </div>
            </div>
          </div>

          <div className="luxury-card p-6 rounded-xl border border-[#D4AF37]/40 bg-white">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0">
                <ShowerHead className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1B2B42] mb-1">
                  Hygiene &amp; Shower Protocol
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  Immaculate hygiene is strictly observed. All guests are required to take a pre-session warm shower in their en-suite private bathroom. Clean luxury bathrobes and towels are provided.
                </p>
              </div>
            </div>
          </div>

          <div className="luxury-card p-6 rounded-xl border border-[#D4AF37]/40 bg-white">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1B2B42] mb-1">
                  Gentlemanly Conduct &amp; Respect
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  Our therapists provide tender, affectionate care, allowed sweet kisses, tactile exploration, and sensual hand relief. Polite, respectful, and sober behavior is required at all times.
                </p>
              </div>
            </div>
          </div>

          <div className="luxury-card p-6 rounded-xl border border-[#D4AF37]/40 bg-white">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1B2B42] mb-1">
                  Advance Bookings Essential
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  To guarantee your preferred hostess and avoid waiting times, advance reservations via WhatsApp or phone are required before arriving at the Welgelegen premises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
