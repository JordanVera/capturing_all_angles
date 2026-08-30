export const PHOTOGRAPHY_QUERY = `
  *[_id == "photographyGallery"][0]{
    images[]{
      _key,
      alt,
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "lqip": asset->metadata.lqip
    }
  }
`;

export type PhotographyQueryResult = {
  images: Array<{
    _key: string;
    alt: string | null;
    url: string | null;
    width: number | null;
    height: number | null;
    lqip: string | null;
  } | null> | null;
} | null;

export const VIDEOGRAPHY_QUERY = `
  *[_id == "videographyPage"][0]{
    films[]{
      _key,
      title,
      youtubeId,
      location,
      year
    },
    shorts[]{
      _key,
      youtubeId,
      kind,
      "url": video.asset->url
    }
  }
`;

export type VideographyQueryResult = {
  films: Array<{
    _key: string;
    title: string | null;
    youtubeId: string | null;
    location: string | null;
    year: string | null;
  } | null> | null;
  shorts: Array<{
    _key: string;
    youtubeId: string | null;
    kind: 'short' | 'clip' | null;
    url: string | null;
  } | null> | null;
} | null;

export const MOSAIC_QUERY = `
  *[_id == "homeMosaic"][0]{
    clips[]{
      _key,
      "url": video.asset->url,
      "width": video.asset->metadata.dimensions.width,
      "height": video.asset->metadata.dimensions.height
    }
  }
`;

export type MosaicQueryResult = {
  clips: Array<{
    _key: string;
    url: string | null;
    width: number | null;
    height: number | null;
  } | null> | null;
} | null;
