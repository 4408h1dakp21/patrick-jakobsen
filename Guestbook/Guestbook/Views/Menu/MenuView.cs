using ToolBox;

namespace Guestbook.Views.Menu
{
    internal class MenuView
    {
        public static void showMenu()
        {
            // Welcome message
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine("\r\n\r\n ________  ___  ___  _______   ________  _________  ________  ________  ________  ___  __       \r\n|\\   ____\\|\\  \\|\\  \\|\\  ___ \\ |\\   ____\\|\\___   ___\\\\   __  \\|\\   __  \\|\\   __  \\|\\  \\|\\  \\     \r\n\\ \\  \\___|\\ \\  \\\\\\  \\ \\   __/|\\ \\  \\___|\\|___ \\  \\_\\ \\  \\|\\ /\\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\/  /|_   \r\n \\ \\  \\  __\\ \\  \\\\\\  \\ \\  \\_|/_\\ \\_____  \\   \\ \\  \\ \\ \\   __  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\   ___  \\  \r\n  \\ \\  \\|\\  \\ \\  \\\\\\  \\ \\  \\_|\\ \\|____|\\  \\   \\ \\  \\ \\ \\  \\|\\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\\\ \\  \\ \r\n   \\ \\_______\\ \\_______\\ \\_______\\____\\_\\  \\   \\ \\__\\ \\ \\_______\\ \\_______\\ \\_______\\ \\__\\\\ \\__\\\r\n    \\|_______|\\|_______|\\|_______|\\_________\\   \\|__|  \\|_______|\\|_______|\\|_______|\\|__| \\|__|\r\n                                 \\|_________|                                                   \r\n                                                                                                \r\n                                                                                                \r\n\r\n");

            // Selection prompt to ask the user if they want to sign in or sign up.

            // change color of terminal
            Console.ForegroundColor = ConsoleColor.White;

            var App = new SelectionPrompt()
                .Title("Vælg en login methode")
                .TitleColor(ConsoleColor.White)
                .PageSize(10)
                .MoreChoicesText("(Bevæg op og ned for at se flere tilstande)")
                  .AddChoices(new[]
                  {
                                new Choice("Sign In"),
                                new Choice("Sign Up"),
                  })
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false) // Do not clear the console
                .Prompt();

            NavigationList.run(App);


                


        }
    }
}
