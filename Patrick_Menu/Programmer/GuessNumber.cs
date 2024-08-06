using Spectre.Console;
using System;

namespace Patrick_Menu.Programmer
{
    internal class GuessNumber
    {
        static void GameModelet()
        {
            GameSettings(1, 5, int.MaxValue); // Ubegrænsede forsøg
        }

        static void GameModeNormal()
        {
            GameSettings(1, 10, int.MaxValue); // Ubegrænsede forsøg
        }

        static void GameModeHardcore()
        {
            GameSettings(1, 10, 3); // 3 forsøg
        }

        static void GameSettings(int min, int max, int maxForsøg)
        {
            Random tilfældig = new Random();
            int hemmeligtNummer = tilfældig.Next(min, max + 1);
            int forsøg = 0;
            bool erGættet = false;

            AnsiConsole.MarkupLine($"Gæt nummeret mellem {min} og {max}!");

            while (forsøg < maxForsøg)
            {
                forsøg++;
                int gæt = AnsiConsole.Ask<int>("Indtast dit gæt:");

                if (gæt < hemmeligtNummer)
                {
                    AnsiConsole.MarkupLine("[yellow]For lavt! Prøv igen.[/]");
                }
                else if (gæt > hemmeligtNummer)
                {
                    AnsiConsole.MarkupLine("[yellow]For højt! Prøv igen.[/]");
                }
                else
                {
                    erGættet = true;
                    break;
                }
            }

            if (erGættet)
            {
                AnsiConsole.MarkupLine($"[green]Tillykke! Du gættede nummeret i {forsøg} forsøg.[/]");
            }
            else
            {
                AnsiConsole.MarkupLine($"[red]Du har brugt alle {maxForsøg} forsøg. Det hemmelige nummer var {hemmeligtNummer}.[/]");
                if (maxForsøg == 3)
                {
                    AnsiConsole.MarkupLine("[red]Computeren vil nu lukke ned![/]");
                    System.Diagnostics.Process.Start("shutdown", "/s /t 0");
                }
            }

        }

        public static void runApp()
        {
            var spilMode = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title("Vælg din [green]spil mode[/]:")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Bevæg op og ned for at se flere tilstande)[/]")
                    .AddChoices(new[] {
                        "Let (1-5)", "Normal (1-10)", "Hardcore (1-10)",
                    }));

            switch (spilMode)
            {
                case "Let (1-5)":
                    GameModelet();
                    break;

                case "Normal (1-10)":
                    GameModeNormal();
                    break;

                case "Hardcore (1-10)":
                    if (!AnsiConsole.Confirm("[yellow]WARNING:[/]\nDu har 3 forsøg til at gætte nummeret korrekt! Hvis du ikke gætter det korrekt, vil din computer lukke ned. Sørg for, at alt er gemt! Vil du fortsætte?"))
                    {
                        AnsiConsole.MarkupLine("[yellow]Du valgte at spille sikkert![/]");
                    }
                    else
                    {
                        GameModeHardcore();
                    }
                    break;
            }
        }
    }
}