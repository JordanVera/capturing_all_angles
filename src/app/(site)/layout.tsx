import { SanityLive } from '@/sanity/lib/live';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <SanityLive />
    </>
  );
}
