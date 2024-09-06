# Alice & Bob Houses - Ejendomsmægler Hjemmeside

Dette projekt er en dynamisk, client-side hjemmeside udviklet for ejendomsmægleren Alice & Bob Houses. Hjemmesiden er designet til at fremvise de ejendomme, de har til salg, og giver brugerne mulighed for at se ejendomsdetaljer, booke fremvisninger og interagere med siden på tværs af enheder. Projektet inkluderer også et Content Management System (CMS) til administration af indhold samt autentificering og brugerhåndtering via Clerk Auth.

## Projektoversigt

Formålet med dette projekt er at modernisere Alice & Bob Houses' online tilstedeværelse ved at skabe en brugervenlig, interaktiv hjemmeside, der dynamisk præsenterer ejendomslister. Hjemmesiden integrerer eksterne datakilder, har et responsivt design og inkluderer et CMS-system for nem administration af ejendomsdata samt et autentificeringssystem for sikre brugeradgange.

## Funktioner

### 1. Ejendomslister

-   **Dynamisk Ejendomsvisning**: Hjemmesiden viser ejendomme til salg, hver med et miniaturebillede, adresse, kvadratmeter (m²) og pris.
-   **Responsivt Layout**: Layoutet tilpasser sig automatisk forskellige skærmstørrelser (mobil, tablet, desktop) for at sikre en ensartet brugeroplevelse.

### 2. Detaljeret Ejendomsvisning

-   **Klikbare Miniaturer**: Brugere kan klikke på en ejendom for at få vist yderligere detaljer.
-   **Detaljevisning**: Denne side præsenterer yderligere oplysninger, herunder en beskrivelse af ejendommen og et integreret kort, der viser ejendommens placering. Kortet integreres via Google Maps eller OpenStreetMap.

### 3. Fremvisningsformular

-   **Booking af Fremvisninger**: Potentielle købere kan bestille en fremvisning direkte på hjemmesiden.
-   **Formularfelter**: Formularen indsamler brugerens navn, kontaktoplysninger og foretrukne tidspunkt for fremvisningen.

### 4. Datahåndtering med CMS

-   **CMS System**: Et fuldt integreret CMS-system gør det muligt for administratorer at tilføje, redigere og slette ejendomsoplysninger uden teknisk viden. CMS’et understøtter også upload af billeder og administration af metadata.
-   **JSON Integration**: Hjemmesiden henter ejendomsdata fra JSON-filer genereret af Alice & Bob Houses' eksisterende system. Disse filer lagres i en bestemt mappe på serveren og indlæses dynamisk på hjemmesiden.
-   **Dynamisk Indholdsindlæsning**: JSON-dataen indeholder alle nødvendige oplysninger såsom billeder, adresser, kvadratmeter og priser, som vises dynamisk på hjemmesiden.

### 5. Autentificering med Clerk Auth

-   **Brugerlogin og Registrering**: Systemet bruger Clerk Auth til håndtering af brugerkonti, som giver sikker login- og registreringsmuligheder.
-   **Rollebaseret Adgangskontrol**: Clerk Auth giver mulighed for at oprette forskellige brugerroller (f.eks. administratorer, ejendomsmæglere), hvilket sikrer, at kun autoriserede brugere har adgang til specifikke dele af CMS’et.
-   **Sikkerhedsforanstaltninger**: Clerk Auth implementerer avancerede sikkerhedsfunktioner, herunder beskyttelse mod XSS, CSRF og brute-force angreb, for at sikre brugerdata.

### 6. Sikkerhed og Optimering

-   **Sikkerhedsforanstaltninger**: Ud over Clerk Auth sikrer websiden mod almindelige webtrusler som XSS (Cross-Site Scripting) og CSRF (Cross-Site Request Forgery).
-   **Performanceoptimering**: Hjemmesiden anvender minificerede filer og lazy loading af billeder for at sikre hurtig indlæsningstid og optimal ydeevne.

## Kom i Gang

For at starte udviklingsserveren, brug en af følgende kommandoer:

```bash
npm install
# eller
yarn install
# eller
pnpm install
# eller
bun install
```

```bash
npm run dev
npx run convex dev
# eller
yarn dev
npx run convex dev
# eller
pnpm dev
npx run convex dev
# eller
bun dev
bunx run convex dev
```

Åbn derefter [http://localhost:3000](http://localhost:3000) i din browser for at se hjemmesiden.

### Filstruktur

-   `app/page.tsx`: Hovedsiden hvor ejendomslisterne vises dynamisk.
-   `public/data/properties.json`: JSON-fil der indeholder ejendomsdata.
-   `components/PropertyCard.tsx`: Komponent ansvarlig for at vise hver ejendomsoversigt.
-   `components/PropertyDetail.tsx`: Komponent der viser detaljerede oplysninger om en valgt ejendom.
-   `components/AppointmentForm.tsx`: Komponent til håndtering af fremvisningsformularen.
-   `cms/`: Mappen indeholder filer relateret til CMS-systemet, inklusive administration af ejendomme og brugere.

### JSON Datastruktur

JSON-filerne skal struktureres som følger:

```json
[
  {
    "id": "1",
    "image": "path/to/image.jpg",
    "address": "123 Hovedgade, By",
    "square_meters": "100",
    "price": "1.000.000",
    "description": "Rummeligt 3-værelses hus...",
    "coordinates": {
      "lat": 55.6761,
      "lng": 12.5683
    }
  },
  ...
]
```

### Clerk Auth Integration

Autentificeringssystemet er integreret med Clerk Auth og omfatter følgende:

-   **Login og Registreringskomponenter**: Til brugernes login og registrering.
-   **Brugeradministration**: Adgang til CMS’et er begrænset til godkendte brugere.
-   **Sikkerhed**: Implementerede sikkerhedslag for at beskytte brugernes data.

## Lær Mere

For at lære mere om teknologierne brugt i dette projekt, besøg følgende ressourcer:

-   [Next.js Dokumentation](https://nextjs.org/docs)
-   [React.js Dokumentation](https://reactjs.org/docs/getting-started.html)
-   [TypeScript Dokumentation](https://www.typescriptlang.org/docs/)
-   [Clerk Auth Dokumentation](https://clerk.dev/docs)

## Udrulning

Den anbefalede måde at udrulle din Next.js applikation på er via [Vercel](https://vercel.com). Følg [udrulningsguiden](https://nextjs.org/docs/deployment) for flere oplysninger.

## Teknisk Dokumentation

Den tekniske dokumentation er inkluderet i projektets repository. Den beskriver udviklingsprocessen, herunder hvordan JSON-data struktureres og indlæses, hvordan sikkerhedsforanstaltninger implementeres, samt hvordan Clerk Auth og korttjenester er integreret.
