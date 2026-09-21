/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RatesPage } from './pages/RatesPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ContactPage } from './pages/ContactPage';
import { VenuePhotoProvider } from './context/VenuePhotoContext';
import { VenuePhotoModal } from './components/VenuePhotoModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('60 min');

  // Sync with browser URL hash for multi-page feel & back/forward button support
  useEffect(() => {
    const parseHash = (): PageId => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'about', 'rates', 'policies', 'contact'];
      if (validPages.includes(hash as PageId)) {
        return hash as PageId;
      }
      return 'home';
    };

    setCurrentPage(parseHash());

    const handleHashChange = () => {
      setCurrentPage(parseHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingWithParams = (duration?: string) => {
    if (duration) setSelectedDuration(duration);
    setBookingModalOpen(true);
  };

  return (
    <VenuePhotoProvider>
      <div className="min-h-screen bg-[#FDFBF7] text-[#111827] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#1B2B42]">
        {/* Top Navigation Bar: Seamlessly Integrated Across All Pages */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Main Multi-Page Content Area: Each section has its own dedicated page */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenBooking={() => setBookingModalOpen(true)}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onNavigate={handleNavigate}
              onOpenBooking={() => setBookingModalOpen(true)}
            />
          )}

          {currentPage === 'rates' && (
            <RatesPage
              onNavigate={handleNavigate}
              onSelectBooking={(duration) => handleOpenBookingWithParams(duration)}
              onOpenBooking={() => setBookingModalOpen(true)}
            />
          )}

          {currentPage === 'policies' && (
            <PoliciesPage
              onNavigate={handleNavigate}
              onOpenBooking={() => setBookingModalOpen(true)}
            />
          )}

          {currentPage === 'contact' && (
            <ContactPage
              onNavigate={handleNavigate}
              initialDuration={selectedDuration}
            />
          )}
        </main>

        {/* Luxury Footer with Dynamic Multi-Page Navigation */}
        <Footer onNavigate={handleNavigate} />

        {/* Fixed Floating WhatsApp Action */}
        <WhatsAppFloatingButton />

        {/* Global Interactive Booking Dialog */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          defaultDuration={selectedDuration}
        />

        {/* Venue Real Photos Sync Modal */}
        <VenuePhotoModal />
      </div>
    </VenuePhotoProvider>
  );
}
