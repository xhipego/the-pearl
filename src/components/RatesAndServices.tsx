import React, { useState } from 'react';
import { Sparkles, Clock, Check, MessageCircle, Waves, Users, Wine, Heart, Calculator } from 'lucide-react';
import { SPA_RATES, SIGNATURE_PACKAGES, CONTACT_INFO } from '../data/spaData';
import { safeOpenUrl } from '../utils/safeNavigation';
import { useVenuePhotos } from '../context/VenuePhotoContext';
import { VENUE_IMAGES } from '../data/venueImages';

interface RatesAndServicesProps {
  onSelectBooking: (duration: string, addOn?: string) => void;
}

export const RatesAndServices: React.FC<RatesAndServicesProps> = ({ onSelectBooking }) => {
  const { getPhoto } = useVenuePhotos();
  // Interactive Session Customizer state
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState<number>(60);
  const [includePool, setIncludePool] = useState<boolean>(false);
  const [isDoubles, setIsDoubles] = useState<boolean>(false);
  const [bachelorLadies, setBachelorLadies] = useState<number>(1);

  // Price Calculation Logic based on flyer rules:
  // Base rates: 30m: 500, 45m: 600, 60m: 800, 90m: 1000
  // Doubles: Discounted rate for two ladies — less R100 from hourly prices (e.g. 60m: 800 * 2 - 100 = 1500)
  // Pool: R500 / hr per lady
  const getSelectedBaseRate = () => {
    const item = SPA_RATES.find((r) => r.minutes === selectedDurationMinutes);
    return item ? item.price : 800;
  };

  const calculateCustomTotal = () => {
    let base = getSelectedBaseRate();
    if (isDoubles) {
      // Doubles session: 2 ladies minus R100 discount
      base = base * 2 - 100;
    }
    let poolCost = 0;
    if (includePool) {
      // R500 per lady per hour
      const ladyCount = isDoubles ? 2 : 1;
      const hours = selectedDurationMinutes / 60;
      poolCost = Math.round(500 * ladyCount * Math.max(0.75, hours));
    }
    return base + poolCost;
  };

  const currentDurationLabel = () => {
    const item = SPA_RATES.find((r) => r.minutes === selectedDurationMinutes);
    return item ? item.duration : '60 min';
  };

  const handleCustomWhatsAppBook = () => {
    const total = calculateCustomTotal();
    const duration = currentDurationLabel();
    const extras: string[] = [];
    if (isDoubles) extras.push('Doubles (2 ladies)');
    if (includePool) extras.push('Private Pool Session');

    const msg = `Hi The Pearl Wellness Spa, I would like to book a ${duration} session${
      extras.length > 0 ? ` with ${extras.join(' & ')}` : ''
    }. Estimated Total: R${total}. Please let me know available slots today.`;

    safeOpenUrl(`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <section id="rates" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5EFEB]/50 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Luxury Pricing</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            Duration &amp; Rates
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2 mb-4">
            Tailored Sensual Journeys in Polokwane
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-3">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto font-light">
            All sessions include private suite access, fresh en-suite showers, warm aromatherapeutic oils, and our respectful Girlfriend Experience.
          </p>
        </div>

        {/* 4-Card Rates Grid matching the exact flyer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SPA_RATES.map((rate) => (
            <div
              key={rate.duration}
              id={`rate-card-${rate.minutes}`}
              className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between ${
                rate.popular
                  ? 'bg-gradient-to-b from-white via-[#FFFDF9] to-[#FDFBF7] border-2 border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/20 transform -translate-y-1'
                  : 'luxury-card rounded-2xl'
              }`}
            >
              {rate.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1B2B42] border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-[#1B2B42]">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-serif text-xl font-bold">{rate.duration}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-bold text-[#1B2B42]">
                      R{rate.price}
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-base font-semibold text-[#1B2B42] mb-3">
                  {rate.label}
                </h3>

                <ul className="space-y-2.5 text-xs text-gray-600 mb-6">
                  {rate.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-[#D4AF37]/20 flex flex-col gap-2">
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                    `Hi The Pearl Wellness Spa, I would like to book a ${rate.duration} session (R${rate.price}). Please let me know available slots.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-all ${
                    rate.popular
                      ? 'bg-[#1B2B42] text-white hover:bg-[#152234] border border-[#D4AF37]'
                      : 'bg-[#D4AF37]/15 text-[#1B2B42] hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Book {rate.duration} via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Signature Sensual Experience Detailed Showcase (Centerpiece matching flyer) */}
        <div className="luxury-card rounded-2xl p-8 sm:p-10 mb-16 border-2 border-[#D4AF37]/50 relative overflow-hidden bg-gradient-to-r from-[#FDFBF7] via-white to-[#FDFBF7]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1B2B42] text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-3">
                <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
                <span>Our Signature Highlight</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2B42] mb-3">
                Our Signature Sensual Experiences
              </h3>
              <p className="font-serif italic text-base sm:text-lg text-[#C5A059] mb-4">
                Indulge in a journey of deep relaxation and intimate connection.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light mb-6">
                We offer professional massage combined with exquisite, sensual body-to-body slides and our signature <strong>‘Girlfriend Experience.’</strong> Designed for authentic warmth, deep relaxation, and unhurried sensory unwinding. To preserve guest discretion and tailor to personal preferences, full personalized inclusions and details are confirmed privately over phone or text.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-[#1B2B42] font-medium">
                <div className="p-2.5 rounded-lg bg-[#F5EFEB] border border-[#D4AF37]/30 text-center">
                  ✨ Body-to-Body Slides
                </div>
                <div className="p-2.5 rounded-lg bg-[#F5EFEB] border border-[#D4AF37]/30 text-center">
                  🕯️ Warm Botanical Oils
                </div>
                <div className="p-2.5 rounded-lg bg-[#F5EFEB] border border-[#D4AF37]/30 text-center">
                  🌿 Sensory Bodywork
                </div>
                <div className="p-2.5 rounded-lg bg-[#F5EFEB] border border-[#D4AF37]/30 text-center">
                  💬 Inquire via Text / Call
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-[#1B2B42] text-white border border-[#D4AF37] shadow-lg text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-1">Experience Included</span>
              <span className="font-serif text-2xl font-bold text-white mb-2">From R500</span>
              <p className="text-xs text-slate-300 mb-5">
                Available across 30, 45, 60 &amp; 90 minute durations with any of our lovely hostesses.
              </p>
              <button
                onClick={() => onSelectBooking('60 min')}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#1B2B42] text-xs font-bold uppercase tracking-widest hover:brightness-110 shadow-md transition-all"
              >
                Inquire &amp; Reserve
              </button>
            </div>
          </div>
        </div>

        {/* Discreet Notice: Full Details via Phone / WhatsApp */}
        <div className="mb-14 bg-[#1B2B42] text-white rounded-2xl p-6 sm:p-7 border border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Discreet Consultation &amp; Bespoke Inclusions</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-[#F3E5AB] font-bold">
              Confidential Details via Direct Call or WhatsApp
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light leading-relaxed">
              To uphold complete discretion and tailor every session to your exact personal desires, full package inclusions, special requests, and hostess availability are shared directly via phone or text message.
            </p>
          </div>
          <a
            href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
              'Hi The Pearl, I would like to inquire about full experience details and hostess availability.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:scale-105"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Confidentially</span>
          </a>
        </div>

        {/* 3 Add-on Packages matching the exact flyer (Bachelor Parties, Doubles Sessions, Pool Sessions) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl font-bold text-[#1B2B42]">
              Specialty Add-ons &amp; Group Occasions
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 italic mt-1">
              Elevate your time at The Pearl with our exclusive bespoke packages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bachelor Parties Card */}
            <div className="luxury-card rounded-xl p-6 border border-[#D4AF37]/40 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="relative h-36 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80"
                    alt="Bachelor Parties & VIP Celebrations at The Pearl"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-4 flex items-center gap-1.5 text-[10px] text-[#F3E5AB] font-bold uppercase tracking-wider">
                    <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>VIP Celebration &amp; Champagne</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-4 border border-[#D4AF37]/50">
                  <Wine className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B2B42]">Bachelor Parties</h4>
                <p className="text-xs font-serif italic text-[#C5A059] mb-3">Celebrate your special occasion</p>
                <div className="inline-block px-3 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-xs font-bold text-[#1B2B42] mb-3">
                  R500 per lady, per hour
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Host an unforgettable bachelor bash or milestone celebration in complete privacy. Choose your preferred hostesses, customize schedules, and enjoy luxurious hospitality.
                </p>
              </div>
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hi The Pearl, I would like to inquire about hosting a Bachelor Party (R500/hr per lady).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg border border-[#D4AF37] text-xs font-semibold text-[#1B2B42] hover:bg-[#D4AF37]/20 text-center transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                Inquire Bachelor Party
              </a>
            </div>

            {/* Doubles Sessions Card */}
            <div className="luxury-card rounded-xl p-6 border border-[#D4AF37]/40 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-3 right-3 z-10 px-2.5 py-0.5 rounded-full bg-[#1B2B42]/90 border border-[#D4AF37] text-[#D4AF37] text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm shadow-md">
                Special Value
              </div>
              <div>
                <div className="relative h-36 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80"
                    alt="Doubles Session - Two Ladies Synchronized Massage"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.88] hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-4 flex items-center gap-1.5 text-[10px] text-[#F3E5AB] font-bold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Two Ladies &bull; 4-Hand Tandem</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-4 border border-[#D4AF37]/50">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B2B42]">Doubles Sessions</h4>
                <p className="text-xs font-serif italic text-[#C5A059] mb-3">Two ladies at discounted rates</p>
                <div className="inline-block px-3 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-xs font-bold text-[#1B2B42] mb-3">
                  Less R100 from hourly prices
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Experience sensory bliss with two beautiful ladies working in graceful tandem. Enjoy synchronized four-hand touch, dual body slides, and deep intimate relaxation.
                </p>
              </div>
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hi The Pearl, I would like to book a Doubles Session (Two Ladies) with the R100 discount.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg border border-[#D4AF37] text-xs font-semibold text-[#1B2B42] hover:bg-[#D4AF37]/20 text-center transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                Book Doubles Session
              </a>
            </div>

            {/* Pool Sessions Card */}
            <div className="luxury-card rounded-xl p-6 border border-[#D4AF37]/40 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="relative h-36 -mx-6 -mt-6 mb-4 overflow-hidden">
                  <img
                    src={getPhoto('pool', VENUE_IMAGES.pool)}
                    alt="Private Swimming Pool & Thatched Cabana at The Pearl"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.85] hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2B42]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-4 flex items-center gap-1.5 text-[10px] text-[#F3E5AB] font-bold uppercase tracking-wider">
                    <Waves className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Real Venue Pool &amp; Cabana</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-4 border border-[#D4AF37]/50">
                  <Waves className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1B2B42]">Pool Sessions</h4>
                <p className="text-xs font-serif italic text-[#C5A059] mb-3">Aquatic relaxation &amp; intimacy</p>
                <div className="inline-block px-3 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/50 text-xs font-bold text-[#1B2B42] mb-3">
                  R500 / hr per lady
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  Enhance your experience with a refreshing dip. Enjoy private poolside drinks and cool water touch with your chosen therapist in our secluded outdoor swimming pool and thatched cabana.
                </p>
              </div>
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hi The Pearl, I would like to book a Private Pool Session (R500/hr per lady).'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg border border-[#D4AF37] text-xs font-semibold text-[#1B2B42] hover:bg-[#D4AF37]/20 text-center transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                Book Pool Session
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Custom Session Estimator */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/40 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#1B2B42] text-[#D4AF37]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-[#1B2B42]">
                  Interactive Session Rate Estimator
                </h4>
                <p className="text-xs text-gray-500">
                  Select your duration and bespoke add-ons to preview pricing in real time.
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase tracking-wider text-gray-500">Estimated Total</span>
              <div className="font-serif text-3xl font-bold text-[#1B2B42]">
                R{calculateCustomTotal()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {/* 1. Duration Choice */}
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#1B2B42] mb-2">
                1. Select Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SPA_RATES.map((item) => (
                  <button
                    key={item.minutes}
                    type="button"
                    onClick={() => setSelectedDurationMinutes(item.minutes)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                      selectedDurationMinutes === item.minutes
                        ? 'bg-[#1B2B42] text-[#D4AF37] border-[#1B2B42] shadow'
                        : 'bg-[#FDFBF7] text-[#1B2B42] border-[#D4AF37]/40 hover:border-[#D4AF37]'
                    }`}
                  >
                    {item.duration} (R{item.price})
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Add-on Options */}
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-[#1B2B42] mb-2">
                2. Customize Experience
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 p-2 rounded-lg border border-[#D4AF37]/30 bg-[#FDFBF7] cursor-pointer hover:bg-white text-xs">
                  <input
                    type="checkbox"
                    checked={isDoubles}
                    onChange={(e) => setIsDoubles(e.target.checked)}
                    className="accent-[#1B2B42] w-4 h-4 rounded"
                  />
                  <span className="font-medium text-[#1B2B42]">Doubles Session (2 Ladies - R100 off)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-lg border border-[#D4AF37]/30 bg-[#FDFBF7] cursor-pointer hover:bg-white text-xs">
                  <input
                    type="checkbox"
                    checked={includePool}
                    onChange={(e) => setIncludePool(e.target.checked)}
                    className="accent-[#1B2B42] w-4 h-4 rounded"
                  />
                  <span className="font-medium text-[#1B2B42]">Private Pool Session (+R500/hr)</span>
                </label>
              </div>
            </div>

            {/* 3. Action Trigger */}
            <div>
              <button
                type="button"
                onClick={handleCustomWhatsAppBook}
                className="w-full py-3 rounded-xl bg-[#1B2B42] text-white hover:bg-[#152234] border border-[#D4AF37] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Book This Custom Session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
