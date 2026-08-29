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

const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.m4v']);
const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.gif',
]);

export const GRID_INTRINSICS: Record<
  string,
  { width: number; height: number }
> = {
  '1.jpg': { width: 1216, height: 2160 },
  '2.jpg': { width: 3072, height: 4096 },
  '3.jpg': { width: 1216, height: 2160 },
  '4.jpg': { width: 720, height: 900 },
  '5.jpg': { width: 1440, height: 1800 },
  '6.jpg': { width: 1440, height: 1800 },
  '7.jpg': { width: 1440, height: 1800 },
  '8.jpg': { width: 1440, height: 1793 },
  '9.jpg': { width: 1440, height: 1800 },
  '10.jpg': { width: 1440, height: 1081 },
  '11.jpg': { width: 1440, height: 1800 },
  '12.jpg': { width: 1440, height: 1800 },
  '13.jpg': { width: 1440, height: 1800 },
  '14.jpg': { width: 1440, height: 960 },
  '15.jpg': { width: 1440, height: 1440 },
  '16.jpg': { width: 1440, height: 1636 },
  '17.jpg': { width: 1440, height: 1800 },
  '18.jpg': { width: 1440, height: 959 },
  '19.jpg': { width: 720, height: 900 },
  '20.jpg': { width: 720, height: 1280 },
  '21.jpg': { width: 3376, height: 6000 },
  '22.jpg': { width: 720, height: 1280 },
  '23.jpg': { width: 720, height: 900 },
  '24.jpg': { width: 1440, height: 1800 },
  '25.jpg': { width: 1440, height: 1793 },
  '26.jpg': { width: 1440, height: 1440 },
  '27.jpg': { width: 1440, height: 1636 },
  '28.jpg': { width: 720, height: 1280 },
  '29.jpg': { width: 3376, height: 6000 },
};

/** Portfolio stills in `public/images/gallery`. */
export const GALLERY_INTRINSICS: Record<
  string,
  { width: number; height: number }
> = {
  '01.jpg': { width: 1440, height: 962 },
  '02.jpg': { width: 1440, height: 1799 },
  '03.jpg': { width: 1440, height: 962 },
  '04.jpg': { width: 1440, height: 961 },
  '05.jpg': { width: 1440, height: 1799 },
  '06.jpg': { width: 1440, height: 1799 },
  '07.jpg': { width: 1440, height: 1799 },
  '08.jpg': { width: 1440, height: 961 },
  '09.jpg': { width: 1440, height: 1799 },
  '10.jpg': { width: 1440, height: 961 },
  '11.jpg': { width: 1440, height: 961 },
  '12.jpg': { width: 1440, height: 1440 },
  '13.jpg': { width: 1440, height: 1799 },
  '14.jpg': { width: 1440, height: 1800 },
  '15.jpg': { width: 1440, height: 1315 },
  '16.jpg': { width: 1440, height: 1799 },
};

/** 29 collage slots — 5 staggered rows with light corner overlap. */
const GRID_LAYOUTS: Pick<
  MosaicTile,
  'left' | 'top' | 'width' | 'rotate' | 'z'
>[] = [
  { left: '1%', top: '2%', width: '10.5%', rotate: -3, z: 4 },
  { left: '15%', top: '3%', width: '10.5%', rotate: 4, z: 5 },
  { left: '30%', top: '3%', width: '22%', rotate: -2, z: 8 },
  { left: '55%', top: '2%', width: '10.5%', rotate: 3, z: 4 },
  { left: '69%', top: '4%', width: '10.5%', rotate: -4, z: 5 },
  { left: '84%', top: '2%', width: '10.5%', rotate: 5, z: 3 },
  { left: '1%', top: '24%', width: '21%', rotate: 2, z: 7 },
  { left: '25%', top: '22%', width: '10.5%', rotate: -4, z: 4 },
  { left: '39%', top: '26%', width: '10.5%', rotate: 3, z: 5 },
  { left: '53%', top: '23%', width: '19%', rotate: -3, z: 6 },
  { left: '75%', top: '24%', width: '10.5%', rotate: 4, z: 4 },
  { left: '88%', top: '22%', width: '10.5%', rotate: -3, z: 3 },
  { left: '2%', top: '46%', width: '10.5%', rotate: 4, z: 4 },
  { left: '16%', top: '44%', width: '19%', rotate: -3, z: 6 },
  { left: '38%', top: '47%', width: '10.5%', rotate: 2, z: 5 },
  { left: '52%', top: '45%', width: '19%', rotate: 3, z: 6 },
  { left: '74%', top: '44%', width: '10.5%', rotate: -4, z: 4 },
  { left: '87%', top: '47%', width: '10.5%', rotate: 5, z: 3 },
  { left: '1%', top: '64%', width: '19%', rotate: 3, z: 6 },
  { left: '23%', top: '66%', width: '10.5%', rotate: -3, z: 4 },
  { left: '37%', top: '63%', width: '19%', rotate: -2, z: 6 },
  { left: '59%', top: '65%', width: '10.5%', rotate: 4, z: 5 },
  { left: '73%', top: '64%', width: '19%', rotate: 2, z: 6 },
  { left: '88%', top: '66%', width: '10.5%', rotate: -4, z: 3 },
  { left: '2%', top: '82%', width: '10.5%', rotate: 3, z: 4 },
  { left: '16%', top: '80%', width: '20%', rotate: 4, z: 7 },
  { left: '39%', top: '83%', width: '10.5%', rotate: -3, z: 5 },
  { left: '53%', top: '81%', width: '19%', rotate: -2, z: 6 },
  { left: '75%', top: '80%', width: '20%', rotate: 3, z: 7 },
];

function fileExtension(name: string) {
  const query = name.split(/[?#]/, 1)[0] ?? name;
  const index = query.lastIndexOf('.');
  return index >= 0 ? query.slice(index).toLowerCase() : '';
}

export function mosaicMediaKind(
  src: string,
  kind?: MosaicMediaKind,
): MosaicMediaKind {
  if (kind === 'video' || kind === 'image') return kind;
  return VIDEO_EXTENSIONS.has(fileExtension(src)) ? 'video' : 'image';
}

export function mosaicTilesFromFilenames(files: string[]): MosaicTile[] {
  const media = files
    .filter((file) => {
      const ext = fileExtension(file);
      return IMAGE_EXTENSIONS.has(ext) || VIDEO_EXTENSIONS.has(ext);
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return media.map((file, index) => {
    const layout = GRID_LAYOUTS[index % GRID_LAYOUTS.length] ?? GRID_LAYOUTS[0];
    const wrap = Math.floor(index / GRID_LAYOUTS.length);
    const dims = GRID_INTRINSICS[file];

    return {
      src: `/grid-media/${file}`,
      kind: mosaicMediaKind(file),
      intrinsicWidth: dims?.width,
      intrinsicHeight: dims?.height,
      left: layout.left,
      top: layout.top,
      width: layout.width,
      rotate: layout.rotate + wrap * 3,
      z: layout.z + wrap,
    };
  });
}

/** Centered overlapping collage — natural rectangles, mixed photo and video. */
export const MOSAIC_TILES: MosaicTile[] = mosaicTilesFromFilenames(
  Object.keys(GRID_INTRINSICS),
);

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
