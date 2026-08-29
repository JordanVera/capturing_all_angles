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
  '15.jpg': { width: 1440, height: 1440 },
  '16.jpg': { width: 1440, height: 1636 },
  '17.jpg': { width: 1440, height: 1800 },
  '18.jpg': { width: 1440, height: 959 },
  '19.jpg': { width: 720, height: 900 },
  '20.jpg': { width: 720, height: 1280 },
  '21.jpg': { width: 3376, height: 6000 },
  '22.jpg': { width: 720, height: 1280 },
};

/** 22 dense collage slots — 4 overlapping rows, sized close to original. */
const GRID_LAYOUTS: Pick<
  MosaicTile,
  'left' | 'top' | 'width' | 'rotate' | 'z'
>[] = [
  // Row 1 — top ~2–8%
  { left: '1%',  top: '4%',  width: '14%', rotate: -7,  z: 3 },
  { left: '16%', top: '2%',  width: '18%', rotate: 4,   z: 5 },
  { left: '36%', top: '7%',  width: '12%', rotate: -3,  z: 2 },
  { left: '50%', top: '3%',  width: '15%', rotate: 8,   z: 4 },
  { left: '67%', top: '5%',  width: '14%', rotate: -5,  z: 3 },
  { left: '82%', top: '2%',  width: '14%', rotate: 6,   z: 2 },
  // Row 2 — top ~24–33%
  { left: '0%',  top: '26%', width: '14%', rotate: 5,   z: 4 },
  { left: '16%', top: '30%', width: '16%', rotate: -9,  z: 6 },
  { left: '33%', top: '24%', width: '17%', rotate: 2,   z: 7 },
  { left: '52%', top: '28%', width: '20%', rotate: -4,  z: 5 },
  { left: '73%', top: '25%', width: '14%', rotate: 7,   z: 4 },
  { left: '87%', top: '29%', width: '11%', rotate: -11, z: 3 },
  // Row 3 — top ~46–54%
  { left: '1%',  top: '48%', width: '15%', rotate: -6,  z: 5 },
  { left: '18%', top: '52%', width: '18%', rotate: 3,   z: 6 },
  { left: '38%', top: '46%', width: '14%', rotate: -3,  z: 7 },
  { left: '55%', top: '50%', width: '16%', rotate: 6,   z: 4 },
  { left: '73%', top: '47%', width: '15%', rotate: -8,  z: 5 },
  // Row 4 — top ~67–75%
  { left: '4%',  top: '70%', width: '16%', rotate: 7,   z: 3 },
  { left: '23%', top: '73%', width: '14%', rotate: -5,  z: 5 },
  { left: '41%', top: '67%', width: '15%', rotate: 3,   z: 4 },
  { left: '59%', top: '72%', width: '18%', rotate: -4,  z: 6 },
  { left: '80%', top: '70%', width: '16%', rotate: 5,   z: 4 },
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
