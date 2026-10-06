import React, { useState } from 'react';
import { PageBanner } from '../components/PageBanner';
import { PageId } from '../components/Navbar';
import { CONTACT_INFO } from '../data/spaData';
import { useVenuePhotos } from '../context/VenuePhotoContext';
import {
  Waves,
  Shield,
  Clock,
  MapPin,
  MessageCircle,
  Maximize2,
  X,
} from 'lucide-react';

interface VenuePageProps {
  onNavigate: (page: PageId) => void;
  onOpenBooking: () => void;
}

interface RoomCardData {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  uses: string;
  photoCaption: string;
  whatsappMsg: string;
}

export const VenuePage: React.FC<VenuePageProps> = ({ onNavigate, onOpenBooking }) => {
  const { getPhoto } = useVenuePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string } | null>(null);

  // Top wide feature room: The Baobab Suite
  const baobabRoom: RoomCardData = {
    id: 'room-1',
    eyebrow: 'EXECUTIVE SUITE · FOR ONE',
    title: 'The Baobab Suite',
    description:
      'Our largest and most private room, with its own bath and shower. Book it for a hot stone or a 90-minute massage when you want the afternoon to yourself.',
    uses: 'Hot Stone · Swedish 90 · Deep Tissue 90',
    photoCaption: 'THE BAOBAB SUITE',
    whatsappMsg: "Hi, I'd like to book The Baobab Suite (Room 1). Which times are available?",
  };

  // 3 primary cards matching the screenshot's bottom row:
  const primaryRooms: RoomCardData[] = [
    {
      id: 'room-2-night',
      eyebrow: 'MASSAGE · FOR ONE',
      title: 'The Marula Room',
      description:
        'Quiet, warm and set up for proper work. Our everyday room for a full-body massage or a 30-minute reset between meetings. Features soothing evening night mode.',
      uses: 'Swedish · Deep Tissue · Aromatherapy · Back, Neck & Shoulders',
      photoCaption: 'THE MARULA ROOM',
      whatsappMsg: "Hi, I'd like to book The Marula Room. Which times are available?",
    },
    {
      id: 'room-3-couples',
      eyebrow: 'COUPLES · FOR TWO',
      title: 'The Mopane Room',
      description:
        'Named for the mopane leaf, which grows in pairs. Two tables side by side for a massage you share with your partner.',
      uses: 'Couples Massage',
      photoCaption: 'THE MOPANE ROOM',
      whatsappMsg: "Hi, I'd like to book The Mopane Room (Couples). Which times are available?",
    },
    {
      id: 'room-4-footscrub',
      eyebrow: 'FEET · FOR ONE',
      title: 'The Leadwood Room',
      description:
        "Named for the bushveld's toughest tree. A warm soak, scrub and foot massage for the feet that carry you through the week.",
      uses: 'Foot Scrub',
      photoCaption: 'THE LEADWOOD ROOM',
      whatsappMsg: "Hi, I'd like to book The Leadwood Room (Foot Scrub).",
    },
  ];

  // Additional facilities:
  const facilityRooms: RoomCardData[] = [
    {
      id: 'room-1-ensuite',
      eyebrow: 'EN-SUITE · PRIVATE BATHROOM',
      title: 'Room 1 En-Suite Bath & Shower',
      description:
        'Directly connected to Room 1. Full deep-soaking bathtub, high-pressure rainfall shower, plush robes, and clean towels to freshen up in total seclusion.',
      uses: 'Private Deep Soak · Rainfall Shower · Robes',
      photoCaption: 'ROOM 1 EN-SUITE BATH',
      whatsappMsg: "Hi, I'd like to book Room 1 with the private en-suite bathroom.",
    },
    {
      id: 'room-4-ensuite',
      eyebrow: 'EN-SUITE · PRIVATE SHOWER',
      title: 'Room 4 En-Suite Shower',
      description:
        'Private tiled rainfall shower directly inside Room 4. Fast, convenient freshening up before heading back to meetings, work, or home.',
      uses: 'High-Pressure Rainfall Shower · Changing Stall',
      photoCaption: 'ROOM 4 EN-SUITE SHOWER',
      whatsappMsg: "Hi, I'd like to book Room 4 with the en-suite shower.",
    },
    {
      id: 'pool-lapa',
      eyebrow: 'AFTER-TREATMENT · COURTYARD',
      title: 'Pool & Thatched Lapa',
      description:
        'Add 30 minutes at the secluded turquoise pool and thatched lapa after your treatment, with a fresh coffee, warm tea, or cold drink for R250.',
      uses: 'Turquoise Pool · Thatched Cabana · Drinks Included',
      photoCaption: 'POOL & THATCHED LAPA',
      whatsappMsg: "Hi, I'd like to add a Pool & Lapa session to my massage booking.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ECEBE6] text-[#1A1F1C]">
      {/* Page Banner Header */}
      <PageBanner
        title="The Venue &amp; Treatment Rooms"
        subtitle="A Private Spa Sanctuary in Welgelegen, Polokwane"
        badge="Serene &bull; Private &bull; Unhurried"
        onNavigate={onNavigate}
        currentPageName="The Venue"
      />

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Intro Header */}
        <div className="pb-6 border-b border-[#D3D4CD] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#9C6439] mb-1">
              THE VENUE
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1F1C]">
              A private spa in Welgelegen
            </h2>
            <p className="text-sm text-[#58615C] font-light mt-1.5 max-w-2xl leading-relaxed">
              Four private treatment rooms, each named after a well-known Limpopo tree, plus an en-suite bath and shower, a pool, a thatched lapa and secure parking behind the gate.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Top Wide Card: The Baobab Suite (with curved picture outline & futuristic zoom) */}
        {/* ============================================================== */}
        <div className="bg-[#F6F6F3] border border-[#D3D4CD] rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-12 overflow-hidden hover:border-[#9C6439]/60 transition-colors">
          {/* Left: Photo with curved outline container & futuristic smooth zoom */}
          <div className="md:col-span-7 p-3 sm:p-4">
            <div className="relative min-h-[300px] md:min-h-[360px] bg-[#2A352F] overflow-hidden rounded-xl border border-black/10 group cursor-pointer">
              <img
                src={getPhoto(baobabRoom.id)}
                alt={baobabRoom.title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-105 group-hover:contrast-105"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 opacity-70 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />

              {/* Caption box */}
              <div className="absolute left-3.5 bottom-3.5 z-10 px-2.5 py-1 bg-black/65 backdrop-blur-md rounded-md text-white/95 text-[11px] tracking-[0.1em] uppercase font-medium border border-white/10">
                {baobabRoom.photoCaption}
              </div>

              {/* Expand Image Button */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto({
                      src: getPhoto(baobabRoom.id),
                      title: baobabRoom.title,
                    });
                  }}
                  className="p-2 rounded-full bg-black/65 hover:bg-black/85 text-white/90 hover:text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-md"
                  title="Expand photo"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Text Information */}
          <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#F6F6F3]">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
                {baobabRoom.eyebrow}
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1F1C]">
                {baobabRoom.title}
              </h3>
              <p className="text-sm text-[#58615C] font-light leading-relaxed pt-1">
                {baobabRoom.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#D3D4CD]">
              <p className="text-xs text-[#9C6439] tracking-[0.06em] font-medium">
                {baobabRoom.uses}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <a
                  href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(baobabRoom.whatsappMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1F7A4D] hover:underline"
                >
                  Book on WhatsApp &rarr;
                </a>
                <button
                  onClick={onOpenBooking}
                  className="text-xs text-[#58615C] hover:text-[#1A1F1C] underline cursor-pointer"
                >
                  Reserve Date &amp; Time
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* Bottom 3 Columns Row (curved picture outlines & futuristic zoom) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {primaryRooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#F6F6F3] border border-[#D3D4CD] rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden hover:border-[#9C6439]/60 transition-colors"
            >
              {/* Photo Area with rounded outline & futuristic zoom */}
              <div className="p-3 sm:p-3.5">
                <div className="relative aspect-[16/11] bg-[#2A352F] overflow-hidden rounded-xl border border-black/10 group cursor-pointer">
                  <img
                    src={getPhoto(room.id)}
                    alt={room.title}
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-112 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                  {/* Caption */}
                  <div className="absolute left-3 bottom-3 z-10 px-2 py-0.5 bg-black/65 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.1em] uppercase font-medium border border-white/10">
                    {room.photoCaption}
                  </div>

                  {/* Expand Photo Button */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhoto({
                          src: getPhoto(room.id),
                          title: room.title,
                        });
                      }}
                      className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-md"
                      title="Expand photo"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="px-6 pb-6 pt-2 flex-1 flex flex-col justify-between space-y-5 bg-[#F6F6F3]">
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
                    {room.eyebrow}
                  </p>
                  <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1F1C]">
                    {room.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#58615C] font-light leading-relaxed pt-0.5">
                    {room.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D3D4CD] space-y-2">
                  <p className="text-xs text-[#9C6439] tracking-[0.05em] font-medium">
                    {room.uses}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <a
                      href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(room.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#1F7A4D] hover:underline"
                    >
                      Book on WhatsApp &rarr;
                    </a>
                    <button
                      onClick={onOpenBooking}
                      className="text-xs text-[#58615C] hover:text-[#1A1F1C] underline cursor-pointer"
                    >
                      Book Online
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* Additional Facilities (En-Suite Baths & Showers)               */}
        {/* ============================================================== */}
        <div className="pt-6">
          <div className="mb-6 pb-3 border-b border-[#D3D4CD]">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
              FACILITIES &amp; COURTYARD
            </p>
            <h3 className="font-serif text-2xl font-normal text-[#1A1F1C] mt-1">
              Private en-suite amenities and grounds
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilityRooms.map((facility) => (
              <div
                key={facility.id}
                className="bg-[#F6F6F3] border border-[#D3D4CD] rounded-2xl shadow-sm flex flex-col justify-between overflow-hidden hover:border-[#9C6439]/60 transition-colors"
              >
                {/* Photo Area with curved picture outline & futuristic zoom */}
                <div className="p-3 sm:p-3.5">
                  <div className="relative aspect-[16/11] bg-[#2A352F] overflow-hidden rounded-xl border border-black/10 group cursor-pointer">
                    <img
                      src={getPhoto(facility.id)}
                      alt={facility.title}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-112 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />

                    <div className="absolute left-3 bottom-3 z-10 px-2 py-0.5 bg-black/65 backdrop-blur-md rounded text-white/95 text-[10px] tracking-[0.1em] uppercase font-medium border border-white/10">
                      {facility.photoCaption}
                    </div>

                    {/* Expand Photo Button */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhoto({
                            src: getPhoto(facility.id),
                            title: facility.title,
                          });
                        }}
                        className="p-1.5 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white transition-all backdrop-blur-md cursor-pointer border border-white/20 shadow-md"
                        title="Expand photo"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Text Area */}
                <div className="px-6 pb-6 pt-2 flex-1 flex flex-col justify-between space-y-5 bg-[#F6F6F3]">
                  <div className="space-y-2">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#9C6439]">
                      {facility.eyebrow}
                    </p>
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1F1C]">
                      {facility.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#58615C] font-light leading-relaxed pt-0.5">
                      {facility.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#D3D4CD] space-y-2">
                    <p className="text-xs text-[#9C6439] tracking-[0.05em] font-medium">
                      {facility.uses}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <a
                        href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(facility.whatsappMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#1F7A4D] hover:underline"
                      >
                        Inquire on WhatsApp &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrival Behind the Gate Split Card */}
        <div className="bg-[#1D2A24] text-[#E9E7E0] border border-white/10 rounded-2xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D8B892]">
              ARRIVING AT THE PEARL
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Park behind the gate. We&apos;ll be expecting you.
            </h3>
            <p className="text-xs sm:text-sm text-[#A9B2AC] font-light leading-relaxed">
              Secure off-street parking and a discreet entrance on a quiet residential street. When you book, we send gate directions on WhatsApp and greet you by name at the door.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#E9E7E0]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#D8B892]" /> Motorized Security Gate
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D8B892]" /> Open Daily 10:00 – 20:00
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D8B892]" /> 112 Genl Beyers Street, Welgelegen
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
            <a
              href={`${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
                "Hi, I'd like to book a massage. Which times are available?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#1F7A4D] hover:bg-[#18643F] text-center transition-colors rounded-full flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book on WhatsApp</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-transparent hover:bg-white/10 border border-white/30 text-center transition-colors rounded-full cursor-pointer"
            >
              Book Online Form
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen Photo Viewing */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1D2A24] border border-white/20 shadow-2xl rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-black">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 text-white bg-[#1D2A24] flex items-center justify-between">
              <h4 className="font-serif text-lg font-normal text-[#E9E7E0]">
                {selectedPhoto.title}
              </h4>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-xs uppercase tracking-wider text-[#D8B892] hover:underline cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
