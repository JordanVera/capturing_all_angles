import Image from 'next/image';

type Props = {
  className?: string;
};

export function Logo({ className = 'h-16 w-auto' }: Props) {
  return (
    <span
      className="inline-flex flex-col items-stretch gap-1.5"
      role="img"
      aria-label="CAA — Capturing All Angles"
    >
      <Image
        src="/logo-main.svg"
        alt="Logo"
        width={100}
        height={100}
        className="h-16 w-auto"
      />
    </span>
  );
}
