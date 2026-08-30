import type { Metadata } from 'next';
import { AboutContent } from '@/components/AboutContent';
import { SiteChrome } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'About — All Angles',
  description:
    'Chris Theriot is a photographer and videographer based in Houston, TX. Capturing All Angles since 2016.',
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <AboutContent />
    </SiteChrome>
  );
}
