export type GearCategory = 'camera' | 'lenses' | 'gimbals';

export type GearSpec = {
  label: string;
  value: string;
};

export type GearItem = {
  id: string;
  category: GearCategory;
  name: string;
  role: string;
  ready: boolean;
  image?: string;
  alt?: string;
  width?: number;
  height?: number;
  specs: GearSpec[];
};

export const GEAR_CATEGORIES: {
  id: GearCategory;
  label: string;
}[] = [
  { id: 'camera', label: 'camera' },
  { id: 'lenses', label: 'lenses' },
  { id: 'gimbals', label: 'gimbals' },
];

export const GEAR: GearItem[] = [
  {
    id: 'sony-a7',
    category: 'camera',
    name: 'sony α7r',
    role: 'body',
    ready: true,
    image: '/gear/sony-a7-camera.webp',
    alt: 'Sony Alpha 7R camera body',
    width: 1200,
    height: 1050,
    specs: [
      { label: 'make', value: 'sony' },
      { label: 'body', value: 'α7r' },
      { label: 'sensor', value: 'full frame' },
      { label: 'mount', value: 'e-mount' },
      { label: 'role', value: 'photo + video' },
    ],
  },
  {
    id: 'lenses',
    category: 'lenses',
    name: '—',
    role: 'soon',
    ready: false,
    specs: [],
  },
  {
    id: 'gimbals',
    category: 'gimbals',
    name: '—',
    role: 'soon',
    ready: false,
    specs: [],
  },
];
