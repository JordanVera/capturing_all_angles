import type { Metadata } from 'next';
import { NotFoundContent } from '@/components/NotFoundContent';
import { SiteChrome } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: '404 — All Angles',
  description:
    'This frame was not captured. The page you asked for is out of frame.',
};

export default function NotFound() {
  return (
    <SiteChrome>
      <NotFoundContent />
    </SiteChrome>
  );
}
