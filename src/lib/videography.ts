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

export const FALLBACK_FILMS: Film[] = [
  {
    id: 'P4rv4AhWInQ',
    start: 0,
    label: 'Streamer Prom 2026',
    meta: 'Houston · 2026',
    frame: '01',
  },
  {
    id: 'yRV53kGTBaw',
    start: 0,
    label: 'Shaunie Henderson - Embrace Recap',
    meta: 'Houston · 2026',
    frame: '02',
  },
  {
    id: 'bDWAvRikwiw',
    start: 0,
    label: 'Not Your Typical Houston',
    meta: 'Houston · 2026',
    frame: '03',
  },
  {
    id: '96ZfEukYlOo',
    start: 0,
    label: 'Not Your Typical Los Angeles',
    meta: 'Los Angeles · 2026',
    frame: '04',
  },
  {
    id: 'N-0iadFqXHA',
    start: 0,
    label: 'Press Play Monday',
    meta: 'Houston · 2026',
    frame: '05',
  },
  {
    id: 'YsHfBTjxD3g',
    start: 0,
    label: 'Light Fest Teens',
    meta: 'Houston · 2026',
    frame: '06',
  },
  {
    id: 'rnxL7a2GWAk',
    start: 0,
    label: 'Light Fest Teens',
    meta: 'Los Angeles · 2026',
    frame: '07',
  },
  {
    id: 'aLNQGNpj7LI',
    start: 0,
    label: 'NLE Choppa - TSU Homecoming',
    meta: 'Houston · 2025',
    frame: '08',
  },
  {
    id: 'iXMF88GkCYQ',
    start: 0,
    label: 'BEATKING Album Release',
    meta: 'Houston · 2024',
    frame: '09',
  },
  {
    id: 'o1hVmbjCUGo',
    start: 0,
    label: 'Tony Nwigwe Recap',
    meta: 'Houston · 2024',
    frame: '10',
  },
  {
    id: 'ThZTZ0DY9Ac',
    start: 0,
    label: 'Remy Martin Recap',
    meta: 'Houston · 2023',
    frame: '11',
  },
  {
    id: 'yu2mtOlEL8c',
    start: 0,
    label: 'Alexis Finley Birthday Recap',
    meta: 'Houston · 2022',
    frame: '12',
  },
  {
    id: 'lRTANapWWGo',
    start: 0,
    label: 'Lamar Cole SXSW Day 1',
    meta: 'Austin · 2022',
    frame: '13',
  },
  {
    id: 'ma6yidwrl0I',
    start: 0,
    label: 'Lamar Cole SXSW Day 2',
    meta: 'Austin · 2022',
    frame: '14',
  },
  {
    id: 'mtSghvLlUwM',
    start: 0,
    label: 'WOW Conference RECAP',
    meta: 'Houston · 2022',
    frame: '15',
  },
  {
    id: 'Zyy1oTdGyCQ',
    start: 0,
    label: 'Alexis Finley Listening Party',
    meta: 'Houston · 2022',
    frame: '16',
  },
];

const TALL_FILE = /^(clip|short)-(.+)\.mp4$/i;

export function parseTallClip(file: string): TallClip {
  const match = TALL_FILE.exec(file);
  const kind = match?.[1]?.toLowerCase() === 'short' ? 'short' : 'clip';
  return {
    src: `/tall-video/${file}`,
    youtubeId: match?.[2] ?? '',
    kind,
  };
}

export function filmMeta(location?: string | null, year?: string | null): string {
  return [location, year].filter(Boolean).join(' · ');
}
