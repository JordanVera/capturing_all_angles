export const BRAND = {
  name: 'All Angles',
  line1: 'all angles',
  line2: '2026',
  title: 'All Angles — Film & Stills',
  description:
    'Videographer and photographer available for editorial, commercial, and personal work. Book a shoot.',
};

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

const GRID_INTRINSICS: Record<string, { width: number; height: number }> = {
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
};

/** Scattered collage slots — extra slots absorb videos dropped into grid-media. */
const GRID_LAYOUTS: Pick<
  MosaicTile,
  'left' | 'top' | 'width' | 'rotate' | 'z'
>[] = [
  { left: '8%', top: '4%', width: '12%', rotate: -7, z: 3 },
  { left: '24%', top: '2%', width: '16%', rotate: 4, z: 5 },
  { left: '44%', top: '8%', width: '11%', rotate: -3, z: 2 },
  { left: '58%', top: '3%', width: '14%', rotate: 8, z: 4 },
  { left: '76%', top: '6%', width: '14%', rotate: -5, z: 3 },
  { left: '3%', top: '36%', width: '15%', rotate: 6, z: 4 },
  { left: '22%', top: '40%', width: '15%', rotate: -8, z: 6 },
  { left: '41%', top: '34%', width: '16%', rotate: 2, z: 7 },
  { left: '61%', top: '38%', width: '14%', rotate: -4, z: 5 },
  { left: '78%', top: '36%', width: '18%', rotate: 5, z: 4 },
  { left: '8%', top: '68%', width: '14%', rotate: -6, z: 3 },
  { left: '28%', top: '70%', width: '14%', rotate: 7, z: 5 },
  { left: '48%', top: '66%', width: '14%', rotate: -3, z: 4 },
  { left: '66%', top: '72%', width: '20%', rotate: 4, z: 6 },
  { left: '16%', top: '20%', width: '12%', rotate: 10, z: 8 },
  { left: '70%', top: '18%', width: '13%', rotate: -12, z: 8 },
  { left: '36%', top: '56%', width: '12%', rotate: 9, z: 8 },
  { left: '54%', top: '18%', width: '11%', rotate: -9, z: 1 },
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
