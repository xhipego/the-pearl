import React from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  ShowerHead,
  Lock,
  Sparkles,
  Clock,
  HeartHandshake,
  UserCheck,
  CreditCard,
} from 'lucide-react';
import { POLICY_STATEMENT } from '../data/spaData';

export const PolicySection: React.FC = () => {
  const policies = [
    {
      icon: ShieldCheck,
      title: '1. Strictly Therapeutic & Non-Sexual',
      desc: 'All services provided at The Pearl Wellness Spa are strictly professional, therapeutic, and non-sexual. Our certified therapists specialize in deep tissue, muscular relief, and authentic body relaxation. Any suggestive remark, proposition, or inappropriate conduct terminates the session immediately without refund.',
      tag: 'Zero Tolerance',
    },
    {
      icon: Sparkles,
      title: '2. Professional Draping & Modesty',
      desc: 'Professional draping with clean linen and towels is strictly maintained throughout your entire session. Only the specific muscle group or area being actively worked on is uncovered. Clients may keep their own underwear on, and fresh disposable underwear is provided for every treatment.',
      tag: 'Dignified Comfort',
    },
    {
      icon: ShowerHead,
      title: '3. Hygiene & Private En-Suite Showers',
      desc: 'Impeccable hygiene standards are upheld across all facilities. Every private room features dedicated en-suite shower or bath facilities. A warm pre-treatment shower is required to prepare muscles and ensure complete freshness. Crisp 600GSM towels and luxury amenities are provided.',
      tag: 'Sanitized Suites',
    },
    {
      icon: Lock,
      title: '4. 100% Confidentiality & Private Motorized Gate',
      desc: 'Your identity and privacy are guaranteed. Situated at 112 Genl Beyers Street, Welgelegen, our unmarked residential facade and motorized electronic security gate provide private off-street parking inside the perimeter. No client data is logged or shared.',
      tag: 'Total Discretion',
    },
    {
      icon: Clock,
      title: '5. 24-Hour Cancellation & Punctuality',
      desc: 'We request at least 24 hours advance notification for cancellations or rescheduling so therapy rooms can be allocated accordingly. Please arrive 10 minutes prior to your scheduled time to settle in and enjoy a welcome refreshment without losing treatment minutes.',
      tag: 'Courtesy Standard',
    },
    {
      icon: HeartHandshake,
      title: '6. Health & Customized Pressure',
      desc: 'Please inform your therapist of any injuries, hypertension, surgeries, acute back pain, or botanical oil sensitivities on your confidential intake form. Pressure levels—from gentle restorative Swedish to firm deep-tissue friction—are tailored to your exact comfort.',
      tag: 'Tailored Recovery',
    },
    {
      icon: UserCheck,
      title: '7. Sobriety & Gentlemanly Conduct',
      desc: 'Strictly 18+. Right of admission reserved. Patrons displaying intoxication, drug influence, or discourteous behavior will be denied entry immediately. We ask all guests to respect the peace and tranquil atmosphere of our sanctuary.',
      tag: '18+ Sanctuary',
    },
    {
      icon: CreditCard,
      title: '8. Advance Bookings & Payment Policy',
      desc: 'To preserve complete privacy and prevent waiting times, advance reservations via WhatsApp or phone are required. Payments via discreet card facility (Speedpoint), cash, or verified instant EFT are processed upon arrival prior to treatment commencement.',
      tag: 'Smooth Departure',
    },
  ];

  return (
    <section id="policies" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Safety, Etiquette &amp; Compliance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            Policies &amp; Code of Conduct
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#C5A059] mt-2">
            Maintaining a Sophisticated, Safe &amp; Respectful Sanctuary for Gentlemen
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-light max-w-xl mx-auto">
            These guidelines protect both our guests and our certified therapists, ensuring each visit is restorative, professional, and entirely discreet.
          </p>
        </div>

        {/* PROMINENT MANDATORY ALERT BANNER matching flyer */}
        <div
          id="policy-compliance-alert"
          className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#1B2B42] via-[#243B55] to-[#142032] text-white border-2 border-[#D4AF37] shadow-2xl overflow-hidden mb-14"
        >
          {/* Subtle gold glow ornamentation */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            <div className="w-16 h-16 sm:w-20 sm:resp-20 rounded-2xl bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-[#F3E5AB]" />
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37] text-[#1B2B42] text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-sm">
                <span>** MANDATORY POLICY &bull; STRICTLY ENFORCED **</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                Strictly Therapeutic &bull; Zero Tolerance
              </h3>
              <blockquote className="border-l-0 md:border-l-4 md:border-[#D4AF37] md:pl-5 py-1">
                <p className="font-serif text-base sm:text-lg text-[#F5EFEB] leading-relaxed font-normal italic">
                  &ldquo;{POLICY_STATEMENT.exactText}&rdquo;
                </p>
              </blockquote>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                We thank our esteemed patrons for upholding these mutual boundaries, preserving a premier standard of therapeutic massage, recovery, and uncompromised privacy.
              </p>
            </div>
          </div>
        </div>

        {/* 8 Core Etiquette & Safety Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D4AF37]/35 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0 border border-[#D4AF37]/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#F3E5AB]/40 text-[#9C6439] border border-[#D4AF37]/30">
                      {policy.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1B2B42] mb-2">
                    {policy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                    {policy.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
