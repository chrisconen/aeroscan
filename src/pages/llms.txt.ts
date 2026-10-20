import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { catalog } from '@/data/catalog';

const SITE = 'https://aeroscan.hu';
const line = (title: string, href: string, note?: string) =>
  `- [${title}](${SITE}${href})${note ? `: ${note}` : ''}`;

export const GET: APIRoute = async () => {
  const [posts, cities] = await Promise.all([getCollection('blog'), getCollection('cities')]);
  const body = `# AeroScan

> Drónos szolgáltatások Magyarországon: épületfelmérés és állapotelemzés, keresés-mentés, elveszett kisállat keresése, fémdetektoros és búváros tárgykeresés, légi járőrszolgálat, valamint légi fotó és videó. Bodonhelyi (Győr-Moson-Sopron megye) kiindulóponttal, országosan egyeztetett kiszállással.

Üzemeltető: Chris Conen e.v. · Lepke utca 9, 9134 Bodonhely · info@aeroscan.hu · +36 30 569 6550.
A megjelenített szolgáltatásképek szemléltető illusztrációk. Eltűnt személy vagy közvetlen életveszély esetén a 112 hívandó.

## Szolgáltatások
${catalog.map(s => line(s.title, s.href, s.description)).join('\n')}

## Blog
${posts
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .map(p => line(p.data.title, `/blog/${p.id}`, p.data.description))
  .join('\n')}

## Szolgáltatási területek
${cities.map(c => line(c.data.cityName, `/${c.data.slug}`)).join('\n')}

## Egyéb
${[
  line('Kapcsolat és ajánlatkérés', '/kapcsolat'),
  line('Referenciák', '/referenciak'),
  line('Impresszum', '/impresszum'),
  line('Adatvédelmi nyilatkozat', '/adatvedelmi-nyilatkozat'),
].join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
