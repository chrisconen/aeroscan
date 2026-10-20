import { catalog } from './catalog';

export const services = catalog.map(service => ({
  ...service,
  cityDescription: (city: string) => service.title + ' – ' + city + ' és környéke, előzetes egyeztetéssel. ' + service.description,
}));

export const whyDrone = [
  {
    title: 'Gyorsaság',
    description: 'Percek alatt teljes épületet felmérünk, ami hagyományos módszerekkel napokat venne igénybe.',
  },
  {
    title: 'Biztonság',
    description: 'Nincs szükség állványzatra vagy alpintechnikára. A drón biztonságosan eléri a nehezen hozzáférhető helyeket.',
  },
  {
    title: 'Pontosság',
    description: '20 megapixeles kamera, RTK pozicionálás és fotogrammetria a milliméter pontos eredményekért.',
  },
  {
    title: 'Költséghatékonyság',
    description: 'Jelentős megtakarítás az állványozási és hagyományos felmérési költségekhez képest.',
  },
  {
    title: 'Dokumentáció',
    description: '4K videó, nagy felbontású fotók és 3D modellek minden felmérésről.',
  },
  {
    title: 'Innováció',
    description: '4K zoom vizsgálat, részletes légi elemzés és precíz dokumentáció.',
  },
] as const;
