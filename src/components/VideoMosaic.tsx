import Image from 'next/image';
import { MOSAIC_TILES, mosaicMediaKind, type MosaicTile } from '@/lib/site';

const mediaClassName =
  'h-auto w-full transition-transform duration-500 group-hover:scale-110';

export function VideoMosaic({
  tiles = MOSAIC_TILES,
}: {
  tiles?: MosaicTile[];
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center overflow-hidden px-4 py-20 md:px-8">
      <div className="relative aspect-11/7 w-full max-w-275">
        {tiles.map((tile, index) => {
          const kind = mosaicMediaKind(tile.src, tile.kind);

          return (
            <div
              key={`${tile.src}-${index}`}
              className="mosaic-tile group absolute overflow-hidden"
              style={{
                left: tile.left,
                top: tile.top,
                width: tile.width,
                zIndex: tile.z,
                transform: `rotate(${tile.rotate}deg)`,
              }}
            >
              {kind === 'image' ? (
                <Image
                  src={tile.src}
                  alt=""
                  width={tile.intrinsicWidth ?? 1440}
                  height={tile.intrinsicHeight ?? 1800}
                  sizes="(max-width: 768px) 45vw, 22vw"
                  priority={index < 4}
                  unoptimized={tile.src.startsWith('http')}
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
          );
        })}
      </div>
    </div>
  );
}
