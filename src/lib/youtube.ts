const YOUTUBE_ID = /^[\w-]{11}$/;

export function parseYoutubeId(input: string | null | undefined): string {
  const value = input?.trim() ?? '';
  if (!value) return '';
  if (YOUTUBE_ID.test(value)) return value;

  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] ?? '';
    }

    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live') {
      return parts[1] ?? '';
    }

    return url.searchParams.get('v') ?? '';
  } catch {
    return value;
  }
}

export function youtubeWatchHref(id: string, kind: 'clip' | 'short'): string {
  return kind === 'short'
    ? `https://www.youtube.com/shorts/${id}`
    : `https://www.youtube.com/watch?v=${id}`;
}
