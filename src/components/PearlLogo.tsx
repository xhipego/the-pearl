import React from 'react';

interface PearlLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
  layout?: 'horizontal' | 'vertical';
  subtitle?: string;
}

export const PearlLogo: React.FC<PearlLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = false,
  layout = 'horizontal',
  subtitle = 'Wellness Spa',
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28',
  };

  const titleSizes = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-lg sm:text-xl tracking-[0.22em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.24em]',
    xl: 'text-3xl sm:text-4xl lg:text-5xl tracking-[0.24em]',
  };

  const subtitleSizes = {
    sm: 'text-[10px] tracking-wider',
    md: 'text-xs sm:text-sm tracking-widest',
    lg: 'text-sm sm:text-base tracking-widest',
    xl: 'text-base sm:text-lg tracking-widest',
  };

  return (
    <div
      className={`inline-flex ${
        layout === 'vertical' ? 'flex-col items-center text-center gap-2.5 sm:gap-3' : 'items-center gap-3.5'
      } ${className}`}
    >
      {/* Exact Golden Oyster Shell with Central Radiant Pearl (Matching uploaded brand asset) */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 120 106"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]"
        >
          <defs>
            {/* Rich Champagne & Polished Gold Gradient for Shell Outlines */}
            <linearGradient id="pearlGoldStroke" x1="12" y1="6" x2="108" y2="98" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FBF4D8" />
              <stop offset="20%" stopColor="#E2BD5B" />
              <stop offset="48%" stopColor="#FFF4CB" />
              <stop offset="76%" stopColor="#C49F3E" />
              <stop offset="100%" stopColor="#95721F" />
            </linearGradient>

            {/* Inner Shell Luster Fill - Soft Pearlescent Ivory with Golden Sheen */}
            <linearGradient id="innerShellFill" x1="60" y1="8" x2="60" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
              <stop offset="35%" stopColor="#FCF8EF" stopOpacity="0.88" />
              <stop offset="70%" stopColor="#F5E8D3" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#DFC38B" stopOpacity="0.3" />
            </linearGradient>

            {/* Realistic Luminous Pearl 3D Sphere Gradient */}
            <radialGradient id="spherePearlGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="20%" stopColor="#FFFFFF" />
              <stop offset="48%" stopColor="#F8F5EE" />
              <stop offset="74%" stopColor="#E6DCD0" />
              <stop offset="90%" stopColor="#CBBBA7" />
              <stop offset="100%" stopColor="#A28E77" />
            </radialGradient>

            {/* Pearl Bed Golden Ambient Shadow inside bottom shell */}
            <radialGradient id="pearlBedShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7E601C" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#8C6D26" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8C6D26" stopOpacity="0" />
            </radialGradient>

            {/* Lower Shell Front Rim Gradient */}
            <linearGradient id="bottomRimGrad" x1="16" y1="56" x2="104" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="45%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#99751D" />
            </linearGradient>
          </defs>

          {/* ============================================================ */}
          {/* 1. UPPER FAN SHELL (7 Distinct Scallop Lobes & Fluting Ribs) */}
          {/* ============================================================ */}
          {/* Outer perimeter path with 7 rounded scallop petals */}
          <path
            d="M 17 53
               C 13 45 16 37 22 33
               C 27 28 32 23 38 18
               C 44 14 50 10 56 8
               C 58 7 62 7 64 8
               C 70 10 76 14 82 18
               C 88 23 93 28 98 33
               C 104 37 107 45 103 53
               C 92 53 78 52 60 52
               C 42 52 28 53 17 53 Z"
            fill="url(#innerShellFill)"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Scalloped Crest Arches along the upper perimeter */}
          {/* Lobe 1 (far left) */}
          <path
            d="M 17 53 C 14 44 18 36 24 33"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Lobe 2 */}
          <path
            d="M 24 33 C 28 26 34 21 40 18"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Lobe 3 */}
          <path
            d="M 40 18 C 45 13 52 9.5 57 8"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Lobe 4 (center crown arch) */}
          <path
            d="M 54 8 C 57 6.5 63 6.5 66 8"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          {/* Lobe 5 */}
          <path
            d="M 63 8 C 68 9.5 75 13 80 18"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Lobe 6 */}
          <path
            d="M 80 18 C 86 21 92 26 96 33"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Lobe 7 (far right) */}
          <path
            d="M 96 33 C 102 36 106 44 103 53"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Radiating Shell Fluting Ribs radiating from between scallops to hinge behind pearl */}
          {/* Rib 1 (left flank) */}
          <path
            d="M 24 33 C 28 42 36 50 51 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Rib 2 */}
          <path
            d="M 40 18 C 43 32 48 44 55 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Rib 3 */}
          <path
            d="M 54 8 C 54.5 24 56.5 41 58.5 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          {/* Center Rib */}
          <path
            d="M 60 7 L 60 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Rib 5 */}
          <path
            d="M 66 8 C 65.5 24 63.5 41 61.5 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          {/* Rib 6 */}
          <path
            d="M 80 18 C 77 32 72 44 65 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Rib 7 (right flank) */}
          <path
            d="M 96 33 C 92 42 84 50 69 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* ============================================================ */}
          {/* 2. LOWER OYSTER SHELL CRADLE (Open dish holding the pearl)   */}
          {/* ============================================================ */}
          {/* Shadow bed beneath the pearl */}
          <ellipse cx="60" cy="61" rx="20" ry="7.5" fill="url(#pearlBedShadow)" opacity="0.65" />

          {/* Bottom Shell Main Silhouette */}
          <path
            d="M 15 55
               C 17 76 34 94 60 94
               C 86 94 103 76 105 55
               C 95 65 78 70 60 70
               C 42 70 25 65 15 55 Z"
            fill="#FFFDF9"
            stroke="url(#bottomRimGrad)"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />

          {/* Scalloped / Undulating Front Lip of Bottom Shell */}
          <path
            d="M 17 56
               C 27 64 42 68 60 68
               C 78 68 93 64 103 56"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Secondary inner lip contour */}
          <path
            d="M 24 62
               C 35 68 47 70 60 70
               C 73 70 85 68 96 62"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Bottom Outer Shell Rib Contours (Underside ridges fanning down to hinge) */}
          <path
            d="M 31 69 C 37 81 47 89 59 93"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 89 69 C 83 81 73 89 61 93"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 45 71 C 49 81 54 88 59 93.5"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 75 71 C 71 81 66 88 61 93.5"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M 60 70 L 60 94"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* ============================================================ */}
          {/* 3. THE LUMINOUS PEARL (Spherical, centered in cradle)       */}
          {/* ============================================================ */}
          <circle
            cx="60"
            cy="51"
            r="16.5"
            fill="url(#spherePearlGrad)"
            stroke="url(#pearlGoldStroke)"
            strokeWidth="1.5"
          />

          {/* Bright Specular Highlight Gleam (Upper-Left on Pearl, matching photo) */}
          <ellipse
            cx="53"
            cy="43"
            rx="5.2"
            ry="3.2"
            transform="rotate(-28 53 43)"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <ellipse
            cx="54.8"
            cy="44.2"
            rx="2"
            ry="1.2"
            transform="rotate(-28 54.8 44.2)"
            fill="#FFFFFF"
            opacity="0.9"
          />

          {/* Subtle Ambient Reflected Light on bottom-right edge of pearl */}
          <path
            d="M 66 60 C 71 57 74 52 73 46"
            stroke="#FFF5DC"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Typography: THE PEARL (Serif) + Wellness Spa (Italic) */}
      {showText && (
        <div
          className={`flex flex-col ${
            layout === 'vertical' ? 'items-center' : 'items-start'
          } leading-none`}
        >
          <span
            className={`font-serif font-bold uppercase ${titleSizes[size]} ${
              lightText ? 'text-white' : 'text-[#1B2B42]'
            } drop-shadow-sm select-none`}
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
          >
            THE PEARL
          </span>
          <span
            className={`font-serif italic font-normal ${subtitleSizes[size]} ${
              lightText ? 'text-[#F3E5AB]' : 'text-[#1B2B42]'
            } mt-1 drop-shadow-sm select-none`}
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
          >
            {subtitle}
          </span>
        </div>
      )}
    </div>
  );
};
