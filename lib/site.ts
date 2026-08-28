export const BRAND = {
  name: "All Angles",
  line1: "all angles",
  line2: "2026",
  title: "All Angles — Film & Stills",
  description:
    "Videographer and photographer available for editorial, commercial, and personal work. Book a shoot.",
};

export const VIDEOS = [
  "https://storage.yandexcloud.net/laguta/11.mp4",
  "https://storage.yandexcloud.net/laguta/10.mp4",
  "https://storage.yandexcloud.net/laguta/08.mp4",
  "https://storage.yandexcloud.net/laguta/07.mp4",
  "https://storage.yandexcloud.net/laguta/06.mp4",
  "https://storage.yandexcloud.net/laguta/05.mp4",
  "https://storage.yandexcloud.net/laguta/04.mp4",
  "https://storage.yandexcloud.net/laguta/03%20(1).mp4",
  "https://storage.yandexcloud.net/laguta/02%20(1).mp4",
  "https://storage.yandexcloud.net/laguta/01%20(1).mp4",
] as const;

export type MosaicTile = {
  src: string;
  left: string;
  top: string;
  width: string;
  height: string;
  rotate: number;
  clip: string;
  z: number;
};

/** Centered overlapping collage — organic clips, mixed landscape tiles. */
export const MOSAIC_TILES: MosaicTile[] = [
  {
    src: VIDEOS[0],
    left: "18%",
    top: "8%",
    width: "22%",
    height: "18%",
    rotate: -8,
    clip: "ellipse(48% 44% at 50% 50%)",
    z: 3,
  },
  {
    src: VIDEOS[1],
    left: "38%",
    top: "4%",
    width: "24%",
    height: "20%",
    rotate: 4,
    clip: "ellipse(46% 48% at 52% 48%)",
    z: 4,
  },
  {
    src: VIDEOS[2],
    left: "58%",
    top: "10%",
    width: "21%",
    height: "16%",
    rotate: 10,
    clip: "polygon(10% 30%, 36% 6%, 82% 12%, 98% 46%, 86% 84%, 48% 98%, 8% 78%, 2% 48%)",
    z: 2,
  },
  {
    src: VIDEOS[3],
    left: "6%",
    top: "24%",
    width: "23%",
    height: "22%",
    rotate: 6,
    clip: "ellipse(49% 46% at 48% 52%)",
    z: 5,
  },
  {
    src: VIDEOS[4],
    left: "28%",
    top: "26%",
    width: "26%",
    height: "24%",
    rotate: -3,
    clip: "polygon(8% 22%, 40% 4%, 86% 16%, 98% 52%, 82% 92%, 42% 100%, 6% 78%, 0% 44%)",
    z: 6,
  },
  {
    src: VIDEOS[5],
    left: "52%",
    top: "28%",
    width: "24%",
    height: "20%",
    rotate: 7,
    clip: "ellipse(47% 45% at 50% 50%)",
    z: 5,
  },
  {
    src: VIDEOS[6],
    left: "70%",
    top: "22%",
    width: "22%",
    height: "26%",
    rotate: -11,
    clip: "polygon(14% 8%, 78% 0%, 100% 38%, 90% 82%, 48% 100%, 4% 86%, 0% 42%)",
    z: 3,
  },
  {
    src: VIDEOS[7],
    left: "12%",
    top: "52%",
    width: "25%",
    height: "22%",
    rotate: -5,
    clip: "ellipse(48% 47% at 50% 50%)",
    z: 4,
  },
  {
    src: VIDEOS[8],
    left: "36%",
    top: "54%",
    width: "27%",
    height: "24%",
    rotate: 3,
    clip: "polygon(6% 28%, 34% 2%, 80% 10%, 100% 44%, 88% 88%, 46% 100%, 4% 76%)",
    z: 7,
  },
  {
    src: VIDEOS[9],
    left: "62%",
    top: "50%",
    width: "24%",
    height: "22%",
    rotate: -7,
    clip: "ellipse(46% 48% at 52% 50%)",
    z: 5,
  },
  {
    src: VIDEOS[2],
    left: "4%",
    top: "68%",
    width: "20%",
    height: "16%",
    rotate: 12,
    clip: "ellipse(49% 42% at 50% 50%)",
    z: 2,
  },
  {
    src: VIDEOS[6],
    left: "48%",
    top: "72%",
    width: "22%",
    height: "18%",
    rotate: 8,
    clip: "polygon(12% 18%, 70% 0%, 100% 40%, 84% 96%, 28% 100%, 0% 58%)",
    z: 3,
  },
  {
    src: VIDEOS[0],
    left: "74%",
    top: "66%",
    width: "20%",
    height: "20%",
    rotate: -4,
    clip: "ellipse(48% 48% at 50% 50%)",
    z: 4,
  },
  {
    src: VIDEOS[3],
    left: "22%",
    top: "42%",
    width: "16%",
    height: "14%",
    rotate: -14,
    clip: "ellipse(48% 44% at 50% 50%)",
    z: 8,
  },
  {
    src: VIDEOS[8],
    left: "66%",
    top: "38%",
    width: "15%",
    height: "13%",
    rotate: 16,
    clip: "polygon(8% 20%, 70% 0%, 100% 48%, 78% 100%, 10% 88%)",
    z: 8,
  },
  {
    src: VIDEOS[1],
    left: "40%",
    top: "78%",
    width: "18%",
    height: "14%",
    rotate: -9,
    clip: "ellipse(49% 45% at 50% 52%)",
    z: 2,
  },
  {
    src: VIDEOS[5],
    left: "8%",
    top: "10%",
    width: "14%",
    height: "12%",
    rotate: 9,
    clip: "ellipse(47% 48% at 50% 50%)",
    z: 1,
  },
  {
    src: VIDEOS[9],
    left: "82%",
    top: "42%",
    width: "14%",
    height: "16%",
    rotate: -15,
    clip: "polygon(12% 8%, 88% 0%, 100% 62%, 70% 100%, 0% 80%)",
    z: 2,
  },
];

export const SERVICES = [
  {
    id: "stills",
    label: "stills",
    hint: "photography",
  },
  {
    id: "motion",
    label: "motion",
    hint: "videography",
  },
  {
    id: "both",
    label: "full coverage",
    hint: "photo + video",
  },
] as const;

export const PROJECT_TYPES = [
  "wedding",
  "editorial",
  "commercial",
  "event",
  "personal",
  "other",
] as const;
