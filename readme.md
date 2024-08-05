# Grundlæggende Programmering

En samling af små applikationer udviklet som en del af H1 - Grundlæggende Programmering.

## Indholdsfortegnelse

- [Introduktion](#introduktion)
- [Applikationer](#applikationer)
- [Installation](#installation)
- [Pakker](#pakker)

## Introduktion

Dette projekt omfatter en række små applikationer, som jeg har udviklet under mit H1-forløb i grundlæggende programmering. Hver applikation har et specifikt formål og illustrerer forskellige aspekter af programmering i C#.

## Applikationer

### Applikation 1: Celciusomregner

**Beskrivelse:** Dette program giver brugeren mulighed for at indtaste en temperatur i Celsius og få den omregnet til Reamur og Fahrenheit.

### Applikation 2: Valutaomregner

**Beskrivelse:** Dette program giver brugeren mulighed for at indtaste et beløb i DKK, som derefter bliver konverteret til USD, GBP, EUR og SEK.

**Bemærk:** Værdierne, der anvendes i applikationen, er som følger (pr. 05/08/2024):
- USD = 6.80 (US Dollars)
- GBP = 8.71 (Britiske Pund)
- EUR = 7.46 (Euro)
- SEK = 0.64 (Svenske kroner)

### Applikation 3: Rumfanget

**Beskrivelse:** Dette program giver brugeren mulighed for at indtaste højde, bredde og længde for at beregne rumfanget.

### Applikation 4: Terningkastet

**Beskrivelse:** Dette program bruger C#'s `Random`-klasse til at kaste en terning, der genererer et tilfældigt tal mellem 1 og 6, og viser resultatet i konsollen.

### Applikation 5: Pythagoras

**Beskrivelse:** Dette program beder brugeren om at indtaste to tal, som anvendes til at beregne hypotenusen i en retvinklet trekant ved hjælp af Pythagoras' sætning: \(a^2 + b^2 = c^2\).

## Installation

Følg disse trin for at installere og køre projektet:

1. Download eller klon repository:
   ```bash
   git clone https://github.com/4408h1dakp21/patrick-jakobsen.git
   ```
2. Åbn projektmappen i Visual Studio 2022:
   ```bash
   cd patrick-jakobsen
   ```
3. Åbn løsningen i Visual Studio:
   ```bash
   start Patrick_Menu.sln
   ```
4. Gendan NuGet-pakker:
   - I Visual Studio, gå til `Tools` > `NuGet Package Manager` > `Manage NuGet Packages for Solution`
   - Klik på `Restore` for at gendanne alle nødvendige pakker.

5. Byg løsningen:
   - I Visual Studio, tryk `Ctrl+Shift+B` for at bygge hele løsningen.

6. Kør applikationen:
   - I Visual Studio, tryk `F5` for at køre applikationen.

## Pakker

Projektet bruger følgende NuGet-pakker:

- [Spectre.Console](https://www.nuget.org/packages/Spectre.Console/0.49.2-preview.0.14) - En bibliotek til nemmere oprettelse af flotte konsolapplikationer.
- [Spectre.Console.Cli](https://www.nuget.org/packages/Spectre.Console.Cli/0.49.2-preview.0.14) - En bibliotek til nemmere oprettelse af CLI-applikationer med flotte konsolgrænseflader.
