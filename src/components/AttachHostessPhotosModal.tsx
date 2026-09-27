import React, { useState, useRef, useEffect } from 'react';
import { useTherapists } from '../context/TherapistContext';
import {
  X,
  Upload,
  Camera,
  Star,
  Sparkles,
  CheckCircle2,
  Trash2,
  Link as LinkIcon,
  RotateCcw,
  Check,
  Image as ImageIcon,
  AlertCircle,
  FolderOpen,
  Edit3,
  CloudUpload,
  Loader2,
} from 'lucide-react';
import { Therapist } from '../types';

// High-performance image compressor using Canvas
const compressImageFile = (file: File, maxWidth = 1200, quality = 0.84): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
};

export const AttachHostessPhotosModal: React.FC = () => {
  const {
    isAttachModalOpen,
    closeAttachPhotosModal,
    activeAttachTherapistId,
    setActiveAttachTherapistId,
    therapists,
    updateTherapistPhotos,
    resetTherapistToDefaults,
    openEditModal,
    bakePhotosToProject,
    isBaking,
  } = useTherapists();

  const [selectedId, setSelectedId] = useState<string>('kylie');
  const [photoSlots, setPhotoSlots] = useState<string[]>(['', '', '', '']);
  const [isUrlInputOpen, setIsUrlInputOpen] = useState<number | null>(null);
  const [urlDraft, setUrlDraft] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<number | null>(null);

  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const batchFileInputRef = useRef<HTMLInputElement>(null);

  // Sync selectedId with activeAttachTherapistId
  useEffect(() => {
    if (activeAttachTherapistId) {
      setSelectedId(activeAttachTherapistId);
    }
  }, [activeAttachTherapistId, isAttachModalOpen]);

  // Load photos for the currently selected hostess
  useEffect(() => {
    const current = therapists.find((t) => t.id === selectedId) || therapists[0];
    if (current) {
      const p = current.photos || [current.image];
      setPhotoSlots([
        p[0] || current.image || '',
        p[1] || current.image || '',
        p[2] || current.image || '',
        p[3] || current.image || '',
      ]);
    }
  }, [selectedId, therapists, isAttachModalOpen]);

  if (!isAttachModalOpen) return null;

  const currentTherapist = therapists.find((t) => t.id === selectedId) || therapists[0];

  const handleFileUpload = async (slotIdx: number, file: File) => {
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      if (compressed) {
        const next = [...photoSlots];
        next[slotIdx] = compressed;
        setPhotoSlots(next);
        // Automatically save to context & storage
        updateTherapistPhotos(selectedId, next);
        setSaveSuccess(`Attached Photo ${slotIdx + 1} for ${currentTherapist.name}`);
        setTimeout(() => setSaveSuccess(null), 3000);
      }
    } catch (err) {
      console.error('Failed to attach image', err);
    }
  };

  const handleBatchUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const next = [...photoSlots];
    const maxFiles = Math.min(files.length, 4);

    for (let i = 0; i < maxFiles; i++) {
      try {
        const compressed = await compressImageFile(files[i]);
        if (compressed) {
          next[i] = compressed;
        }
      } catch (err) {
        console.error('Failed to attach image in batch', err);
      }
    }

    setPhotoSlots(next);
    updateTherapistPhotos(selectedId, next);
    setSaveSuccess(`Attached ${maxFiles} photos for ${currentTherapist.name}!`);
    setTimeout(() => setSaveSuccess(null), 4000);
  };

  const handleApplyUrl = (slotIdx: number) => {
    if (urlDraft.trim()) {
      const next = [...photoSlots];
      next[slotIdx] = urlDraft.trim();
      setPhotoSlots(next);
      updateTherapistPhotos(selectedId, next);
      setSaveSuccess(`Updated Photo ${slotIdx + 1} from URL`);
      setTimeout(() => setSaveSuccess(null), 3000);
    }
    setIsUrlInputOpen(null);
    setUrlDraft('');
  };

  const handleSetAsCover = (slotIdx: number) => {
    if (slotIdx === 0) return;
    const next = [...photoSlots];
    const temp = next[0];
    next[0] = next[slotIdx];
    next[slotIdx] = temp;
    setPhotoSlots(next);
    updateTherapistPhotos(selectedId, next);
    setSaveSuccess(`Set Photo ${slotIdx + 1} as the main cover photo!`);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  const handleResetCurrent = () => {
    if (window.confirm(`Reset ${currentTherapist.name}'s photos to the original default portraits?`)) {
      resetTherapistToDefaults(selectedId);
      setSaveSuccess(`Reset ${currentTherapist.name}'s photos to defaults`);
      setTimeout(() => setSaveSuccess(null), 3000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9998] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-[#121620] border-2 border-[#D4AF37]/70 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#182234] px-5 sm:px-7 py-4 border-b border-[#D4AF37]/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#997728] text-[#1B2B42] shadow-md">
              <Camera className="w-5 h-5 text-[#1B2B42]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                  Attach Actual Hostess Photos
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40">
                  Live Customizer
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                Attach actual images for the new girls (<strong>Kylie</strong> &amp; <strong>Barbie</strong>) or any hostess. Saves instantly to the website.
              </p>
            </div>
          </div>

          <button
            onClick={closeAttachPhotosModal}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success toast banner */}
        {saveSuccess && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/50 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in duration-200 shrink-0">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{saveSuccess}</span>
            </div>
            <button onClick={() => setSaveSuccess(null)} className="cursor-pointer text-emerald-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          {/* Hostess Tabs: Only the Two New Hostesses (Barbie & Kylie) for attaching photos */}
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block">
              1. Select Which Hostess To Attach Photos For:
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-lg">
              {therapists
                .filter((t) => t.id === 'barbie' || t.id === 'kylie')
                .sort((a, b) => (a.id === 'barbie' ? -1 : 1))
                .map((t) => {
                  const isSelected = t.id === selectedId;

                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        setSelectedId(t.id);
                        setActiveAttachTherapistId(t.id);
                      }}
                      type="button"
                      className={`relative p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#1E2D44] to-[#142032] border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/15'
                          : 'bg-[#182030]/80 border-white/10 hover:border-white/30 hover:bg-[#1C2538]'
                      }`}
                    >
                      <span className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#1B2B42] text-[9px] font-black uppercase tracking-wider shadow-sm">
                        {t.id === 'barbie' ? 'Pink Lingerie' : 'Blue Lingerie'}
                      </span>

                      <div className="flex items-center gap-2.5">
                        <img
                          src={t.photos?.[0] || t.image}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-serif font-bold text-sm block truncate text-white">
                            {t.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {t.age} yrs &bull; {t.height}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Current Hostess Context Card */}
          <div className="bg-[#162132] rounded-2xl p-4 border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={photoSlots[0] || currentTherapist.image}
                alt={currentTherapist.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-md shrink-0"
              />
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#F3E5AB]">
                    {currentTherapist.name}
                  </h4>
                  {(selectedId === 'kylie' || selectedId === 'barbie') && (
                    <span className="px-2 py-0.5 rounded bg-[#D4AF37] text-[#1B2B42] text-[10px] font-bold uppercase">
                      New Hostess
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300">
                  {currentTherapist.age} Years &bull; {currentTherapist.height} &bull; {currentTherapist.eyes} Eyes &bull; {currentTherapist.bustOrBody}
                </p>
                <p className="text-[11px] text-[#D4AF37]/90 font-serif italic line-clamp-1">
                  &ldquo;{currentTherapist.lookDescription}&rdquo;
                </p>
              </div>
            </div>

            {/* Batch Upload Action */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                ref={batchFileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleBatchUpload(e.target.files)}
              />
              <button
                type="button"
                onClick={() => batchFileInputRef.current?.click()}
                className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1B2B42] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FolderOpen className="w-4 h-4 text-[#1B2B42]" />
                <span>Upload Multiple (1-4)</span>
              </button>
            </div>
          </div>

          {/* 4 Photo Slots */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs uppercase font-bold tracking-wider text-[#D4AF37] block">
                2. Attach Individual Photos (Slot 1 to 4):
              </label>
              <span className="text-[11px] text-slate-400">
                Slot 1 is the main <strong>Cover Photo</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {photoSlots.map((photoUrl, slotIdx) => {
                const isCover = slotIdx === 0;

                return (
                  <div
                    key={slotIdx}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(slotIdx);
                    }}
                    onDragLeave={() => setIsDragging(null)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(null);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileUpload(slotIdx, file);
                    }}
                    className={`relative rounded-2xl bg-[#162030] border-2 transition-all p-3 flex flex-col justify-between space-y-3 ${
                      isDragging === slotIdx
                        ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/30 bg-[#1D2B40]'
                        : isCover
                        ? 'border-[#D4AF37] shadow-md shadow-[#D4AF37]/10'
                        : 'border-white/15 hover:border-white/30'
                    }`}
                  >
                    {/* Slot Tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-wide uppercase flex items-center gap-1.5 text-slate-200">
                        {isCover ? (
                          <>
                            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                            <span className="text-[#F3E5AB]">Slot 1: Cover</span>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                            <span>Slot {slotIdx + 1}</span>
                          </>
                        )}
                      </span>

                      {!isCover && (
                        <button
                          type="button"
                          onClick={() => handleSetAsCover(slotIdx)}
                          className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
                          title="Make this photo the main cover portrait"
                        >
                          Make Cover
                        </button>
                      )}
                    </div>

                    {/* Image Preview Box */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center group">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={`${currentTherapist.name} slot ${slotIdx + 1}`}
                          className="w-full h-full object-contain p-1 group-hover:scale-102 transition-transform duration-200"
                        />
                      ) : (
                        <div className="text-center p-3 text-slate-500">
                          <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                          <span className="text-[10px] block">No Photo</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRefs[slotIdx].current?.click()}
                          className="p-2 rounded-full bg-white text-black hover:bg-neutral-200 shadow-md cursor-pointer"
                          title="Change this photo"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Hidden Native File Input */}
                    <input
                      ref={fileInputRefs[slotIdx]}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(slotIdx, file);
                      }}
                    />

                    {/* Slot Actions */}
                    <div className="space-y-2 pt-1">
                      {/* Upload Device Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRefs[slotIdx].current?.click()}
                        className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4AF37] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Upload File</span>
                      </button>

                      {/* URL Option Toggle */}
                      {isUrlInputOpen === slotIdx ? (
                        <div className="space-y-1.5 animate-in fade-in">
                          <input
                            type="url"
                            value={urlDraft}
                            onChange={(e) => setUrlDraft(e.target.value)}
                            placeholder="https://...image.jpg"
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                          />
                          <div className="flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleApplyUrl(slotIdx)}
                              className="flex-1 py-1 rounded bg-[#D4AF37] text-[#1B2B42] text-[10px] font-bold uppercase hover:brightness-110 cursor-pointer"
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsUrlInputOpen(null)}
                              className="px-2 py-1 rounded bg-white/10 text-slate-300 text-[10px] hover:bg-white/20 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setIsUrlInputOpen(slotIdx);
                            setUrlDraft(photoUrl.startsWith('http') ? photoUrl : '');
                          }}
                          className="w-full py-1 text-[11px] text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <LinkIcon className="w-3 h-3" />
                          <span>Paste Image URL</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#182234] px-5 sm:px-7 py-4 border-t border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetCurrent}
            className="text-xs text-slate-400 hover:text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset {currentTherapist.name} to Default Photos</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={isBaking}
              onClick={async () => {
                const res = await bakePhotosToProject();
                if (res.success) {
                  setSaveSuccess(res.message || 'Photos baked permanently into codebase!');
                  setTimeout(() => setSaveSuccess(null), 4000);
                }
              }}
              className="py-2.5 px-4 rounded-full bg-[#1B2B42] hover:bg-[#22334d] border border-[#D4AF37]/70 text-[#F3E5AB] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              title="Writes photo files permanently into project code so they never disappear upon deployment"
            >
              {isBaking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                  <span>Baking to Codebase...</span>
                </>
              ) : (
                <>
                  <CloudUpload className="w-4 h-4 text-[#D4AF37]" />
                  <span>Bake to Codebase</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={async () => {
                await bakePhotosToProject();
                closeAttachPhotosModal();
              }}
              className="flex-1 sm:flex-initial py-2.5 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1B2B42] font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-[#1B2B42]" />
              <span>Done &amp; Save for Live Site</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
