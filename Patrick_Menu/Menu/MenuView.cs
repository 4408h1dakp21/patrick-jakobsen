using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToolBox;

namespace Patrick_Menu.Menu
{
    internal class MenuView
    {
        public static void showMenu()
        {
            Console.CursorVisible = false;
            AppList appList = new AppList();

            // Velkomst besked!
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\r\n ______   ______     ______     ______     ______     ______     __    __     __    __     ______     ______    \r\n/\\  == \\ /\\  == \\   /\\  __ \\   /\\  ___\\   /\\  == \\   /\\  __ \\   /\\ \"-./  \\   /\\ \"-./  \\   /\\  ___\\   /\\  == \\   \r\n\\ \\  _-/ \\ \\  __<   \\ \\ \\/\\ \\  \\ \\ \\__ \\  \\ \\  __<   \\ \\  __ \\  \\ \\ \\-./\\ \\  \\ \\ \\-./\\ \\  \\ \\  __\\   \\ \\  __<   \r\n \\ \\_\\    \\ \\_\\ \\_\\  \\ \\_____\\  \\ \\_____\\  \\ \\_\\ \\_\\  \\ \\_\\ \\_\\  \\ \\_\\ \\ \\_\\  \\ \\_\\ \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\ \r\n  \\/_/     \\/_/ /_/   \\/_____/   \\/_____/   \\/_/ /_/   \\/_/\\/_/   \\/_/  \\/_/   \\/_/  \\/_/   \\/_____/   \\/_/ /_/ \r\n                                                                                                                \r\n");

            // Prompt for which program the user wants to run without clearing the static text
            var app = new SelectionPrompt()
                .Title("Vælg et Program Du vil prøve")
                .TitleColor(ConsoleColor.Blue)
                .PageSize(10)
                .MoreChoicesText("")
                .AddChoices(new[] {
                "Celciusomregner", "Valutaomregner", "Rumfanget", "Terningkastet", "Pythagoras", "Alder", "Guess Number", "Porto", "Morsekoden", "Exit"
                })
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false) // Do not clear the console
                .Prompt();

            appList.getAppList(app);
        }
    }
}
