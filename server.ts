import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import type { Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
let DATA_DIR = path.resolve(__dirname, '.data', 'applications');
const SAVED_IMAGES_DIR = path.resolve(__dirname, 'public', 'images', 'saved');
const SAVED_MEDIA_JSON = path.resolve(__dirname, 'src', 'data', 'savedSiteMedia.json');

const ALLOWED_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

function bakeDataUrlToPublicFile(value: unknown, prefix: string): unknown {
  if (typeof value !== 'string') return value;
  const match = value.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return value;

  const mime = match[1] === 'image/jpg' ? 'image/jpeg' : match[1];
  const ext = ALLOWED_MIME[mime] || 'jpg';
  const buffer = Buffer.from(match[2], 'base64');
  if (buffer.length === 0) return value;

  const shortHash = crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 10);
  const safePrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${safePrefix}_${shortHash}.${ext}`;

  fs.mkdirSync(SAVED_IMAGES_DIR, { recursive: true });
  fs.writeFileSync(path.join(SAVED_IMAGES_DIR, filename), buffer);

  return `./images/saved/${filename}`;
}

interface StoredPhotoMeta {
  index: number;
  filename: string;
  mime: string;
}

interface StoredApplication {
  token: string;
  createdAt: string;
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  age: string;
  introduction: string;
  photos: StoredPhotoMeta[];
}

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getRequestOrigin(req: Request): string {
  const forwardedProto = req.get('x-forwarded-proto');
  const proto = forwardedProto ? forwardedProto.split(',')[0].trim() : req.protocol || 'http';
  const forwardedHost = req.get('x-forwarded-host');
  const host = forwardedHost ? forwardedHost.split(',')[0].trim() : req.get('host') || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

function isValidToken(token: string): boolean {
  return /^[a-f0-9]{24}$/.test(token);
}

async function startServer() {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch {
    DATA_DIR = path.join(os.tmpdir(), 'thepearl-applications');
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '50mb' }));

  // Permanently save any browser-uploaded site photos into /public/images/saved & savedSiteMedia.json
  app.post('/api/save-media', (req: Request, res: Response) => {
    try {
      const payload = (req.body || {}) as Record<string, unknown>;
      const resolved: Record<string, unknown> = {};

      if (Array.isArray(payload.heroSlides)) {
        resolved.heroSlides = payload.heroSlides.map((slide, idx) => {
          if (!slide || typeof slide !== 'object') return slide;
          const s = slide as Record<string, unknown>;
          return {
            ...s,
            image: bakeDataUrlToPublicFile(s.image, `hero_${idx + 1}`),
          };
        });
      }

      if (Array.isArray(payload.groupPhotos)) {
        resolved.groupPhotos = payload.groupPhotos.map((img, idx) =>
          img ? bakeDataUrlToPublicFile(img, `group_${idx + 1}`) : null
        );
      }

      if (payload.experiencePhotos && typeof payload.experiencePhotos === 'object') {
        const expOut: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(payload.experiencePhotos as Record<string, unknown>)) {
          expOut[k] = bakeDataUrlToPublicFile(v, `exp_${k}`);
        }
        resolved.experiencePhotos = expOut;
      }

      if (payload.venuePhotos && typeof payload.venuePhotos === 'object') {
        const venOut: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(payload.venuePhotos as Record<string, unknown>)) {
          venOut[k] = bakeDataUrlToPublicFile(v, `venue_${k}`);
        }
        resolved.venuePhotos = venOut;
      }

      if (Array.isArray(payload.customVenueSlots)) {
        resolved.customVenueSlots = payload.customVenueSlots.map((slot, idx) => {
          if (!slot || typeof slot !== 'object') return slot;
          const c = slot as Record<string, unknown>;
          return {
            ...c,
            defaultSrc: bakeDataUrlToPublicFile(c.defaultSrc, `venue_custom_${idx + 1}`),
          };
        });
      }

      if (Array.isArray(payload.enabledSlotIds)) {
        resolved.enabledSlotIds = payload.enabledSlotIds;
      }

      if (payload.therapistPhotos && typeof payload.therapistPhotos === 'object') {
        const ladiesOut: Record<string, unknown[]> = {};
        for (const [ladyId, arr] of Object.entries(
          payload.therapistPhotos as Record<string, unknown>
        )) {
          if (Array.isArray(arr)) {
            ladiesOut[ladyId] = arr.map((img, idx) =>
              img ? bakeDataUrlToPublicFile(img, `${ladyId}_${idx + 1}`) : null
            );
          }
        }
        resolved.therapistPhotos = ladiesOut;
      }

      resolved.updatedAt = new Date().toISOString();

      fs.mkdirSync(path.dirname(SAVED_MEDIA_JSON), { recursive: true });
      fs.writeFileSync(SAVED_MEDIA_JSON, JSON.stringify(resolved, null, 2));

      res.json({ saved: true, media: resolved });
    } catch {
      res.status(500).json({ saved: false, error: 'Failed to bake site media' });
    }
  });

  // Store applicant details and attached photos for shareable WhatsApp links + OG preview
  app.post('/api/applications', (req: Request, res: Response) => {
    try {
      const body = req.body as {
        firstName?: unknown;
        surname?: unknown;
        email?: unknown;
        phone?: unknown;
        age?: unknown;
        introduction?: unknown;
        photos?: unknown;
      };

      const firstName = String(body.firstName || '').trim().slice(0, 100);
      const surname = String(body.surname || '').trim().slice(0, 100);
      const email = String(body.email || '').trim().slice(0, 160);
      const phone = String(body.phone || '').trim().slice(0, 60);
      const age = String(body.age || '').trim().slice(0, 10);
      const introduction = String(body.introduction || '').trim().slice(0, 4000);

      if (!firstName || !surname || !phone) {
        res.status(400).json({ error: 'Missing required applicant details.' });
        return;
      }

      const rawPhotos = Array.isArray(body.photos) ? body.photos.slice(0, 6) : [];
      const token = crypto.randomBytes(12).toString('hex');
      const appFolder = path.join(DATA_DIR, token);
      fs.mkdirSync(appFolder, { recursive: true });

      const storedPhotos: StoredPhotoMeta[] = [];

      rawPhotos.forEach((entry, idx) => {
        if (!entry || typeof entry !== 'object') return;
        const dataUrl = String((entry as { dataUrl?: unknown }).dataUrl || '');
        const match = dataUrl.match(/^data:(image\/(?:jpeg|jpg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
        if (!match) return;

        const mime = match[1] === 'image/jpg' ? 'image/jpeg' : match[1];
        const ext = ALLOWED_MIME[mime] || 'jpg';
        const buffer = Buffer.from(match[2], 'base64');

        // Cap individual stored photo at 6MB
        if (buffer.length === 0 || buffer.length > 6 * 1024 * 1024) return;

        const photoIndex = storedPhotos.length;
        const filename = `photo_${photoIndex}.${ext}`;
        fs.writeFileSync(path.join(appFolder, filename), buffer);

        storedPhotos.push({
          index: photoIndex,
          filename,
          mime,
        });
      });

      const record: StoredApplication = {
        token,
        createdAt: new Date().toISOString(),
        firstName,
        surname,
        email,
        phone,
        age,
        introduction,
        photos: storedPhotos,
      };

      fs.writeFileSync(path.join(appFolder, 'application.json'), JSON.stringify(record, null, 2));

      const origin = getRequestOrigin(req);
      const viewUrl = `${origin}/application/${token}`;
      const photoUrls = storedPhotos.map(
        (p) => `${origin}/api/applications/${token}/photo/${p.index}`
      );

      res.status(201).json({
        token,
        viewUrl,
        photoUrls,
      });
    } catch {
      res.status(500).json({ error: 'Failed to store application.' });
    }
  });

  // Serve stored applicant image directly
  app.get('/api/applications/:token/photo/:index', (req: Request, res: Response) => {
    const token = String(req.params.token || '');
    const index = Number.parseInt(String(req.params.index || ''), 10);

    if (!isValidToken(token) || Number.isNaN(index) || index < 0 || index > 5) {
      res.status(404).send('Not found');
      return;
    }

    const metaPath = path.join(DATA_DIR, token, 'application.json');
    if (!fs.existsSync(metaPath)) {
      res.status(404).send('Not found');
      return;
    }

    try {
      const record = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) as StoredApplication;
      const photoMeta = record.photos.find((p) => p.index === index);
      if (!photoMeta) {
        res.status(404).send('Not found');
        return;
      }

      const filePath = path.join(DATA_DIR, token, photoMeta.filename);
      if (!fs.existsSync(filePath)) {
        res.status(404).send('Not found');
        return;
      }

      res.setHeader('Content-Type', photoMeta.mime);
      res.setHeader('Cache-Control', 'public, max-age=604800');
      res.sendFile(filePath);
    } catch {
      res.status(500).send('Error loading photo');
    }
  });

  // Clean HTML application viewer with OpenGraph photo preview for WhatsApp links
  app.get('/application/:token', (req: Request, res: Response) => {
    const token = String(req.params.token || '');
    if (!isValidToken(token)) {
      res.status(404).send('Application not found');
      return;
    }

    const metaPath = path.join(DATA_DIR, token, 'application.json');
    if (!fs.existsSync(metaPath)) {
      res.status(404).send('Application not found');
      return;
    }

    try {
      const record = JSON.parse(fs.readFileSync(metaPath, 'utf-8')) as StoredApplication;
      const origin = getRequestOrigin(req);
      const fullName = `${record.firstName} ${record.surname}`.trim();
      const firstPhotoUrl =
        record.photos.length > 0
          ? `${origin}/api/applications/${token}/photo/${record.photos[0].index}`
          : '';

      const photoCards = record.photos
        .map((p, idx) => {
          const src = `${origin}/api/applications/${token}/photo/${p.index}`;
          return `
            <a href="${escapeHtml(src)}" target="_blank" rel="noopener noreferrer"
               style="display:block;border-radius:14px;overflow:hidden;border:1px solid rgba(212,175,55,0.35);background:#131D2D;text-decoration:none;">
              <img src="${escapeHtml(src)}" alt="Applicant photo ${idx + 1}"
                   style="width:100%;aspect-ratio:3/4;object-fit:cover;display:block;" />
              <div style="padding:10px 12px;font-size:12px;color:#F3E5AB;letter-spacing:0.08em;text-transform:uppercase;">
                Photo ${idx + 1} &middot; Open Full Size
              </div>
            </a>`;
        })
        .join('');

      const ogTitle = `Become a Pearl Application — ${fullName}`;
      const ogDesc = `Age ${record.age} | ${record.phone}${record.introduction ? ` — ${record.introduction.slice(0, 140)}` : ''}`;

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(ogTitle)}</title>
  <meta property="og:title" content="${escapeHtml(ogTitle)}" />
  <meta property="og:description" content="${escapeHtml(ogDesc)}" />
  <meta property="og:type" content="website" />
  ${firstPhotoUrl ? `<meta property="og:image" content="${escapeHtml(firstPhotoUrl)}" />` : ''}
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0E1622; color: #F8FAFC; padding: 24px 16px 48px; }
    .card { max-width: 820px; margin: 0 auto; background: #131D2D; border: 1px solid rgba(212,175,55,0.35); border-radius: 18px; padding: 28px; box-shadow: 0 20px 50px rgba(0,0,0,0.45); }
    .eyebrow { color: #D4AF37; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 600; margin: 0 0 8px; }
    h1 { font-family: Georgia, serif; font-weight: 400; font-size: 30px; margin: 0 0 20px; color: #FFFFFF; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 22px; }
    .field { background: #162030; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 12px 14px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.14em; color: #94A3B8; margin-bottom: 4px; }
    .val { font-size: 14px; color: #FFFFFF; word-break: break-word; }
    .intro { background: #162030; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 16px; margin-bottom: 24px; line-height: 1.6; font-size: 14px; white-space: pre-wrap; }
    .photos { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <p class="eyebrow">The Pearl &middot; Applicant Details</p>
    <h1>${escapeHtml(fullName)}</h1>
    <div class="grid">
      <div class="field"><div class="label">Phone</div><div class="val">${escapeHtml(record.phone)}</div></div>
      <div class="field"><div class="label">Email</div><div class="val">${escapeHtml(record.email)}</div></div>
      <div class="field"><div class="label">Age</div><div class="val">${escapeHtml(record.age)}</div></div>
    </div>
    <div class="intro"><div class="label" style="margin-bottom:8px;">Short Introduction</div>${escapeHtml(record.introduction)}</div>
    ${
      record.photos.length > 0
        ? `<div class="label" style="margin-bottom:12px;">Attached Photos (${record.photos.length})</div><div class="photos">${photoCards}</div>`
        : '<p style="color:#94A3B8;font-size:13px;">No photos were attached with this submission.</p>'
    }
  </div>
</body>
</html>`);
    } catch {
      res.status(500).send('Unable to render application');
    }
  });

  const distDir = path.resolve(__dirname, 'dist');
  const isDev =
    process.env.NODE_ENV !== 'production' &&
    (process.env.npm_lifecycle_event === 'dev' || !fs.existsSync(path.join(distDir, 'index.html')));

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`The Pearl server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
