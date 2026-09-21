import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

function savePhotosPlugin(): Plugin {
  return {
    name: 'save-photos-plugin',
    configureServer(server) {
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
