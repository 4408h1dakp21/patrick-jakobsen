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
            var authManger = new AuthManager();

            Console.WriteLine("Sign In");
      
            var emailInput = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast din email: ",
                    validationFunc: input => (true, input) // Always valid for strings
                );

            string email = emailInput.GetInput();


            var passwordInput = new UserInput<string>()
               .Title("")
               .TitleColor(ConsoleColor.Green)
               .Prompt(
                   promptText: "Indtast dit password: ",
                   validationFunc: input => (true, input) // Always valid for strings
               );

            string password = passwordInput.GetInput();


            User user = authManger.SignIn(email, password);
            if (user != null)
            {
                Console.WriteLine("Welcome, " + user.Username + "!");
            }

            Console.ReadKey();
        }
    }
}
