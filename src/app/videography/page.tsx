import { readdir } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';
import { SiteChrome } from '@/components/SiteChrome';
import { VideoGallery } from '@/components/VideoGallery';

export const metadata: Metadata = {
  title: 'Videographer — All Angles',
  description:
    'Videography portfolio — wedding films, commercials, and editorial motion work by All Angles.',
};

export default async function VideographyPage() {
  const files = await readdir(path.join(process.cwd(), 'public/tall-video'));
  const shorts = files
    .filter((file) => /\.mp4$/i.test(file))
    .sort((a, b) => {
      const aShort = a.toLowerCase().startsWith('short-') ? 0 : 1;
      const bShort = b.toLowerCase().startsWith('short-') ? 0 : 1;
      if (aShort !== bShort) return aShort - bShort;
      return a.localeCompare(b, undefined, { numeric: true });
    });

  return (
    <SiteChrome>
      <VideoGallery shorts={shorts} />
    </SiteChrome>
  );
}
