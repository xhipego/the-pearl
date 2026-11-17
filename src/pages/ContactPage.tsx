import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { BookingAndContact } from '../components/BookingAndContact';
import { PageId } from '../components/Navbar';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  initialDuration?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  initialDuration = '60 min',
}) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Page Banner Header */}
      <PageBanner
        title="Contact &amp; Reservations"
        subtitle="By Private Appointment • Open Daily 10:00 – 20:00"
        badge="Concierge &bull; Discreet Access &bull; Bookings"
        onNavigate={onNavigate}
        currentPageName="Contact"
      />

      {/* Main Booking & Contact Information Component */}
      <BookingAndContact
        initialDuration={initialDuration}
      />
    </div>
  );
};
