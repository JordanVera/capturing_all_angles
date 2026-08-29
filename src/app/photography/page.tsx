import { readdir } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { SiteChrome } from '@/components/SiteChrome';
import { PhotoGallery } from '@/components/PhotoGallery';

export const metadata: Metadata = {
  title: 'Photographer — All Angles',
  description:
    'Photography portfolio — editorial, commercial, and personal stills by All Angles.',
};

export default async function PhotographyPage() {
  const files = await readdir(path.join(process.cwd(), 'public/images/gallery'));
  const images = files
    .filter((f) => /\.(jpe?g|png|webp|avif|gif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return (
    <SiteChrome>
      <PhotoGallery images={images} />
    </SiteChrome>
  );
}
