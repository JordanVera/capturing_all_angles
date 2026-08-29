export type PricingPackage = {
  name: string;
  price: string;
  detail?: string;
};

export type PricingSection = {
  id: string;
  label: string;
  from?: string;
  packages: PricingPackage[];
};

export const PRICING: PricingSection[] = [
  {
    id: 'photography',
    label: 'photography',
    from: '$175',
    packages: [
      {
        name: 'essential studio',
        price: '$195',
        detail:
          '1 hour · studio rental · 1 outfit · 10 edited images · gallery · print release · 7-day delivery',
      },
      {
        name: 'signature studio',
        price: '$375',
        detail:
          '2 hours · studio rental · up to 3 outfits · 20 edited images · creative direction · gallery · print release',
      },
      {
        name: 'luxury studio',
        price: '$575',
        detail:
          '3 hours · unlimited outfits · 35 edited images · creative direction · lighting · gallery · priority delivery',
      },
      {
        name: 'essential outdoor',
        price: '$175',
        detail: '1 hour · one location · 10 edited images · online gallery',
      },
      {
        name: 'signature outdoor',
        price: '$325',
        detail:
          '2 hours · up to two locations · multiple looks · 20 edited images · online gallery',
      },
      {
        name: 'luxury lifestyle',
        price: '$475',
        detail:
          '3 hours · multiple locations · unlimited looks · 35 edited images · creative direction · gallery',
      },
      {
        name: 'cap & gown',
        price: '$225',
        detail: '45 minutes · one location · 12 edited images',
      },
      {
        name: 'graduate signature',
        price: '$395',
        detail: '90 minutes · two locations · two outfits · 25 edited images',
      },
      {
        name: 'graduate luxury',
        price: '$595',
        detail:
          'up to 3 hours · multiple locations · unlimited looks · 40 edited images',
      },
      {
        name: 'birthday',
        price: 'from $250',
        detail:
          'creative planning · professional editing · online gallery · luxury themes available',
      },
      {
        name: 'homecoming',
        price: 'from $225',
        detail: 'individuals · couples · groups',
      },
      {
        name: 'prom send-off',
        price: 'from $250',
        detail: 'family · individual · detail · group portraits',
      },
    ],
  },
  {
    id: 'videography',
    label: 'videography',
    from: '$300',
    packages: [
      {
        name: 'essential coverage',
        price: '$450',
        detail:
          'up to 2 hours · 60-second highlight · 45-second decor reel · digital delivery',
      },
      {
        name: 'signature coverage',
        price: '$750',
        detail:
          'up to 4 hours · cinematic highlight · decor reel · bts · three vertical social clips',
      },
      {
        name: 'full-day event',
        price: 'from $1,500',
        detail:
          'weddings · conferences · church · corporate · festivals · highlight · social · drone when permitted',
      },
      {
        name: 'half-day content',
        price: '$850',
        detail:
          'strategy call · 4 hours · 15 photos · five short-form videos · bts',
      },
      {
        name: 'full-day brand content',
        price: '$1,500',
        detail:
          '8 hours · 30 photos · ten short-form videos · product stills · brand story video',
      },
      {
        name: 'brand campaign',
        price: 'from $1,250',
        detail:
          'creative direction · shot list · photography · commercial video · social deliverables',
      },
      {
        name: 'behind-the-scenes',
        price: 'from $300',
        detail: 'vertical content · short recap reel · fast turnaround',
      },
      {
        name: 'drone cinematography',
        price: 'from $350',
        detail: 'licensed pilot · 4K aerials · cinematic color grade',
      },
      {
        name: 'vlog production',
        price: 'from $650',
        detail: 'filming · editing · color · sound mix · youtube-ready export',
      },
      {
        name: 'camera operator',
        price: 'from $500',
        detail:
          'concerts · church · conferences · tours · broadcasts · sports · extra operators on request',
      },
    ],
  },
  {
    id: 'podcast',
    label: 'podcast',
    from: '$1,250',
    packages: [
      {
        name: 'launch package',
        price: '$1,250',
        detail:
          'four episodes · up to 15 min each · multi-camera · audio · intro · branding shoot · cover art · 8 vertical clips',
      },
      {
        name: 'add-ons',
        price: 'on request',
        detail:
          'full episode edit · youtube · spotify · thumbnails · monthly management',
      },
    ],
  },
  {
    id: 'social',
    label: 'social',
    from: '$1,500/mo',
    packages: [
      {
        name: 'essential',
        price: 'from $1,500/mo',
        detail:
          'monthly strategy · eight short-form videos · planning · captions · analytics',
      },
      {
        name: 'growth',
        price: 'from $2,500/mo',
        detail:
          'twelve short-form videos · photography · content days · posting · monthly reporting',
      },
      {
        name: 'premium partner',
        price: 'from $4,000/mo',
        detail:
          'full production · reels · photography · youtube · strategy meetings · priority edit · community',
      },
    ],
  },
  {
    id: 'addons',
    label: 'add-ons',
    packages: [
      { name: 'extra edited photo', price: '$15' },
      { name: 'rush editing · 48 hours', price: '$100' },
      { name: 'same-day sneak peek', price: '$75' },
      { name: 'additional hour', price: '$175' },
      { name: 'additional location', price: '$100' },
      { name: 'drone footage', price: '$200' },
      { name: 'behind-the-scenes reel', price: '$150' },
      { name: 'additional social reel', price: '$100' },
      { name: 'raw images', price: '$150' },
      { name: 'makeup artist', price: 'from $150' },
      { name: 'outfit styling consult', price: '$75' },
      { name: 'custom thumbnail', price: '$50' },
      { name: 'hard drive delivery', price: '$100' },
    ],
  },
];

export const BOOKING_POLICY = [
  '30% non-refundable retainer to hold the date.',
  'Balance due 48 hours before the session or event.',
  'Photography: 7–10 business days. Video: 10–21 business days.',
  'Rush editing available as an add-on.',
] as const;
