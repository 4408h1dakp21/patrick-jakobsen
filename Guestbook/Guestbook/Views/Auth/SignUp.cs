using ToolBox;

namespace Guestbook.Views.Auth
{
    internal static class SignUp
    {
        public static void run()
        {
            var authManager = new AuthManager();

            var email = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast din email: ",
                    validationFunc: input => (true, input) // Altid gyldig for strenge
                );

            string _email = email.GetInput();

            var username = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast dit ønskede brugernavn: ",
                    validationFunc: input => (true, input) // Altid gyldig for strenge
                );

            string _username = username.GetInput();

            var password = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast dit ønskede kodeord: ",
                    validationFunc: input => (true, input) // Altid gyldig for strenge
                );

            string _password = password.GetInput();

            authManager.SignUp(_email, _username, _password);

            Console.ReadKey();
        }
    }
}