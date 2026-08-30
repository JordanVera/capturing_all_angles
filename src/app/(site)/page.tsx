import { SiteChrome } from '@/components/SiteChrome';
import { VideoMosaic } from '@/components/VideoMosaic';
import { getMosaicTiles } from '@/sanity/lib/content';

export default async function Home() {
  const tiles = await getMosaicTiles();

  return (
    <SiteChrome showPreloader lockScroll mosaicTileCount={tiles.length}>
      <main>
        <h1 className="sr-only">
          Capturing All Angles — photographer and videographer
        </h1>
        <VideoMosaic tiles={tiles} />
      </main>
    </SiteChrome>
  );
}
