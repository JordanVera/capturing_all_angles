import { NextStudioLayout } from 'next-sanity/studio';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        html { font-size: 16px !important; }
        body { overflow: auto !important; color-scheme: light; }
      `}</style>
      <NextStudioLayout>{children}</NextStudioLayout>
    </>
  );
}
