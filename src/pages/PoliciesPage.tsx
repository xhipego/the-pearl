import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { PolicySection } from '../components/PolicySection';
import { PageId } from '../components/Navbar';
import { HelpCircle, MessageCircle, Calendar } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface PoliciesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ onNavigate, onOpenBooking }) => {
  const faqs = [
    {
      q: 'How does the arrival and private entrance procedure work?',
      a: 'Upon confirming your reservation, you receive discreet GPS directions to 112 Genl Beyers Street, Welgelegen. Our quiet residential premises feature an unmarked facade. Pull up to the electronic security gate where access is provided immediately, allowing you to park safely inside the property before being shown directly into your private suite.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept speedpoint card facilities (debit & credit cards), discreet cash, and verified instant EFT. To ensure a seamless, unhurried departure after your treatment, payment is finalized upon arrival prior to entering the treatment room.',
    },
    {
      q: 'Are showers required before and after sessions?',
      a: 'Yes. For complete hygiene and muscle relaxation, every private suite is equipped with an en-suite hot shower or bath. A brief warm shower is requested before each bodywork session. Fresh luxury towels, bathrobes, and botanical body washes are provided complimentary.',
    },
    {
      q: 'How is my confidentiality and discretion ensured?',
      a: 'Unconditionally. We do not keep public guest registries, publish client lists, or share contact details with third parties. You are welcome to book using a preferred first name or alias. Your visit is strictly between you and your certified therapist.',
    },
    {
      q: 'Can I specify pressure levels or focus on tight areas?',
      a: 'Absolutely. During your initial consultation, please let your therapist know which areas require focus (e.g. lower back tension, neck and shoulder stiffness, calves, or gym soreness) and the exact pressure level you prefer (light, medium, or firm deep tissue).',
    },
    {
      q: 'Can I book treatments for couples or partners?',
      a: 'Yes. Our Room 3 (The Mopane Suite) is specifically designed for couples and features two massage tables side-by-side with two therapists working in harmony. Advance booking is recommended to secure this suite.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Page Banner Header */}
      <PageBanner
        title="Policies &amp; Code of Conduct"
        subtitle="Ensuring Absolute Safety, Mutual Respect &amp; Strict Discretion for Every Guest"
        badge="Safety &bull; Discretion &bull; Standards"
        onNavigate={onNavigate}
        currentPageName="Policies & Code of Conduct"
      />

      {/* Main Policies & Mandatory Alert Component */}
      <PolicySection />

      {/* Frequently Asked Questions on Etiquette & Policies */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C5A059] mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Policy Clarifications</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2B42]">
            Frequently Asked Policy Questions
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
            Clear standards for an unhurried, comfortable experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm flex flex-col justify-between"
            >
              <h4 className="font-serif text-base font-bold text-[#1B2B42] mb-2">
                {faq.q}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="bg-[#1B2B42] text-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold">Have Questions or Ready to Reserve?</h4>
            <p className="text-xs text-slate-300 font-light mt-1">
              Our discreet concierge is available daily between 10:00 and 20:00 for questions and private bookings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hi The Pearl Wellness Spa, I have reviewed your policies and would like to inquire about booking a massage.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-[#25D366]/25 border border-[#25D366] hover:bg-[#25D366]/35 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
