using Guestbook.Views.Menu;
using ToolBox;

namespace Guestbook.Views.Admin
{
    internal class AdminView
    {
        public static void run()
        {
            Console.Clear();
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("\r\n\r\n ___      ___ _______   ___       ___  __    ________  _____ ______   _____ ______   _______   ________      \r\n|\\  \\    /  /|\\  ___ \\ |\\  \\     |\\  \\|\\  \\ |\\   __  \\|\\   _ \\  _   \\|\\   _ \\  _   \\|\\  ___ \\ |\\   ___  \\    \r\n\\ \\  \\  /  / | \\   __/|\\ \\  \\    \\ \\  \\/  /|\\ \\  \\|\\  \\ \\  \\\\\\__\\ \\  \\ \\  \\\\\\__\\ \\  \\ \\   __/|\\ \\  \\\\ \\  \\   \r\n \\ \\  \\/  / / \\ \\  \\_|/_\\ \\  \\    \\ \\   ___  \\ \\  \\\\\\  \\ \\  \\\\|__| \\  \\ \\  \\\\|__| \\  \\ \\  \\_|/_\\ \\  \\\\ \\  \\  \r\n  \\ \\    / /   \\ \\  \\_|\\ \\ \\  \\____\\ \\  \\\\ \\  \\ \\  \\\\\\  \\ \\  \\    \\ \\  \\ \\  \\    \\ \\  \\ \\  \\_|\\ \\ \\  \\\\ \\  \\ \r\n   \\ \\__/ /     \\ \\_______\\ \\_______\\ \\__\\\\ \\__\\ \\_______\\ \\__\\    \\ \\__\\ \\__\\    \\ \\__\\ \\_______\\ \\__\\\\ \\__\\\r\n    \\|__|/       \\|_______|\\|_______|\\|__| \\|__|\\|_______|\\|__|     \\|__|\\|__|     \\|__|\\|_______|\\|__| \\|__|\r\n                                                                                                             \r\n                                                                                                             \r\n                                                                                                             \r\n\r\n");

            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine($"Velkommen til admin panelet, {Program.username}.");

            var AdminSelection = new SelectionPrompt()
                .Title("Vælg en handling:")
                .TitleColor(ConsoleColor.Green)
                .PageSize(10)
                .MoreChoicesText("(Brug op- og ned-piletasterne for at se flere valgmuligheder)")
                .AddChoices(new[]
                {
                    new Choice("Bruger kontrol"),
                    new Choice("Kommentar kontrol")
                })
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false) // Ryd ikke konsollen
                .Prompt();

            NavigationList.run(AdminSelection);
        }
    }
}