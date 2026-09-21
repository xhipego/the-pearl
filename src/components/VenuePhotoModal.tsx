import React, { useRef, useState } from 'react';
import { useVenuePhotos } from '../context/VenuePhotoContext';
import { VENUE_PHOTO_SLOTS } from '../data/venuePhotoSlots';
import {
  X,
  Upload,
  CheckCircle2,
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Info,
  ExternalLink,
  Camera,
} from 'lucide-react';

export const VenuePhotoModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, photos, updatePhoto, bulkUpdatePhotos, resetPhotos } =
    useVenuePhotos();
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const individualInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (!isModalOpen) return null;

  const handleBulkUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const newPhotosMap: Record<string, string> = {};
    const unassignedFiles: File[] = [];

    // Helper to read file to base64 data url
    const readFileAsDataUrl = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    // First pass: match by filename
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let matched = false;
      for (const slot of VENUE_PHOTO_SLOTS) {
        if (slot.fileMatcher.test(file.name) || file.name.toLowerCase().includes(slot.id)) {
          newPhotosMap[slot.id] = await readFileAsDataUrl(file);
          matched = true;
          break;
        }
      }
      if (!matched) {
        unassignedFiles.push(file);
      }
    }

    // Second pass: fill empty slots in order
    if (unassignedFiles.length > 0) {
      for (const slot of VENUE_PHOTO_SLOTS) {
        if (!newPhotosMap[slot.id] && !photos[slot.id] && unassignedFiles.length > 0) {
          const nextFile = unassignedFiles.shift();
          if (nextFile) {
            newPhotosMap[slot.id] = await readFileAsDataUrl(nextFile);
          }
        }
      }
    }

    await bulkUpdatePhotos(newPhotosMap);
    setIsProcessing(false);
    setSuccessMessage(`Successfully updated ${Object.keys(newPhotosMap).length} venue photos!`);
    setTimeout(() => setSuccessMessage(null), 4000);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSingleUpload = async (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      await updatePhoto(slotId, dataUrl);
      setIsProcessing(false);
      setSuccessMessage(`Updated Photo for Slot ${slotId}!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = '';
  };

  return (
    <div
      id="venue-photo-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div
        id="venue-photo-modal-container"
        className="relative w-full max-w-4xl bg-[#1B2B42] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/20 bg-[#162234]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center">
              <Camera className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3E5AB]">
                Sync Your Exact Venue Photos
              </h3>
              <p className="text-xs text-slate-300">
                Display the exact real photos of 112 General Beyers St on the website
              </p>
            </div>
          </div>
          <button
            id="close-venue-photo-modal"
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Notice Banner */}
          <div className="p-4 rounded-xl bg-[#23354E] border border-[#D4AF37]/30 text-xs text-slate-200 leading-relaxed flex items-start gap-3">
            <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">
                Why didn't the chat upload appear automatically?
              </p>
              <p className="text-slate-300">
                Chat attachments are shared directly with the AI assistant as vision inputs, but web servers require image files to be stored in the app.
                You can <strong>select your 7 photos below right now</strong> to immediately see them live on the website, or drag them into the{' '}
                <code className="bg-black/40 px-1 py-0.5 rounded text-[#D4AF37]">public/images/</code> folder in the code editor.
              </p>
            </div>
          </div>

          {/* Bulk Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-black/20 border border-white/10">
            <div>
              <h4 className="text-sm font-semibold text-white">Quick Upload</h4>
              <p className="text-xs text-slate-400">
                Select the 7 WhatsApp photos from your computer or phone
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleBulkUpload}
                className="hidden"
                id="bulk-photo-input"
              />
              <button
                id="btn-upload-all-photos"
                disabled={isProcessing}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#1B2B42] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{isProcessing ? 'Processing...' : 'Select All 7 Photos'}</span>
              </button>

              {Object.keys(photos).length > 0 && (
                <button
                  id="btn-reset-photos"
                  onClick={resetPhotos}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 text-slate-300 hover:text-red-300 hover:bg-red-500/20 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {successMessage && (
            <div className="p-3 rounded-xl bg-green-900/40 border border-green-500/50 text-green-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 7 Venue Photo Slots Grid */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              The 7 Venue Views (One for Each Space)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VENUE_PHOTO_SLOTS.map((slot) => {
                const customImage = photos[slot.id];
                const activeSrc = customImage || slot.defaultSrc;

                return (
                  <div
                    key={slot.id}
                    id={`venue-slot-card-${slot.id}`}
                    className="p-3.5 rounded-xl bg-[#162234]/80 border border-white/10 hover:border-[#D4AF37]/40 transition-colors flex gap-3.5 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-black/40">
                      <img
                        src={activeSrc}
                        alt={slot.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {customImage ? (
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-green-500 text-white text-[9px] font-bold">
                          Real
                        </div>
                      ) : (
                        <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-slate-300 text-[9px]">
                          Slot {slot.slotNumber}
                        </div>
                      )}
                    </div>

                    {/* Details & Actions */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <h5 className="text-xs font-bold text-white truncate">{slot.label}</h5>
                        <span className="text-[10px] text-[#D4AF37] font-semibold">
                          View {slot.slotNumber}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                        {slot.description}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">
                        File: {slot.exactFileName}
                      </p>

                      <div className="pt-1">
                        <input
                          ref={(el) => {
                            individualInputRefs.current[slot.id] = el;
                          }}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSingleUpload(slot.id, e)}
                          className="hidden"
                          id={`slot-file-${slot.id}`}
                        />
                        <button
                          id={`btn-change-photo-${slot.id}`}
                          onClick={() => individualInputRefs.current[slot.id]?.click()}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-[#D4AF37] hover:underline cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>{customImage ? 'Replace Photo' : 'Upload Exact Photo'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#162234] flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Changes save automatically to your browser storage and update the live site instantly.
          </p>
          <button
            id="done-venue-photo-modal"
            onClick={() => setIsModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-[#D4AF37] text-[#1B2B42] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
