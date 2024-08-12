using System;
using System.Collections.Generic;
using System.Linq;
using ToolBox;

namespace Patrick_Menu.Programmer.ArrayOpgaver
{
    internal class NameSearch
    {
        public static void runApp()
        {
            // Initial list with names
            List<string> names = new List<string>
            {
                "Emma", "Ida", "Clara", "Laura", "Isabella", "Sofia", "Sofie", "Anna", "Mathilde", "Freja",
                "Caroline", "Lærke", "Maja", "Josefine", "Liva", "Alberte", "Karla", "Victoria", "Olivia", "Alma"
            };

            names.Sort(); // Ensure names are sorted initially

            while (true)
            {
                var selectionPrompt = new SelectionPrompt()
                    .Title("Vælg en handling:")
                    .TitleColor(ConsoleColor.Blue)
                    .PageSize(5) // Adjust the number of choices per page
                    .MoreChoicesText("(Bevæg op og ned for at se flere muligheder)")
                    .AddChoices(
                        new[]
                        {
                            new Choice("Søg efter et navn eller bogstav"),
                            new Choice("Tilføj et nyt navn"),
                            new Choice("Fjern et navn"),
                            new Choice("Tilføj et array med navne"),
                            new Choice("Afslut")
                        })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false) // Do not clear the console
                    .Prompt();

                switch (selectionPrompt)
                {
                    case "Søg efter et navn eller bogstav":
                        SearchNames(names);
                        break;
                    case "Tilføj et nyt navn":
                        AddName(names);
                        break;
                    case "Fjern et navn":
                        RemoveName(names);
                        break;
                    case "Tilføj et array med navne":
                        AddArray(names);
                        break;
                    case "Afslut":
                        return; // Exit the program
                }
            }
        }

        private static void SearchNames(List<string> names)
        {
            var searchSubstringInput = new UserInput<string>()
                .Title("Skriv et navn eller bogstav (eller skriv 'back' for at gå tilbage):")
                .TitleColor(ConsoleColor.Magenta)
                .Prompt(
                    promptText: "",
                    validationFunc: input => (true, input) // Always valid for strings
                );

            string searchSubstring = searchSubstringInput.GetInput();

            if (searchSubstring.Equals("back", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var matchingNames = names.Where(name => name.IndexOf(searchSubstring, StringComparison.OrdinalIgnoreCase) >= 0).ToList();
            matchingNames.Sort();

            if (matchingNames.Count > 0)
            {
                Console.Clear();
                Console.WriteLine($"Navne som indeholder '{searchSubstring}':");
                foreach (var name in matchingNames)
                {
                    Console.WriteLine(name);
                }
            }
            else
            {
                Console.Clear();
                Console.WriteLine($"Ingen navne fundet som indeholder '{searchSubstring}'.");
            }
        }

        private static void AddName(List<string> names)
        {
            var newNameInput = new UserInput<string>()
                .Title("Skriv navnet du vil tilføje:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "",
                    validationFunc: input => (true, input) // Always valid for strings
                );

            string newName = newNameInput.GetInput();
            names.Add(newName);
            names.Sort(); // Keep the list sorted
            Console.WriteLine($"Navnet '{newName}' er tilføjet.");
        }

        private static void RemoveName(List<string> names)
        {
            var nameToRemoveInput = new UserInput<string>()
                .Title("Skriv navnet du vil fjerne:")
                .TitleColor(ConsoleColor.Red)
                .Prompt(
                    promptText: "",
                    validationFunc: input => (true, input) // Always valid for strings
                );

            string nameToRemove = nameToRemoveInput.GetInput();
            if (names.Remove(nameToRemove))
            {
                Console.WriteLine($"Navnet '{nameToRemove}' er fjernet.");
            }
            else
            {
                Console.WriteLine($"Navnet '{nameToRemove}' blev ikke fundet.");
            }
        }

        private static void AddArray(List<string> names)
        {
            string[] newNamesArray = { "Nora", "Mia", "Sarah", "Frederikke", "Viktoria" };
            names.AddRange(newNamesArray);
            names.Sort(); // Keep the list sorted
            Console.WriteLine("De nye navne er tilføjet.");
        }
    }
}
