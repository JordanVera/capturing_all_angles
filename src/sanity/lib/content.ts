import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { mosaicTilesFromClips, motionClipToTile, MOTION_TILES } from '@/lib/mosaic';
import type { MosaicTile } from '@/lib/site';
import { GALLERY_INTRINSICS } from '@/lib/site';
import {
  FALLBACK_FILMS,
  filmMeta,
  parseTallClip,
  type Film,
  type TallClip,
} from '@/lib/videography';
import { parseYoutubeId } from '@/lib/youtube';
import { sanityFetch } from '@/sanity/lib/live';
import {
  MOSAIC_QUERY,
  PHOTOGRAPHY_QUERY,
  VIDEOGRAPHY_QUERY,
  type MosaicQueryResult,
  type PhotographyQueryResult,
  type VideographyQueryResult,
} from '@/sanity/lib/queries';
import type { GalleryImage } from '@/lib/gallery';

export type VideographyContent = {
  films: Film[];
  shorts: TallClip[];
};

export async function getPhotographyImages(): Promise<GalleryImage[]> {
  try {
    const { data } = await sanityFetch({
      query: PHOTOGRAPHY_QUERY,
      stega: false,
    });
    const gallery = data as PhotographyQueryResult;
    if (gallery) {
      return (gallery.images ?? [])
        .filter((image): image is NonNullable<typeof image> & { url: string } =>
          Boolean(image?.url),
        )
        .map((image) => ({
          src: image.url,
          width: image.width ?? 1440,
          height: image.height ?? 1800,
          alt: image.alt ?? '',
          lqip: image.lqip ?? undefined,
        }));
    }
  } catch (error) {
    console.error('Failed to load photography from Sanity', error);
  }

  return getLocalPhotographyImages();
}

async function getLocalPhotographyImages(): Promise<GalleryImage[]> {
  const files = await readdir(path.join(process.cwd(), 'public/images/gallery'));
  return files
    .filter((file) => /\.(jpe?g|png|webp|avif|gif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => {
      const dims = GALLERY_INTRINSICS[file];
      return {
        src: `/images/gallery/${file}`,
        width: dims?.width ?? 1440,
        height: dims?.height ?? 1800,
        alt: '',
      };
    });
}

export async function getVideographyContent(): Promise<VideographyContent> {
  try {
    const { data } = await sanityFetch({
      query: VIDEOGRAPHY_QUERY,
      stega: false,
    });
    const page = data as VideographyQueryResult;
    if (page) {
      return {
        films: (page.films ?? [])
          .filter((film): film is NonNullable<typeof film> => Boolean(film))
          .map((film, index) => ({
            id: parseYoutubeId(film.youtubeId),
            label: film.title || 'Untitled',
            meta: filmMeta(film.location, film.year),
            frame: String(index + 1).padStart(2, '0'),
          }))
          .filter((film) => Boolean(film.id)),
        shorts: (page.shorts ?? [])
          .filter((clip): clip is NonNullable<typeof clip> & { url: string } =>
            Boolean(clip?.url),
          )
          .map((clip) => ({
            src: clip.url,
            youtubeId: parseYoutubeId(clip.youtubeId),
            kind: clip.kind === 'clip' ? 'clip' : 'short',
          })),
      };
    }
  } catch (error) {
    console.error('Failed to load videography from Sanity', error);
  }

  return getLocalVideographyContent();
}

async function getLocalVideographyContent(): Promise<VideographyContent> {
  const files = await readdir(path.join(process.cwd(), 'public/tall-video'));
  const shorts = files
    .filter((file) => /\.mp4$/i.test(file))
    .sort((a, b) => {
      const aShort = a.toLowerCase().startsWith('short-') ? 0 : 1;
      const bShort = b.toLowerCase().startsWith('short-') ? 0 : 1;
      if (aShort !== bShort) return aShort - bShort;
      return a.localeCompare(b, undefined, { numeric: true });
    })
    .map(parseTallClip);

  return { films: FALLBACK_FILMS, shorts };
}

export async function getMosaicTiles(): Promise<MosaicTile[]> {
  try {
    const { data } = await sanityFetch({ query: MOSAIC_QUERY, stega: false });
    const mosaic = data as MosaicQueryResult;
    if (mosaic) {
      return mosaicTilesFromClips(
        (mosaic.clips ?? [])
          .filter((clip): clip is NonNullable<typeof clip> & { url: string } =>
            Boolean(clip?.url),
          )
          .map((clip) => ({
            src: clip.url,
            width: clip.width,
            height: clip.height,
          })),
      );
    }
  } catch (error) {
    console.error('Failed to load mosaic from Sanity', error);
  }

  return MOTION_TILES.map(motionClipToTile);
}
