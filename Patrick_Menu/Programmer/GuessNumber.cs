using Patrick_Menu.Menu.Components;
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
            Random randomNumber = new Random();
            int secretNumber = randomNumber.Next(min, max + 1);
            int attempts = 0;
            bool isGuessed = false;

            Console.WriteLine($"Gæt nummeret mellem {min} og {max}!");

            while (attempts < maxForsøg)
            {
                attempts++;

                var guessInput = new UserInput<int>()
                   .Title("")
                   .TitleColor(ConsoleColor.Cyan)
                   .Prompt(
                       promptText: "Indtast dit gæt! ",
                       validationFunc: input =>
                       {
                           bool isValid = int.TryParse(input, out var value);
                           return (isValid, value);
                       }
                   );

                int guess = guessInput.GetInput();
      
            

                if (guess < secretNumber)
                {
                    Console.WriteLine("For lavt! Prøv igen.");
                }
                else if (guess > secretNumber)
                {
                   Console.WriteLine("For højt! Prøv igen.");
                }
                else
                {
                    isGuessed = true;
                    break;
                }
            }

            if (isGuessed)
            {
                Console.WriteLine($"Tillykke! Du gættede nummeret i {attempts} forsøg.");
            }
            else
            {
                Console.WriteLine($"Du har brugt alle {maxForsøg} forsøg. Det hemmelige nummer var {secretNumber}.");
                if (maxForsøg == 3)
                {
                    Console.WriteLine("Computeren vil nu lukke ned!");
                    System.Diagnostics.Process.Start("shutdown", "/s /t 0");
                }
            }

        }

        public static void runApp()
        {
            Console.Clear();
            var spilMode = new SelectionPrompt()
                .Title("Vælg din spil mode:")
                .TitleColor(ConsoleColor.Green)
                .PageSize(10)
                .MoreChoicesText("(Bevæg op og ned for at se flere tilstande)")
                .AddChoices(new[] {
                "Let (1-5)", "Normal (1-10)", "Hardcore (1-10)",
                })
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false) // Do not clear the console
                .Prompt();



            switch (spilMode)
            {
                case "Let (1-5)":
                    GameModelet();
                    break;

                case "Normal (1-10)":
                    GameModeNormal();
                    break;

                case "Hardcore (1-10)":
                    var confirmPrompt = new ConfirmPrompt()
                       .WarningMessage("Du har 3 forsøg til at gætte nummeret korrekt! Hvis du ikke gætter det korrekt, vil din computer lukke ned. Sørg for, at alt er gemt!")
                       .PromptMessage("Vil du fortsætte?")
                       .WarningColor(ConsoleColor.Yellow)
                       .PromptColor(ConsoleColor.White);

                    if (confirmPrompt.Ask())
                    {
                        GameModeHardcore();
                    }
                    else
                    {
                       Console.WriteLine("Du valgte at spille sikkert!");
                    }
                    break;
            }
        }
    }
}