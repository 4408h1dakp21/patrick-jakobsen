using ToolBox;

namespace Guestbook.Views.Auth
{
    internal static class SignUp
    {
        public static void run()
        {
            var authManger = new AuthManager();

            var email = new UserInput<string>()
             .Title("")
             .TitleColor(ConsoleColor.Green)
             .Prompt(
                 promptText: "Indtast din email: ",
                 validationFunc: input => (true, input) // Always valid for strings
             );

            string _email = email.GetInput();

            var username = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast dit ønskede username: ",
                    validationFunc: input => (true, input) // Always valid for strings
                );

            string _username = username.GetInput();


            var password = new UserInput<string>()
                .Title("")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast dit ønskede password:  ",
                    validationFunc: input => (true, input) // Always valid for strings
                );

            string _password = password.GetInput();



            authManger.SignUp(_email, _username, _password);

            Console.ReadKey();
        }
    }
}
