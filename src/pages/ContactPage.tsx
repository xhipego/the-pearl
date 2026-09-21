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
        title="Contact &amp; Location"
        subtitle="Discreetly Situated in Welgelen, Polokwane • Open Daily 10:00 – 20:00"
        badge="Concierge &bull; Private Map &bull; Bookings"
        onNavigate={onNavigate}
        currentPageName="Contact & Location"
      />

      {/* Main Booking & Contact Information Component */}
      <BookingAndContact
        initialDuration={initialDuration}
      />
    </div>
  );
};
