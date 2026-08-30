import { createReadStream } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { MOTION_TILES } from '../src/lib/mosaic';
import { FALLBACK_FILMS, parseTallClip } from '../src/lib/videography';

function loadEnvFile(filePath: string) {
  return readFile(filePath, 'utf8')
    .then((text) => {
      for (const rawLine of text.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) continue;
        const eq = line.indexOf('=');
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        const value = line.slice(eq + 1).trim();
        if (!process.env[key]) process.env[key] = value;
      }
    })
    .catch(() => undefined);
}

function key(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
}

async function uploadFile(
  client: ReturnType<typeof createClient>,
  kind: 'image' | 'file',
  filePath: string,
) {
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();
  const contentType =
    kind === 'image'
      ? ext === '.png'
        ? 'image/png'
        : ext === '.webp'
          ? 'image/webp'
          : 'image/jpeg'
      : 'video/mp4';

  return client.assets.upload(kind, createReadStream(filePath), {
    filename,
    contentType,
  });
}

async function main() {
  await loadEnvFile(path.join(process.cwd(), '.env.local'));

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

  if (!projectId || !dataset) {
    throw new Error(
      'Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET',
    );
  }
  if (!token) {
    throw new Error(
      'Missing SANITY_API_WRITE_TOKEN. Uncomment it in .env.local, then run npm run seed:sanity.',
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const galleryDir = path.join(process.cwd(), 'public/images/gallery');
  const photoFiles = (await readdir(galleryDir))
    .filter((file) => /\.(jpe?g|png|webp|avif|gif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  console.log(`Uploading ${photoFiles.length} photography stills...`);
  const photoImages = [];
  for (const file of photoFiles) {
    const asset = await uploadFile(
      client,
      'image',
      path.join(galleryDir, file),
    );
    photoImages.push({
      _type: 'image',
      _key: key(),
      asset: { _type: 'reference', _ref: asset._id },
      alt: '',
    });
    console.log(`  photo ${file}`);
  }

  await client.createOrReplace({
    _id: 'photographyGallery',
    _type: 'photographyGallery',
    images: photoImages,
  });
  console.log('Published photography gallery.');

  const shortsDir = path.join(process.cwd(), 'public/tall-video');
  const shortFiles = (await readdir(shortsDir))
    .filter((file) => /\.mp4$/i.test(file))
    .sort((a, b) => {
      const aShort = a.toLowerCase().startsWith('short-') ? 0 : 1;
      const bShort = b.toLowerCase().startsWith('short-') ? 0 : 1;
      if (aShort !== bShort) return aShort - bShort;
      return a.localeCompare(b, undefined, { numeric: true });
    });

  console.log(`Uploading ${shortFiles.length} videography shorts...`);
  const shorts = [];
  for (const file of shortFiles) {
    const parsed = parseTallClip(file);
    const asset = await uploadFile(client, 'file', path.join(shortsDir, file));
    shorts.push({
      _type: 'short',
      _key: key(),
      kind: parsed.kind,
      youtubeId: parsed.youtubeId,
      video: {
        _type: 'file',
        asset: { _type: 'reference', _ref: asset._id },
      },
    });
    console.log(`  short ${file}`);
  }

  await client.createOrReplace({
    _id: 'videographyPage',
    _type: 'videographyPage',
    films: FALLBACK_FILMS.map((film) => {
      const [location, year] = film.meta.split(' · ');
      return {
        _type: 'film',
        _key: key(),
        title: film.label,
        youtubeId: film.id,
        location: location || '',
        year: year || '',
      };
    }),
    shorts,
  });
  console.log('Published videography page.');

  console.log(`Uploading ${MOTION_TILES.length} mosaic clips...`);
  const clips = [];
  for (const clip of MOTION_TILES) {
    const filePath = path.join(process.cwd(), 'public', clip.src.replace(/^\//, ''));
    const asset = await uploadFile(client, 'file', filePath);
    clips.push({
      _type: 'clip',
      _key: key(),
      video: {
        _type: 'file',
        asset: { _type: 'reference', _ref: asset._id },
      },
    });
    console.log(`  mosaic ${path.basename(clip.src)}`);
  }

  await client.createOrReplace({
    _id: 'homeMosaic',
    _type: 'homeMosaic',
    clips,
  });
  console.log('Published home mosaic.');

  try {
    await fetch(`https://api.sanity.io/v2021-06-07/projects/${projectId}/cors`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: 'http://localhost:3000',
        allowCredentials: true,
      }),
    });
    console.log('Added http://localhost:3000 to Sanity CORS origins (if missing).');
  } catch {
    console.log(
      'Could not add CORS origin automatically. Add http://localhost:3000 in sanity.io/manage.',
    );
  }

  console.log('Done. Open /studio to manage galleries.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
