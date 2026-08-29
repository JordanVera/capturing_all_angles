import Image from 'next/image';
import { PlusMark } from '@/components/PlusMark';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
};

export function GearViewer({ src, alt, width, height, priority = false }: Props) {
  return (
    <div className="group relative overflow-hidden border border-foreground/10 bg-black transition-colors duration-300 hover:border-accent">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 66vw"
        className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/5" />
      <div className="pointer-events-none absolute inset-4 flex items-start justify-between text-foreground/35">
        <PlusMark className="h-5 w-5" />
        <PlusMark className="h-5 w-5" />
      </div>
      <div className="pointer-events-none absolute inset-4 flex items-end justify-between text-foreground/35">
        <PlusMark className="h-5 w-5" />
        <PlusMark className="h-5 w-5" />
      </div>
    </div>
  );
}
