import { mosaicTilesFromClips } from '@/lib/mosaic';
import type { MosaicTile } from '@/lib/site';
import { filmMeta, type Film, type TallClip } from '@/lib/videography';
import type { GalleryImage } from '@/lib/gallery';
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

export type VideographyContent = {
  films: Film[];
  shorts: TallClip[];
};

export async function getPhotographyImages(): Promise<GalleryImage[]> {
  const { data } = await sanityFetch({
    query: PHOTOGRAPHY_QUERY,
    stega: false,
  });
  const gallery = data as PhotographyQueryResult;

  return (gallery?.images ?? [])
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

export async function getVideographyContent(): Promise<VideographyContent> {
  const { data } = await sanityFetch({
    query: VIDEOGRAPHY_QUERY,
    stega: false,
  });
  const page = data as VideographyQueryResult;

  return {
    films: (page?.films ?? [])
      .filter((film): film is NonNullable<typeof film> => Boolean(film))
      .map((film, index) => ({
        id: parseYoutubeId(film.youtubeId),
        label: film.title || 'Untitled',
        meta: filmMeta(film.location, film.year),
        frame: String(index + 1).padStart(2, '0'),
      }))
      .filter((film) => Boolean(film.id)),
    shorts: (page?.shorts ?? [])
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

export async function getMosaicTiles(): Promise<MosaicTile[]> {
  const { data } = await sanityFetch({ query: MOSAIC_QUERY, stega: false });
  const mosaic = data as MosaicQueryResult;

  return mosaicTilesFromClips(
    (mosaic?.clips ?? [])
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
