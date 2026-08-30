import type { MosaicTile } from './site';

export type MosaicLayout = Pick<
  MosaicTile,
  'left' | 'top' | 'width' | 'rotate' | 'z'
>;

export const MOSAIC_LAYOUTS: MosaicLayout[] = [
  { left: '-1%', top: '-2%', width: '26%', rotate: -3, z: 5 },
  { left: '24%', top: '1%', width: '25%', rotate: 2, z: 7 },
  { left: '49%', top: '-1%', width: '26%', rotate: -2, z: 6 },
  { left: '75%', top: '2%', width: '25%', rotate: 3, z: 5 },
  { left: '0%', top: '22%', width: '25%', rotate: 2, z: 7 },
  { left: '24%', top: '25%', width: '25%', rotate: -3, z: 6 },
  { left: '49%', top: '22%', width: '26%', rotate: 3, z: 8 },
  { left: '75%', top: '26%', width: '24%', rotate: -2, z: 5 },
  { left: '-1%', top: '46%', width: '26%', rotate: -2, z: 6 },
  { left: '24%', top: '49%', width: '25%', rotate: 3, z: 7 },
  { left: '49%', top: '46%', width: '26%', rotate: -3, z: 6 },
  { left: '75%', top: '50%', width: '25%', rotate: 2, z: 5 },
  { left: '0%', top: '70%', width: '26%', rotate: 2, z: 6 },
  { left: '25%', top: '73%', width: '25%', rotate: -3, z: 7 },
  { left: '50%', top: '70%', width: '26%', rotate: 3, z: 6 },
  { left: '76%', top: '74%', width: '24%', rotate: -2, z: 5 },
];

export function mosaicTilesFromClips(
  clips: Array<{ src: string; width?: number | null; height?: number | null }>,
): MosaicTile[] {
  return clips
    .filter((clip) => Boolean(clip.src))
    .map((clip, index) => {
      const layout =
        MOSAIC_LAYOUTS[index % MOSAIC_LAYOUTS.length] ?? MOSAIC_LAYOUTS[0];

      return {
        src: clip.src,
        kind: 'video' as const,
        intrinsicWidth: clip.width ?? 1280,
        intrinsicHeight: clip.height ?? 720,
        left: layout?.left ?? '0%',
        top: layout?.top ?? '0%',
        width: layout?.width ?? '25%',
        rotate: layout?.rotate ?? 0,
        z: layout?.z ?? 1,
      };
    });
}
