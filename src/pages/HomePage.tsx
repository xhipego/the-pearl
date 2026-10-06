import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { PageId } from '../components/Navbar';
import { CONTACT_INFO } from '../data/spaData';
import { useVenuePhotos } from '../context/VenuePhotoContext';
import { TREATMENT_IMAGES } from '../data/treatmentImages';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  MessageCircle,
  Clock,
  Check,
  Waves,
  ChevronRight,
  Maximize2,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const { getPhoto } = useVenuePhotos();

  return (
    <div className="min-h-screen bg-[#ECEBE6] text-[#1A1F1C]">
      {/* 1. Cinematic Hero with Moving Venue Views Carousel & Real Controls (Book Online removed) */}
      <Hero onOpenBooking={onOpenBooking} onNavigate={onNavigate} />

      {/* 2. After-Work Strip Banner */}
      <div className="bg-[#27382F] text-[#E9E7E0] border-y border-[#D8B892]/30 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1160px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <p className="font-serif text-lg sm:text-xl font-normal text-white">
            &ldquo;In by six, out by seven&rdquo;. We&apos;re open until 20:00, every day.
          </p>
          <div className="text-right">
            <span className="text-xs sm:text-sm text-[#D8B892] tracking-wider uppercase font-semibold block">
              Private Sessions Daily
            </span>
            <span className="text-xs text-[#E9E7E0]/90 tracking-wider">
              From 10h00 - 20h00
            </span>
          </div>
        </div>
      </div>

      {/* 3. Three Treatments: Where Most Men Start */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1160px] mx-auto">
        <div className="max-w-3xl mb-12">
          <p className="text-xs tracking-widest uppercase text-[#9C6439] mb-2 font-semibold">
            Where most men start
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#1A1F1C]">
            3 Treatments; 3 Kinds of Tired
          </h2>
          <p className="text-xs sm:text-sm text-[#58615C] font-light mt-3 leading-relaxed max-w-2xl">
            Targeted relief for tight shoulders, deep muscle recovery for training strain, or dedicated foot care for long days on your feet. These three treatments address the most common types of fatigue, but please click on full menu to see our complete list of treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Back, Neck & Shoulders */}
          <article className="bg-[#F6F6F3] border border-[#D3D4CD] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#9C6439]/60 transition-all duration-300 group">
            <div>
              {/* Treatment Image with curved corners and futuristic hover zoom */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-[#2A352F] border border-black/10">
                <img
                  src={TREATMENT_IMAGES['back-neck-shoulders']}
                  alt="Back, Neck & Shoulders Massage"
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105 animate-kenburns-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none" />
                <div className="absolute left-2.5 bottom-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.12em] uppercase font-medium border border-white/10">
                  Targeted Bodywork
                </div>
              </div>

              <div className="flex items-baseline justify-between pb-3 border-b border-[#D3D4CD]">
                <span className="text-xs text-[#58615C] uppercase font-medium">30 min</span>
                <span className="font-serif text-2xl font-normal text-[#1A1F1C]">R400</span>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#1A1F1C] mt-4 mb-2">
                Back, Neck &amp; Shoulders
              </h3>
              <p className="text-xs sm:text-sm text-[#58615C] font-light leading-relaxed">
                For desk tension and long drives. A lunch-break reset that gets you back to work loose and mobile.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D3D4CD] flex items-center justify-between">
              <button
                onClick={() => onNavigate('treatments')}
                className="text-xs font-semibold text-[#9C6439] hover:text-[#1A1F1C] flex items-center gap-1 cursor-pointer"
              >
                <span>Full menu &rarr;</span>
              </button>
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  "Hi, I'd like to book a Back, Neck & Shoulders massage (30 min)."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#1F7A4D] hover:underline"
              >
                Book WhatsApp
              </a>
            </div>
          </article>

          {/* Card 2: Deep Tissue Recovery */}
          <article className="bg-[#F6F6F3] border-2 border-[#9C6439] rounded-2xl p-6 flex flex-col justify-between shadow-sm relative group">
            <span className="absolute -top-3 right-6 px-3 py-0.5 text-[10px] tracking-widest uppercase bg-[#9C6439] text-white font-semibold rounded-full z-10 shadow-xs">
              Most Booked
            </span>
            <div>
              {/* Treatment Image with curved corners and futuristic hover zoom */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-[#2A352F] border border-black/10">
                <img
                  src={TREATMENT_IMAGES['deep-tissue-massage']}
                  alt="Deep Tissue Massage"
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105 animate-kenburns-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none" />
                <div className="absolute left-2.5 bottom-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.12em] uppercase font-medium border border-white/10">
                  Premier Bodywork
                </div>
              </div>

              <div className="flex items-baseline justify-between pb-3 border-b border-[#D3D4CD]">
                <span className="text-xs text-[#58615C] uppercase font-medium">60 / 90 min</span>
                <span className="font-serif text-2xl font-normal text-[#1A1F1C]">R750</span>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#1A1F1C] mt-4 mb-2">
                Deep Tissue Massage
              </h3>
              <p className="text-xs sm:text-sm text-[#58615C] font-light leading-relaxed">
                Firm pressure for chronic tightness, heavy lifting, gym days and sports recovery. Our premier treatment for gentlemen.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D3D4CD] flex items-center justify-between">
              <button
                onClick={() => onNavigate('treatments')}
                className="text-xs font-semibold text-[#9C6439] hover:text-[#1A1F1C] flex items-center gap-1 cursor-pointer"
              >
                <span>Full menu &rarr;</span>
              </button>
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  "Hi, I'd like to book a Deep Tissue massage (60 min)."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#1F7A4D] hover:underline"
              >
                Book WhatsApp
              </a>
            </div>
          </article>

          {/* Card 3: Foot Scrub */}
          <article className="bg-[#F6F6F3] border border-[#D3D4CD] rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-[#9C6439]/60 transition-all duration-300 group">
            <div>
              {/* Treatment Image with curved corners and futuristic hover zoom */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-5 bg-[#2A352F] border border-black/10">
                <img
                  src={TREATMENT_IMAGES['foot-scrub']}
                  alt="Foot Scrub"
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.04] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105 animate-kenburns-3"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity pointer-events-none" />
                <div className="absolute left-2.5 bottom-2.5 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.12em] uppercase font-medium border border-white/10">
                  Lower-Leg Relief
                </div>
              </div>

              <div className="flex items-baseline justify-between pb-3 border-b border-[#D3D4CD]">
                <span className="text-xs text-[#58615C] uppercase font-medium">30 min</span>
                <span className="font-serif text-2xl font-normal text-[#1A1F1C]">R350</span>
              </div>
              <h3 className="font-serif text-xl font-normal text-[#1A1F1C] mt-4 mb-2">
                Foot Scrub
              </h3>
              <p className="text-xs sm:text-sm text-[#58615C] font-light leading-relaxed">
                A warm soak, exfoliating scrub and foot massage for feet that spend the day in boots or on site.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D3D4CD] flex items-center justify-between">
              <button
                onClick={() => onNavigate('treatments')}
                className="text-xs font-semibold text-[#9C6439] hover:text-[#1A1F1C] flex items-center gap-1 cursor-pointer"
              >
                <span>Full menu &rarr;</span>
              </button>
              <a
                href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                  "Hi, I'd like to book a Foot Scrub (30 min)."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#1F7A4D] hover:underline"
              >
                Book WhatsApp
              </a>
            </div>
          </article>
        </div>

        {/* View Full Menu Button Underneath the 3 Cards */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => onNavigate('treatments')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.14em] uppercase text-white bg-[#1B2B42] hover:bg-[#D4AF37] hover:text-[#1B2B42] shadow-md transition-all duration-300 cursor-pointer border border-[#D4AF37]/50"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </section>

      {/* 4. Four Reasons / Value Pillars */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-[#D3D4CD]">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#9C6439] font-semibold">Private</p>
            <h3 className="font-serif text-xl font-normal text-[#1A1F1C]">Your own treatment room</h3>
            <p className="text-xs sm:text-sm text-[#58615C] leading-relaxed font-light">
              Freshen up in your room before your session. Fresh crisp linen, clean towels, and robes that fit.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#9C6439] font-semibold">Unhurried</p>
            <h3 className="font-serif text-xl font-normal text-[#1A1F1C]">Stay after your massage</h3>
            <p className="text-xs sm:text-sm text-[#58615C] leading-relaxed font-light">
              30 minutes at the pool and thatched lapa with a coffee or cold drink. R250 with any treatment.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#9C6439] font-semibold">Easy</p>
            <h3 className="font-serif text-xl font-normal text-[#1A1F1C]">Park behind the gate</h3>
            <p className="text-xs sm:text-sm text-[#58615C] leading-relaxed font-light">
              Secure off-street parking and a discreet entrance. We send gate directions when you book.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#9C6439] font-semibold">Professional</p>
            <h3 className="font-serif text-xl font-normal text-[#1A1F1C]">Qualified therapists</h3>
            <p className="text-xs sm:text-sm text-[#58615C] leading-relaxed font-light">
              Therapists in uniform, a clear respectful draping policy, and a strict therapeutic code of conduct.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Venue Showcase Section Matching Layout with Curved Picture Outlines & Futuristic Hover Zoom */}
      <section className="py-20 bg-[#1D2A24] text-[#E9E7E0] border-y border-white/10">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#D8B892] font-semibold">THE VENUE</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mt-1">
                A private spa in Welgelegen
              </h2>
              <p className="text-xs sm:text-sm text-[#A9B2AC] font-light mt-2 max-w-2xl leading-relaxed">
                Four private treatment rooms, each named after a well-known Limpopo tree, plus a pool, a thatched lapa and secure parking behind the gate.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('venue')}
                className="px-5 py-2.5 text-xs font-semibold tracking-wider text-white border border-white/30 hover:bg-white/10 cursor-pointer transition-colors rounded-full"
              >
                View All Rooms &rarr;
              </button>
            </div>
          </div>

          {/* Top Wide Feature Card: The Baobab Suite with curved picture outline & futuristic hover zoom */}
          <div className="bg-[#F6F6F3] text-[#1A1F1C] border border-[#D3D4CD] rounded-2xl grid grid-cols-1 md:grid-cols-12 overflow-hidden shadow-sm hover:border-[#9C6439]/60 transition-colors">
            <div className="md:col-span-7 p-3 sm:p-4">
              <div className="relative min-h-[280px] bg-[#2A352F] rounded-xl overflow-hidden group cursor-pointer border border-black/10">
                <img
                  src={getPhoto('room-1')}
                  alt="The Baobab Suite"
                  className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity pointer-events-none" />

                <div className="absolute left-3.5 bottom-3.5 px-2.5 py-1 bg-black/65 backdrop-blur-md rounded text-white/95 text-[11px] tracking-[0.1em] uppercase font-medium border border-white/10">
                  THE BAOBAB SUITE
                </div>
              </div>
            </div>
            <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
                  EXECUTIVE SUITE · FOR ONE
                </p>
                <h3 className="font-serif text-2xl font-normal text-[#1A1F1C] mt-1">
                  The Baobab Suite
                </h3>
                <p className="text-xs sm:text-sm text-[#58615C] font-light leading-relaxed mt-2">
                  Our largest and most private room, with its own bath and shower. Book it for a hot stone or a 90-minute massage when you want the afternoon to yourself.
                </p>
              </div>
              <div className="pt-3 border-t border-[#D3D4CD]">
                <p className="text-xs text-[#9C6439] font-medium">
                  Hot Stone · Swedish 90 · Deep Tissue 90
                </p>
              </div>
            </div>
          </div>

          {/* Bottom 3 Columns Row with curved outlines & futuristic hover zoom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* The Marula Room */}
            <div className="bg-[#F6F6F3] text-[#1A1F1C] border border-[#D3D4CD] rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#9C6439]/60 transition-colors">
              <div className="p-3 sm:p-3.5">
                <div className="relative aspect-[16/11] bg-[#2A352F] rounded-xl overflow-hidden group cursor-pointer border border-black/10">
                  <img
                    src={getPhoto('room-2-night')}
                    alt="The Marula Room"
                    className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-112 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity pointer-events-none" />
                  <div className="absolute left-3 bottom-3 px-2 py-0.5 bg-black/65 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.1em] uppercase font-medium border border-white/10">
                    THE MARULA ROOM
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
                    MASSAGE · FOR ONE
                  </p>
                  <h4 className="font-serif text-xl font-normal text-[#1A1F1C] mt-1">
                    The Marula Room
                  </h4>
                  <p className="text-xs text-[#58615C] font-light leading-relaxed mt-2">
                    Quiet, warm and set up for proper work. Our everyday room for a full-body massage or a 30-minute reset between meetings.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D3D4CD]">
                  <p className="text-xs text-[#9C6439] font-medium">
                    Swedish · Deep Tissue · Aromatherapy · Back, Neck &amp; Shoulders
                  </p>
                </div>
              </div>
            </div>

            {/* The Mopane Room */}
            <div className="bg-[#F6F6F3] text-[#1A1F1C] border border-[#D3D4CD] rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#9C6439]/60 transition-colors">
              <div className="p-3 sm:p-3.5">
                <div className="relative aspect-[16/11] bg-[#2A352F] rounded-xl overflow-hidden group cursor-pointer border border-black/10">
                  <img
                    src={getPhoto('room-3-couples')}
                    alt="The Mopane Room"
                    className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-112 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity pointer-events-none" />
                  <div className="absolute left-3 bottom-3 px-2 py-0.5 bg-black/65 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.1em] uppercase font-medium border border-white/10">
                    THE MOPANE ROOM
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
                    COUPLES · FOR TWO
                  </p>
                  <h4 className="font-serif text-xl font-normal text-[#1A1F1C] mt-1">
                    The Mopane Room
                  </h4>
                  <p className="text-xs text-[#58615C] font-light leading-relaxed mt-2">
                    Named for the mopane leaf, which grows in pairs. Two tables side by side for a massage you share with your partner.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D3D4CD]">
                  <p className="text-xs text-[#9C6439] font-medium">
                    Couples Massage
                  </p>
                </div>
              </div>
            </div>

            {/* The Leadwood Room */}
            <div className="bg-[#F6F6F3] text-[#1A1F1C] border border-[#D3D4CD] rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm hover:border-[#9C6439]/60 transition-colors">
              <div className="p-3 sm:p-3.5">
                <div className="relative aspect-[16/11] bg-[#2A352F] rounded-xl overflow-hidden group cursor-pointer border border-black/10">
                  <img
                    src={getPhoto('room-4-footscrub')}
                    alt="The Leadwood Room"
                    className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-112 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 group-hover:opacity-30 transition-opacity pointer-events-none" />
                  <div className="absolute left-3 bottom-3 px-2 py-0.5 bg-black/65 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.1em] uppercase font-medium border border-white/10">
                    THE LEADWOOD ROOM
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
                    FEET · FOR ONE
                  </p>
                  <h4 className="font-serif text-xl font-normal text-[#1A1F1C] mt-1">
                    The Leadwood Room
                  </h4>
                  <p className="text-xs text-[#58615C] font-light leading-relaxed mt-2">
                    Named for the bushveld&apos;s toughest tree. A warm soak, scrub and foot massage for the feet that carry you through the week.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D3D4CD]">
                  <p className="text-xs text-[#9C6439] font-medium">
                    Foot Scrub &amp; Massage
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Spa Policies callout */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1160px] mx-auto">
        <div className="bg-[#F6F6F3] border border-[#D3D4CD] rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#9C6439] font-semibold">
              Code of Conduct &amp; Ethics
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1F1C] mt-1">
              Strictly therapeutic, private, and unhurried.
            </h3>
            <p className="text-xs sm:text-sm text-[#58615C] font-light mt-1 max-w-xl">
              All treatments are strictly non-sexual. Private suites with en-suite bathrooms, professional draping, and secure parking behind the electronic gate.
            </p>
          </div>
          <button
            onClick={() => onNavigate('policies')}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A1F1C] border border-[#1A1F1C] hover:bg-[#1A1F1C] hover:text-white cursor-pointer whitespace-nowrap transition-colors rounded-full shrink-0"
          >
            View Policies &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};
