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
  Sliders,
  CloudUpload,
  Loader2,
  AlertCircle,
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

  // Helper to read file to base64 data url
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

    // First pass: match by filename against slot matchers or names
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

    // Second pass: fill empty slots in order
    for (const slot of allSlots) {
      if (!newPhotosMap[slot.id] && unassignedFiles.length > 0) {
        const nextFile = unassignedFiles.shift();
        if (nextFile) {
          newPhotosMap[slot.id] = await readFileAsDataUrl(nextFile);
        }
      }
    }

    // Any remaining files can be added as new custom slots!
    while (unassignedFiles.length > 0) {
      const extraFile = unassignedFiles.shift();
      if (extraFile) {
        const dataUrl = await readFileAsDataUrl(extraFile);
        const nameClean = extraFile.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
        await addCustomPhoto(
          nameClean.charAt(0).toUpperCase() + nameClean.slice(1),
          dataUrl,
          'Extra View'
        );
      }
    }

    if (Object.keys(newPhotosMap).length > 0) {
      await bulkUpdatePhotos(newPhotosMap);
    }

    setIsProcessing(false);
    showToast(`Successfully synced ${Object.keys(newPhotosMap).length + (files.length - Object.keys(newPhotosMap).length)} photo(s)!`);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleSingleUpload = async (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const dataUrl = await readFileAsDataUrl(file);
    await updatePhoto(slotId, dataUrl);
    setIsProcessing(false);
    showToast(`Updated photo for ${slotId}!`);
    if (e.target) e.target.value = '';
  };

  const handleCustomPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customImageData) {
      alert('Please select an image file first.');
      return;
    }
    const title = customTitle.trim() || `Custom View ${allSlots.length + 1}`;
    const badge = customBadge.trim() || 'New View';

    setIsProcessing(true);
    await addCustomPhoto(title, customImageData, badge);
    setIsProcessing(false);
    setIsAddingCustom(false);
    setCustomTitle('');
    setCustomBadge('');
    setCustomImageData(null);
    showToast(`Added "${title}" to your moving views!`);
  };

  const handleEnableAll = () => {
    allSlots.forEach((slot) => {
      toggleSlotVisibility(slot.id, true);
    });
    showToast('All photos are now active in the moving views tour!');
  };

  const handleBakePhotos = async () => {
    const res = await bakePhotosToProject();
    if (res.success) {
      setSuccessMessage(res.message || 'Photos baked into project files successfully! You can now deploy.');
      setTimeout(() => setSuccessMessage(null), 6000);
    }
  };

  return (
    <div
      id="venue-photo-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div
        id="venue-photo-modal-container"
        className="relative w-full max-w-4xl bg-[#18263A] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden text-white my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D4AF37]/30 bg-[#121E2F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shadow-inner">
              <Camera className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3E5AB]">
                  Sync &amp; Select Photos to View
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F3E5AB] text-[10px] font-bold">
                  {activeMovingCount} of {allSlots.length} Views Active
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Choose exactly which photos cycle in the homepage moving background and sync your real pictures
              </p>
            </div>
          </div>
          <button
            id="close-venue-photo-modal"
            onClick={() => setIsModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Permanent Deployment Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1B2B42] to-[#121E2F] border-2 border-[#D4AF37] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                {isBaking ? (
                  <Loader2 className="w-5 h-5 text-[#D4AF37] animate-spin" />
                ) : bakeResult?.success ? (
                  <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
                ) : (
                  <CloudUpload className="w-5 h-5 text-[#D4AF37]" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-[#F3E5AB]">
                    Deploy Synced Photos to Live Website
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[#25D366] font-bold">
                    For Deployment
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Clicking this saves your synced photos directly into the website's project folder (<code className="text-[#F3E5AB] font-mono">public/images/</code>). Once saved, your photos and enabled views will appear permanently on the live deployed website for all visitors on any device!
                </p>
                {lastBakedAt && (
                  <p className="text-[11px] text-green-400 mt-1.5 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved into project files ({new Date(lastBakedAt).toLocaleString()}). Ready to deploy!</span>
                  </p>
                )}
                {bakeResult && !bakeResult.success && (
                  <p className="text-[11px] text-red-300 mt-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{bakeResult.message}</span>
                  </p>
                )}
              </div>
            </div>

            <button
              id="modal-bake-photos-btn"
              onClick={handleBakePhotos}
              disabled={isBaking}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8972E] hover:brightness-110 text-[#121E2F] font-bold text-xs tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isBaking ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving into Files...</span>
                </>
              ) : bakeResult?.success ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Again (Update Files)</span>
                </>
              ) : (
                <>
                  <CloudUpload className="w-4 h-4" />
                  <span>Save into Project Files for Deployment</span>
                </>
              )}
            </button>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="p-3.5 rounded-xl bg-green-950/80 border border-green-500/70 text-green-300 text-xs flex items-center gap-2.5 shadow-md">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-green-400" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {/* Drag and Drop & Bulk Sync Zone */}
          <div
            className={`p-5 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-3 ${
              isDragOver
                ? 'border-[#D4AF37] bg-[#D4AF37]/15 scale-[1.01]'
                : 'border-[#D4AF37]/40 bg-black/25 hover:border-[#D4AF37]/70'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">
                Upload &amp; Sync Your Photos
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Drag and drop your photos here, or click the button to select images from your phone or computer.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleBulkUpload}
                className="hidden"
                id="bulk-photo-sync-input"
              />
              <button
                id="btn-upload-all-photos"
                disabled={isProcessing}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1B2B42] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg cursor-pointer disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{isProcessing ? 'Syncing...' : 'Select Photos to Sync'}</span>
              </button>

              <button
                id="btn-add-custom-view-toggle"
                onClick={() => setIsAddingCustom(!isAddingCustom)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/20 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>{isAddingCustom ? 'Cancel New View' : 'Add Custom View'}</span>
              </button>

              <button
                id="btn-enable-all-slots"
                onClick={handleEnableAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-xs font-medium transition-colors cursor-pointer"
                title="Include all available views in the moving tour"
              >
                <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>View All ({allSlots.length})</span>
              </button>
            </div>
          </div>

          {/* Add Custom View Sub-Form */}
          {isAddingCustom && (
            <form
              onSubmit={handleCustomPhotoSubmit}
              className="p-4 rounded-xl bg-[#121E2F] border border-[#D4AF37]/50 space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                <Plus className="w-4 h-4" />
                <span>Add a New Moving Background Photo</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Space / Room Name
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Couples Suite, Private Jacuzzi"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                    Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={customBadge}
                    onChange={(e) => setCustomBadge(e.target.value)}
                    placeholder="e.g. VIP Suite, Garden"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/20 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Choose Photo File
                </label>
                <div className="flex items-center gap-3">
                  <input
                    ref={customFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const data = await readFileAsDataUrl(file);
                        setCustomImageData(data);
                        if (!customTitle) {
                          const base = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
                          setCustomTitle(base.charAt(0).toUpperCase() + base.slice(1));
                        }
                      }
                    }}
                    className="hidden"
                    id="custom-single-file-picker"
                  />
                  <button
                    type="button"
                    onClick={() => customFileInputRef.current?.click()}
                    className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white border border-white/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{customImageData ? 'Change Selected Image' : 'Browse Photo...'}</span>
                  </button>
                  {customImageData && (
                    <div className="flex items-center gap-2">
                      <img
                        src={customImageData}
                        alt="Preview"
                        className="w-10 h-10 object-cover rounded border border-[#D4AF37]"
                      />
                      <span className="text-[11px] text-green-300">Image selected</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!customImageData || isProcessing}
                  className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-[#1B2B42] text-xs font-bold uppercase tracking-wider hover:brightness-110 disabled:opacity-50 cursor-pointer"
                >
                  Save &amp; Add to Moving Tour
                </button>
              </div>
            </form>
          )}

          {/* Slots & Viewed Toggles */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  Photos &amp; Moving Views (Toggle to Show/Hide)
                </h4>
                <p className="text-[11px] text-slate-400">
                  Click the <strong>&quot;View in Tour&quot;</strong> switch on each photo to choose whether it appears in the moving background.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {allSlots.map((slot) => {
                const isEnabled = isSlotEnabled(slot.id);
                const customImage = photos[slot.id];
                const activeSrc = getPhoto(slot.id, slot.defaultSrc);
                const isCustomSlot = slot.id.startsWith('custom_');

                return (
                  <div
                    key={slot.id}
                    id={`venue-slot-card-${slot.id}`}
                    className={`p-3.5 rounded-xl border transition-all flex gap-3.5 items-center ${
                      isEnabled
                        ? 'bg-[#152336] border-[#D4AF37]/50 shadow-md'
                        : 'bg-[#121B29]/60 border-white/5 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Thumbnail Preview with Status */}
                    <div className="relative w-24 h-22 rounded-lg overflow-hidden shrink-0 border border-white/15 bg-black/50">
                      <img
                        src={activeSrc}
                        alt={slot.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {/* Active Status Badge */}
                      <div
                        className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold flex items-center gap-1 ${
                          isEnabled
                            ? 'bg-[#25D366] text-black'
                            : 'bg-black/70 text-slate-400'
                        }`}
                      >
                        {isEnabled ? (
                          <>
                            <Eye className="w-2.5 h-2.5" />
                            <span>Viewed</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-2.5 h-2.5" />
                            <span>Hidden</span>
                          </>
                        )}
                      </div>

                      {customImage && (
                        <div className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-[#D4AF37] text-[#1B2B42] text-[8px] font-bold">
                          Custom
                        </div>
                      )}
                    </div>

                    {/* Information & Action Controls */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <h5 className="text-xs font-bold text-white truncate" title={slot.label}>
                          {slot.label}
                        </h5>
                        <span className="text-[10px] text-[#D4AF37] font-semibold shrink-0">
                          {slot.badge}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                        {slot.description}
                      </p>

                      {/* Toggles and Buttons */}
                      <div className="flex items-center justify-between gap-2 pt-1.5">
                        {/* Toggle Show / Hide in Moving Views */}
                        <button
                          id={`toggle-slot-view-${slot.id}`}
                          onClick={() => toggleSlotVisibility(slot.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                            isEnabled
                              ? 'bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/50 hover:bg-[#25D366]/30'
                              : 'bg-white/10 text-slate-400 border border-white/10 hover:text-white hover:bg-white/20'
                          }`}
                          title={isEnabled ? 'Click to hide from moving tour' : 'Click to include in moving tour'}
                        >
                          {isEnabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{isEnabled ? 'In Tour' : 'Hidden'}</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {/* File input for individual slot replacement */}
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
                            <span>Replace</span>
                          </button>

                          {isCustomSlot && (
                            <button
                              onClick={() => removeCustomPhoto(slot.id)}
                              className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/20 cursor-pointer"
                              title="Delete this custom view"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#121E2F] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              id="btn-reset-photos-all"
              onClick={async () => {
                if (window.confirm('Reset all photos to original 7 venue photographs?')) {
                  await resetPhotos();
                  showToast('Restored original 7 venue photos!');
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
            <span className="text-[11px] text-slate-500 hidden sm:inline">•</span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Saved automatically in browser storage
            </span>
          </div>

          <button
            id="done-venue-photo-modal"
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#1B2B42] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-md cursor-pointer"
          >
            Apply &amp; View Live Background
          </button>
        </div>
      </div>
    </div>
  );
};
