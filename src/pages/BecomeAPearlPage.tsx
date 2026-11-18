import React, { useState, useRef } from 'react';
import { PageBanner } from '../components/PageBanner';
import { PageId } from '../components/Navbar';
import { CONTACT_INFO } from '../data/spaData';
import { safeOpenUrl } from '../utils/safeNavigation';
import {
  CheckCircle2,
  Shield,
  AlertCircle,
  MessageCircle,
  Image as ImageIcon,
} from 'lucide-react';

interface BecomeAPearlPageProps {
  onNavigate: (page: PageId) => void;
}

export const BecomeAPearlPage: React.FC<BecomeAPearlPageProps> = ({ onNavigate }) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [introduction, setIntroduction] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [finalWhatsAppHref, setFinalWhatsAppHref] = useState<string>('');
  const submittingRef = useRef(false);

  const steps = [
    { num: '1', label: 'Submit Your Application' },
    { num: '2', label: 'We Review Your Details' },
    { num: '3', label: 'Private Interview' },
    { num: '4', label: 'Begin Your Journey' },
  ];

  const buildApplicationText = () => {
    const lines = [
      '*Become a Pearl — Job Application*',
      `Name: ${firstName.trim()} ${surname.trim()}`,
      `Email: ${email.trim()}`,
      `Phone: ${phone.trim()}`,
      `Age: ${age.trim()}`,
      '',
      'Short Introduction:',
      introduction.trim(),
    ];

    return lines.join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (submittingRef.current || submitted) return;
    setErrorMsg(null);

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 18) {
      setErrorMsg('Applicants must be 18 years or older.');
      return;
    }

    submittingRef.current = true;
    const messageText = buildApplicationText();
    const waHref = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(messageText)}`;

    setFinalWhatsAppHref(waHref);
    setSubmitted(true);
    safeOpenUrl(waHref);
  };

  const handleResetForm = () => {
    submittingRef.current = false;
    setFirstName('');
    setSurname('');
    setEmail('');
    setPhone('');
    setAge('');
    setIntroduction('');
    setSubmitted(false);
    setErrorMsg(null);
    setFinalWhatsAppHref('');
  };

  return (
    <div className="min-h-screen bg-[#0E1622] text-white">
      <PageBanner
        title="Become a Pearl"
        subtitle="Discreet Online Application"
        onNavigate={onNavigate}
        currentPageName="Become a Pearl"
      />

      {/* Main Two-Column Dark Luxury Application Layout */}
      <section className="py-16 sm:py-22 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Process Steps & Privacy Assurance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#D4AF37]">
                Apply Now
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
                Start Your Journey
              </h2>
              <p className="text-sm text-slate-300 font-light leading-relaxed max-w-md">
                Tell us a little about yourself and send your application directly to our WhatsApp reception. Our team will respond discreetly and professionally.
              </p>
            </div>

            {/* 4 Numbered Steps */}
            <ol className="space-y-5 pt-2">
              {steps.map((step) => (
                <li key={step.num} className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full border border-[#D4AF37]/70 text-[#F3E5AB] font-serif text-lg flex items-center justify-center shrink-0 tabular-nums">
                    {step.num}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white tracking-wide">
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>

            {/* Discretion Note */}
            <div className="pt-6 border-t border-white/10 flex items-start gap-3.5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-sm">
              <Shield className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p>
                Your privacy is important to us. All enquiries are handled with the utmost discretion.
              </p>
            </div>
          </div>

          {/* Right Column: Online Application Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-2xl bg-[#131D2D] border border-[#D4AF37]/40 p-7 sm:p-10 text-center space-y-6 shadow-xl">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                    Application Ready on WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, {firstName}. WhatsApp has been opened for{' '}
                    <span className="text-[#F3E5AB]">{CONTACT_INFO.phone1Formatted}</span> with your application details ready to send.
                  </p>
                  <p className="text-xs text-[#F3E5AB] font-medium max-w-md mx-auto leading-relaxed">
                    Please remember to attach recent photos of yourself directly inside the WhatsApp chat when sending your message.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
                  <a
                    href={finalWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1F7A4D] hover:bg-[#18643F] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#D4AF37] hover:bg-[#E5C55C] text-[#121C2B] text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-950/70 border border-red-400/40 text-red-100 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{errorMsg}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    aria-label="Your Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#162030] border border-white/15 focus:border-[#D4AF37] text-white placeholder-slate-400 outline-none transition-colors"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Your Surname"
                    aria-label="Your Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#162030] border border-white/15 focus:border-[#D4AF37] text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    aria-label="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#162030] border border-white/15 focus:border-[#D4AF37] text-white placeholder-slate-400 outline-none transition-colors"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    aria-label="Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-[#162030] border border-white/15 focus:border-[#D4AF37] text-white placeholder-slate-400 outline-none transition-colors"
                  />
                </div>

                <input
                  type="number"
                  required
                  min={18}
                  max={65}
                  placeholder="Your Age"
                  aria-label="Your Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#162030] border border-white/15 focus:border-[#D4AF37] text-white placeholder-slate-400 outline-none transition-colors tabular-nums"
                />

                <textarea
                  required
                  rows={5}
                  placeholder="Short Introduction"
                  aria-label="Short Introduction"
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#162030] border border-white/15 focus:border-[#D4AF37] text-white placeholder-slate-400 outline-none transition-colors resize-y"
                />

                {/* Clear Photo Disclaimer */}
                <div className="rounded-xl border border-[#D4AF37]/30 bg-[#131D2D]/80 px-4 py-3.5 flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                  <ImageIcon className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p>
                    <span className="text-[#F3E5AB] font-medium">Photo note:</span> Once WhatsApp opens with your application details, please attach 1–3 recent photos directly in the chat before sending.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitted}
                    className="px-8 py-3.5 rounded-lg bg-[#1F7A4D] hover:bg-[#18643F] text-white text-xs font-semibold tracking-[0.16em] uppercase transition-colors inline-flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-60 disabled:pointer-events-none"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Submit Application via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
