/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { VenuePage } from './pages/VenuePage';
import { HostessesPage } from './pages/HostessesPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ContactPage } from './pages/ContactPage';
import { VenuePhotoProvider } from './context/VenuePhotoContext';
import { TherapistProvider } from './context/TherapistContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('1 hour');
  const [selectedLadyName, setSelectedLadyName] = useState('');

  // Sync with browser URL hash for clean navigation & back/forward button support
  useEffect(() => {
    const parseHash = (): PageId => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: PageId[] = ['home', 'venue', 'ladies', 'policies', 'contact'];
      if (validPages.includes(hash as PageId)) {
        return hash as PageId;
      }
      // Backwards compatibility for previous hashes
      if (hash === 'girls' || hash === 'hostesses' || hash === 'therapists') return 'ladies';
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

  const handleOpenBookingWithLady = (ladyName?: string) => {
    setSelectedLadyName(ladyName || '');
    setBookingModalOpen(true);
  };

  return (
    <VenuePhotoProvider>
      <TherapistProvider>
        <div className="min-h-screen bg-[#F5F2EC] text-[#121C2B] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#121C2B]">
          {/* Top Navigation Bar: Home - The Venue - Our Ladies - Policies - Contact */}
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBookingWithLady()}
          />

          {/* Main Multi-Page Content Area */}
          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage
                onNavigate={handleNavigate}
                onOpenBooking={(ladyName) => handleOpenBookingWithLady(ladyName)}
              />
            )}

            {currentPage === 'venue' && (
              <VenuePage
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBookingWithLady()}
              />
            )}

            {currentPage === 'ladies' && (
              <HostessesPage
                onNavigate={handleNavigate}
                onSelectBooking={(ladyName) => handleOpenBookingWithLady(ladyName)}
                onOpenBooking={() => handleOpenBookingWithLady()}
              />
            )}

            {currentPage === 'policies' && (
              <PoliciesPage
                onNavigate={handleNavigate}
                onOpenBooking={() => handleOpenBookingWithLady()}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage
                onNavigate={handleNavigate}
                initialDuration={selectedDuration}
              />
            )}
          </main>

          {/* Discreet Gentleman Sanctuary Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Global Interactive Booking Dialog */}
          <BookingModal
            isOpen={bookingModalOpen}
            onClose={() => setBookingModalOpen(false)}
            defaultDuration={selectedDuration}
            defaultTherapistName={selectedLadyName}
          />
        </div>
      </TherapistProvider>
    </VenuePhotoProvider>
  );
}
