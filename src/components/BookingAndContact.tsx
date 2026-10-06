import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Mail,
  Clock,
  Calendar,
  CheckCircle2,
  User,
  Sparkles,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { CONTACT_INFO, TREATMENT_MENU, ADDONS_MENU } from '../data/spaData';
import { safeOpenUrl } from '../utils/safeNavigation';

interface BookingAndContactProps {
  initialDuration?: string;
}

export const BookingAndContact: React.FC<BookingAndContactProps> = ({
  initialDuration = '60 min',
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    phone: '',
    serviceId: 'deep-tissue-massage',
    duration: initialDuration,
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '14:00',
    addOns: [] as string[],
    notes: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(CONTACT_INFO.phone1Formatted);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const toggleAddOn = (addonName: string) => {
    setFormData((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addonName)
        ? prev.addOns.filter((a) => a !== addonName)
        : [...prev.addOns, addonName],
    }));
  };

  const selectedService = TREATMENT_MENU.find((t) => t.id === formData.serviceId) || TREATMENT_MENU[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const addOnsText = formData.addOns.length > 0 ? `\nOptional Add-ons: ${formData.addOns.join(', ')}` : '';
    const notesText = formData.notes ? `\nFocus Areas / Notes: ${formData.notes}` : '';

    const message = `✨ *Reservation Request - The Pearl Wellness Spa* ✨
Name/Alias: ${formData.clientName || 'Valued Guest'}
Phone: ${formData.phone || 'Provided on chat'}
Service: ${selectedService.name} (${formData.duration})
Date: ${formData.preferredDate}
Time: ${formData.preferredTime}${addOnsText}${notesText}

Please confirm therapist availability and private gate entry directions.`;

    safeOpenUrl(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`);
    setBookingSuccess(true);
  };

  return (
    <section id="contact-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Sanctuary &bull; Polokwane</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            Contact &amp; Reservations
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2 mb-4">
            Discreetly Situated at 112 Genl Beyers Street, Welgelegen
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto font-light">
            Advance reservations are essential to ensure uninterrupted privacy and guarantee your room and certified therapist. Contact us directly or submit your booking inquiry below.
          </p>
        </div>

        {/* 2-Column: Left Contact Details & Quick Action Buttons, Right Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Venue Info & Quick-Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/40 bg-white shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
                <h3 className="font-serif text-xl font-bold text-[#1B2B42] flex items-center gap-2.5">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span>Reception &amp; Location</span>
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Open Today
                </span>
              </div>

              <div className="space-y-5 text-xs sm:text-sm">
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5 border border-[#D4AF37]/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Physical Address
                    </span>
                    <span className="font-semibold text-[#1B2B42] block text-sm">
                      {CONTACT_INFO.address}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      Welgelegen, Polokwane, Limpopo, 0699
                    </span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5 border border-[#D4AF37]/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Operating Hours
                    </span>
                    <span className="font-semibold text-[#1B2B42] block">
                      Monday &ndash; Sunday &bull; 10:00 &ndash; 20:00
                    </span>
                    <span className="text-xs text-gray-500 block">
                      Open 7 days a week including public holidays
                    </span>
                  </div>
                </div>

                {/* Telephone Number */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5 border border-[#D4AF37]/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Direct Concierge Line
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <a
                        href={`tel:${CONTACT_INFO.phone1}`}
                        className="font-semibold text-[#1B2B42] hover:text-[#C5A059] text-sm underline"
                      >
                        {CONTACT_INFO.phone1Formatted}
                      </a>
                      <button
                        onClick={handleCopyPhone}
                        className="px-2 py-0.5 rounded text-[11px] font-mono border border-gray-200 hover:border-[#D4AF37] text-gray-600 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Copy phone number"
                      >
                        {copiedPhone ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-gray-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#1B2B42] text-[#25D366] shrink-0 mt-0.5 border border-[#25D366]/30">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      WhatsApp Inquiries &amp; Bookings
                    </span>
                    <a
                      href={CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#1B2B42] hover:text-[#25D366] flex items-center gap-1.5 mt-0.5"
                    >
                      <span>+27 73 995 5927</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-bold uppercase">
                        Instant
                      </span>
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5 border border-[#D4AF37]/30">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Email Inquiries
                    </span>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="font-semibold text-[#1B2B42] hover:text-[#C5A059] block text-xs sm:text-sm mt-0.5"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Parking Notice */}
                <div className="flex items-start gap-3.5 pt-3 border-t border-[#D4AF37]/20">
                  <div className="p-2.5 rounded-xl bg-[#1B2B42] text-[#D4AF37] shrink-0 mt-0.5 border border-[#D4AF37]/30">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                      Parking &amp; Security
                    </span>
                    <span className="text-xs text-gray-700 block font-light leading-relaxed">
                      Secure off-street bays behind our motorized electronic security gate. Gate access instructions sent immediately upon booking.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Interactive Buttons */}
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

            {/* Location Map Preview Card */}
            <div className="rounded-2xl p-6 bg-[#1B2B42] text-white border border-[#D4AF37]/35 shadow-md flex flex-col justify-between space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#F3E5AB]">
                    Location Map
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mt-0.5">
                    112 Genl Beyers Street
                  </h4>
                  <p className="text-xs text-slate-300 font-light mt-1">
                    Welgelegen, Polokwane. Quiet residential street with secure behind-the-gate parking.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 text-[#D4AF37] shrink-0 border border-white/20">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Booking & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-9 border-2 border-[#D4AF37]/50 bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B2B42]">
                    Reserve Your Session
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Private reservations confirmed immediately via WhatsApp Concierge
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
                      Your reservation request has been prepared for WhatsApp. Our receptionist in Welgelegen is reviewing your slot now!
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
                        placeholder="e.g. Michael / Valued Guest"
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
                        placeholder="e.g. 073 995 5927"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                      />
                      <Phone className="w-4 h-4 text-[#C5A059] absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Treatment Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                      Select Treatment
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => {
                        const newService = TREATMENT_MENU.find((t) => t.id === e.target.value);
                        setFormData({
                          ...formData,
                          serviceId: e.target.value,
                          duration: newService ? newService.durations[0].time : '60 min',
                        });
                      }}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                    >
                      {TREATMENT_MENU.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name} {item.tag ? `(${item.tag})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                      Duration &amp; Price
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                    >
                      {selectedService.durations.map((d) => (
                        <option key={d.time} value={d.time}>
                          {d.time} — R{d.price}
                        </option>
                      ))}
                    </select>
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
                      <span>Preferred Time (10:00 - 20:00)</span>
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

                {/* Add-ons Checklist */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-2">
                    Optional Add-ons
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {ADDONS_MENU.map((addon) => (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.title)}
                        className={`p-2.5 rounded-xl text-[11px] font-medium border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          formData.addOns.includes(addon.title)
                            ? 'bg-[#1B2B42] text-white border-[#1B2B42] shadow-sm'
                            : 'bg-[#FDFBF7] text-gray-700 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
                            formData.addOns.includes(addon.title)
                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1B2B42]'
                              : 'border-gray-300'
                          }`}
                        >
                          {formData.addOns.includes(addon.title) && '✓'}
                        </span>
                        <div className="truncate">
                          <span className="block truncate font-semibold">{addon.title}</span>
                          <span className="block text-[10px] text-[#C5A059]">+R{addon.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Focus Areas & Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#1B2B42] mb-1.5">
                    Focus Areas or Special Requests
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Focus on lower back and neck tension; prefer firm deep-tissue pressure; need quiet session..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#D4AF37]/40 focus:border-[#D4AF37] bg-[#FDFBF7] text-[#1B2B42] outline-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  id="booking-form-submit-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#1B2B42] via-[#243B55] to-[#1B2B42] text-white hover:brightness-110 border border-[#D4AF37] text-xs font-bold uppercase tracking-[0.16em] shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Send Reservation Request via WhatsApp</span>
                </button>

                <p className="text-[11px] text-gray-500 text-center font-light">
                  Strictly 18+ &bull; 100% confidential &bull; No public registries &bull; Unmarked Welgelegen entrance
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
