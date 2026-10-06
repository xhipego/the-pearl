import React, { useState } from 'react';
import { X, Send, Clock, CheckCircle2, MessageCircle, Shield } from 'lucide-react';
import { CONTACT_INFO, TREATMENT_MENU, ADDONS_MENU } from '../data/spaData';
import { safeOpenUrl } from '../utils/safeNavigation';

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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState('17:30');
  const [treatment, setTreatment] = useState('Deep Tissue Massage (60 min)');
  const [roomPreference, setRoomPreference] = useState('Room 1 (Baobab Suite)');
  const [includePool, setIncludePool] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const poolText = includePool ? '\n+ Add-on: Pool & Lapa Session (30 min - R250)' : '';
    const notesText = notes.trim() ? `\nFocus areas: ${notes.trim()}` : '';

    const message = `✨ *Appointment Inquiry - The Pearl Wellness Spa* ✨
Name: ${name || 'Gentleman Guest'}
Contact: ${phone || 'Provided on chat'}
Date: ${preferredDate}
Time: ${preferredTime}
Treatment: ${treatment}
Room: ${roomPreference}${poolText}${notesText}

Please confirm availability and send secure gate directions.`;

    safeOpenUrl(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 my-auto overflow-hidden">
        {/* Subtle Decorative Gold Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none" />

        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#9C6439] font-semibold">
              The Pearl &bull; Welgelegen
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#1B2B42]">
              Reserve Your Treatment
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
            <h4 className="font-serif text-2xl font-bold text-[#1B2B42]">Inquiry Dispatched</h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              WhatsApp opened with your appointment details. Our concierge will confirm your slot and send gate access directions.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Your Name / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 082 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
                />
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Preferred Time</label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none bg-white"
                >
                  <option value="10:30">10:30 AM (Morning)</option>
                  <option value="12:00">12:00 PM (Lunch)</option>
                  <option value="14:00">14:00 PM (Afternoon)</option>
                  <option value="16:00">16:00 PM (Mid-Afternoon)</option>
                  <option value="17:30">17:30 PM (After Work)</option>
                  <option value="18:30">18:30 PM (Evening)</option>
                  <option value="19:00">19:00 PM (Evening)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Treatment Selection</label>
              <select
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none bg-white"
              >
                <option value="Deep Tissue Massage (60 min - R750)">Deep Tissue Massage (60 min - R750)</option>
                <option value="Deep Tissue Massage (90 min - R1,050)">Deep Tissue Massage (90 min - R1,050)</option>
                <option value="Swedish Full-Body (60 min - R650)">Swedish Full-Body (60 min - R650)</option>
                <option value="Swedish Full-Body (90 min - R950)">Swedish Full-Body (90 min - R950)</option>
                <option value="Back, Neck & Shoulders (30 min - R400)">Back, Neck & Shoulders (30 min - R400)</option>
                <option value="Aromatherapy Massage (60 min - R700)">Aromatherapy Massage (60 min - R700)</option>
                <option value="Hot Stone Massage (60 min - R900)">Hot Stone Massage (60 min - R900)</option>
                <option value="Foot Scrub & Massage (30 min - R350)">Foot Scrub & Massage (30 min - R350)</option>
                <option value="Couples Massage (60 min - R1,300 for two)">Couples Massage (60 min - R1,300 for two)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Preferred Room</label>
              <select
                value={roomPreference}
                onChange={(e) => setRoomPreference(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none bg-white"
              >
                <option value="Room 1 (The Baobab Executive Suite)">Room 1 (The Baobab Executive Suite & En-Suite Bath)</option>
                <option value="Room 2 (Night Mode / The Marula Room)">Room 2 (Night Mode / The Marula Room)</option>
                <option value="Room 3 for Couples (The Mopane Suite)">Room 3 for Couples (The Mopane Suite)</option>
                <option value="Room 4 (Foot Scrub & En-Suite Shower)">Room 4 (Foot Scrub & En-Suite Shower)</option>
                <option value="No Room Preference / First Available">No Room Preference / First Available</option>
              </select>
            </div>

            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includePool}
                  onChange={(e) => setIncludePool(e.target.checked)}
                  className="rounded text-[#9C6439] focus:ring-[#D4AF37] h-4 w-4"
                />
                <span className="text-gray-700">Add 30 minutes at the pool and thatched lapa with drinks (+R250)</span>
              </label>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Specific Tension Areas / Notes</label>
              <input
                type="text"
                placeholder="e.g. Lower back tension, shoulders, firm pressure"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-full font-bold uppercase tracking-wider text-white bg-[#1F7A4D] hover:bg-[#18643F] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Submit &amp; Open WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-full text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-500">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>100% confidential &bull; Strictly therapeutic non-sexual environment</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
