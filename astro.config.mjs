import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aeroscan.hu',
  output: 'static',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: { webp: { quality: 72, effort: 5 }, jpeg: { quality: 78, mozjpeg: true } },
    },
  },
  build: {
    // ponytail: one less blocking request beats cross-page CSS caching on a landing-page site.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Roboto',
      cssVariable: '--font-roboto',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: ['400 800'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
  i18n: {
    defaultLocale: 'hu',
    locales: ['hu'],
  },
  redirects: {
    // Old WordPress service pages
    '/elmezes-allapotfelmeres-dronnal-portfolio': '/epuletfelmeres',
    '/kereses-mentes-felderites-eltunt-szemely-haziallat': '/kereses-mentes',
    '/jarorszolgalat': '/jaror-szolgalat',
    '/felmeres-allapotelemzes-dronnal-kapcsolat': '/kapcsolat',
    '/felmeres-allapotelemzes-dronnal-blog': '/blog',

    // Old WordPress city pages
    '/dronos-felmeres-allapotelemzes-gyor': '/gyor',
    '/dronos-foto-video-epuletfelmeres-kereses-jarorozes-sopron': '/sopron',
    '/dronos-foto-video-kereses-mentes-felmeres-tatabanya': '/tatabanya',
    '/dron-foto-video-felmeres-kereses-jarorozes-budapest': '/budapest',
    '/dronos-foto-video-dunaujvaros': '/dunaujvaros',
    '/dron-foto-video-epuletfelmeres-kereses-jarorozes-szeged': '/szeged',
    '/dronos-foto-video-kereses-mentes-felmeres-tatabanya-pecs': '/pecs',
    '/dronos-foto-video-kereses-mentes-felmeres-tatabanya-debrecen': '/debrecen',

    // Old WordPress blog posts
    '/dronos-kereses-felderites-mentes': '/blog/dronos-kereses-felderites-mentes',
    '/893': '/blog/dron-epuletfelmeres-elonyei',
    '/innovativ-technologiak-amelyek-uj-szintre-emelik-a-felmeresek-minoseget': '/blog/innovativ-technologiak-felmeresek',
    '/biztonsagos-koltseghatekony-megoldas-nagy-teruletek-felmeresere-drontechnologia-az-ipari-felhasznalasban': '/blog/drontechnologia-ipari-felhasznalasban',
    '/preciz-adatok-rovid-hataridovel-hogyan-segitheti-projektjet-egy-dronos-felmeres': '/blog/preciz-adatok-rovid-hataridovel',
    '/ipari-alkalmazasok-hol-es-hogyan-hasznosithatok-a-dronos-felmeresek': '/blog/ipari-alkalmazasok-dronos-felmeresek',
    '/hogyan-zajlik-egy-professzionalis-dronfelmeres-lepesrol-lepesre': '/blog/professzionalis-dronfelmeres-lepesrol-lepesre',
    '/miert-eri-meg-dronnal-vegezni-a-legi-felmereseket': '/blog/miert-eri-meg-dronnal-legi-felmereseket',
  },
});
