using Patrick_Menu.Menu.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu.Programmer
{
    internal class Valutaomregner
    {
        public static void runApp()
        {
            // Værdiger som kan udregnes!
            double USD = 6.80; // US Dollars
            double GBP = 8.71; // Britiske Pund
            double EUR = 7.46; // Euro
            double SEK = 0.64; // Svenske kroner

            bool continueConversion = true;

            while (continueConversion)
            {
                Console.Clear();

                // Håndter brugerinput og tjekker om det er et gyldigt tal og laver omregningen
                try
                {
                    var userInput = new UserInput<double>()
                               .Title("Indtast beløb i DKK, som du vil omregne:")
                               .TitleColor(ConsoleColor.Blue)
                               .Prompt(
                                   promptText: "Indtast beløb her: ",
                                   validationFunc: input =>
                                   {
                                       bool isValid = double.TryParse(input, out var value);
                                       return (isValid, value);
                                   }
                               );

                    double DKK = userInput.GetInput();
             

                    Console.WriteLine($"Beløbet i DKK: {DKK}");
                    Console.WriteLine($"USD: {DKK / USD:F2}");
                    Console.WriteLine($"GBP: {DKK / GBP:F2}");
                    Console.WriteLine($"EUR: {DKK / EUR:F2}");
                    Console.WriteLine($"SEK: {DKK / SEK:F2}");

                  

                    var confirmPrompt = new ConfirmPrompt()
                        .WarningMessage("Vil du foretage en ny omregning?")
                        .PromptMessage("")
                        .WarningColor(ConsoleColor.White)
                        .defaultAccept("y")
                        .PromptColor(ConsoleColor.White);

                    if (!confirmPrompt.Ask())
                    {
                        continueConversion = true;
                    }
                }
                catch (FormatException)
                {
                    // Fortæller brugeren om det er et ugyldigt input og starter programmet igen
                    Console.Clear();
                    Console.WriteLine("Dit input er ikke gyldigt! Indtast et gyldigt tal.");
                    Console.WriteLine("Tryk på en tast for at forsøge igen.");
                    Console.ReadKey();
                }
            }

            //Farvel besked!

            Console.WriteLine("Tak for at du brugte valutaomregner. Farvel!");
        }
    }
}
