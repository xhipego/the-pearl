import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data/spaData';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMessage = 'Hi The Pearl Wellness Spa, I would like to check availability for a session today.';
  const whatsappUrl = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Floating Mini Greeting Tooltip */}
      {showTooltip && (
        <div className="relative max-w-xs bg-white text-[#1B2B42] rounded-2xl p-3.5 shadow-2xl border border-[#D4AF37] animate-in fade-in slide-in-from-bottom-3 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#1B2B42] text-white flex items-center justify-center text-[10px] hover:bg-slate-800"
            aria-label="Dismiss message"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C5A059] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Pearl Concierge</span>
          </div>
          <p className="text-xs text-gray-700 leading-snug">
            Need discreet booking or today&apos;s available therapist lineup in Polokwane?
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-[11px] font-bold text-[#1B2B42] hover:text-[#C5A059] flex items-center gap-1 underline"
          >
            Chat with reception now &rarr;
          </a>
        </div>
      )}

      {/* Main Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#1B2B42] text-white rounded-full shadow-2xl hover:shadow-[0_10px_25px_rgba(27,43,66,0.35)] border-2 border-[#D4AF37] hover:scale-105 transition-all duration-300 active:scale-95"
        title="Book directly on WhatsApp"
      >
        {/* Pulsing Green Indicator Ring */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
        </span>

        <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]/20" />
        <span className="text-xs font-bold uppercase tracking-wider pr-1">
          Book via WhatsApp
        </span>
      </a>
    </div>
  );
};
