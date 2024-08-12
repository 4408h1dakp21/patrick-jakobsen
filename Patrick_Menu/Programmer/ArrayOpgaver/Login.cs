using System;
using System.Linq;
using ToolBox;

namespace Patrick_Menu.Programmer.ArrayOpgaver
{
    internal class Login
    {
        public static void runApp()
        {
            Console.Clear();
            bool loginSuccess = false;
            int tries = 0;

            string[] username = { "Patrick", "Mads", "Mikkel", "Andreas", "Morten" };
            string[] password = { "1234", "4321", "5678", "8765", "9876" };

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("\r\n\r\n  _                 _       \r\n | |               (_)      \r\n | |     ___   __ _ _ _ __  \r\n | |    / _ \\ / _` | | '_ \\ \r\n | |___| (_) | (_| | | | | |\r\n |______\\___/ \\__, |_|_| |_|\r\n               __/ |        \r\n              |___/         \r\n\r\n");
            Console.ForegroundColor = ConsoleColor.White;

            while (tries < 3 && !loginSuccess)
            {
                var usernameInput = new UserInput<string>()
                    .Title("Indtast din brugernavn:")
                    .TitleColor(ConsoleColor.Green)
                    .Prompt(
                        promptText: "",
                        validationFunc: input => (true, input) // Always valid for strings
                    );

                string usernameValue = usernameInput.GetInput();

                var passwordInput = new UserInput<string>()
                    .Title("Indtast din adgangskode:")
                    .TitleColor(ConsoleColor.Green)
                    .Prompt(
                        promptText: "",
                        validationFunc: input => (true, input) // Always valid for strings
                    );

                string passwordValue = passwordInput.GetInput();

                loginSuccess = username.Contains(usernameValue) && password.Contains(passwordValue) &&
                    Array.IndexOf(username, usernameValue) == Array.IndexOf(password, passwordValue);

                if (!loginSuccess)
                {
                    tries++;
                    Console.Clear();
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("\r\n\r\n  ______   _ _ _ \r\n |  ____| (_) | |\r\n | |__ ___ _| | |\r\n |  __/ _ \\ | | |\r\n | | |  __/ | |_|\r\n |_|  \\___| |_(_)\r\n         _/ |    \r\n        |__/     \r\n\r\n");
                    Console.WriteLine("Du har indtastet forkert brugernavn eller adgangskode. Prøv igen.");


                    if (tries == 3)
                    {
                        Console.Clear();
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine("\r\n\r\n  ______   _ _ _ \r\n |  ____| (_) | |\r\n | |__ ___ _| | |\r\n |  __/ _ \\ | | |\r\n | | |  __/ | |_|\r\n |_|  \\___| |_(_)\r\n         _/ |    \r\n        |__/     \r\n\r\n");
                        Console.WriteLine("Du har indtastet forkert brugernavn eller adgangskode 3 gange. Programmet lukker nu.");
                    }
                }
            }

            if (loginSuccess)
            {
                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("\r\n\r\n____   ____     .__   __                                        \r\n\\   \\ /   /____ |  | |  | ______   _____   _____   ____   ____  \r\n \\   Y   // __ \\|  | |  |/ /  _ \\ /     \\ /     \\_/ __ \\ /    \\ \r\n  \\     /\\  ___/|  |_|    <  <_> )  Y Y  \\  Y Y  \\  ___/|   |  \\\r\n   \\___/  \\___  >____/__|_ \\____/|__|_|  /__|_|  /\\___  >___|  /\r\n              \\/          \\/           \\/      \\/     \\/     \\/ \r\n\r\n");
                Console.WriteLine("Du er nu logget ind.");
            }

            Console.ReadKey();
        }
    }
}
