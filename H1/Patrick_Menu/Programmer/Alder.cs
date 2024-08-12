using ToolBox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Patrick_Menu.Programmer
{
    internal class Alder
    {
        // Function til at køre programmet ind 
        public static void runApp()
        {

            Console.Clear();
            // Værdigere til at få navn og alder
            var nameInput = new UserInput<string>()
             .Title("Hvad er dit navn?")
             .TitleColor(ConsoleColor.White)
             .Prompt(
                 promptText: "Indtast dit navn her: ",
                 validationFunc: input => (true, input) // Always valid for strings
             );

            string name = nameInput.GetInput();

            Console.WriteLine("");

            var alderInput = new UserInput<int>()
            .Title("Hvor gammel er du?")
            .TitleColor(ConsoleColor.White)
            .Prompt(
                promptText: "Indtast din alder her: ",
                validationFunc: input =>
                {
                    bool isValid = int.TryParse(input, out var value);
                    return (isValid, value);
                }
            );

            int alder = alderInput.GetInput();

            Console.WriteLine("");


            // If statement som, tjekker hvor gammle man er!
            if (alder < 3)
            {
                Console.WriteLine($"{name}, du må gå med ble");
            } 
            else if (alder >= 3 && alder <= 15)
            {
                Console.WriteLine($"{name}, du må ingenting");
            } 
            else if (alder > 15 && alder < 18)
            {
                Console.WriteLine($"{name}, du må drikke");
            } 
            else
            {
                Console.WriteLine($"{name}, du må stemme og køre bil");
            }

            Console.ReadKey();
        }
    }
}


