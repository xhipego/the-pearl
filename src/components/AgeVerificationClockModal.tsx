import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  RotateCcw,
  ShieldAlert,
  Lock,
} from 'lucide-react';
import { PearlLogo } from './PearlLogo';

const STORAGE_KEY = 'thepearl_age_verified_v1';
const TIMESTAMP_KEY = 'thepearl_age_verified_at';

interface AgeVerificationClockModalProps {
  forceOpen?: boolean;
  onCloseForce?: () => void;
}

export const AgeVerificationClockModal: React.FC<AgeVerificationClockModalProps> = ({
  forceOpen = false,
  onCloseForce,
}) => {
  // Always pop up immediately on site load
  const [isOpen, setIsOpen] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  // Pop up immediately the site is loaded
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Listen for manual trigger to reopen warning
  useEffect(() => {
    const handleReopen = () => {
      setAccessDenied(false);
      setIsOpen(true);
    };
    window.addEventListener('thepearl:reopen-age-warning', handleReopen);
    return () => window.removeEventListener('thepearl:reopen-age-warning', handleReopen);
  }, []);

  // Force open prop
  useEffect(() => {
    if (forceOpen) {
      setAccessDenied(false);
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleConfirmAge = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
      localStorage.setItem(TIMESTAMP_KEY, new Date().toISOString());
    } catch {}
    setIsOpen(false);
    if (onCloseForce) onCloseForce();
  };

  const handleDenyAge = () => {
    setAccessDenied(true);
  };

  const handleRedirectAway = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen && !forceOpen) return null;

  return (
    <div
      id="age-verification-overlay"
      className="fixed inset-0 z-[9999] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-warning-title"
    >
      {/* Sleek, simple dark card modal modeled after user's reference */}
      <div className="relative w-full max-w-md bg-[#121214] border border-white/15 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden p-6 sm:p-8 my-auto text-center">
        {accessDenied ? (
          /* Simple Access Denied Screen */
          <div className="py-4 space-y-5 animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 mx-auto flex items-center justify-center shadow-lg">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-500/20 text-red-400 border border-red-500/30">
                Access Denied
              </span>
              <h2 className="font-serif text-2xl font-bold text-white">
                Underage Access Prohibited
              </h2>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                This portal contains adult wellness and sensual massage services strictly intended for consenting individuals aged 18 and older.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={handleRedirectAway}
                className="w-full py-3 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Leave to Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setAccessDenied(false)}
                className="w-full py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-300 font-medium text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return (I am 18+)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Simple Warning Screen matching user's reference */
          <div className="space-y-6">
            {/* Top Badge: Restricted Access in salmon/coral/gold */}
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E58F65]/15 border border-[#E58F65]/35 text-[#E58F65] text-[11px] font-bold tracking-[0.2em] uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-[#E58F65]" />
                <span>Restricted Access</span>
              </div>
            </div>

            {/* Brand Logo */}
            <div className="py-1 flex justify-center">
              <PearlLogo size="sm" lightText={true} />
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2
                id="age-warning-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight"
              >
                Are You Over 18?
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto font-light leading-relaxed">
                This website contains age-restricted content and adult wellness services. You must be at least 18 years of age to enter and view hostess profiles.
              </p>
            </div>

            {/* Primary Action Button: [ I AM OVER 18 ] */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleConfirmAge}
                id="btn-confirm-age-enter"
                className="w-full py-3.5 px-6 rounded-xl sm:rounded-2xl bg-white hover:bg-neutral-100 text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 hover:shadow-white/20"
              >
                <span>[ I AM OVER 18 ]</span>
              </button>

              {/* Secondary link: I Am Under 18 */}
              <div>
                <button
                  type="button"
                  onClick={handleDenyAge}
                  id="btn-deny-age-exit"
                  className="text-xs text-neutral-400 hover:text-white transition-colors underline-offset-4 hover:underline py-1 cursor-pointer"
                >
                  I Am Under 18
                </button>
              </div>
            </div>

            {/* Bottom Discreet Legal note */}
            <p className="text-[10px] text-neutral-500 pt-1">
              The Pearl Wellness Spa &bull; Polokwane &bull; Strictly 18+ Consenting Adults
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

