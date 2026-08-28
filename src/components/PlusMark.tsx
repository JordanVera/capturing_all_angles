export function PlusMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M13.6552 23.9998H10.3448V20.6895H13.6552V23.9998Z" fill="currentColor" />
      <path
        d="M21.6557 19.3145L19.3149 21.6552L16.9741 19.3145L19.3149 16.9737L21.6557 19.3145Z"
        fill="currentColor"
      />
      <path d="M24 10.3449V13.6553H20.6897V10.3449H24Z" fill="currentColor" />
      <path
        d="M19.3149 2.34386L21.6557 4.68462L19.3149 7.02539L16.9741 4.68462L19.3149 2.34386Z"
        fill="currentColor"
      />
      <path d="M13.6552 3.31034H10.3448V0H13.6552V3.31034Z" fill="currentColor" />
      <path
        d="M7.02587 4.68555L4.6851 7.02631L2.34433 4.68555L4.6851 2.34478L7.02587 4.68555Z"
        fill="currentColor"
      />
      <path d="M3.31034 10.3449V13.6553H0V10.3449H3.31034Z" fill="currentColor" />
      <path
        d="M4.6851 16.9737L7.02587 19.3145L4.6851 21.6553L2.34434 19.3145L4.6851 16.9737Z"
        fill="currentColor"
      />
    </svg>
  );
}