import { readdir } from "node:fs/promises";
import path from "node:path";
import { SiteChrome } from "@/components/SiteChrome";
import { VideoMosaic } from "@/components/VideoMosaic";
import { mosaicTilesFromFilenames } from "@/lib/site";

export default async function Home() {
  const files = await readdir(path.join(process.cwd(), "public/grid-media"));
  const tiles = mosaicTilesFromFilenames(files);

  return (
    <SiteChrome showPreloader lockScroll>
      <main>
        <h1 className="sr-only">All Angles — photographer and videographer</h1>
        <VideoMosaic tiles={tiles} />
      </main>
    </SiteChrome>
  );
}
