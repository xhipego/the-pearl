import React from 'react';
import { Hero } from '../components/Hero';
import { PageId } from '../components/Navbar';
import { CONTACT_INFO, SPA_RATES } from '../data/spaData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  MessageCircle,
  HeartHandshake,
  UserCheck,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* 1. Cinematic Hero with Venue Snippets & Seamless Top Bar Integration */}
      <Hero onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* 2. Welcome & Introduction Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#C5A059] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Polokwane&apos;s Discerning Sanctuary</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B2B42] tracking-wide">
            A Haven of Sensual Elegance
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-[#C5A059] mt-2 mb-4">
            Uncomplicated Luxury • Unrivaled Discretion • Deep Bodily Release
          </p>
          <div className="flex items-center justify-center gap-3 w-48 mx-auto my-4">
            <div className="h-[1px] flex-1 bg-[#D4AF37]/40" />
            <div className="w-2.5 h-2.5 rounded-full pearl-sphere border border-[#D4AF37]" />
            <div className="h-[1px] flex-1 bg-[#D4AF37]/40" />
          </div>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
            Situated in the quiet, upscale suburb of Welgelen, Polokwane, <strong className="text-[#1B2B42] font-semibold">The Pearl Wellness Spa</strong> is a bespoke adult wellness haven modeled after South Africa&apos;s most prestigious executive retreats. Experience therapeutic tension release, sensual touch, and total peace of mind.
          </p>
        </div>

        {/* 4 Feature Exploration Cards (Leading to Dedicated Pages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: About */}
          <div
            onClick={() => onNavigate('about')}
            className="group relative bg-white rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-5 shadow-md group-hover:bg-[#D4AF37] group-hover:text-[#1B2B42] transition-colors">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B2B42] mb-2 group-hover:text-[#C5A059] transition-colors">
                About The Pearl
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                Discover our luxury venue, private en-suite suites, sparkling swimming pool &amp; thatched lapa, and unwavering commitment to client discretion.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#C5A059] group-hover:text-[#1B2B42] transition-colors">
              <span>Explore Sanctuary</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Services & Rates */}
          <div
            onClick={() => onNavigate('rates')}
            className="group relative bg-white rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-5 shadow-md group-hover:bg-[#D4AF37] group-hover:text-[#1B2B42] transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B2B42] mb-2 group-hover:text-[#C5A059] transition-colors">
                Services &amp; Rates
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                Transparent rates from R500. Full-body sensual massages, doubles (2 ladies), and custom pool sessions.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#C5A059] group-hover:text-[#1B2B42] transition-colors">
              <span>View Rates Menu</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Hostesses (WhatsApp inquiry) */}
          <a
            href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
              'Hi The Pearl Wellness Spa, please send me photos and profiles of the available hostesses today.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#25D366] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#25D366]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#25D366] flex items-center justify-center mb-5 shadow-md group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B2B42] mb-2 group-hover:text-[#25D366] transition-colors">
                Our Hostesses
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                Hostesses are not displayed online. Text or WhatsApp 073 995 5927 to view today&apos;s available hostesses and photos.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#25D366] group-hover:text-[#1B2B42] transition-colors">
              <span>WhatsApp for Photos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 4: Policies & Safety */}
          <div
            onClick={() => onNavigate('policies')}
            className="group relative bg-white rounded-2xl p-7 border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1B2B42] text-[#D4AF37] flex items-center justify-center mb-5 shadow-md group-hover:bg-[#D4AF37] group-hover:text-[#1B2B42] transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B2B42] mb-2 group-hover:text-[#C5A059] transition-colors">
                Policies &amp; Safety
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                Strictly 18+ adult venue. No sexual intercourse or oral sex permitted. 100% confidential, clean, and safe.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#C5A059] group-hover:text-[#1B2B42] transition-colors">
              <span>Read Code of Conduct</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Rates Spotlight Banner (Quick summary with link to full Rates Page) */}
      <section className="py-16 bg-gradient-to-b from-[#142032] to-[#1B2B42] text-white border-y border-[#D4AF37]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D4AF37] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Transparent Rates • No Hidden Fees</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                Experience Genuine Sensual Bodywork From R500
              </h2>
              <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                From express 30-minute stress-relief to our supreme 120-minute VIP relaxation journeys. Every session includes a private heated suite, en-suite shower, and organic botanical oils.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onNavigate('rates')}
                  className="px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 shadow-lg cursor-pointer transition-all"
                >
                  View Full Rates Page &amp; Calculator
                </button>
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 cursor-pointer transition-all"
                >
                  Book Instant Session
                </button>
              </div>
            </div>

            {/* Quick Rates Snapshot Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto shrink-0">
              {SPA_RATES.map((rate, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('rates')}
                  className="bg-white/5 border border-white/10 hover:border-[#D4AF37]/80 rounded-xl p-3.5 sm:p-4 text-center cursor-pointer transition-all hover:scale-105 min-w-[110px]"
                >
                  <p className="text-[11px] text-slate-300 font-medium tracking-wider uppercase">{rate.duration}</p>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#F3E5AB] my-1">R{rate.price}</p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[120px] mx-auto">{rate.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Hostesses WhatsApp Inquiry Spotlight */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#1B2B42] via-[#243B55] to-[#1B2B42] rounded-3xl p-8 sm:p-14 text-white border border-[#D4AF37]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#F3E5AB]">
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Direct Reception Roster</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              View Today&apos;s Hostesses on WhatsApp
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              To protect the privacy of our ladies and ensure you receive real-time availability for today&apos;s sessions, hostess profiles and verified photographs are shared directly through our Welgelen reception concierge.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  'Hi The Pearl Wellness Spa, please send me photos and profiles of the available hostesses today.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] hover:brightness-110 shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#1B2B42]" />
                <span>Text WhatsApp for Hostess Photos</span>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone1}`}
                className="px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Call 073 995 5927</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Location & Concierge Quick Banner */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#C5A059] mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Welgelen, Polokwane</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B2B42] mb-3">
              Discrete, Private &amp; Open Daily (10:00 – 20:00)
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              Located at 112 Genl Beyers Street, Welgelen. Secure, unmarked private entrance with dedicated off-street parking. Contact our discreet concierge to reserve your sanctuary session.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-[#1B2B42] bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37] transition-all cursor-pointer"
            >
              Contact &amp; Map
            </button>
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                'Hi The Pearl Wellness Spa, I would like to inquire about booking a session.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase text-white bg-[#1B2B42] hover:bg-[#152234] border border-[#25D366] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
