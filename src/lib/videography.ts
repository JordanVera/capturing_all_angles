export type Film = {
  id: string;
  start?: number;
  label: string;
  meta: string;
  frame: string;
};

export type TallClip = {
  src: string;
  youtubeId: string;
  kind: 'clip' | 'short';
};

export function filmMeta(
  location?: string | null,
  year?: string | null,
): string {
  return [location, year].filter(Boolean).join(' · ');
}
