import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function savePhotosPlugin(): Plugin {
  return {
    name: 'save-photos-plugin',
    configureServer(server) {
      // Direct static image server for /images/* to ensure Vite dev server never serves index.html for images
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/images/') || req.url.startsWith('/assets/'))) {
          const cleanUrl = req.url.split('?')[0];
          const publicFile = path.resolve(process.cwd(), 'public', '.' + cleanUrl);
          const srcAssetFile = path.resolve(process.cwd(), 'src', '.' + cleanUrl);
          const targetFile = fs.existsSync(publicFile) && fs.statSync(publicFile).isFile()
            ? publicFile
            : fs.existsSync(srcAssetFile) && fs.statSync(srcAssetFile).isFile()
            ? srcAssetFile
            : null;

          if (targetFile) {
            const ext = path.extname(targetFile).toLowerCase();
            const mimeTypes: Record<string, string> = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
              '.gif': 'image/gif',
            };
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.writeHead(200, {
              'Content-Type': contentType,
              'Content-Length': fs.statSync(targetFile).size,
              'Cache-Control': 'no-cache',
            });
            return fs.createReadStream(targetFile).pipe(res);
          }
        }
        next();
      });

      server.middlewares.use('/api/save-synced-photos', (req, res) => {
        if (req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const raw = Buffer.concat(chunks).toString('utf-8');
              const data = JSON.parse(raw);
              const { photos, enabledSlotIds, customSlots, slotOrder } = data;

              const slotToFileMap: Record<string, string> = {
                entrance: 'venue_front_entrance.jpg',
                atrium: 'venue_atrium_entrance.jpg',
                pool: 'venue_pool_lapa.jpg',
                lounge: 'venue_grand_lounge.jpg',
                champagne: 'venue_champagne_suite.jpg',
                sapphire: 'venue_sapphire_suite.jpg',
                mahogany: 'venue_mahogany_suite.jpg',
              };

              const imagesDir = path.resolve(process.cwd(), 'public/images');
              if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true });
              }

              let savedCount = 0;
              const bakedCustomSlots = (customSlots || []).map((cs: any) => {
                const cleanId = cs.id.replace(/[^a-zA-Z0-9_-]/g, '_');
                const filename = `venue_${cleanId}.jpg`;
                return {
                  ...cs,
                  defaultSrc: `/images/${filename}`,
                };
              });

              if (photos && typeof photos === 'object') {
                for (const [slotId, dataUrl] of Object.entries(photos)) {
                  if (typeof dataUrl === 'string' && dataUrl.includes('base64,')) {
                    const base64Data = dataUrl.split('base64,')[1];
                    const buffer = Buffer.from(base64Data, 'base64');
                    const filename =
                      slotToFileMap[slotId] ||
                      `venue_${slotId.replace(/[^a-zA-Z0-9_-]/g, '_')}.jpg`;
                    const targetFile = path.join(imagesDir, filename);
                    fs.writeFileSync(targetFile, buffer);
                    savedCount++;
                  }
                }
              }

              // Update savedVenueConfig.json
              const configPath = path.resolve(process.cwd(), 'src/data/savedVenueConfig.json');
              const configData = {
                enabledSlotIds: enabledSlotIds || Object.keys(slotToFileMap),
                customSlots: bakedCustomSlots,
                slotOrder: slotOrder || Object.keys(slotToFileMap),
                lastBakedAt: new Date().toISOString(),
                savedPhotoCount: savedCount,
              };
              fs.writeFileSync(configPath, JSON.stringify(configData, null, 2));

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  success: true,
                  savedCount,
                  message: `Successfully baked ${savedCount} photo(s) into project files!`,
                })
              );
            } catch (err: any) {
              console.error('Error saving photos:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      });

      // Permanent Therapist Photos Baker Endpoint
      server.middlewares.use('/api/bake-therapist-photos', (req, res) => {
        if (req.method === 'POST') {
          const chunks: Buffer[] = [];
          req.on('data', (chunk) => chunks.push(chunk));
          req.on('end', () => {
            try {
              const raw = Buffer.concat(chunks).toString('utf-8');
              const data = JSON.parse(raw);
              const therapists = data.therapists;

              if (!Array.isArray(therapists) || therapists.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, error: 'No therapists provided' }));
              }

              const publicTherapistsDir = path.resolve(process.cwd(), 'public/images/therapists');
              if (!fs.existsSync(publicTherapistsDir)) {
                fs.mkdirSync(publicTherapistsDir, { recursive: true });
              }

              let savedPhotoCount = 0;
              const canonicalIds = ['bliss', 'faith', 'kitkate'];
              const canonicalNames = ['Bliss', 'Faith', 'KitKate'];

              const updatedTherapists = therapists.slice(0, 3).map((t: any, idx: number) => {
                const id = canonicalIds[idx] || t.id;
                const name = canonicalNames[idx] || t.name;

                const rawPhotos = Array.isArray(t.photos) && t.photos.length > 0
                  ? t.photos
                  : [t.image].filter(Boolean);

                const bakedPhotos: string[] = [];

                for (let pIdx = 0; pIdx < Math.max(rawPhotos.length, 4); pIdx++) {
                  const photoData = rawPhotos[pIdx] || rawPhotos[0] || '';
                  if (typeof photoData === 'string' && photoData.includes('base64,')) {
                    const base64Content = photoData.split('base64,')[1];
                    const isPng = photoData.includes('image/png');
                    const ext = isPng ? 'png' : 'jpg';
                    const filename = `${id}_photo_${pIdx + 1}.${ext}`;
                    const targetPath = path.join(publicTherapistsDir, filename);
                    const buffer = Buffer.from(base64Content, 'base64');
                    fs.writeFileSync(targetPath, buffer);

                    const srcAssetDir = path.resolve(process.cwd(), 'src/assets/therapists');
                    if (!fs.existsSync(srcAssetDir)) {
                      fs.mkdirSync(srcAssetDir, { recursive: true });
                    }
                    fs.writeFileSync(path.join(srcAssetDir, filename), buffer);

                    bakedPhotos.push(`/images/therapists/${filename}`);
                    savedPhotoCount++;
                  } else if (photoData) {
                    bakedPhotos.push(photoData);
                  }
                }

                while (bakedPhotos.length < 4) {
                  bakedPhotos.push(bakedPhotos[0] || '');
                }

                return {
                  id,
                  name,
                  age: t.age || (idx === 0 ? 23 : idx === 1 ? 24 : 22),
                  height: t.height || (idx === 0 ? '1.68m' : idx === 1 ? '1.72m' : '1.65m'),
                  eyes: t.eyes || 'Brown',
                  bustOrBody: t.bustOrBody || (idx === 0 ? '34C / Hourglass Curve' : idx === 1 ? '34D / Slender & Curvy' : '32C / Petite & Graceful'),
                  lookDescription: t.lookDescription || '',
                  specialties: t.specialties || ['Girlfriend Experience (GFE)', 'Body-to-Body Slides'],
                  bio: t.bio || '',
                  image: bakedPhotos[0] || '',
                  photos: bakedPhotos,
                  featured: true,
                  availableToday: true,
                  vipHostess: true,
                  languages: t.languages || ['English'],
                };
              });

              // Write updated therapists directly to src/data/therapists.ts
              const therapistsFilePath = path.resolve(process.cwd(), 'src/data/therapists.ts');
              const fileContent = `import { Therapist } from '../types';\n\nexport const THERAPISTS: Therapist[] = ${JSON.stringify(
                updatedTherapists,
                null,
                2
              )};\n`;
              fs.writeFileSync(therapistsFilePath, fileContent, 'utf-8');

              console.log(`[BakeTherapistPhotos] Successfully baked ${savedPhotoCount} photos into src/data/therapists.ts and public/images/therapists/`);

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(
                JSON.stringify({
                  success: true,
                  savedPhotoCount,
                  message: `Successfully baked ${savedPhotoCount} photos permanently into project code for Bliss, Faith, and KitKate!`,
                  therapists: updatedTherapists,
                })
              );
            } catch (err: any) {
              console.error('Error baking therapist photos:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), savePhotosPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
