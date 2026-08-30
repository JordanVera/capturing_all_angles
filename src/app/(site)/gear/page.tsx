import type { Metadata } from 'next';
import { GearContent } from '@/components/GearContent';
import { SiteChrome } from '@/components/SiteChrome';

export const metadata: Metadata = {
  title: 'Gear — All Angles',
  description:
    'The kit behind the work — camera, lenses, and gimbals used by All Angles.',
};

export default function GearPage() {
  return (
    <SiteChrome>
      <GearContent />
    </SiteChrome>
  );
}
