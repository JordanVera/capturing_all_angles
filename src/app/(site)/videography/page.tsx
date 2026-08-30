import type { Metadata } from 'next';
import { SiteChrome } from '@/components/SiteChrome';
import { VideoGallery } from '@/components/VideoGallery';
import { getVideographyContent } from '@/sanity/lib/content';

export const metadata: Metadata = {
  title: 'Videographer — All Angles',
  description:
    'Videography portfolio — wedding films, commercials, and editorial motion work by All Angles.',
};

export default async function VideographyPage() {
  const { films, shorts } = await getVideographyContent();

  const loadItemCount = films.length + shorts.length;

  return (
    <SiteChrome showPreloader mosaicTileCount={loadItemCount}>
      <VideoGallery films={films} shorts={shorts} />
    </SiteChrome>
  );
}
