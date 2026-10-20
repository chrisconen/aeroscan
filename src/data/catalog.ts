import facadeDamage from '@/assets/experiences/facade-damage.webp';
import searchMap from '@/assets/experiences/search-map.webp';
import lostGolden from '@/assets/experiences/lost-golden.webp';
import diverPoster from '@/assets/upgrade/diver-poster.webp';
import metalSearch from '@/assets/upgrade/metal-search.webp';
import industrialPatrol from '@/assets/experiences/industrial-patrol.webp';
import aerialHero from '@/assets/upgrade/aerial-hero.webp';

export const catalog = [
  { id: 'epulet', number: '01', title: 'Drónos épületfelmérés', short: 'Épületfelmérés', category: 'Ingatlan & ipar', icon: 'building', href: '/epuletfelmeres', image: facadeDamage, alt: 'Épülethomlokzat részleteinek szemléltetése', description: 'Tető, homlokzat és nehezen hozzáférhető épületrészek vizuális állapotfelmérése. Áttekinthető képi dokumentáció a következő döntéshez.', tags: ['Tetővizsgálat', 'Állapotelemzés', 'Dokumentáció'] },
  { id: 'mentes', number: '02', title: 'Drónos keresés-mentés', short: 'Keresés-mentés', category: 'Keresés & felderítés', icon: 'search', href: '/kereses-mentes', image: searchMap, alt: 'Erdős keresési terület szemléltetése', description: 'Eltűnt személyek felkutatásának támogatása légi felderítéssel, a terepi keresők és az illetékes szervek munkájához igazítva.', tags: ['Légi felderítés', 'Területáttekintés', 'Koordináció'] },
  { id: 'kisallat', number: '03', title: 'Elveszett kisállat keresése', short: 'Kisállatkeresés', category: 'Keresés & felderítés', icon: 'people', href: '/elveszett-kisallat-kereses-dronnal', image: lostGolden, alt: 'Elveszett kutya keresését szemléltető kép', description: 'Elkóborolt kutya, macska vagy más állat keresésének támogatása. Az utolsó észlelés, a terep és az állat viselkedése alapján tervezünk.', tags: ['Kutyakeresés', 'Macskakeresés', 'Terepi támogatás'] },
  { id: 'buvar', number: '04', title: 'Keresés búvárral', short: 'Búváros keresés', category: 'Víz alatti keresés', icon: 'map', href: '/kereses-buvarral', image: diverPoster, alt: 'Részlet a víz alatti keresést bemutató videóból', description: 'Vízbe esett telefon, ékszer, kulcs vagy felszerelés felkutatása. Balaton, Velencei-tó, Tisza-tó és egyedileg egyeztetett helyszínek.', tags: ['Tárgykeresés', 'Kikötők', 'Víz alatti felkutatás'] },
  { id: 'femdetektor', number: '05', title: 'Fémdetektoros keresés', short: 'Fémdetektoros keresés', category: 'Új szolgáltatás', icon: 'search', href: '/femdetektoros-kereses', image: metalSearch, alt: 'Fémdetektoros gyűrűkeresés vízparton – illusztráció', description: 'Elveszett gyűrű, ékszer, kulcs és fém alkatrész célzott keresése. Kertek, vízpartok és üzemi területek átvizsgálása, előzetes egyeztetéssel.', tags: ['Gyűrűkeresés', 'Fémkeresés', 'Területátvizsgálás'] },
  { id: 'jaror', number: '06', title: 'Drónos járőrszolgálat', short: 'Járőrszolgálat', category: 'Területfelügyelet', icon: 'shield', href: '/jaror-szolgalat', image: industrialPatrol, alt: 'Ipari terület légi felügyeletének szemléltetése', description: 'Ipari telephelyek, mezőgazdasági területek és magánbirtokok légi áttekintése. Tervezett ellenőrzés, visszanézhető dokumentáció.', tags: ['Telephelyek', 'Birtokok', 'Légi ellenőrzés'] },
  { id: 'foto', number: '07', title: 'Drónos fotó és videó', short: 'Légi fotó & videó', category: 'Vizuális történetmesélés', icon: 'camera', href: '/dronos-foto-video', image: aerialHero, alt: 'Drón egy erdős folyóvölgy felett – illusztráció', description: 'Légi felvételek ingatlanok, szálláshelyek, vállalkozások és rendezvények bemutatásához. Új perspektíva a márka történetéhez.', tags: ['Ingatlanfotózás', 'Turizmus', '4K videó'] },
] as const;

export const enquiryHref = (id: string) => `/kapcsolat?szolgaltatas=${encodeURIComponent(id)}#contact-form`;
