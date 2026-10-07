import React from 'react';
import {
  ShieldCheck,
  ShowerHead,
  Lock,
  Sparkles,
  Clock,
  HeartHandshake,
  UserCheck,
  CreditCard,
} from 'lucide-react';

export const PolicySection: React.FC = () => {
  const policies = [
    {
      icon: ShieldCheck,
      title: '1. Professional Therapeutic Focus',
      desc: 'All services provided at The Pearl Wellness Spa adhere to strict professional ethics and authentic body relaxation. Our certified therapists specialize in deep tissue, muscular relief, and sports recovery. Any suggestive remark, proposition, or inappropriate conduct terminates the session immediately.',
      tag: 'Professional Standards',
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
