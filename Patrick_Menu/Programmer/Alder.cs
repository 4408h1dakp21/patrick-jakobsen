using Spectre.Console;
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
        public void runApp()
        {
            // Værdigere til at få navn og alder
            string name = AnsiConsole.Ask<string>("Hvad er dit [green]navn[/]?");

            int alder = AnsiConsole.Ask<int>("Hvor gammel er [blue]du[/]?");


            // If statement som, tjekker hvor gammle man er!
            if (alder < 3)
            {
                Console.WriteLine($"{name}, du må gå med ble");
            } 
            else if (alder >= 3 && alder <= 15)
            {
                Console.WriteLine($"{name}, du må ingenting");
            } 
            else if (alder >= 15 && alder < 18)
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


