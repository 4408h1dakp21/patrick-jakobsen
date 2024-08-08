using ToolBox;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu.Programmer
{
    internal class Porto
    {

        public static void runApp()
        {
            // Værdig for at holde styr på om brugeren vil lave en ny udregning
            bool continueConversation = true;

            while (continueConversation)
            {
                Console.Clear();

                // Velkomst besked!
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine("  _____          _                       _ \r\n |  __ \\        | |                     | |\r\n | |__) |__  ___| |_ _ __   ___  _ __ __| |\r\n |  ___/ _ \\/ __| __| '_ \\ / _ \\| '__/ _` |\r\n | |  | (_) \\__ \\ |_| | | | (_) | | | (_| |\r\n |_|   \\___/|___/\\__|_| |_|\\___/|_|  \\__,_|\r\n                                           \r\n                                           ");


                // Håndter brugerinput for hvilket land der skal sendes til
                var contryCodeSelector = new SelectionPrompt()
                    .Title("Vælg et land du ville sende til")
                    .TitleColor(ConsoleColor.Blue)
                    .PageSize(10)
                    .MoreChoicesText("(Ryk op og ned for at se flere programmer)")
                    .AddChoices(new[] {
                     "Denmark", "Sverige", "Finland", "Norge", "Island", "Grønland", "Færøerne", "Åland", "Afghanistan", "Abanien"
                    })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false) // Do not clear the console
                    .Prompt();

                Console.WriteLine($"Du har valgt at sende til: {contryCodeSelector}");


                // Tjek om brugeren ville lave en ny udregning
                var confirmPrompt = new ConfirmPrompt()
                    .WarningMessage("")
                    .PromptMessage("Ville du lave en ny udregning?")
                    .WarningColor(ConsoleColor.White)
                    .defaultAccept("n")
                    .PromptColor(ConsoleColor.White);

                if (!confirmPrompt.Ask())
                {
                   
                    continueConversation = false;
                }
            }
            

        }
    }
}
