import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageCircle, Shield } from 'lucide-react';
import { CONTACT_INFO, DURATION_RATES } from '../data/spaData';
import { safeOpenUrl } from '../utils/safeNavigation';
import { useTherapists } from '../context/TherapistContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDuration?: string;
  defaultTherapistName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultDuration = '1 hour',
  defaultTherapistName = '',
}) => {
  const { therapists } = useTherapists();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState('17:30');
  const [selectedRate, setSelectedRate] = useState(
    `${defaultDuration} — ${DURATION_RATES.find((r) => r.duration === defaultDuration)?.formattedPrice || 'R1000'}`
  );
  const [preferredLady, setPreferredLady] = useState(
    defaultTherapistName || 'Any Available Lady'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultTherapistName) {
      setPreferredLady(defaultTherapistName);
    }
  }, [defaultTherapistName]);

  useEffect(() => {
    if (defaultDuration) {
      const matched = DURATION_RATES.find((r) => r.duration === defaultDuration);
      if (matched) {
        setSelectedRate(`${matched.duration} — ${matched.formattedPrice}`);
      }
    }
  }, [defaultDuration]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const notesText = notes.trim() ? `\nNotes: ${notes.trim()}` : '';

    const message = `*Private Reservation Request - The Pearl*
Name / Alias: ${name || 'Valued Guest'}
Phone: ${phone || 'Provided on chat'}
Preferred Lady: ${preferredLady}
Session & Rate: ${selectedRate}
Date: ${preferredDate}
Time: ${preferredTime}${notesText}

Please confirm availability and private entry details.`;

    safeOpenUrl(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-[#D4AF37]/60 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#9A7440] font-semibold">
              The Pearl &middot; Private Sanctuary
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#121C2B] mt-0.5">
              Private Appointment Request
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-normal text-[#121C2B]">Request Prepared</h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              WhatsApp opened with your reservation details. Our receptionist will confirm availability shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Name or Preferred Alias
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Michael"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 082 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Duration &amp; Rate
                </label>
                <select
                  value={selectedRate}
                  onChange={(e) => setSelectedRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none bg-white"
                >
                  {DURATION_RATES.map((rate) => {
                    const label = `${rate.duration} — ${rate.formattedPrice}`;
                    return (
                      <option key={rate.duration} value={label}>
                        {label}
                      </option>
                    );
                  })}
                  <option value="Pool Session (1 hour with one lady) — R500">
                    Pool Session (1 hour with one lady) — R500
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Preferred Lady
                </label>
                <select
                  value={preferredLady}
                  onChange={(e) => setPreferredLady(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none bg-white"
                >
                  <option value="Any Available Lady">Any Available Lady</option>
                  {therapists.map((lady) => (
                    <option key={lady.id} value={lady.name}>
                      {lady.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Preferred Time</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none bg-white"
                >
                  <option value="10:30">10:30</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:30">17:30</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Discreet Notes (Optional)</label>
              <input
                type="text"
                placeholder="Any preference or timing notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded font-semibold uppercase tracking-[0.14em] text-white bg-[#1F7A4D] hover:bg-[#18643F] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-500">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Private suites &middot; Discreet gated parking &middot; Strict confidentiality</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
