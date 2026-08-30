export const BRAND = {
  name: 'All Angles',
  line1: 'all angles',
  line2: '2026',
  title: 'All Angles — Film & Stills',
  description:
    'Videographer and photographer available for editorial, commercial, and personal work. Book a shoot.',
};

export const SOCIAL = [
  {
    label: 'instagram',
    href: 'https://www.instagram.com/capturingallangles',
  },
  {
    label: 'facebook',
    href: 'https://www.facebook.com/CapturingAllAngles/',
  },
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/@capturingallangles8522',
  },
] as const;

export type MosaicMediaKind = 'image' | 'video';

export type MosaicTile = {
  src: string;
  kind?: MosaicMediaKind;
  poster?: string;
  left: string;
  top: string;
  width: string;
  rotate: number;
  z: number;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
};

export const SERVICES = [
  {
    id: 'stills',
    label: 'stills',
    hint: 'photography',
  },
  {
    id: 'motion',
    label: 'motion',
    hint: 'videography',
  },
  {
    id: 'both',
    label: 'full coverage',
    hint: 'photo + video',
  },
] as const;

export const PROJECT_TYPES = [
  'wedding',
  'editorial',
  'commercial',
  'event',
  'personal',
  'other',
] as const;
