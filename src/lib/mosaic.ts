import type { MosaicTile } from './site';

export type MotionClip = {
  src: string;
  width: number;
  height: number;
  layout: Pick<MosaicTile, 'left' | 'top' | 'width' | 'rotate' | 'z'>;
};

export function mosaicTilesFromClips(
  clips: Array<{ src: string; width?: number | null; height?: number | null }>,
): MosaicTile[] {
  return clips
    .filter((clip) => Boolean(clip.src))
    .map((clip, index) => {
      const fallback = MOTION_TILES[index % MOTION_TILES.length] ?? MOTION_TILES[0];
      return motionClipToTile({
        src: clip.src,
        width: clip.width ?? fallback?.width ?? 1280,
        height: clip.height ?? fallback?.height ?? 720,
        layout: fallback?.layout ?? {
          left: '0%',
          top: '0%',
          width: '25%',
          rotate: 0,
          z: 1,
        },
      });
    });
}

export function motionClipToTile(clip: MotionClip): MosaicTile {
  return {
    src: clip.src,
    kind: 'video',
    intrinsicWidth: clip.width,
    intrinsicHeight: clip.height,
    ...clip.layout,
  };
}

export const MOTION_TILES: MotionClip[] = [
  // ── Row 1 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/alexis-listening.mp4',
    width: 1280,
    height: 720,
    layout: { left: '-1%', top: '-2%', width: '26%', rotate: -3, z: 5 },
  },
  {
    src: '/mosaic-video/clip-n8YLGwv4pwA.mp4',
    width: 1280,
    height: 720,
    layout: { left: '24%', top: '1%', width: '25%', rotate: 2, z: 7 },
  },
  {
    src: '/mosaic-video/clip-96ZfEukYlOo.mp4',
    width: 1280,
    height: 720,
    layout: { left: '49%', top: '-1%', width: '26%', rotate: -2, z: 6 },
  },
  {
    src: '/mosaic-video/clip-YsHfBTjxD3g.mp4',
    width: 1280,
    height: 720,
    layout: { left: '75%', top: '2%', width: '25%', rotate: 3, z: 5 },
  },
  // ── Row 2 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/remy-martin.mp4',
    width: 1280,
    height: 720,
    layout: { left: '0%', top: '22%', width: '25%', rotate: 2, z: 7 },
  },
  {
    src: '/mosaic-video/clip-bDWAvRikwiw.mp4',
    width: 1280,
    height: 720,
    layout: { left: '24%', top: '25%', width: '25%', rotate: -3, z: 6 },
  },
  {
    src: '/mosaic-video/clip-P4rv4AhWInQ.mp4',
    width: 1280,
    height: 720,
    layout: { left: '49%', top: '22%', width: '26%', rotate: 3, z: 8 },
  },
  {
    src: '/mosaic-video/clip-o1hVmbjCUGo.mp4',
    width: 1280,
    height: 720,
    layout: { left: '75%', top: '26%', width: '24%', rotate: -2, z: 5 },
  },
  // ── Row 3 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/clip-o8dD7Dfisjg.mp4',
    width: 1280,
    height: 720,
    layout: { left: '-1%', top: '46%', width: '26%', rotate: -2, z: 6 },
  },
  {
    src: '/mosaic-video/clip-w_eMkHb4260.mp4',
    width: 1280,
    height: 720,
    layout: { left: '24%', top: '49%', width: '25%', rotate: 3, z: 7 },
  },
  {
    src: '/mosaic-video/clip-Qcn6dnc0zAs.mp4',
    width: 1280,
    height: 720,
    layout: { left: '49%', top: '46%', width: '26%', rotate: -3, z: 6 },
  },
  {
    // !this one is not working
    src: '/mosaic-video/clip-rnxL7a2GWAk.mp4',
    width: 1280,
    height: 720,
    layout: { left: '75%', top: '50%', width: '25%', rotate: 2, z: 5 },
  },
  // ── Row 4 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/clip-yRV53kGTBaw.mp4',
    width: 1280,
    height: 720,
    layout: { left: '0%', top: '70%', width: '26%', rotate: 2, z: 6 },
  },
  {
    src: '/mosaic-video/clip-bah-nQ-aXZg.mp4',
    width: 1280,
    height: 720,
    layout: { left: '25%', top: '73%', width: '25%', rotate: -3, z: 7 },
  },
  {
    src: '/mosaic-video/clip-yDcxg-EmYgc.mp4',
    width: 1280,
    height: 720,
    layout: { left: '50%', top: '70%', width: '26%', rotate: 3, z: 6 },
  },
  {
    src: '/mosaic-video/clip-aLNQGNpj7LI.mp4',
    width: 1280,
    height: 720,
    layout: { left: '76%', top: '74%', width: '24%', rotate: -2, z: 5 },
  },
];
