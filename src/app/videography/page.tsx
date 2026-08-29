import type { Metadata } from 'next';
import { SiteChrome } from '@/components/SiteChrome';
import { VideoGallery } from '@/components/VideoGallery';

export const metadata: Metadata = {
  title: 'Videographer — All Angles',
  description:
    'Videography portfolio — wedding films, commercials, and editorial motion work by All Angles.',
};

export default function VideographyPage() {
  return (
    <SiteChrome>
      <VideoGallery />
    </SiteChrome>
  );
}
