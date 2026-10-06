import React, { useState } from 'react';
import {
  Check,
  MessageCircle,
  Activity,
  Droplets,
  Layers,
  Clock,
  Compass,
  Flame,
  Maximize2,
  X,
} from 'lucide-react';
import { ADDONS_MENU, CONTACT_INFO } from '../data/spaData';
import { TREATMENT_IMAGES } from '../data/treatmentImages';

interface RatesAndServicesProps {
  onSelectBooking: (duration: string, addOn?: string) => void;
}

export const RatesAndServices: React.FC<RatesAndServicesProps> = ({ onSelectBooking }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string } | null>(null);

  // Enhanced detail items for each massage service with dedicated professional moving image
  // Order: 1. Deep Tissue, 2. Swedish, 3. Hot Stone, 4. Aromatherapy, 5. Back & Neck, 6. Foot Scrub, 7. Couples at the end
  const massageServices = [
    {
      id: 'deep-tissue-massage',
      badge: 'Most Booked by Men',
      badgeColor: 'bg-[#9C6439] text-white',
      featured: true,
      icon: <Activity className="w-5 h-5 text-[#D4AF37]" />,
      name: 'Deep Tissue Massage',
      image: TREATMENT_IMAGES['deep-tissue-massage'],
      animClass: 'animate-kenburns-1',
      tagline: 'Firm, concentrated trigger-point pressure for athletic recovery & chronic stiffness.',
      description:
        'Our premier and most requested bodywork session for gentlemen. Your qualified therapist applies deliberate, slow, firm strokes using forearms, knuckles, and thumbs to reach deep muscle layers and connective tissue.',
      benefits: [
        'Breaks up rigid scar tissue, locked knots, and chronic desk tightness',
        'Targets trapezius, lower back, hamstrings, and shoulder blade strain',
        'Accelerates recovery after intense gym workouts, sports, or physical labor',
        'Improves posture, mobility, and healthy arterial circulation',
      ],
      includes: 'Private heated room, fresh linen, clean towels, en-suite shower freshen up',
      durations: [
        { time: '60 min', price: 750, popular: true },
        { time: '90 min', price: 1050, popular: false },
      ],
      whatsappMsg: "Hi, I'd like to book a Deep Tissue massage. Which times are available?",
    },
    {
      id: 'swedish-massage',
      badge: 'Classic Relaxation',
      badgeColor: 'bg-[#1D2A24] text-[#E9E7E0]',
      featured: false,
      icon: <Layers className="w-5 h-5 text-[#D4AF37]" />,
      name: 'Swedish Full-Body Massage',
      image: TREATMENT_IMAGES['swedish-massage'],
      animClass: 'animate-kenburns-2',
      tagline: 'Medium pressure full-body flow designed to dissolve stress and tension.',
      description:
        'The gold standard of holistic relaxation. Combining long gliding strokes (effleurage), gentle kneading (petrissage), and light friction to soothe your central nervous system, relax tight muscles, and restore full-body equilibrium.',
      benefits: [
        'Medium, balanced pressure that releases mental stress and bodily fatigue',
        'Enhances blood oxygenation and stimulates lymphatic detoxification',
        'Eases mild muscle aches while promoting deep sleep and calm',
        'Ideal first massage for gentlemen seeking to unplug and switch off',
      ],
      includes: 'Full-body coverage with professional draping, warm botanical oil, private room',
      durations: [
        { time: '60 min', price: 650, popular: false },
        { time: '90 min', price: 950, popular: false },
      ],
      whatsappMsg: "Hi, I'd like to book a Swedish Full-Body massage. Which times are available?",
    },
    {
      id: 'hot-stone-massage',
      badge: 'Thermal Deep Release',
      badgeColor: 'bg-[#9C6439] text-white',
      featured: false,
      icon: <Flame className="w-5 h-5 text-[#D4AF37]" />,
      name: 'Hot Stone Massage',
      image: TREATMENT_IMAGES['hot-stone-massage'],
      animClass: 'animate-kenburns-2',
      tagline: 'Smooth volcanic basalt stones delivering penetrating thermal muscle therapy.',
      description:
        'Basalt river stones heated to the ideal therapeutic temperature are coated in warm botanical oil and massaged over tight muscular pathways. The radiant thermal energy penetrates deep into muscle fibers that standard hands-only pressure cannot reach.',
      benefits: [
        'Deep thermal heat softens chronic tension without painful heavy pressure',
        'Dramatically accelerates vascular blood flow and cellular oxygenation',
        'Sedates nervous system tension for an unforgettable state of serene stillness',
        'Recommended for winter chills, chronic back stiffness, and deep physical fatigue',
      ],
      includes: 'Heated volcanic stones, essential oils, private en-suite shower access',
      durations: [
        { time: '60 min', price: 900, popular: false },
      ],
      whatsappMsg: "Hi, I'd like to book a Hot Stone massage (60 min). Which times are available?",
    },
    {
      id: 'aromatherapy-massage',
      badge: 'Botanical Restoration',
      badgeColor: 'bg-[#1D2A24] text-[#E9E7E0]',
      featured: false,
      icon: <Droplets className="w-5 h-5 text-[#D4AF37]" />,
      name: 'Aromatherapy Massage',
      image: TREATMENT_IMAGES['aromatherapy-massage'],
      animClass: 'animate-kenburns-1',
      tagline: 'Deep relaxation blended with certified pure essential plant essences.',
      description:
        'A sensory therapeutic journey combining fluid rhythmic touch with warmed, organic essential oils. Your choice of invigorating Eucalyptus (respiratory clarity & sore muscles), rich Cedarwood (grounding & nervous exhaustion), or fresh Citrus (mental alertness).',
      benefits: [
        'Essential oil molecules absorbed through skin to relieve deep muscular inflammation',
        'Calms cortisol spikes, lowers heart rate, and melts mental fatigue',
        'Nourishes and hydrates dry skin with organic carrier oils',
        'Customized aromatic blend tailored to your mood upon arrival',
      ],
      includes: 'Personalized aromatherapy consultation, heated table, complimentary warm tea',
      durations: [
        { time: '60 min', price: 700, popular: false },
      ],
      whatsappMsg: "Hi, I'd like to book an Aromatherapy massage (60 min). Which times are available?",
    },
    {
      id: 'back-neck-shoulders',
      badge: 'Targeted Relief',
      badgeColor: 'bg-[#27382F] text-[#D8B892]',
      featured: false,
      icon: <Compass className="w-5 h-5 text-[#D4AF37]" />,
      name: 'Back, Neck & Shoulders',
      image: TREATMENT_IMAGES['back-neck-shoulders'],
      animClass: 'animate-kenburns-3',
      tagline: 'Targeted focus for computer fatigue, driving tension, and upper-spine stiffness.',
      description:
        'An intensive 30-minute targeted session concentrated precisely where modern men hold the heaviest strain. Gets you off the table loose, relaxed, and recharged without taking up your entire afternoon.',
      benefits: [
        'Dedicated release of cervical spine, neck stiffness, and shoulder knots',
        'Counteracts hunched computer posture, mobile phone neck, and driving fatigue',
        'Relieves tension headaches originating from tight occipital and suboccipital muscles',
        'Fast, convenient 30-minute turnaround in private seclusion',
      ],
      includes: 'Private suite, targeted muscle balm, quick en-suite freshen up',
      durations: [
        { time: '30 min', price: 400, popular: false },
      ],
      whatsappMsg: "Hi, I'd like to book a Back, Neck & Shoulders massage (30 min). Which times are available?",
    },
    {
      id: 'foot-scrub',
      badge: 'Lower-Leg Care',
      badgeColor: 'bg-[#1D2A24] text-[#E9E7E0]',
      featured: false,
      icon: <Activity className="w-5 h-5 text-[#D4AF37]" />,
      name: 'Foot Scrub',
      image: TREATMENT_IMAGES['foot-scrub'],
      animClass: 'animate-kenburns-3',
      tagline: 'Warm mineral soak, exfoliating scrub, and a targeted foot & calf relief massage.',
      description:
        'Conducted in deep relaxation armchairs in the Leadwood Room. Crafted specifically for feet that spend long days in boots, on site, on construction visits, or standing on hard surfaces.',
      benefits: [
        'Warm copper basin mineral soak softens calluses',
        'Natural volcanic exfoliating scrub revitalizes skin',
        'Deep arch and heel acupressure relieves plantar strain',
        'Lower-calf restorative draining eases heavy leg ache',
      ],
      includes: 'Warm herbal tea, private Leadwood suite',
      durations: [
        { time: '30 min', price: 350, popular: false },
      ],
      whatsappMsg: "Hi, I'd like to book a Foot Scrub (30 min). Which times are available?",
    },
    {
      id: 'couples-massage',
      badge: 'Side-by-Side Tables',
      badgeColor: 'bg-[#1D2A24] text-[#E9E7E0]',
      featured: false,
      icon: <Layers className="w-5 h-5 text-[#D4AF37]" />,
      name: 'Couples Massage',
      image: TREATMENT_IMAGES['couples-massage'],
      animClass: 'animate-kenburns-1',
      tagline: 'Side-by-side synchronized treatment in the dedicated Mopane Room (Room 3).',
      description:
        'Two treatment tables positioned side-by-side with two qualified therapists working simultaneously. Each guest individually chooses Swedish relaxation or Aromatherapy pressure to match their preference.',
      benefits: [
        'Synchronized session in Room 3 for couples',
        'Individual pressure choices (Swedish or Aromatherapy)',
        'Includes complimentary refreshments for two',
        'Option to add private pool & lapa time afterwards',
      ],
      includes: 'Two certified therapists, side-by-side Mopane suite, dual refreshments',
      durations: [
        { time: '60 min', price: 1300, popular: false },
      ],
      whatsappMsg: "Hi, I'd like to book a Couples Massage in Room 3 for two.",
    },
  ];

  return (
    <section id="treatments" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#ECEBE6] text-[#1A1F1C]">
      <div className="max-w-[1160px] mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
            TREATMENTS &amp; PRICES
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1F1C] tracking-wide">
            Massage Treatments &amp; Prices
          </h2>
          <p className="text-sm text-[#58615C] font-light max-w-xl mx-auto leading-relaxed">
            Prices are per person, with no hidden fees. Each treatment takes place in your own private room with en-suite facilities.
          </p>

          {/* Included with every session */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-[#1A1F1C] pt-2 font-medium">
            <span className="flex items-center gap-1.5 bg-[#F6F6F3] border border-[#D3D4CD] px-3.5 py-1.5 rounded-full shadow-xs">
              <Check className="w-3.5 h-3.5 text-[#9C6439]" /> Private treatment room
            </span>
            <span className="flex items-center gap-1.5 bg-[#F6F6F3] border border-[#D3D4CD] px-3.5 py-1.5 rounded-full shadow-xs">
              <Check className="w-3.5 h-3.5 text-[#9C6439]" /> En-suite freshen up
            </span>
            <span className="flex items-center gap-1.5 bg-[#F6F6F3] border border-[#D3D4CD] px-3.5 py-1.5 rounded-full shadow-xs">
              <Check className="w-3.5 h-3.5 text-[#9C6439]" /> Fresh linen &amp; robes
            </span>
            <span className="flex items-center gap-1.5 bg-[#F6F6F3] border border-[#D3D4CD] px-3.5 py-1.5 rounded-full shadow-xs">
              <Check className="w-3.5 h-3.5 text-[#9C6439]" /> Coffee, tea or cold drink
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FULL BODY MASSAGES - 7 TREATMENTS IN USER SPECIFIED ORDER      */}
        {/* 1. Deep Tissue, 2. Swedish, 3. Hot Stone, 4. Aromatherapy,     */}
        {/* 5. Back & Neck, 6. Foot Scrub, 7. Couples at the end           */}
        {/* ============================================================== */}
        <div className="space-y-8">
          <div className="pb-3 border-b border-[#D3D4CD] flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#9C6439]">
                PRIMARY MENU
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1F1C] mt-0.5">
                Full Body Massages
              </h3>
            </div>
            <span className="text-xs text-[#58615C] font-light hidden sm:inline">
              7 Dedicated Treatments
            </span>
          </div>

          <div className="space-y-8">
            {massageServices.map((service) => (
              <div
                key={service.id}
                className={`bg-[#F6F6F3] border transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md ${
                  service.featured
                    ? 'border-2 border-[#9C6439] ring-2 ring-[#9C6439]/10'
                    : 'border-[#D3D4CD] hover:border-[#9C6439]/60'
                }`}
              >
                <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Column 1: Cinematic Moving Treatment Image with Futuristic Hover Zoom */}
                  <div className="lg:col-span-4 flex flex-col justify-center">
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[220px] rounded-xl overflow-hidden group bg-[#2A352F] border border-black/10 shadow-inner">
                      <img
                        src={service.image}
                        alt={service.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-115 group-hover:brightness-105 ${service.animClass}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                      {/* Clean Name Badge */}
                      <div className="absolute left-3 bottom-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.12em] uppercase font-medium border border-white/10">
                        {service.name}
                      </div>

                      {/* Expand Button */}
                      <button
                        onClick={() => setSelectedPhoto({ src: service.image, title: service.name })}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/90 hover:text-white transition-all backdrop-blur-md cursor-pointer border border-white/15"
                        title="Expand image"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Column 2: Title, Description, Benefits & Inclusions */}
                  <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="p-1.5 rounded-lg bg-white border border-[#D3D4CD] shadow-xs">
                          {service.icon}
                        </span>
                        <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1F1C]">
                          {service.name}
                        </h4>
                        <span
                          className={`text-[10px] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full ${service.badgeColor}`}
                        >
                          {service.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#9C6439] font-medium mb-2">
                        {service.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-[#58615C] font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Specific benefits grid */}
                    <div className="grid grid-cols-1 gap-1.5 pt-2 border-t border-[#D3D4CD]/60">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#1A1F1C]">
                          <Check className="w-3.5 h-3.5 text-[#9C6439] shrink-0 mt-0.5" />
                          <span className="font-light">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    {/* What's included note */}
                    <div className="pt-2 text-[11px] text-[#58615C] flex items-center gap-1.5">
                      <span className="font-medium text-[#1A1F1C]">Includes:</span>
                      <span>{service.includes}</span>
                    </div>
                  </div>

                  {/* Column 3: Duration, Pricing & Instant Booking */}
                  <div className="lg:col-span-3 bg-white/70 border border-[#D3D4CD] rounded-xl p-5 flex flex-col justify-between space-y-4 h-full">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 mb-3">
                        Duration &amp; Price
                      </p>

                      <div className="space-y-2">
                        {service.durations.map((dur) => (
                          <div
                            key={dur.time}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                              dur.popular
                                ? 'bg-[#9C6439]/5 border-[#9C6439]'
                                : 'bg-white border-[#D3D4CD]'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#9C6439]" />
                              <span className="text-xs font-semibold text-[#1A1F1C]">
                                {dur.time}
                              </span>
                              {dur.popular && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#9C6439] text-white uppercase font-bold">
                                  Fav
                                </span>
                              )}
                            </div>
                            <span className="font-serif text-xl font-normal text-[#1A1F1C]">
                              R{dur.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-100">
                      <a
                        href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(service.whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-[#1F7A4D] hover:bg-[#18643F] transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Book on WhatsApp</span>
                      </a>

                      <button
                        onClick={() => onSelectBooking(service.durations[0]?.time || '60 min')}
                        className="w-full py-2 px-4 rounded-full text-xs font-medium text-[#1A1F1C] bg-transparent hover:bg-gray-100 border border-gray-300 transition-colors cursor-pointer"
                      >
                        Select in Online Form
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* ADD TO ANY TREATMENT (Pool, Lapa & Hot Stone)                  */}
        {/* ============================================================== */}
        <div className="bg-[#1D2A24] text-[#E9E7E0] rounded-2xl p-8 sm:p-10 border border-white/10 space-y-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#D8B892]">
              ENHANCE YOUR SESSION
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Add to Any Treatment
            </h3>
            <p className="text-xs text-[#A9B2AC] font-light">
              Elevate your session with additional hydrotherapy relaxation or thermal stone work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ADDONS_MENU.map((addon) => (
              <div
                key={addon.id}
                className="bg-white/5 border border-white/15 rounded-xl p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-serif text-xl font-normal text-white">{addon.title}</h4>
                    <span className="font-serif text-xl font-normal text-[#D8B892]">R{addon.price}</span>
                  </div>
                  <p className="text-xs text-[#A9B2AC] font-light leading-relaxed">
                    {addon.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#D8B892] font-medium">{addon.time}</span>
                  <a
                    href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                      `Hi, I'd like to book a massage with the ${addon.title} add-on.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#D8B892] underline"
                  >
                    Add via WhatsApp &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* Selection Advice Callout                                       */}
        {/* ============================================================== */}
        <div className="bg-[#F6F6F3] border border-[#D3D4CD] rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-semibold tracking-[0.16em] uppercase text-[#9C6439]">
              NOT SURE WHAT TO BOOK?
            </span>
            <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1F1C] leading-snug">
              Train, lift or carry tension? <br className="hidden sm:inline" />
              Book Deep Tissue 60. <br />
              Just need to switch off? <br className="hidden sm:inline" />
              Book Swedish 60.
            </h4>
            <p className="text-xs text-[#58615C] leading-relaxed font-light">
              Tell your therapist what&apos;s tight when you arrive. They&apos;ll adjust pressure, focus areas, and rhythm to suit your body perfectly.
            </p>
          </div>
          <a
            href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
              "Hi, I'd like advice on which massage is best suited for me."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-[#1F7A4D] hover:bg-[#18643F] shrink-0 transition-colors"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>

      {/* Lightbox / Expanded Treatment Image Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[88vh] bg-[#162234] rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer border border-white/20"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
              />
              <div className="p-4 bg-[#162234] border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    {selectedPhoto.title}
                  </h4>
                  <p className="text-xs text-[#D8B892]">
                    The Pearl Wellness Spa &bull; Polokwane
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
