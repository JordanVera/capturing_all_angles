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
      {/* <svg
        className={className}
        viewBox="0 0 272 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M 85.552 95.825 A 48 48 0 1 1 85.552 20.175 L 75.086 33.572 A 31 31 0 1 0 75.086 82.428 Z"
          fill="currentColor"
        />
        <circle
          cx="56"
          cy="58"
          r="22.4"
          fill="none"
          stroke="#FF6122"
          strokeWidth="3"
        />
        <path
          d="M 56.775 39.516 L 71.62 48.087 L 61.066 54.785 L 56.251 52.005 Z M 72.395 49.429 L 72.395 66.571 L 61.317 60.78 L 61.317 55.22 Z M 71.62 67.913 L 56.775 76.484 L 56.251 63.995 L 61.066 61.215 Z M 55.225 76.484 L 40.38 67.913 L 50.934 61.215 L 55.749 63.995 Z M 39.605 66.571 L 39.605 49.429 L 50.683 55.22 L 50.683 60.78 Z M 40.38 48.087 L 55.225 39.516 L 55.749 52.005 L 50.934 54.785 Z"
          fill="currentColor"
        />
        <path
          d="M112.723 106H87.802L120.223 10H151.072L183.467 106H158.571L136.021 34.174H135.248ZM109.502 68.193H161.587V85.821H109.502ZM197.285 106H172.364L204.785 10H235.633L268.029 106H243.133L220.583 34.174H219.81ZM194.064 68.193H246.148V85.821H194.064Z"
          fill="currentColor"
        />
      </svg>
      <span className="text-center font-mono text-[0.65rem] leading-none tracking-[0.12em] whitespace-nowrap uppercase md:text-[0.75rem] md:tracking-[0.16em]">
        Capturing All Angles
      </span> */}
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
