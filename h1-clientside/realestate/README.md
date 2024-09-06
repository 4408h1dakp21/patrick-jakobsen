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

## Kom godt i gang

For at komme i gang med udviklingen, er det første skridt at sikre, at du har Node.js installeret. Du kan nemt kontrollere dette ved at åbne din terminal og køre følgende kommando:

```bash
node -v
```

Dernæst bør du sikre, at npm (Node Package Manager) er installeret. npm følger som standard med Node.js, men for at være på den sikre side kan du tjekke versionen med følgende kommando:

```bash
npm -v
```

Hvis Node.js ikke er installeret, kan du nemt downloade det via dette link:  
[Download NodeJS](https://nodejs.org/en)

Når Node.js er korrekt installeret, er du klar til at begynde. Følg blot kommandoerne nedenfor for at starte udviklingsserveren:

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

### Convex Schema Struktur

Convex Schema struktureres som følger:

<details>
  <summary>Clients</summary>
  
```typescript
// convex/clients.ts
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const addClient = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const clientId = await ctx.db.insert('clients', {
            ...args,
            journal: [],
        })
        return clientId
    },
})

export const getClients = query({
    handler: async (ctx) => {
        return await ctx.db.query('clients').collect()
    },
})

export const updateClient = mutation({
    args: {
        id: v.id('clients'),
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...updateData } = args
        await ctx.db.patch(id, updateData)
    },
})

export const deleteClient = mutation({
    args: { id: v.id('clients') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

export const addJournalEntry = mutation({
    args: {
        clientId: v.id('clients'),
        entry: v.string(),
        category: v.string(),
        date: v.string(),
    },
    handler: async (ctx, args) => {
        const client = await ctx.db.get(args.clientId)
        if (!client) throw new Error('Client not found')

        const newEntry = {
            date: args.date,
            entry: args.entry,
            category: args.category,
        }

        await ctx.db.patch(args.clientId, {
            journal: [...(client.journal || []), newEntry],
        })
    },
})

```
  </details>

<details>
  <summary>Contracts</summary>
  
```typescript
// convex/contracts.ts
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const getContracts = query({
    handler: async (ctx) => {
        return await ctx.db.query('contracts').collect()
    },
})

export const createContract = mutation({
    args: {
        propertyId: v.id('properties'),
        clientId: v.id('clients'),
        status: v.string(),
        date: v.string(),
    },
    handler: async (ctx, args) => {
        const property = await ctx.db.get(args.propertyId)
        const client = await ctx.db.get(args.clientId)
        if (!property || !client)
            throw new Error('Property or client not found')

        const contractId = `CON-${Math.floor(1000 + Math.random() * 9000)}`
        const contractIds = await ctx.db.insert('contracts', {
            contractId,
            property: property.address,
            client: client.name,
            status: args.status,
            date: args.date,
        })
        return contractIds
    },
})

export const deleteContract = mutation({
    args: { id: v.id('contracts') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

export const updatePropertyStatus = mutation({
    args: { id: v.id('properties'), status: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status })
    },
})

```
  </details>

  
<details>
  <summary>Dashboard</summary>
  
```typescript
import { query } from './_generated/server'

export const getStats = query({
    handler: async (ctx) => {
        const properties = await ctx.db.query('properties').collect()
        const clients = await ctx.db.query('clients').collect()
        const contracts = await ctx.db.query('contracts').collect()

        const now = new Date()
        const lastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        )

        const totalProperties = properties.length
        const activeListings = properties.filter(
            (p) => p.status === 'Active'
        ).length
        const newClients = clients.filter(
            (c) => new Date(c._creationTime) > lastMonth
        ).length
        const contractsSigned = contracts.filter(
            (c) => new Date(c.date) > lastMonth
        ).length

        // For demonstration purposes, we're using random changes
        // In a real application, you'd calculate these based on historical data
        const getRandomChange = () => Math.floor(Math.random() * 20) - 10

        return {
            totalProperties,
            totalPropertiesChange: getRandomChange(),
            activeListings,
            activeListingsChange: getRandomChange(),
            newClients,
            newClientsChange: getRandomChange(),
            contractsSigned,
            contractsSignedChange: getRandomChange(),
        }
    },
})

export const getRecentProperties = query({
    handler: async (ctx) => {
        const properties = await ctx.db
            .query('properties')
            .order('desc')
            .take(5)

        return properties
    },
})

```
  </details>


  <details>
  <summary>File Blog Storage</summary>
  
```typescript
import { mutation, query } from './_generated/server'
import { v } from 'convex/values'

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl()
})

export const getUrl = query({
    args: { storageId: v.string() },
    handler: async (ctx, args) => {
        if (!args.storageId) return null
        return await ctx.storage.getUrl(args.storageId)
    },
})

export const getUrls = query({
    args: { storageIds: v.array(v.string()) },
    handler: async (ctx, args) => {
        const urls = await Promise.all(
            args.storageIds.map(async (storageId) => {
                return await ctx.storage.getUrl(storageId)
            })
        )
        return urls
    },
})

```
  </details>


  <details>
  <summary>Properties</summary>
  
```typescript
import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getProperty = query({
    handler: async (ctx) => {
        return await ctx.db.query('properties').collect()
    },
})

export const addProperty = mutation({
    args: {
        address: v.string(),
        bathrooms: v.number(),
        bedrooms: v.number(),
        description: v.string(),
        imageUrls: v.array(v.string()),
        price: v.number(),
        squareFootage: v.number(),
        status: v.string(),
        type: v.string(),
        isNew: v.boolean(),
        isTrending: v.boolean(),
    },
    handler: async (ctx, args) => {
        const propertyId = await ctx.db.insert('properties', {
            address: args.address,
            bathrooms: args.bathrooms,
            bedrooms: args.bedrooms,
            description: args.description,
            imageUrls: args.imageUrls,
            price: args.price,
            squareFootage: args.squareFootage,
            status: args.status,
            type: args.type,
            isNew: args.isNew,
            isTrending: args.isTrending,
        })
        return propertyId
    },
})

export const editProperty = mutation({
    args: {
        id: v.id('properties'),
        address: v.string(),
        bathrooms: v.number(),
        bedrooms: v.number(),
        description: v.string(),
        imageUrls: v.array(v.string()),
        price: v.number(),
        squareFootage: v.number(),
        status: v.string(),
        type: v.string(),
        isNew: v.boolean(),
        isTrending: v.boolean(),
    },
    handler: async (ctx, args) => {
        const { id, ...updates } = args

        const existingProperty = await ctx.db.get(id)
        if (!existingProperty) {
            throw new Error(`Property with ID ${id} does not exist`)
        }

        await ctx.db.patch(id, updates)
    },
})

export const deleteProperty = mutation({
    args: { id: v.id('properties') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})

export const getPropertyById = query({
    args: { id: v.id('properties') },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id)
    },
})

export const updatePropertyStatus = mutation({
    args: {
        id: v.id('properties'),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { status: args.status })
    },
})

export const getProperties = query({
    handler: async (ctx) => {
        const properties = await ctx.db.query('properties').collect()
        return properties
    },
})


```
  </details>

<details>
    
  <summary>Schema</summary>
  
```typescript
import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    clients: defineTable({
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        status: v.string(),
        journal: v.array(
            v.object({
                date: v.string(),
                entry: v.string(),
                category: v.string(),
            })
        ),
    }),
    contracts: defineTable({
        contractId: v.string(),
        property: v.string(),
        client: v.string(),
        status: v.string(),
        date: v.string(),
    }),
    properties: defineTable({
        address: v.string(),
        bathrooms: v.number(),
        bedrooms: v.number(),
        description: v.string(),
        imageUrls: v.array(v.string()),
        price: v.number(),
        squareFootage: v.number(),
        status: v.string(),
        type: v.string(),
        isNew: v.boolean(),
        isTrending: v.boolean(),
    }),
})

```
  </details>







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
