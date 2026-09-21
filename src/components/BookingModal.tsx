import React, { useState } from 'react';
import { X, MessageCircle, Calendar, Clock, User, Phone, Sparkles } from 'lucide-react';
import { CONTACT_INFO, SPA_RATES } from '../data/spaData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDuration?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultDuration = '60 min',
}) => {
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTime, setPreferredTime] = useState('14:00');
  const [duration, setDuration] = useState(defaultDuration);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleAddOn = (addon: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const addOnsPart = selectedAddOns.length > 0 ? ` + Add-ons: ${selectedAddOns.join(', ')}` : '';
    const msg = `✨ *The Pearl Wellness Spa - Booking Request* ✨
Guest / Alias: ${clientName || 'Valued Guest'}
Contact: ${phone || 'Provided in chat'}
Date: ${preferredDate}
Time: ${preferredTime}
Session Duration: ${duration}${addOnsPart}

Please confirm availability and private arrival details at 112 General Beyers, Welgelegen, Polokwane.`;

    window.open(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B2B42]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-2xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Priority Reservation</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-[#1B2B42] mb-1">
          Reserve Your Private Session
        </h3>
        <p className="text-xs text-gray-500 mb-5">
          Fast confirmation directly with our Welgelegen reception desk via WhatsApp.
        </p>

        <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1B2B42] mb-1">
              Your Name or Alias
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. David"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#D4AF37]/40 bg-white text-[#1B2B42] outline-none focus:border-[#D4AF37]"
              />
              <User className="w-3.5 h-3.5 text-[#C5A059] absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1B2B42] mb-1">
              Contact Number
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="e.g. 073 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-[#D4AF37]/40 bg-white text-[#1B2B42] outline-none focus:border-[#D4AF37]"
              />
              <Phone className="w-3.5 h-3.5 text-[#C5A059] absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[#1B2B42] mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Date</span>
              </label>
              <input
                type="date"
                required
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full block px-3 py-2 rounded-lg border border-[#D4AF37]/40 bg-white text-[#1B2B42] outline-none min-h-[40px]"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[#1B2B42] mb-1">
                <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Time</span>
              </label>
              <input
                type="time"
                required
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className="w-full block px-3 py-2 rounded-lg border border-[#D4AF37]/40 bg-white text-[#1B2B42] outline-none min-h-[40px]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1B2B42] mb-1">
              Session Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#D4AF37]/40 bg-white text-[#1B2B42] outline-none focus:border-[#D4AF37]"
            >
              {SPA_RATES.map((r) => (
                <option key={r.duration} value={r.duration}>
                  {r.duration} — R{r.price} ({r.label})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
              <span>Hostess Choice: Text/WhatsApp <strong>073 995 5927</strong> to view available ladies today.</span>
            </p>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1B2B42] mb-1">
              Add-ons
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Doubles Session (2 Ladies)', 'Pool Session (+R500/hr)'].map((addon) => (
                <button
                  type="button"
                  key={addon}
                  onClick={() => toggleAddOn(addon)}
                  className={`p-2 rounded-lg text-[10px] border text-left transition-all ${
                    selectedAddOns.includes(addon)
                      ? 'bg-[#1B2B42] text-white border-[#1B2B42]'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  {selectedAddOns.includes(addon) ? '✓ ' : '+ '}
                  {addon}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#1B2B42] text-white hover:bg-[#152234] border border-[#D4AF37] font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Submit via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
