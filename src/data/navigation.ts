import { catalog } from './catalog';

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
    children: catalog.map(service => ({ label: service.short, href: service.href })),
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
  { label: 'Facebook', href: 'https://www.facebook.com/dron.kereso.mento.szolgalat/', icon: 'facebook' },
  { label: 'YouTube', href: 'https://www.youtube.com/@buvartanfolyamok-kereses-buvar', icon: 'youtube' },
] as const;
