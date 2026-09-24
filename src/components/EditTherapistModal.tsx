import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Sparkles,
  Check,
  Trash2,
  Star,
  ArrowLeftRight,
  ExternalLink,
} from 'lucide-react';
import { Therapist } from '../types';
import { normalizeTherapistPhotos } from '../context/TherapistContext';

interface EditTherapistModalProps {
  therapist: Therapist | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Therapist) => void;
  onDelete?: (id: string) => void;
  isNew?: boolean;
}

// Compress uploaded photos so localStorage easily stores all 4 photos smoothly
const compressImageFile = (file: File, maxWidth = 1000, quality = 0.82): Promise<string> => {
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

export const EditTherapistModal: React.FC<EditTherapistModalProps> = ({
  therapist,
  isOpen,
  onClose,
  onSave,
  onDelete,
  isNew = false,
}) => {
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [formData, setFormData] = useState<Therapist>({
    id: '',
    name: '',
    age: 23,
    height: '1.68m',
    eyes: 'Hazel Green',
    hair: 'Honey Brunette',
    bustOrBody: '34C / Hourglass',
    lookDescription: '',
    specialties: ['Body-to-Body Slides', 'Girlfriend Experience (GFE)'],
    bio: '',
    image: '',
    photos: ['', '', '', ''],
    featured: true,
    availableToday: true,
    vipHostess: false,
    languages: ['English'],
  });

  const [activeSlotUrls, setActiveSlotUrls] = useState<string[]>(['', '', '', '']);
  const [specialtiesText, setSpecialtiesText] = useState('');
  const [urlInputSlot, setUrlInputSlot] = useState<number | null>(null);
  const [urlDraft, setUrlDraft] = useState('');

  useEffect(() => {
    if (therapist) {
      const photos = normalizeTherapistPhotos(therapist);
      setFormData({
        ...therapist,
        photos,
        image: photos[0] || therapist.image,
      });
      setActiveSlotUrls(photos);
      setSpecialtiesText(therapist.specialties?.join(', ') || '');
    } else if (isNew) {
      const newId = `hostess_${Date.now()}`;
      const defaultPhotos = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      ];
      setFormData({
        id: newId,
        name: '',
        age: 24,
        height: '1.68m',
        eyes: 'Brown',
        hair: 'Brunette',
        bustOrBody: '34C / Elegant Curve',
        lookDescription: '',
        specialties: ['Girlfriend Experience', 'Sensory Bodywork'],
        bio: '',
        image: defaultPhotos[0],
        photos: defaultPhotos,
        featured: false,
        availableToday: true,
        vipHostess: false,
        languages: ['English'],
      });
      setActiveSlotUrls(defaultPhotos);
      setSpecialtiesText('Girlfriend Experience, Sensory Bodywork');
    }
  }, [therapist, isNew, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (slotIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file);
      if (compressedDataUrl) {
        updatePhotoSlot(slotIndex, compressedDataUrl);
      }
    } catch (err) {
      console.error('Failed to process image upload', err);
    }
  };

  const updatePhotoSlot = (slotIndex: number, newUrl: string) => {
    const updatedPhotos = [...(formData.photos || ['', '', '', ''])];
    updatedPhotos[slotIndex] = newUrl;

    const newCover = slotIndex === 0 ? newUrl : updatedPhotos[0] || newUrl;

    setFormData((prev) => ({
      ...prev,
      photos: updatedPhotos,
      image: newCover,
    }));

    setActiveSlotUrls(updatedPhotos);
  };

  const handleSetAsCover = (slotIndex: number) => {
    if (slotIndex === 0) return;
    const updatedPhotos = [...(formData.photos || ['', '', '', ''])];
    // Swap slotIndex with 0
    const temp = updatedPhotos[0];
    updatedPhotos[0] = updatedPhotos[slotIndex];
    updatedPhotos[slotIndex] = temp;

    setFormData((prev) => ({
      ...prev,
      photos: updatedPhotos,
      image: updatedPhotos[0],
    }));
    setActiveSlotUrls(updatedPhotos);
  };

  const handleApplyUrl = (slotIndex: number) => {
    if (urlDraft.trim()) {
      updatePhotoSlot(slotIndex, urlDraft.trim());
    }
    setUrlInputSlot(null);
    setUrlDraft('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please provide a name for the hostess.');
      return;
    }

    const specs = specialtiesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalPhotos = normalizeTherapistPhotos(formData);

    onSave({
      ...formData,
      photos: finalPhotos,
      image: finalPhotos[0] || formData.image,
      vipHostess: true,
      availableToday: true,
      featured: true,
      specialties: specs.length > 0 ? specs : ['Girlfriend Experience', 'Bodywork'],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1B2B42]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FDFBF7] rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#1B2B42] text-white flex items-center justify-between border-b border-[#D4AF37]/40 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-[#F3E5AB]">
              {isNew ? 'Add New Hostess (Attach 4 Photos)' : `Attach 4 Photos & Profile — ${formData.name || 'Hostess'}`}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 overflow-y-auto space-y-6 text-xs text-[#1B2B42]">
          {/* 4 Photos Attachment Section (Direct User Request) */}
          <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/40 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4 pb-3 border-b border-[#D4AF37]/20">
              <div>
                <h4 className="font-serif text-sm font-bold text-[#1B2B42] flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#C5A059]" />
                  <span>Attach 4 Hostess Photos</span>
                </h4>
                <p className="text-[11px] text-gray-500 font-light mt-0.5">
                  Slot 1 is the <strong>Cover Photo</strong> displayed on cards. When clients open her profile, they will see all 4 gallery photos.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#1B2B42] self-start sm:self-auto">
                4 Photo Slots
              </span>
            </div>

            {/* 4 Photo Slots Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {[0, 1, 2, 3].map((slotIdx) => {
                const photoUrl = formData.photos?.[slotIdx] || '';
                const isCover = slotIdx === 0;

                return (
                  <div
                    key={slotIdx}
                    className={`relative rounded-2xl border-2 p-2 flex flex-col justify-between transition-all bg-[#FDFBF7] ${
                      isCover
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 bg-amber-50/20'
                        : 'border-gray-200 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          isCover
                            ? 'bg-[#1B2B42] text-[#F3E5AB]'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {isCover && <Star className="w-2.5 h-2.5 fill-[#D4AF37] text-[#D4AF37]" />}
                        {isCover ? 'Cover Photo' : `Photo ${slotIdx + 1}`}
                      </span>

                      {!isCover && photoUrl && (
                        <button
                          type="button"
                          onClick={() => handleSetAsCover(slotIdx)}
                          className="text-[9px] font-semibold text-[#C5A059] hover:text-[#1B2B42] flex items-center gap-0.5 cursor-pointer"
                          title="Make this photo the Cover"
                        >
                          <ArrowLeftRight className="w-2.5 h-2.5" />
                          <span>Set Cover</span>
                        </button>
                      )}
                    </div>

                    {/* Image Preview Box */}
                    <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-[#D4AF37]/30 group">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={`Slot ${slotIdx + 1}`}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2 text-center text-[10px]">
                          <ImageIcon className="w-6 h-6 mb-1 opacity-40" />
                          Empty Slot
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[#1B2B42]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-2">
                        <button
                          type="button"
                          onClick={() => fileInputRefs[slotIdx].current?.click()}
                          className="w-full py-1 rounded bg-[#D4AF37] text-[#1B2B42] text-[10px] font-bold uppercase tracking-wider shadow cursor-pointer text-center"
                        >
                          Upload File
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUrlInputSlot(slotIdx);
                            setUrlDraft(photoUrl);
                          }}
                          className="w-full py-1 rounded bg-white text-[#1B2B42] text-[10px] font-semibold tracking-wider shadow cursor-pointer text-center"
                        >
                          Paste URL
                        </button>
                      </div>
                    </div>

                    {/* Hidden input for this slot */}
                    <input
                      ref={fileInputRefs[slotIdx]}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(slotIdx, e)}
                      className="hidden"
                    />

                    {/* Bottom Slot Action Buttons */}
                    <div className="mt-2 space-y-1">
                      <button
                        type="button"
                        onClick={() => fileInputRefs[slotIdx].current?.click()}
                        className="w-full py-1.5 px-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-300 text-[#1B2B42] text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Upload className="w-3 h-3 text-[#C5A059]" />
                        <span>Upload</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setUrlInputSlot(slotIdx);
                          setUrlDraft(photoUrl);
                        }}
                        className="w-full py-1 px-2 rounded-lg text-gray-500 hover:text-[#1B2B42] text-[9px] font-medium flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Link URL</span>
                      </button>
                    </div>

                    {/* Popover URL Editor for this slot */}
                    {urlInputSlot === slotIdx && (
                      <div className="mt-2 p-2 bg-white rounded-xl border border-[#D4AF37] shadow-lg space-y-1.5 animate-in fade-in">
                        <input
                          type="url"
                          value={urlDraft}
                          onChange={(e) => setUrlDraft(e.target.value)}
                          placeholder="https://..."
                          className="w-full px-2 py-1 text-[10px] border border-gray-300 rounded font-mono focus:outline-none focus:border-[#1B2B42]"
                          autoFocus
                        />
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => handleApplyUrl(slotIdx)}
                            className="flex-1 py-0.5 bg-[#1B2B42] text-white rounded text-[9px] font-bold"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setUrlInputSlot(null)}
                            className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-[9px]"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">
              Supports high-resolution camera photos, gallery pictures, and direct image links.
            </p>
          </div>

          {/* Look Description Section (Direct User Request) */}
          <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/40 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-serif text-sm font-bold text-[#1B2B42]">
                ✨ Appearance &amp; How She Looks (Small Description)
              </label>
              <span className="text-[10px] text-[#C5A059] font-semibold uppercase tracking-wider">
                Displayed On Profile
              </span>
            </div>
            <textarea
              rows={3}
              required
              value={formData.lookDescription}
              onChange={(e) => setFormData({ ...formData, lookDescription: e.target.value })}
              placeholder="e.g. Petite and graceful with glowing porcelain skin, sparkling almond hazel eyes, silky honey brunette waves, and natural hourglass curves."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/50 focus:outline-none focus:border-[#1B2B42] text-xs leading-relaxed"
            />
            <p className="text-[10px] text-gray-500 font-light">
              Describe her physical appearance: facial features, eyes, hair style, skin tone, and body silhouette.
            </p>
          </div>

          {/* Hostess Attributes Grid */}
          <div className="bg-white rounded-2xl p-5 border border-[#D4AF37]/40 shadow-sm space-y-4">
            <h4 className="font-serif text-sm font-bold text-[#1B2B42]">
              Physical Attributes &amp; Stats
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Hostess Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Bliss"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B2B42] text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min={18}
                  max={45}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B2B42] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="e.g. 1.68m"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B2B42] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Eye Color
                </label>
                <input
                  type="text"
                  value={formData.eyes}
                  onChange={(e) => setFormData({ ...formData, eyes: e.target.value })}
                  placeholder="e.g. Brown"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B2B42] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Figure / Curve
                </label>
                <input
                  type="text"
                  value={formData.bustOrBody || ''}
                  onChange={(e) => setFormData({ ...formData, bustOrBody: e.target.value })}
                  placeholder="e.g. 34C / Hourglass"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B2B42] text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                Bio &amp; Gentle Persona
              </label>
              <textarea
                rows={2}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Warm, playful, and deeply attentive to every guest's relaxation."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B2B42] text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-600 mb-1">
                Specialties (Comma Separated)
              </label>
              <input
                type="text"
                value={specialtiesText}
                onChange={(e) => setSpecialtiesText(e.target.value)}
                placeholder="Body-to-Body Slides, Girlfriend Experience, Warm Oil Touch"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#1B2B42] text-xs"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/30">
            <div>
              {!isNew && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Are you sure you want to remove ${formData.name}?`)) {
                      onDelete(formData.id);
                      onClose();
                    }
                  }}
                  className="px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Hostess</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#1B2B42] text-white hover:bg-[#152234] border border-[#D4AF37] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Save Hostess &amp; 4 Photos</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
