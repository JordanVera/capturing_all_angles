import { SiteChrome } from "@/components/SiteChrome";
import { VideoMosaic } from "@/components/VideoMosaic";
import { getHomepageTiles } from "@/lib/instagram";

export const revalidate = 1800;

export default async function Home() {
  const tiles = await getHomepageTiles();

  return (
    <SiteChrome showPreloader lockScroll>
      <main>
        <h1 className="sr-only">All Angles — photographer and videographer</h1>
        <VideoMosaic tiles={tiles} />
      </main>
    </SiteChrome>
  );
}
