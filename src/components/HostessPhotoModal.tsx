import React, { useRef, useState } from 'react';
import { useTherapists } from '../context/TherapistContext';
import {
  X,
  Upload,
  CheckCircle2,
  Sparkles,
  CloudUpload,
  Loader2,
  Camera,
  Star,
  Check,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { Therapist } from '../types';

export const HostessPhotoModal: React.FC = () => {
  const {
    isOwnerModalOpen,
    setIsOwnerModalOpen,
    therapists,
    bakePhotosToProject,
    isBaking,
    bakeResult,
    hasCustomizations,
    resetToDefaults,
  } = useTherapists();

  const [activeHostessIdx, setActiveHostessIdx] = useState<number>(0);
  const [localTherapists, setLocalTherapists] = useState<Therapist[]>(therapists);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // File input refs for 4 photos [hostessIdx][photoSlotIdx]
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Sync local copy whenever therapists change or modal opens
  React.useEffect(() => {
    if (isOwnerModalOpen) {
      setLocalTherapists(therapists);
    }
  }, [isOwnerModalOpen, therapists]);

  if (!isOwnerModalOpen) return null;

  const currentHostess = localTherapists[activeHostessIdx] || localTherapists[0];

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (slotIdx: number, file: File) => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const updatedList = localTherapists.map((t, idx) => {
        if (idx !== activeHostessIdx) return t;
        const currentPhotos = [...(t.photos || [t.image, t.image, t.image, t.image])];
        currentPhotos[slotIdx] = dataUrl;
        return {
          ...t,
          photos: currentPhotos,
          image: slotIdx === 0 ? dataUrl : currentPhotos[0] || t.image,
        };
      });
      setLocalTherapists(updatedList);
      setSuccessToast(`Updated photo ${slotIdx + 1} for ${currentHostess.name}`);
      setTimeout(() => setSuccessToast(null), 3000);
    } catch (e) {
      console.error('Error reading file:', e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBakeNow = async () => {
    const result = await bakePhotosToProject(localTherapists);
    if (result.success) {
      setSuccessToast(result.message || 'Photos successfully baked permanently into project code!');
      setTimeout(() => setSuccessToast(null), 5000);
    }
  };

  const currentPhotos = [
    currentHostess?.photos?.[0] || currentHostess?.image || '',
    currentHostess?.photos?.[1] || currentHostess?.image || '',
    currentHostess?.photos?.[2] || currentHostess?.image || '',
    currentHostess?.photos?.[3] || currentHostess?.image || '',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-[#0F172A] border border-[#D4AF37]/60 rounded-3xl shadow-2xl text-white overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#1B2B42] px-6 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                  Permanent Hostess Photo Baker
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-[#1B2B42] text-[10px] font-bold uppercase tracking-wider">
                  Owner Portal
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Saves images directly into project files (<code className="text-[#D4AF37]">public/images/therapists/</code>) for persistent deployment
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOwnerModalOpen(false)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success / Status Banner */}
        {successToast && (
          <div className="bg-emerald-900/90 border-b border-emerald-500/50 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button onClick={() => setSuccessToast(null)} className="cursor-pointer text-emerald-300 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {bakeResult && !successToast && (
          <div
            className={`border-b px-6 py-2.5 flex items-center justify-between text-xs ${
              bakeResult.success
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/90 border-red-500/50 text-red-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {bakeResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{bakeResult.message}</span>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Instructions Box */}
          <div className="p-4 rounded-2xl bg-[#1E293B] border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-blue-200 flex items-center gap-1.5">
                <CloudUpload className="w-4 h-4 text-[#D4AF37]" />
                <span>Why did deployed photos default before?</span>
              </p>
              <p className="text-slate-300 leading-relaxed font-light text-[11px]">
                Browser uploads were stored locally in the preview iframe. Clicking <strong>&quot;Bake Photos to Website Files&quot;</strong> writes them into the server codebase so that when you hit <strong>Deploy</strong>, everyone sees the real photos on the live website.
              </p>
            </div>

            <button
              onClick={handleBakeNow}
              disabled={isBaking}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#1B2B42] text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow-lg flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isBaking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Baking...</span>
                </>
              ) : (
                <>
                  <CloudUpload className="w-4 h-4" />
                  <span>Bake to Codebase Now</span>
                </>
              )}
            </button>
          </div>

          {/* 3 Hostesses Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Select VIP Hostess:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {localTherapists.slice(0, 3).map((hostess, idx) => {
                const isActive = idx === activeHostessIdx;
                const cover = hostess.photos?.[0] || hostess.image;
                return (
                  <button
                    key={hostess.id}
                    onClick={() => setActiveHostessIdx(idx)}
                    className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-3 text-left cursor-pointer ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#1B2B42] shadow-lg ring-2 ring-[#D4AF37]/50'
                        : 'border-white/10 bg-[#142132] hover:border-white/30'
                    }`}
                  >
                    <img
                      src={cover}
                      alt={hostess.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/20"
                    />
                    <div className="overflow-hidden">
                      <h4 className="font-serif text-sm font-bold text-white truncate">
                        {hostess.name}
                      </h4>
                      <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-[#D4AF37]" /> VIP Hostess
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Photo Slots for Selected Hostess */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-bold text-white flex items-center gap-2">
                  <span>{currentHostess.name}&apos;s 4 Authentic Photos</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Slot 1 is the main Cover Photo. Slots 2, 3, and 4 are the gallery views (shown at original proportion).
                </p>
              </div>

              <span className="text-[11px] font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                {currentPhotos.filter(Boolean).length} / 4 Set
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentPhotos.map((photoUrl, slotIdx) => {
                const isCover = slotIdx === 0;
                const slotKey = `${currentHostess.id}_slot_${slotIdx}`;

                return (
                  <div
                    key={slotIdx}
                    className="p-3 rounded-2xl bg-[#142132] border border-white/10 hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        {isCover ? (
                          <>
                            <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                            <span>1. Cover Photo</span>
                          </>
                        ) : (
                          <span>Photo #{slotIdx + 1}</span>
                        )}
                      </span>

                      {photoUrl.startsWith('data:image') && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                          Custom
                        </span>
                      )}
                    </div>

                    {/* Preview Box - Natural aspect ratio */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-black/60 border border-white/20 flex items-center justify-center p-1 group">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt=""
                          className="w-full h-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="text-center text-slate-500 text-xs p-4">
                          <Camera className="w-6 h-6 mx-auto mb-1 opacity-50" />
                          <span>No Photo</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => fileInputRefs.current[slotKey]?.click()}
                          className="px-3 py-1.5 rounded-full bg-white text-[#1B2B42] text-xs font-bold shadow-md cursor-pointer hover:bg-gray-100"
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>

                    {/* Upload Input & Button */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={(el) => {
                        fileInputRefs.current[slotKey] = el;
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handlePhotoUpload(slotIdx, file);
                      }}
                      className="hidden"
                    />

                    <button
                      onClick={() => fileInputRefs.current[slotKey]?.click()}
                      disabled={isProcessing}
                      className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{photoUrl ? 'Replace Photo' : 'Upload Photo'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#142132] px-6 py-4 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Shortcut:</span>
            <kbd className="px-2 py-0.5 rounded bg-black/40 border border-white/20 text-[10px]">
              Alt + G
            </kbd>
            <span>or URL param</span>
            <code className="text-[#D4AF37]">?admin=girls</code>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                if (confirm('Reset hostesses back to default placeholders?')) {
                  resetToDefaults();
                  setSuccessToast('Reset to defaults');
                }
              }}
              className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
            >
              Reset
            </button>

            <button
              onClick={handleBakeNow}
              disabled={isBaking}
              className="flex-1 sm:flex-initial py-2.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#1B2B42] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer disabled:opacity-50"
            >
              {isBaking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving &amp; Baking Files...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save &amp; Bake All Hostesses</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
