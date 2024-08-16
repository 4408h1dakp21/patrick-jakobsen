using ToolBox;

namespace Guestbook.Views.Menu
{
    internal class MenuView
    {
        public static void showMenu()
        {
            // Velkomstbesked
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("\r\n\r\n ________  ___  ___  _______   ________  _________  ________  ________  ________  ___  __       \r\n|\\   ____\\|\\  \\|\\  \\|\\  ___ \\ |\\   ____\\|\\___   ___\\\\   __  \\|\\   __  \\|\\   __  \\|\\  \\|\\  \\     \r\n\\ \\  \\___|\\ \\  \\\\\\  \\ \\   __/|\\ \\  \\___|\\|___ \\  \\_\\ \\  \\|\\ /\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\/  /|_   \r\n \\ \\  \\  __\\ \\  \\\\\\  \\ \\  \\_|/_\\ \\_____  \\   \\ \\  \\ \\ \\   __  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\   ___  \\  \r\n  \\ \\  \\|\\  \\ \\  \\\\\\  \\ \\  \\_|\\ \\|____|\\  \\   \\ \\  \\ \\ \\  \\|\\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \r\n   \\ \\_______\\ \\_______\\ \\_______\\____\\_\\  \\   \\ \\__\\ \\ \\_______\\ \\_______\\ \\_______\\ \\__\\\\ \\__\\\r\n    \\|_______|\\|_______|\\|_______|\\_________\\   \\|__|  \\|_______|\\|_______|\\|_______|\\|__| \\|__|\r\n                                 \\|_________|                                                   \r\n                                                                                                \r\n                                                                                                \r\n\r\n");

            // Valg prompt for at spørge brugeren, om de vil logge ind eller oprette en bruger.

            // ændre farven på terminalen
            Console.ForegroundColor = ConsoleColor.White;

            var App = new SelectionPrompt()
                .Title("Vælg en login metode")
                .TitleColor(ConsoleColor.White)
                .PageSize(10)
                .MoreChoicesText("(Brug piletasterne for at se flere valg)")
                .AddChoices(new[]
                {
                    new Choice("Log ind"),
                    new Choice("Opret bruger"),
                    new Choice("test"),
                })
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false) // Ryd ikke konsollen
                .Prompt();

            NavigationList.run(App);
        }
    }
}