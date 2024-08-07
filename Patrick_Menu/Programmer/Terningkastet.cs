using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Patrick_Menu.Menu.Components;

namespace Patrick_Menu.Programmer
{
    internal class Terningkastet
    {
        public static void runApp()
        {

            /* Man kan godt gøre det på den måde her, 
             * men switch case er bedere at bruge i dette tilfælde. 
             * Når vi har med værdigere som en single værdig som et tal er,
             * ville det give mening at bruge det!
             * Jeg har lavet begge eksempler
             */

            Console.Clear();

            static void ifStatement()
            {
                bool throwAgain = true;


                // hvis man gerne ville slå igen
                while (throwAgain)
                {
                    Random random = new Random();
                    int terningKast = random.Next(1, 7);

                    if (terningKast == 1)
                    {
                        Console.ForegroundColor = ConsoleColor.White;
                        Console.WriteLine("Du slog en etter");
                    }
                    else if (terningKast == 2)
                    {
                        Console.ForegroundColor = ConsoleColor.Magenta;
                        Console.WriteLine("Du slog en to'er");
                    }
                    else if (terningKast == 3)
                    {
                        Console.ForegroundColor = ConsoleColor.Cyan;
                        Console.WriteLine("Du slog en tre'er");
                    }
                    else if (terningKast == 4)
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("Du slog en fire'er");
                    }
                    else if (terningKast == 5)
                    {
                        Console.ForegroundColor = ConsoleColor.Blue;
                        Console.WriteLine("Du slog en fem'er");
                    }
                    else if (terningKast == 6)
                    {
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine("Du slog en seks'er");
                    }

                    Console.WriteLine("Vil du slå igen? (ja/nej)");
                    string response = Console.ReadLine().ToLower();

                    if (response != "ja")
                    {
                        throwAgain = false;
                    }
                }
                //Farvel besked!
                Console.WriteLine("Tak for at du brugte Terningkast. Farvel!");

            }

            static void switchCase()
            {
                bool throwAgain = true;

                while (throwAgain)
                {
                    Random random = new Random();
                    int terningKast = random.Next(1, 7);
                    switch (terningKast)
                    {
                        case 1:
                            Console.ForegroundColor = ConsoleColor.White;
                            Console.WriteLine("Du slog en etter");
                            break;

                        case 2:
                            Console.ForegroundColor = ConsoleColor.Magenta;
                            Console.WriteLine("Du slog en to'er");
                            break;

                        case 3:
                            Console.ForegroundColor = ConsoleColor.Cyan;
                            Console.WriteLine("Du slog en tre'er");
                            break;

                        case 4:
                            Console.ForegroundColor = ConsoleColor.Red;
                            Console.WriteLine("Du slog en fire'er");
                            break;

                        case 5:
                            Console.ForegroundColor = ConsoleColor.Blue;
                            Console.WriteLine("Du slog en fem'er");
                            break;

                        case 6:
                            Console.ForegroundColor = ConsoleColor.Yellow;
                            Console.WriteLine("Du slog en seks'er");
                            break;
                    }

                    Console.WriteLine("Vil du slå igen? (ja/nej)");
                    string response = Console.ReadLine().ToLower();

                    if (response != "ja")
                    {
                        throwAgain = false;
                    }
                }

                //Farvel besked!
                Console.WriteLine("Tak for at du brugte Terningkast. Farvel!");
            }

            var choise = new SelectionPrompt()
                .Title("Ville du bruge if/else eller Switch Case?")
                .TitleColor(ConsoleColor.White)
                .PageSize(3)
                .MoreChoicesText("")
                .AddChoices(new[] {
                    "if/else", "Switch Case",
                })
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false) // Do not clear the console
                .Prompt();

            switch (choise)
            {
                case "if/else":
                    ifStatement();
                    break;

                case "Switch Case":
                    switchCase();
                    break;
            }
        }
    }
}
