export const services = [
  {
    title: 'Épületfelmérés',
    description: 'Precíz drónos épületfelmérés és állapotelemzés professzionális szakértőktől. Homlokzat, tető felmérés.',
    icon: 'building',
    href: '/epuletfelmeres',
    image: '/images/epuletfelmeres-icon.svg',
    imageAspectRatio: 75/75,
    cityDescription: (city: string) =>
      `Drónos épületfelmérés és állapotelemzés ${city} területén. Homlokzat, tető és szerkezeti vizsgálatok professzionális szakértőktől.`,
  },
  {
    title: 'Keresés-mentés',
    description: 'Eltűnt személy vagy háziállat keresése drónnal. Gyors bevetés, drónos keresés, élő közvetítés.',
    icon: 'search',
    href: '/kereses-mentes',
    image: '/images/kereses-mentes-icon.svg',
    cityDescription: (city: string) =>
      `Eltűnt személy vagy háziállat keresése drónnal ${city} és környékén. Gyors bevetés, éjszakai keresés reflektorral, élő közvetítés.`,
  },
  {
    title: 'Járőrszolgálat',
    description: 'Ipari létesítmények, mezőgazdasági területek, magánbirtokok drónos járőrözése és felügyelete.',
    icon: 'shield',
    href: '/jaror-szolgalat',
    image: '/images/dronos-jarorozes.svg',
    cityDescription: (city: string) =>
      `Drónos járőrszolgálat ${city} ipari létesítményei, mezőgazdasági területei és magánbirtokainak felügyeletéhez.`,
  },
  {
    title: 'Fotó & Videó',
    description: '4K drónos fotózás és videózás ingatlanokról, rendezvényekről és egyedi projektekről.',
    icon: 'camera',
    href: '/kapcsolat',
    image: '/images/dron-foto-video.svg',
    cityDescription: (city: string) =>
      `4K légi felvételek, drónos fotózás és videózás ${city} ingatlanairól, rendezvényeiről és egyedi projektekről.`,
  },
];

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
    description: 'Termál kamerás vizsgálat, multispektrális elemzés és AI-alapú hibadekció.',
  },
] as const;
