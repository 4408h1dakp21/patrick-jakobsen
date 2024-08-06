using Spectre.Console;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu.Programmer
{
    internal class GuessNumber
    {


        static void gameModeLet()
        {
            Console.WriteLine("Let");
        }

        static void gameModeNormal()
        {
            Console.WriteLine("Normal");
        }


        static void gameModeHardcore()
        {
            Console.WriteLine("hardcore");
        }


        public static void runApp()
        {
            // Ask for the user's favorite fruit
            var gameMode = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title("What's your [green]favorite fruit[/]?")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Move up and down to reveal more fruits)[/]")
                    .AddChoices(new[] {
                    "Let (1-5)", "Normal (1-10)", "Hardcore (1-10)",
                    }));

           

            switch (gameMode)
            {
                case "let (1-5)":

                    if (!AnsiConsole.Confirm("[red]Disclaimer[/] \n Du har 3 forsøg til at gætte tallet rigtigt! \n Hvis du ikke gætter det rigtigt, slukker din computer så sørg for at alt er gemt!"))
                    {
                        Console.WriteLine("Øv hvor du kedelig!");
                    }
                    else
                    {
                        gameModeLet();
                    }
                    break;

                case "Normal (1-10)":

                    if (!AnsiConsole.Confirm("[red]Disclaimer[/] \n Du har 3 forsøg til at gætte tallet rigtigt! \n Hvis du ikke gætter det rigtigt, slukker din computer så sørg for at alt er gemt!"))
                    {
                        Console.WriteLine("Øv hvor du kedelig!");
                    }
                    else
                    {
                        gameModeNormal();
                    }
                    break;

                case "Hardcore (1-10)":
                   
                    if (!AnsiConsole.Confirm("[red]Disclaimer[/] \n Du har 3 forsøg til at gætte tallet rigtigt! \n Hvis du ikke gætter det rigtigt, slukker din computer så sørg for at alt er gemt!"))
                    {
                        Console.WriteLine("Øv hvor du kedelig!");
                    } 
                    else
                    {
                        gameModeHardcore();
                    }
                    break;
            }

        }

    }
}
