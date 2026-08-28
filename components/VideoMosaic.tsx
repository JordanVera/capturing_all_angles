'use client';

import { MOSAIC_TILES } from '@/lib/site';

export function VideoMosaic() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-28 md:px-8">
      <div className="relative aspect-[11/8] w-full max-w-[1100px]">
        {MOSAIC_TILES.map((tile, index) => (
          <div
            key={`${tile.src}-${index}`}
            className="mosaic-tile group absolute overflow-hidden"
            style={{
              left: tile.left,
              top: tile.top,
              width: tile.width,
              height: tile.height,
              zIndex: tile.z,
              transform: `rotate(${tile.rotate}deg)`,
              clipPath: tile.clip,
            }}
          >
            <video
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src={tile.src}
              aria-hidden
            />
          </div>
        ))}
      </div>
    </div>
  );
}
