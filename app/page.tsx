import { SiteChrome } from "@/components/SiteChrome";
import { VideoMosaic } from "@/components/VideoMosaic";

export default function Home() {
  return (
    <SiteChrome showPreloader lockScroll>
      <main>
        <h1 className="sr-only">All Angles — photographer and videographer</h1>
        <VideoMosaic />
      </main>
    </SiteChrome>
  );
}