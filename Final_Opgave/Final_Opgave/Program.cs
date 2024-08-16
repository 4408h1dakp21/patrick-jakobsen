using System.Text;

namespace Final_Opgave
{
    internal class Program
    {
        // Værdig som skal holde tallet af den nuvæernde side.
        static int currentPage = 0;

        // Navne på de forskellige sider.
        static string[] pageNames = { "Tid med sekunder", "Tid og dato", "Kun TT:MM" };

        // Variabler til at holde styr på konsol størrelsen.
        static int consoleWidth, consoleHeight;

        //Variabel til at stoppe kolon blinkning.
        static bool stopBlinking = false;

        // Variable til at holde styr på kolon blinkning.
        static bool colonVisible = true;

        // Variable til at spore om siden er skiftet.
        static bool pageChanged = true;

        static void Main(string[] args)
        {

            // Få konsolen til at kunne vise, pilene til kontrol panelet. 
            Console.OutputEncoding = Encoding.UTF8;

            // Skjul cursor.
            Console.CursorVisible = false;

            // Gem det forrige display
            string previousDisplay = "";

            // Tidspunkt for sidste kolon blinkning.
            DateTime lastColonChange = DateTime.Now;

            // Interval for kolons blinkning
            TimeSpan colonBlinkInterval = TimeSpan.FromMilliseconds(500);

            // Hoved loop
            while (true)
            {
                // Kør opdatering af konsole størrelse.
                UpdateConsoleSize();


                // Håndter blinkning af kolon
                if (DateTime.Now - lastColonChange >= colonBlinkInterval)
                {
                    colonVisible = !colonVisible;
                    lastColonChange = DateTime.Now;
                }

                // Generer display-indhold
                DateTime now = DateTime.Now;
                string currentDisplay = GenerateDisplay(now);

                // Fjern det gammle inhold fra konsolen, for at vise det nye indhold.
                if (pageChanged)
                {
                    Console.Clear();
                    pageChanged = false;
                }

                // Opdater displayet kun hvis det er ændret
                if (currentDisplay != previousDisplay)
                {
                    Console.SetCursorPosition(0, 0);
                    Console.Write(currentDisplay);
                    previousDisplay = currentDisplay;
                }

                // Håndter sideændringer
                if (Console.KeyAvailable)
                {
                    ConsoleKeyInfo key = Console.ReadKey(true);
                    if (key.Key == ConsoleKey.RightArrow)
                    {
                        currentPage = (currentPage + 1) % 3;
                        pageChanged = true; // Sæt flag til at rydde konsollen ved sideændring
                    }
                    else if (key.Key == ConsoleKey.LeftArrow)
                    {
                        currentPage = (currentPage - 1 + 3) % 3;
                        pageChanged = true; // Sæt flag til at rydde konsollen ved sideændring
                    }
                }

                // Kontroller opdateringshastigheden
                Thread.Sleep(100);


                // Funktion til at køre opdatering af konsol størrelse.
                static void UpdateConsoleSize()
                {
                    consoleWidth = Console.WindowWidth;
                    consoleHeight = Console.WindowHeight;
                }

                // Genererer det komplette display-indhold baseret på den nuværende side
                static string GenerateDisplay(DateTime now)
                {
                    StringBuilder display = new StringBuilder();

                    // Generer indholdet afhængigt af den aktuelle side
                    string content = currentPage switch
                    {
                        0 => GenerateTimePage(now, true),
                        1 => GenerateDatePage(now),
                        _ => GenerateTimePage(now, false)
                    };

                    // Del indholdet op i linjer
                    string[] contentLines = content.Split('\n');

                    // Beregn top-margin for centering af indholdet
                    int paddingTop = (consoleHeight - contentLines.Length - 2) / 2;

                    // Tilføj top-margin til displayet
                    for (int i = 0; i < paddingTop; i++)
                    {
                        // Tilføj tomme linjer
                        // Du kan se hvordan det virker ved at smide et "0" in in appendline 
                        display.AppendLine();
                    }

                    // Tilføj linjer med centreret indhold
                    foreach (var line in contentLines)
                    {
                        // For at centrere linjen, tilføj padding til venstre
                        // Du kan se hvordan det virker ved at smide et "0" in in appendline 
                        int padding = (consoleWidth - line.Length) / 2;
                        display.AppendLine($"{new string(' ', padding)}{line}");
                    }

                    // Tilføj bund-margin for at gøre plads til kontrolinformation
                    for (int i = contentLines.Length + paddingTop; i < consoleHeight - 2; i++)
                    {
                        // Tilføj tomme linjer
                        // Du kan se hvordan det virker ved at smide et "0" in in appendline 
                        display.AppendLine();
                    }

                    // Tilføj kontroloplysninger i bunden
                    string controls = $"Side {currentPage + 1}/3: {pageNames[currentPage]}";
                    int controlsPadding = (consoleWidth - controls.Length) / 2;
                    display.AppendLine($"{new string(' ', controlsPadding)}{controls}");

                    // Tilføj instruktioner til skift af sider
                    string instructions = "Brug ← → piletaster til at skifte sider";
                    int instructionsPadding = (consoleWidth - instructions.Length) / 2;
                    display.Append($"{new string(' ', instructionsPadding)}{instructions}");

                    return display.ToString();
                }

                // Genererer indholdet af tids-siden
                static string GenerateTimePage(DateTime now, bool showSeconds)
                {
                    StringBuilder sb = new StringBuilder();
                    for (int i = 0; i < 5; i++)
                    {
                        // Tilføj timer, kolon, minutter og evt. sekunder til displayet
                        sb.Append(GetDigitLine(now.Hour / 10, i)).Append(' ');
                        sb.Append(GetDigitLine(now.Hour % 10, i)).Append(' ');
                        sb.Append(GetColonLine(i)).Append(' ');
                        sb.Append(GetDigitLine(now.Minute / 10, i)).Append(' ');
                        sb.Append(GetDigitLine(now.Minute % 10, i));
                        if (showSeconds)
                        {
                            // "/" er så vi kan få 10erne så fx 34 vil blive til 3
                            // "%" er så vi kan få 1erne så fx 34 ville blive til 4
                            sb.Append(' ').Append(GetColonLine(i)).Append(' ');
                            sb.Append(GetDigitLine(now.Second / 10, i)).Append(' ');
                            sb.Append(GetDigitLine(now.Second % 10, i));
                        }
                        sb.AppendLine();
                    }
                    return sb.ToString();
                }


                static string GenerateDatePage(DateTime now)
                {
                    StringBuilder sb = new StringBuilder();

                    // Tilføj tidsvisning uden sekunder
                    sb.Append(GenerateTimePage(now, false));
                    sb.AppendLine();
                    sb.AppendLine();

                    // Generer dato som tekst
                    string date = now.ToString("dd/MM/yyyy");
                    for (int i = 0; i < 5; i++)
                    {
                        foreach (char c in date)
                        {
                            sb.Append(GetDigitLine(c == '/' ? 10 : int.Parse(c.ToString()), i)).Append(' ');
                        }
                        sb.AppendLine();
                    }
                    return sb.ToString();
                }

                // Henter en linje af en ASCII-repræsentation af et tal
                static string GetDigitLine(int digit, int line)
                {
                    string[] digitPatterns = {
                    "█████\n█   █\n█   █\n█   █\n█████", // 0
                    "  █  \n  █  \n  █  \n  █  \n  █  ", // 1
                    "█████\n    █\n█████\n█    \n█████", // 2
                    "█████\n    █\n█████\n    █\n█████", // 3
                    "█   █\n█   █\n█████\n    █\n    █", // 4
                    "█████\n█    \n█████\n    █\n█████", // 5
                    "█████\n█    \n█████\n█   █\n█████", // 6
                    "█████\n    █\n    █\n    █\n    █", // 7
                    "█████\n█   █\n█████\n█   █\n█████", // 8
                    "█████\n█   █\n█████\n    █\n█████", // 9
                    "     \n  █  \n     \n  █  \n     "  // 10 (skråstreg til dato)
                };

                    // Returnerer den ønskede linje for det specifikke tal
                    return digitPatterns[digit].Split('\n')[line];
                }

                // Henter en linje af en kolon (:) med blinkningseffekt
                static string GetColonLine(int line)
                {
                    if (stopBlinking)
                    {
                        return (line == 1 || line == 3) ? ("██") : "  ";
                    } else
                    {
                        return (line == 1 || line == 3) ? (colonVisible ? "██" : "  ") : "  ";
                    }
                    
                  
                }
            }
        }
    }
}
