using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToolBox;

namespace Guestbook.Views.Auth
{
    internal static class SignIn
    {
        public static void run()
        {
            var authManager = new AuthManager();

            Console.WriteLine("Log ind");

            var emailInput = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast din email: ",
                    validationFunc: input => (true, input) // Altid gyldig for strenge
                );

            string email = emailInput.GetInput();

            var passwordInput = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast dit kodeord: ",
                    validationFunc: input => (true, input) // Altid gyldig for strenge
                )
                .AsPassword();

            string password = passwordInput.GetInput();

            User user = authManager.SignIn(email, password);

            Console.ReadKey();
        }
    }
}