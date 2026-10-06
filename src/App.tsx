/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { RatesPage } from './pages/RatesPage';
import { VenuePage } from './pages/VenuePage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ContactPage } from './pages/ContactPage';
import { VenuePhotoProvider } from './context/VenuePhotoContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('60 min');

  // Sync with browser URL hash for clean navigation & back/forward button support
  useEffect(() => {
    const parseHash = (): PageId => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'treatments', 'venue', 'policies', 'contact'];
      if (validPages.includes(hash as PageId)) {
        return hash as PageId;
      }
      // Backwards compatibility for previous hashes
      if (hash === 'rates') return 'treatments';
      if (hash === 'about') return 'venue';
      if (hash === 'visit') return 'policies';
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
        {/* Top Navigation Bar: Home, Treatments & Prices, The Venue, Policies, Contact */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={() => setBookingModalOpen(true)}
        />

        {/* Main Multi-Page Content Area */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenBooking={() => setBookingModalOpen(true)}
            />
          )}

          {currentPage === 'treatments' && (
            <RatesPage
              onNavigate={handleNavigate}
              onSelectBooking={(duration) => handleOpenBookingWithParams(duration)}
              onOpenBooking={() => setBookingModalOpen(true)}
            />
          )}

          {currentPage === 'venue' && (
            <VenuePage
              onNavigate={handleNavigate}
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

        {/* Luxury Gentleman Spa Footer */}
        <Footer onNavigate={handleNavigate} />

        {/* Global Interactive Booking Dialog */}
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
          defaultDuration={selectedDuration}
        />
      </div>
    </VenuePhotoProvider>
  );
}
