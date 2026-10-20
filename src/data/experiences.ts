export interface Hotspot {
  x: number; y: number; title: string; text: string; tag: string;
}
export interface ExplorerScene {
  id: string; title: string; subtitle: string; image: ImageMetadata; alt: string;
  points: Hotspot[];
}
const assets = import.meta.glob<ImageMetadata>('../assets/experiences/*.webp', { eager: true, import: 'default' });
export const experienceImage = (name: string) => assets[`../assets/experiences/${name}.webp`];
const image = experienceImage;

export const searchScenes: ExplorerScene[] = [{
  id: 'terulet', title: 'Keresési terület', subtitle: 'Az utolsó észleléstől a lehetséges búvóhelyekig.',
  image: image('search-map'), alt: 'Szemléltető légi térkép folyóval, elhagyott épülettel, kukoricással és bokros területtel.',
  points: [
    { x: 68, y: 84, title: 'Itt szaladt el', tag: 'KIINDULÓPONT', text: 'Az utolsó biztos észlelés helyéből és a haladási irányból indulunk ki. A gazditól kapott információk alapján jelöljük ki az első keresési területet.' },
    { x: 21, y: 39, title: 'A folyó mentén', tag: '01 / VÍZPART', text: 'Partszakaszokat, nádasok szélét és megközelíthető kijáratokat vizsgálunk. A növényzet által takart részeket a földi keresőkkel egyeztetve ellenőrizzük.' },
    { x: 59, y: 26, title: 'Elhagyott épület a mezőn', tag: '02 / LEHETSÉGES MENEDÉK', text: 'A falak körüli árnyékos részek, bejáratok és melléképületek lehetséges búvóhelyek. A drón a környezetet mutatja meg; az épület belseje földi ellenőrzést igényel.' },
    { x: 80, y: 58, title: 'Kukoricás', tag: '03 / NEHEZEN BELÁTHATÓ TERÜLET', text: 'A táblaszéleket, földutakat és a sorok közötti nyitott részeket pásztázzuk. A sűrű lomb takarását a látható fényű kamera nem látja át.' },
    { x: 46, y: 58, title: 'Bokros, cserjés rész', tag: '04 / REJTEKHELY', text: 'Egy megriadt állat elbújhat a bokrok alatt. A tisztásokat és növényzetszéleket távolabbról, zoommal ellenőrizzük, a földi megközelítést összehangolva.' },
  ],
}];

export const inspectionScenes: ExplorerScene[] = [
  { id: 'homlokzat', title: 'Omladozó homlokzat', subtitle: 'Amit az utcáról könnyű nem észrevenni.', image: image('facade-damage'), alt: 'Magas emeleti homlokzat leváló vakolattal, kilátszó téglákkal és repedésekkel.', points: [
    { x: 58, y: 39, title: 'Leváló vakolat', tag: '01 / FELÜLETI HIBA', text: 'A közeli felvételen elkülöníthető a hiányzó vakolat és a kilátszó falazat. A képsorozat segít a javítandó felület és a további vizsgálat helyének azonosításában.' },
    { x: 71, y: 69, title: 'Továbbfutó repedés', tag: '02 / REPEDÉSKÉP', text: 'A repedés vonala több épületelemen követhető. Dokumentáljuk az elhelyezkedését; okát és szerkezeti jelentőségét megfelelő szakember értékeli.' },
    { x: 51, y: 65, title: 'Nedvességre utaló elszíneződés', tag: '03 / VIZSGÁLANDÓ FELÜLET', text: 'Az eltérő felületi szín és a lefolyásnyom segít kijelölni a célzott helyszíni ellenőrzést. A fénykép önmagában nem bizonyítja a nedvesség okát.' },
  ]},
  { id: 'uvegfal', title: 'Üvegfal és tömítés', subtitle: 'Egy apró részlet. Sok emelet magasan.', image: image('glass-seal'), alt: 'Irodaház üvegfalából kiforduló fekete gumitömítés és nyitott szigetelési hézag közelről.', points: [
    { x: 40, y: 43, title: 'Kifordult gumitömítés', tag: '01 / ÜVEGFAL-CSATLAKOZÁS', text: 'A panel illesztéséből kilógó tömítés közelről jól látható. A felvétel alapján pontosan azonosítható, melyik homlokzati csatlakozást kell ellenőrizni.' },
    { x: 62, y: 70, title: 'Szabaddá vált szigetelés', tag: '02 / NYITOTT HÉZAG', text: 'A vízszintes profil alatt látható hézag és szigetelőanyag a karbantartó számára is visszakereshetően dokumentálható, állványozás előtti állapotfelvételként.' },
  ]},
  { id: 'kemeny', title: 'Magas gyárkémény', subtitle: 'Részletes állapotkép a nehezen elérhető magasságban.', image: image('chimney-damage'), alt: 'Magas téglakémény sérült koronával, függőleges repedéssel és rozsdás acélpánttal.', points: [
    { x: 63, y: 14, title: 'Sérült kéménykorona', tag: '01 / FELSŐ PEREM', text: 'A kitöredezett fedés és a hiányos téglák felülről és oldalról is rögzíthetők. A több nézőpont segít a javítás előkészítésében.' },
    { x: 68, y: 51, title: 'Függőleges falazati repedés', tag: '02 / FALAZAT', text: 'A repedés lefutását körbefotózással dokumentáljuk. A drónos állapotkép a szakértői vizsgálatot támogatja, nem helyettesíti azt.' },
    { x: 72, y: 82, title: 'Korrodált acélpánt', tag: '03 / FÉM SZERKEZET', text: 'A felületi korrózió és a pánt környezetének állapota közelről vizsgálható. Az ismételt felvételek az időbeli változás követésére is használhatók.' },
  ]},
  { id: 'csarnok', title: 'Repedések a csarnokfalon', subtitle: 'A részletek adják a következő lépést.', image: image('warehouse-crack'), alt: 'Ipari csarnok betonfalának repedése és sérült, rozsdásodó betonfelülete közelről.', points: [
    { x: 57, y: 48, title: 'Átlós repedés', tag: '01 / BETONPANEL', text: 'A repedés iránya és elhelyezkedése a környező elemekkel együtt rögzíthető. A pontos szélesség méréséhez kalibrált mérés és megfelelő referencia szükséges.' },
    { x: 73, y: 66, title: 'Betonleválás, korróziós nyom', tag: '02 / FELTÁRT RÉSZLET', text: 'A lepattant beton és a látható korróziós nyom célzott helyszíni vizsgálatot indokolhat. A képi dokumentáció megkönnyíti a javítandó pont visszakeresését.' },
  ]},
];

export const patrolScenes: ExplorerScene[] = [
  { id: 'telephely', title: 'Telephely és gyárterület', subtitle: 'Kapuk, kerítések, rakodóterek. Egyetlen áttekinthető kép.', image: image('industrial-patrol'), alt: 'Szemléltető esti légi felvétel ipari telephelyről, kapuval, raktárakkal és rakodóudvarral.', points: [
    { x: 36, y: 65, title: 'Nyitott bejárat', tag: '01 / BELÉPÉSI PONT', text: 'A kapu állapotát az egyeztetett rendhez hasonlítjuk. Egy szokatlanul nyitott bejárat ellenőrzést indokolhat; önmagában nem bizonyít behatolást.' },
    { x: 64, y: 45, title: 'Mozgás a rakodótérnél', tag: '02 / ELLENŐRIZENDŐ ESEMÉNY', text: 'A jármű és a személyek mozgása videón dokumentálható. A jogosultságot a helyszíni kapcsolattartóval egyeztetjük, szükség esetén értesítést adunk.' },
    { x: 76, y: 65, title: 'Anyagtároló terület', tag: '03 / ÉRTÉKVÉDELEM', text: 'Rendszeres, összehasonlítható nézőpontból készült felvételekkel észrevehetők a szokatlan változások. Gyanús anyagmozgatásnál a teljes eseménysort érdemes megőrizni.' },
    { x: 86, y: 29, title: 'Hátsó kerítésszakasz', tag: '04 / KERÜLETVÉDELEM', text: 'A nehezen bejárható kerítések, sötét sarkok és kiszolgálóutak is áttekinthetők. A rendszeres légi járőr a telephelyi őrzés további nézőpontja.' },
  ]},
  { id: 'erdoterulet', title: 'Erdőterület és falopás', subtitle: 'Szokatlan tevékenység ott, ahová ritkábban látni be.', image: image('forest-patrol'), alt: 'Szemléltető drónfelvétel erdei tisztáson álló járműről, rönkökről és távoli alakokról.', points: [
    { x: 63, y: 49, title: 'Rakodás az erdőszélen', tag: '01 / TISZTÁZANDÓ TEVÉKENYSÉG', text: 'A fakitermeléshez kapcsolódó jármű és rakodás helye, ideje és mozgása rögzíthető. Az engedélyezettséget a terület kezelője ellenőrzi.' },
    { x: 53, y: 67, title: 'Friss kivágás nyomai', tag: '02 / VÁLTOZÁS A TERÜLETEN', text: 'A korábbi bejárás képeivel összevetve észrevehető a növényzet változása. A felvételek segíthetik egy feltételezett falopás körülményeinek tisztázását.' },
    { x: 27, y: 80, title: 'Megközelítési útvonal', tag: '03 / TERÜLETI ÖSSZEFÜGGÉS', text: 'A bekötőút és a tisztás egy képen is áttekinthető. A teljes környezet dokumentálása több információt adhat, mint egy kiragadott közeli felvétel.' },
  ]},
];
