import React, { useRef, useState } from 'react';
import { useVenuePhotos } from '../context/VenuePhotoContext';
import {
  X,
  Upload,
  CheckCircle2,
  RotateCcw,
  Camera,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Check,
  Sparkles,
  Info,
  Layers,
  RefreshCw,
  CloudUpload,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';

export const VenuePhotoModal: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    photos,
    getPhoto,
    updatePhoto,
    bulkUpdatePhotos,
    resetPhotos,
    allSlots,
    enabledSlotIds,
    toggleSlotVisibility,
    isSlotEnabled,
    addCustomPhoto,
    removeCustomPhoto,
    activeMovingCount,
    bakePhotosToProject,
    isBaking,
    bakeResult,
    lastBakedAt,
  } = useVenuePhotos();

  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customBadge, setCustomBadge] = useState('');
  const [customImageData, setCustomImageData] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const customFileInputRef = useRef<HTMLInputElement>(null);
  const individualInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  if (!isModalOpen) return null;

  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const showToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    const newPhotosMap: Record<string, string> = {};
    const unassignedFiles: File[] = [];

    // Match files by slot matcher or ID
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let matched = false;
      for (const slot of allSlots) {
        if (
          (slot.fileMatcher && slot.fileMatcher.test(file.name)) ||
          file.name.toLowerCase().includes(slot.id.toLowerCase())
        ) {
          newPhotosMap[slot.id] = await readFileAsDataUrl(file);
          matched = true;
          break;
        }
      }
      if (!matched) {
        unassignedFiles.push(file);
      }
    }

    // Assign remaining unassigned files to empty slots
    const availableSlots = allSlots.filter((slot) => !newPhotosMap[slot.id]);
    for (let i = 0; i < Math.min(unassignedFiles.length, availableSlots.length); i++) {
      newPhotosMap[availableSlots[i].id] = await readFileAsDataUrl(unassignedFiles[i]);
    }

    if (Object.keys(newPhotosMap).length > 0) {
      await bulkUpdatePhotos(newPhotosMap);
      showToast(`Successfully updated ${Object.keys(newPhotosMap).length} venue photo(s)!`);
    }

    setIsProcessing(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleSingleSlotUpload = async (slotId: string, file: File) => {
    setIsProcessing(true);
    const dataUrl = await readFileAsDataUrl(file);
    await updatePhoto(slotId, dataUrl);
    setIsProcessing(false);
    showToast(`Updated photo for ${slotId}`);
  };

  const handleAddCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customImageData || !customTitle.trim()) return;

    await addCustomPhoto(customTitle.trim(), customImageData, customBadge.trim() || 'Venue View');
    setCustomTitle('');
    setCustomBadge('');
    setCustomImageData(null);
    setIsAddingCustom(false);
    showToast('New venue photo view added to carousel!');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="relative w-full max-w-5xl bg-[#1B2B42] text-slate-100 rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-5 sm:p-7 border-b border-[#D4AF37]/30 bg-[#162234]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>The Pearl Venue Photos Manager</span>
                <span className="text-xs font-mono font-normal uppercase tracking-wider text-[#F3E5AB] bg-[#D4AF37]/20 px-2 py-0.5 rounded">
                  {activeMovingCount} Active in Carousel
                </span>
              </h3>
              <p className="text-xs text-slate-300 font-light mt-0.5">
                Upload &amp; manage moving photos of Room 1, Room 2 (Night mode), Room 3 (Couples), Room 4 (Foot scrub), en-suite baths, pool &amp; parking.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Toast */}
        {successMessage && (
          <div className="bg-[#1F7A4D] text-white px-6 py-2.5 text-xs font-medium flex items-center gap-2 animate-fadeIn border-b border-white/20">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* Multi-file Drag & Drop Zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-[#D4AF37] bg-[#D4AF37]/15 scale-[1.01]'
                : 'border-[#D4AF37]/40 hover:border-[#D4AF37] bg-white/5 hover:bg-white/10'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files && processFiles(e.target.files)}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Drop Photos Here to Update Venue Slots
                </h4>
                <p className="text-xs text-slate-300 font-light mt-1">
                  Upload photos for Room 1, Room 2, Room 3, Room 4, en-suite showers, pool and lapa. Filenames are automatically matched!
                </p>
              </div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#F3E5AB] bg-[#D4AF37]/20 px-3 py-1 rounded-full">
                Click to Browse Files or Drag &amp; Drop
              </span>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 pb-1 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300">Venue Photo Slots:</span>
              <span className="text-xs font-mono font-bold text-[#F3E5AB]">{allSlots.length} Total</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddingCustom(!isAddingCustom)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-[#1B2B42] bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Extra Venue View</span>
              </button>

              <button
                onClick={resetPhotos}
                className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Reset all photos to default"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Add Custom View Inline Form */}
          {isAddingCustom && (
            <form onSubmit={handleAddCustomSubmit} className="bg-white/10 border border-[#D4AF37]/50 rounded-2xl p-5 space-y-4">
              <h5 className="font-serif text-base font-bold text-[#F3E5AB] flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Add New Photo Slot to Venue Carousel</span>
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">View Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Room 1 Private Garden View"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Garden View"
                    value={customBadge}
                    onChange={(e) => setCustomBadge(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 mb-1">Select Image File</label>
                <input
                  type="file"
                  ref={customFileInputRef}
                  required
                  accept="image/*"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      const data = await readFileAsDataUrl(e.target.files[0]);
                      setCustomImageData(data);
                    }
                  }}
                  className="w-full text-xs text-slate-300 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-[#1B2B42] hover:file:bg-[#F3E5AB] cursor-pointer"
                />
              </div>

              {customImageData && (
                <div className="h-32 rounded-xl overflow-hidden border border-[#D4AF37]/40 w-48 relative">
                  <img src={customImageData} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!customImageData || !customTitle.trim()}
                  className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#1B2B42] bg-[#D4AF37] hover:bg-[#F3E5AB] disabled:opacity-50 cursor-pointer"
                >
                  Save Photo View
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="px-4 py-2 rounded-full text-xs text-slate-300 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Slots Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allSlots.map((slot) => {
              const currentSrc = getPhoto(slot.id, slot.defaultSrc);
              const isEnabled = isSlotEnabled(slot.id);
              const isCustom = slot.id.startsWith('custom_');

              return (
                <div
                  key={slot.id}
                  className={`bg-white/5 rounded-2xl overflow-hidden border transition-all flex flex-col justify-between ${
                    isEnabled
                      ? 'border-[#D4AF37]/50 shadow-md ring-1 ring-[#D4AF37]/30'
                      : 'border-white/10 opacity-60'
                  }`}
                >
                  {/* Photo Preview & Overlays */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black/50 group">
                    <img
                      src={currentSrc}
                      alt={slot.label}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-[#1B2B42]/90 text-[#F3E5AB] border border-[#D4AF37]/40">
                      {slot.badge}
                    </div>

                    {/* Enable/Disable Toggle in top right */}
                    <button
                      onClick={() => toggleSlotVisibility(slot.id)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                        isEnabled
                          ? 'bg-[#1F7A4D] text-white hover:bg-[#18643F]'
                          : 'bg-black/60 text-slate-400 hover:text-white'
                      }`}
                      title={isEnabled ? 'Enabled in Carousel (click to hide)' : 'Hidden (click to show in carousel)'}
                    >
                      {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Body Info */}
                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h5 className="font-serif text-sm font-bold text-white line-clamp-1">{slot.label}</h5>
                      <p className="text-[11px] text-slate-300 font-light line-clamp-2 mt-0.5">{slot.description}</p>
                    </div>

                    {/* Individual Upload Controls */}
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                      <input
                        type="file"
                        ref={(el) => {
                          individualInputRefs.current[slot.id] = el;
                        }}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleSingleSlotUpload(slot.id, e.target.files[0]);
                          }
                        }}
                      />
                      <button
                        onClick={() => individualInputRefs.current[slot.id]?.click()}
                        className="text-[11px] font-semibold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Upload className="w-3 h-3" />
                        <span>Change Photo</span>
                      </button>

                      {isCustom && (
                        <button
                          onClick={() => removeCustomPhoto(slot.id)}
                          className="text-red-400 hover:text-red-300 p-1 rounded cursor-pointer"
                          title="Delete custom view"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Bar with Close */}
        <div className="p-4 sm:p-5 border-t border-[#D4AF37]/30 bg-[#162234] flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Tip: Changes save instantly to your browser session &amp; moving carousel.
          </span>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#1B2B42] bg-[#D4AF37] hover:bg-[#F3E5AB] cursor-pointer shadow transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
