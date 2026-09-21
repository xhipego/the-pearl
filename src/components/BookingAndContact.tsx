import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Globe, Clock, Calendar, Send, CheckCircle2, User, Sparkles } from 'lucide-react';
import { CONTACT_INFO, SPA_RATES } from '../data/spaData';
import { BookingFormState } from '../types';

interface BookingAndContactProps {
  initialDuration?: string;
}

export const BookingAndContact: React.FC<BookingAndContactProps> = ({
  initialDuration = '60 min',
}) => {
  const [formData, setFormData] = useState<BookingFormState>({
    clientName: '',
    phone: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '14:00',
    duration: initialDuration,
    addOns: [],
    notes: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const toggleAddOn = (addon: string) => {
    setFormData((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addon)
        ? prev.addOns.filter((a) => a !== addon)
        : [...prev.addOns, addon],
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const addOnsText = formData.addOns.length > 0 ? ` + Add-ons: ${formData.addOns.join(', ')}` : '';
    const notesText = formData.notes ? `\nSpecial Notes: ${formData.notes}` : '';

    const message = `✨ *Booking Request - The Pearl Wellness Spa* ✨
Name/Alias: ${formData.clientName || 'Valued Guest'}
Phone: ${formData.phone || 'Provided on chat'}
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}
Session Duration: ${formData.duration}${addOnsText}${notesText}

Please confirm availability and private arrival instructions.`;

    // Open WhatsApp
    window.open(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank');
    setBookingSuccess(true);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5EFEB]/40 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discreet Appointments &amp; Location</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            Contact &amp; Bookings
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2 mb-4">
            Private Suites in Welgelen, Polokwane
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto font-light">
            Bookings are essential to preserve the tranquility and complete discretion of our venue. Contact us directly or submit your reservation below.
          </p>
        </div>

        {/* 2-Column: Left Contact Details & Quick Action Buttons, Right Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Venue Info & Quick-Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="luxury-card rounded-2xl p-7 border border-[#D4AF37]/40 bg-white">
              <h3 className="font-serif text-xl font-bold text-[#1B2B42] mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
                <span>Venue &amp; Reception Details</span>
              </h3>

              <div className="space-y-5 text-sm">
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Address</span>
                    <span className="font-semibold text-[#1B2B42]">{CONTACT_INFO.address}</span>
                    <span className="text-xs text-gray-500 block">Welgelen, Polokwane, Limpopo</span>
                  </div>
                </div>

                {/* Telephone Number */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Call / Booking Line</span>
                    <div className="flex flex-wrap gap-2 text-sm font-semibold text-[#1B2B42]">
                      <a href={`tel:${CONTACT_INFO.phone1}`} className="hover:text-[#C5A059] underline">
                        {CONTACT_INFO.phone1Formatted}
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#1B2B42] text-[#25D366] shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Instant WhatsApp</span>
                    <a
                      href={CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#1B2B42] hover:text-[#25D366] flex items-center gap-1"
                    >
                      <span>+27 73 995 5927</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold uppercase">Online</span>
                    </a>
                  </div>
                </div>

                {/* Email & Website */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Email &amp; Web</span>
                    <a href={`mailto:${CONTACT_INFO.email}`} className="font-semibold text-[#1B2B42] hover:text-[#C5A059] block text-xs sm:text-sm">
                      {CONTACT_INFO.email}
                    </a>
                    <a href="https://www.thepearlspa.co.za" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-[#C5A059]">
                      {CONTACT_INFO.website}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-[#D4AF37]/20">
                  <div className="p-2.5 rounded-lg bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Operating Hours</span>
                    <span className="font-semibold text-[#1B2B42] text-xs sm:text-sm">Monday &ndash; Sunday: 10:00 AM &ndash; 20:00 PM</span>
                    <span className="text-xs text-gray-500 block">Discreet sessions daily &bull; Walk-ins subject to availability</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Requirement: Interactive Quick-Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={`tel:${CONTACT_INFO.phone1}`}
                id="contact-call-btn"
                className="py-3 px-2 rounded-xl bg-white border border-[#D4AF37] text-center hover:bg-[#FDFBF7] shadow-sm transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <Phone className="w-5 h-5 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B2B42]">Call Now</span>
              </a>

              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-btn"
                className="py-3 px-2 rounded-xl bg-[#1B2B42] text-white border border-[#D4AF37] text-center hover:bg-[#152234] shadow-sm transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">WhatsApp</span>
              </a>

              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-directions-btn"
                className="py-3 px-2 rounded-xl bg-white border border-[#D4AF37] text-center hover:bg-[#FDFBF7] shadow-sm transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <MapPin className="w-5 h-5 text-[#C5A059] group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B2B42]">Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="luxury-card rounded-2xl p-7 sm:p-9 border-2 border-[#D4AF37]/50 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B2B42]">
                    Book Your Sensual Experience
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Private, fast reservations confirmed immediately via WhatsApp
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full pearl-sphere border border-[#D4AF37] hidden sm:block" />
              </div>

              {bookingSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">Booking Request Dispatched</h4>
                    <p className="text-xs mt-0.5">
                      Your booking details have been formatted for WhatsApp. Our receptionist in Welgelen is reviewing your slot now!
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                      Name or Preferred Alias
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. John or Mr. D"
                        value={formData.clientName}
                        onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                      />
                      <User className="w-4 h-4 text-[#C5A059] absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 073 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                      />
                      <Phone className="w-4 h-4 text-[#C5A059] absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full block px-3.5 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Preferred Arrival Time</span>
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full block px-3.5 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Duration & Hostess Note */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                    Session Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                  >
                    {SPA_RATES.map((r) => (
                      <option key={r.duration} value={r.duration}>
                        {r.duration} — R{r.price} ({r.label})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-gray-500 mt-1.5">
                    Hostess Choice: To protect privacy and ensure real-time roster accuracy, hostesses are not chosen online. Text or WhatsApp <strong>073 995 5927</strong> to view available ladies today.
                  </p>
                </div>

                {/* Add-ons Checklist */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-2">
                    Optional Add-ons
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      'Doubles Session (2 Ladies)',
                      'Private Pool Dip (+R500/hr)',
                      'Bachelor Party Package',
                    ].map((addon) => (
                      <button
                        type="button"
                        key={addon}
                        onClick={() => toggleAddOn(addon)}
                        className={`p-2 rounded-lg text-[11px] font-medium border text-left flex items-center gap-2 transition-all ${
                          formData.addOns.includes(addon)
                            ? 'bg-[#1B2B42] text-white border-[#1B2B42]'
                            : 'bg-[#FDFBF7] text-gray-700 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            formData.addOns.includes(addon)
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1B2B42]'
                              : 'border-gray-300'
                          }`}
                        >
                          {formData.addOns.includes(addon) && '✓'}
                        </span>
                        <span className="truncate">{addon}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                    Special Inquiries or Discretion Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Any specific requests, discreet gate instructions, or timing preferences..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  id="booking-form-submit-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#1B2B42] via-[#243B55] to-[#1B2B42] text-white hover:brightness-110 border border-[#D4AF37] text-xs font-bold uppercase tracking-[0.16em] shadow-lg transition-all flex items-center justify-center gap-2.5 group"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>Send Booking Request via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
