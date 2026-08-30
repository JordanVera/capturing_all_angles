import type { Metadata } from 'next';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export const dynamic = 'force-static';

export { viewport } from 'next-sanity/studio';

export const metadata: Metadata = {
  referrer: 'same-origin',
  robots: 'noindex',
  title: 'Studio — All Angles',
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
