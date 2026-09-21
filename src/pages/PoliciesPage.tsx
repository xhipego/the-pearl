import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { PolicySection } from '../components/PolicySection';
import { PageId } from '../components/Navbar';
import { ShieldCheck, HelpCircle, Lock, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

interface PoliciesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Page Banner Header */}
      <PageBanner
        title="Policies &amp; Code of Conduct"
        subtitle="Ensuring Absolute Safety, Mutual Respect &amp; Strict Discretion for Every Guest"
        badge="Safety &bull; Privacy &bull; Standards"
        onNavigate={onNavigate}
        currentPageName="Policies & Safety"
      />

      {/* Main Policies & Mandatory Alert Component */}
      <PolicySection />

      {/* Frequently Asked Questions on Etiquette */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C5A059] mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guest Etiquette &amp; Questions</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2B42]">
            Common Inquiries About Our Policies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm">
            <h4 className="font-serif text-base font-bold text-[#1B2B42] mb-2">
              How does the arrival procedure work?
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Upon booking, you receive precise discreet GPS directions to 112 General Beyers Street, Welgelegen. Our private entrance is unmarked. Pull into the secure driveway gate where our host welcomes you directly into your private suite.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm">
            <h4 className="font-serif text-base font-bold text-[#1B2B42] mb-2">
              What payment methods are accepted?
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              We accept discreet cash, speedpoint card payments, and instant EFT. All payments are completed prior to the session commencing to ensure a seamless, unhurried departure.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm">
            <h4 className="font-serif text-base font-bold text-[#1B2B42] mb-2">
              Are showers required before and after?
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Yes, for hygiene and sensory comfort, every private suite includes an en-suite shower with premium body wash and fresh 600GSM Egyptian cotton towels. A brief warm shower is requested before each bodywork session.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm">
            <h4 className="font-serif text-base font-bold text-[#1B2B42] mb-2">
              Is my privacy guaranteed?
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Unconditionally. We do not maintain public visitor logs or share client contact numbers. You may book using an alias or first name. Your discretion is our highest priority.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#D4AF37]/30 shadow-sm md:col-span-2">
            <h4 className="font-serif text-base font-bold text-[#1B2B42] mb-2">
              Do you do overnight?
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed font-light">
              Yes, but it is reserved and need to check for availability with management.
            </p>
          </div>
        </div>

        {/* Action Banner */}
        <div className="bg-[#1B2B42] text-white rounded-3xl p-8 sm:p-10 border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold">Have Questions or Ready to Book?</h4>
            <p className="text-xs text-slate-300 font-light mt-1">Our discreet concierge is available daily between 10:00 and 20:00.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hi The Pearl Wellness Spa, I have read your policies and would like to inquire about booking a session.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-[#25D366]/25 border border-[#25D366] hover:bg-[#25D366]/35 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-md cursor-pointer transition-all"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
