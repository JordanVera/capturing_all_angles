import Image from 'next/image';
import { MOSAIC_TILES, type MosaicTile } from '@/lib/site';

const mediaClassName =
  'h-full w-full object-cover transition-transform duration-500 group-hover:scale-110';

export function VideoMosaic({
  tiles = MOSAIC_TILES,
}: {
  tiles?: MosaicTile[];
}) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-28 md:px-8">
      <div className="relative aspect-[11/8] w-full max-w-[1100px]">
        {tiles.map((tile, index) => (
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
            {tile.kind === 'image' ? (
              <Image
                src={tile.src}
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 45vw, 25vw"
                className={mediaClassName}
                aria-hidden
              />
            ) : (
              <video
                className={mediaClassName}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                src={tile.src}
                poster={tile.poster}
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
