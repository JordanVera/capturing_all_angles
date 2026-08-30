import type { Metadata } from 'next';
import { SiteChrome } from '@/components/SiteChrome';
import { PhotoGallery } from '@/components/PhotoGallery';
import { getPhotographyImages } from '@/sanity/lib/content';

export const metadata: Metadata = {
  title: 'Photographer — All Angles',
  description:
    'Photography portfolio — editorial, commercial, and personal stills by All Angles.',
};

export default async function PhotographyPage() {
  const images = await getPhotographyImages();

  return (
    <SiteChrome showPreloader mosaicTileCount={images.length}>
      <PhotoGallery images={images} />
    </SiteChrome>
  );
}
