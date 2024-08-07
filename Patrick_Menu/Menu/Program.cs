using Patrick_Menu.Menu.Components;
using System.IO;

namespace Patrick_Menu.Menu
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.CursorVisible = false;
            AppList appList = new AppList();

            // Display some static text
            Console.WriteLine("Velkommen til programmenuen!");
            Console.WriteLine("Dette er nogle statiske oplysninger, der ikke skal fjernes.");
            Console.WriteLine();

            // Prompt for which program the user wants to run without clearing the static text
            var app = new SelectionPrompt()
                .Title("Vælg et Program Du vil prøve")
                .TitleColor(ConsoleColor.Blue)
                .PageSize(10)
                .MoreChoicesText("(Ryk op og ned for at se flere programmer)")
                .AddChoices(new[] {
                "Celciusomregner", "Valutaomregner", "Rumfanget", "Terningkastet", "Pythagoras", "Alder", "Guess Number", "Exit"
                })
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false) // Do not clear the console
                .Prompt();

            appList.getAppList(app);
        }
    }
}
