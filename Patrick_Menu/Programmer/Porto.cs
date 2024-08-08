using ToolBox;
using System;
using System.Collections.Generic;

namespace Patrick_Menu.Programmer
{
    internal class Porto
    {
        // Dictionary holding rates for sending letters to different countries
        static Dictionary<string, List<(int weight, int rate)>> letterRates = new Dictionary<string, List<(int, int)>>
        {
            { "Denmark", new List<(int, int)> { (100, 25), (250, 50), (2000, 75) } },
            { "Sverige", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Finland", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Norge", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Island", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Grønland", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Færøerne", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Åland", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Afghanistan", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } },
            { "Abanien", new List<(int, int)> { (100, 50), (250, 100), (2000, 150) } }
        };

        // Dictionary holding rates for sending packages to different countries
        static Dictionary<string, List<(int weight, int rate)>> packageRates = new Dictionary<string, List<(int, int)>>
        {
            { "Denmark", new List<(int, int)> { (2000, 55), (5000, 65), (10000, 85), (15000, 125), (35000, 189) } },
            { "Sverige", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Finland", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Norge", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Island", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Grønland", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Færøerne", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Åland", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Afghanistan", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
            { "Abanien", new List<(int, int)> { (1000, 207), (2000, 301), (10000, 486), (15000, 579), (20000, 748) } },
        };

        public static void runApp()
        {
            bool continueConversation = true;

            while (continueConversation)
            {
                // Clear the console and display the title
                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine("  _____          _                       _ \r\n |  __ \\        | |                     | |\r\n | |__) |__  ___| |_ _ __   ___  _ __ __| |\r\n |  ___/ _ \\/ __| __| '_ \\ / _ \\| '__/ _` |\r\n | |  | (_) \\__ \\ |_| | | | (_) | | | (_| |\r\n |_|   \\___/|___/\\__|_| |_|\\___/|_|  \\__,_|\r\n                                           \r\n                                           ");

                // Prompt user to select a country
                var countrySelector = new SelectionPrompt()
                    .Title("Vælg et land du ville sende til")
                    .TitleColor(ConsoleColor.Blue)
                    .PageSize(10)
                    .MoreChoicesText("(Ryk op og ned for at se flere programmer)")
                    .AddChoices(letterRates.Keys) // List all countries for letter rates
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false)
                    .Prompt();

                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine("  _____          _                       _ \r\n |  __ \\        | |                     | |\r\n | |__) |__  ___| |_ _ __   ___  _ __ __| |\r\n |  ___/ _ \\/ __| __| '_ \\ / _ \\| '__/ _` |\r\n | |  | (_) \\__ \\ |_| | | | (_) | | | (_| |\r\n |_|   \\___/|___/\\__|_| |_|\\___/|_|  \\__,_|\r\n                                           \r\n                                           ");
                Console.WriteLine($"Du har valgt at sende til: {countrySelector}");

                // Prompt user to select item type (letter or package)
                var itemTypeSelector = new SelectionPrompt()
                    .Title("Er det et brev eller en pakke?")
                    .TitleColor(ConsoleColor.Blue)
                    .PageSize(2)
                    .MoreChoicesText("(Ryk op og ned for at se flere programmer)")
                    .AddChoices(new[] { "brev", "pakke" }) // Letter or package
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false)
                    .Prompt();

                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine("  _____          _                       _ \r\n |  __ \\        | |                     | |\r\n | |__) |__  ___| |_ _ __   ___  _ __ __| |\r\n |  ___/ _ \\/ __| __| '_ \\ / _ \\| '__/ _` |\r\n | |  | (_) \\__ \\ |_| | | | (_) | | | (_| |\r\n |_|   \\___/|___/\\__|_| |_|\\___/|_|  \\__,_|\r\n                                           \r\n                                           ");
                Console.WriteLine($"Du har valgt: {itemTypeSelector}");

                // Get weight input from user
                var weightInput = new UserInput<int>()
                    .Title("Indtast vægt")
                    .TitleColor(ConsoleColor.Magenta)
                    .Prompt(
                        promptText: "Indtast vægt i gram: ", // Prompt for weight in grams
                        validationFunc: input =>
                        {
                            bool isValid = int.TryParse(input, out var value);
                            return (isValid, value);
                        }
                    );

                int weight = weightInput.GetInput();

                // Initialize variables for dimensions, rate, and rate validity
                int length = 0;
                int width = 0;
                int height = 0;
                int girth = 0;
                int rate = 0;
                bool validRate = false;

                if (itemTypeSelector == "brev")
                {
                    // Get dimensions for letter
                    var lengthInput = new UserInput<int>()
                        .Title("Indtast længde")
                        .TitleColor(ConsoleColor.Magenta)
                        .Prompt(
                            promptText: "Indtast længde i cm: ", // Prompt for length in cm
                            validationFunc: input =>
                            {
                                bool isValid = int.TryParse(input, out var value);
                                return (isValid, value);
                            }
                        );

                    length = lengthInput.GetInput();

                    var widthInput = new UserInput<int>()
                        .Title("Indtast bredde")
                        .TitleColor(ConsoleColor.Magenta)
                        .Prompt(
                            promptText: "Indtast bredde i cm: ", // Prompt for width in cm
                            validationFunc: input =>
                            {
                                bool isValid = int.TryParse(input, out var value);
                                return (isValid, value);
                            }
                        );

                    width = widthInput.GetInput();

                    var heightInput = new UserInput<int>()
                        .Title("Indtast højde")
                        .TitleColor(ConsoleColor.Magenta)
                        .Prompt(
                            promptText: "Indtast højde i cm: ", // Prompt for height in cm
                            validationFunc: input =>
                            {
                                bool isValid = int.TryParse(input, out var value);
                                return (isValid, value);
                            }
                        );

                    height = heightInput.GetInput();

                    // Validate dimensions for letter
                    if (length <= 60 && (length + width + height) <= 90)
                    {
                        // Get rate based on weight and selected country
                        validRate = TryGetRate(letterRates[countrySelector], weight, out rate);
                    }
                    else
                    {
                        Console.WriteLine("Brevets dimensioner overstiger de tilladte grænser."); // Notify if dimensions exceed limits
                    }
                }
                else if (itemTypeSelector == "pakke")
                {
                    // Get dimensions for package
                    var lengthInput = new UserInput<int>()
                        .Title("Indtast længde")
                        .TitleColor(ConsoleColor.Magenta)
                        .Prompt(
                            promptText: "Indtast længde i cm: ", // Prompt for length in cm
                            validationFunc: input =>
                            {
                                bool isValid = int.TryParse(input, out var value);
                                return (isValid, value);
                            }
                        );

                    length = lengthInput.GetInput();

                    var girthInput = new UserInput<int>()
                        .Title("Indtast omkreds (2 x bredde + 2 x højde)")
                        .TitleColor(ConsoleColor.Magenta)
                        .Prompt(
                            promptText: "Indtast omkreds i cm: ", // Prompt for girth in cm
                            validationFunc: input =>
                            {
                                bool isValid = int.TryParse(input, out var value);
                                return (isValid, value);
                            }
                        );

                    girth = girthInput.GetInput();

                    // Validate dimensions for package
                    if (length <= 120)
                    {
                        // Get rate based on weight and selected country
                        validRate = TryGetRate(packageRates[countrySelector], weight, out rate);
                    }
                    else if (length <= 150)
                    {
                        // Apply extra fee for longer packages
                        validRate = TryGetRate(packageRates[countrySelector], weight, out rate);
                        if (validRate)
                        {
                            rate += 95; // Extra fee for length > 120 cm
                        }
                    }
                    else
                    {
                        Console.WriteLine("Pakke længden overstiger de tilladte grænser."); // Notify if dimensions exceed limits
                    }
                }

                // Display the calculated rate or an error message
                if (validRate)
                {
                    Console.WriteLine($"Prisen for at sende {itemTypeSelector}et til {countrySelector} med vægt {weight}g er {rate} kr.");
                }
                else
                {
                    Console.WriteLine("Ingen passende pris fundet for den angivne vægt og dimensioner."); // No rate found
                }

                // Prompt user if they want to perform another calculation
                var confirmPrompt = new ConfirmPrompt()
                    .PromptMessage("Ville du lave en ny udregning?") // Prompt for new calculation
                    .PromptColor(ConsoleColor.White)
                    .defaultAccept("n");

                continueConversation = confirmPrompt.Ask(); // Continue or exit based on user response
            }
        }

        // Method to get the rate based on weight and rates dictionary
        static bool TryGetRate(List<(int weight, int rate)> rates, int weight, out int rate)
        {
            foreach (var r in rates)
            {
                if (weight <= r.weight)
                {
                    rate = r.rate;
                    return true;
                }
            }
            rate = 0;
            return false; // No matching rate found
        }
    }
}
