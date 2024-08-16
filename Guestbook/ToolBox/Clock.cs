using System.Text;

namespace ToolBox
{

    public class Clock
    {
        // Aktuel side, der vises
        static int currentPage = 0;

        // Navne på de forskellige sider
        static string[] pageNames = { "Tid med sekunder", "Tid og dato", "Kun TT:MM" };

        // Variabler til at holde styr på konsolstørrelsen
        static int consoleWidth, consoleHeight;

        // Variabel til at styre blinkning af kolon
        static bool colonVisible = true;

        // Variabel til at spore om siden er ændret
        static bool pageChanged = true;

        public static void ClockApp()
        {
            // Få konsolen til at support Console.OutputEncoding = Encoding.UTF8;
            Console.OutputEncoding = Encoding.UTF8;

            // Skjul markøren
            Console.CursorVisible = false;

            // Gem det forrige display
            string previousDisplay = "";

            // Tidspunkt for den sidste ændring af kolon
            DateTime lastColonChange = DateTime.Now;

            // Interval for kolons blinkning
            TimeSpan colonBlinkInterval = TimeSpan.FromMilliseconds(500);

            while (true)
            {
                // Opdater konsolstørrelsen
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

                // Ryd konsollen når siden ændres
                if (pageChanged)
                {
                    Console.Clear();
                    pageChanged = false; // Nulstil flaget efter rydning
                }

                // Opdater displayet kun hvis det er ændret
                if (currentDisplay != previousDisplay)
                {
                    Console.SetCursorPosition(0, 0);
                    Console.Write(currentDisplay);
                    previousDisplay = currentDisplay;
                }

                // Kontroller opdateringshastigheden
                Thread.Sleep(100);

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
            }
        }

        // Opdaterer størrelsen på konsolvinduet
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
                display.AppendLine();
            }

            // Tilføj linjer med centreret indhold
            foreach (var line in contentLines)
            {
                int padding = (consoleWidth - line.Length) / 2;
                display.AppendLine($"{new string(' ', padding)}{line}");
            }

            // Tilføj bund-margin for at gøre plads til kontrolinformation
            for (int i = contentLines.Length + paddingTop; i < consoleHeight - 2; i++)
            {
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
                    sb.Append(' ').Append(GetColonLine(i)).Append(' ');
                    sb.Append(GetDigitLine(now.Second / 10, i)).Append(' ');
                    sb.Append(GetDigitLine(now.Second % 10, i));
                }
                sb.AppendLine();
            }
            return sb.ToString();
        }

        // Genererer indholdet af dato-siden
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
            return (line == 1 || line == 3) ? (colonVisible ? "██" : "  ") : "  ";
        }

    }
}



