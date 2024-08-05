# H1 - Grundlæggende programmering

En samling af små applikationer udviklet som en del af skoleprojekter.

## Indholdsfortegnelse

- [Introduktion](#introduktion)
- [Applikationer](#applikationer)
- [Installation](#installation)
- [Pakker](#pakker)
- [Kommende Diagrammer](#kommende-diagrammer)
- [Bidrag](#bidrag)
- [Licens](#licens)

## Introduktion

Dette projekt indeholder flere små applikationer udviklet som en del af skoleprojekter. Hver applikation har et specifikt formål og demonstrerer forskellige aspekter af programmering i C#.

Dette projekt indholder flere små programmer, som jeg har udarbejdet under mit H1 forløb. Hver applikation har et specifikt formål og demonstrerer forskellige aspekter af programmering i C#.

## Applikationer

### Applikation 1: Celciusomregner

Beskrivelse: Dette program giver brugeren mulighed for at indtaste et celsius tal som, de gerne ville omregne til reamur og fahrenheit

### Applikation 2: Valutaomregner

Beskrivelse: Dette program giver bruger mulighed for at indtaste et beløb i DKK, som derefter bliver udregnet til USD, GBP, EUR og SEK.

#### OBS! Dette er værdiger som bliver brugt i applicationen:
##### Priser fra den 05/08/24
- USD = 6.80; // US Dollars
- GBP = 8.71; // Britiske Pund
- EUR = 7.46; // Euro
- SEK = 0.64; // Svenske kroner

### Applikation 3: Rumfanget

Beskrivelse: Dette program giver brugerne mulighed for at indtaste højde, bredde og længde for at udregne rumfanget.

### Applikation 4: Terningkastet

Beskrivelse: Dette program bruger C# "random" for at kunne slå et random tal fra 1 til 6 og udskrive det til console for at vise hvad brugeren har slået!

### Applikation 5: Pythagoras

Beskrivelse: Dette program sprøger brugeren om at indtaste 2 tal, som skal bruges til at udregne Pythagoras via furmlen: (a² + b² = c²)

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

- [pectre.Console](https://www.nuget.org/packages/Spectre.Console/0.49.2-preview.0.14) - A library that makes it easier to create beautiful console applications
- [Spectre.Console.Cli](https://www.nuget.org/packages/Spectre.Console.Cli/0.49.2-preview.0.14) - A library that makes it easier to create beautiful console applications.
