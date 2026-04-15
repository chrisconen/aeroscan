export const mainNav = [
  { label: 'Főoldal', href: '/' },
  {
    label: 'Helyszínek',
    children: [
      { label: 'Győr', href: '/gyor' },
      { label: 'Sopron', href: '/sopron' },
      { label: 'Tatabánya', href: '/tatabanya' },
      { label: 'Budapest', href: '/budapest' },
      { label: 'Dunaújváros', href: '/dunaujvaros' },
      { label: 'Szeged', href: '/szeged' },
      { label: 'Pécs', href: '/pecs' },
      { label: 'Debrecen', href: '/debrecen' },
    ],
  },
  {
    label: 'Szolgáltatások',
    children: [
      { label: 'Épületfelmérés', href: '/epuletfelmeres' },
      { label: 'Keresés-mentés', href: '/kereses-mentes' },
      { label: 'Járőrszolgálat', href: '/jaror-szolgalat' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Kapcsolat', href: '/kapcsolat' },
] as const;

export const contactInfo = {
  email: 'info@aeroscan.hu',
  phone: '+36 30 569 6550',
  address: 'Lepke utca 9, 9134 Bodonhely',
  county: 'Győr-Moson-Sopron megye',
} as const;

export const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com/aeroscan', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com/@aeroscan', icon: 'youtube' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/aeroscan', icon: 'linkedin' },
  { label: 'Pinterest', href: 'https://pinterest.com/aeroscan', icon: 'pinterest' },
] as const;
