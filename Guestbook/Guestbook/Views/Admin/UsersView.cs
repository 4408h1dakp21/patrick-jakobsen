using System;
using System.Linq;
using System.Collections.Generic;
using ToolBox;

namespace Guestbook.Views.Admin
{
    internal class UsersView
    {
        private static AuthManager authManager = new AuthManager();

        public static void run()
        {
            while (true)
            {
                Console.Clear();

                // Brug af SelectionPrompt til menuen
                var menu = new SelectionPrompt()
                    .Title("Admin Brugeradministration:")
                    .TitleColor(ConsoleColor.Cyan)
                    .PageSize(10)
                    .MoreChoicesText("(Brug op- og ned-piletasterne for at navigere)")
                    .AddChoices(new[]
                    {
                        new Choice("Tilføj Admin"),
                        new Choice("Slet Bruger"),
                        new Choice("Ændr Brugeroplysninger"),
                        new Choice("Liste over Brugere"),
                        new Choice("Afslut")
                    })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false);

                string selectedOption = menu.Prompt();

                switch (selectedOption)
                {
                    case "Tilføj Admin":
                        AddAdmin();
                        break;
                    case "Slet Bruger":
                        DeleteUser();
                        break;
                    case "Ændr Brugeroplysninger":
                        ModifyUser();
                        break;
                    case "Liste over Brugere":
                        ListUsers();
                        break;
                    case "Afslut":
                        AdminView.run();
                        break;
                }
            }
        }

        private static void AddAdmin()
        {
            Console.Clear();
            Console.WriteLine("Tilføj Admin:");

            var emailInput = new UserInput<string>()
                .Title("Indtast email:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast admin email: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string email = emailInput.GetInput();

            var usernameInput = new UserInput<string>()
                .Title("Indtast brugernavn:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast admin brugernavn: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string username = usernameInput.GetInput();

            var passwordInput = new UserInput<string>()
                .Title("Indtast kodeord:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast admin kodeord: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string password = passwordInput.GetInput();

            authManager.SignUpAdmin(email, username, password);
            Console.WriteLine("Admin tilføjet succesfuldt!");
            Console.ReadKey();
        }

        private static void DeleteUser()
        {
            Console.Clear();
            Console.WriteLine("Slet Bruger:");

            var emailInput = new UserInput<string>()
                .Title("Indtast email på den bruger, der skal slettes:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast brugerens email: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string email = emailInput.GetInput();

            if (authManager.DeleteUser(email))
            {
                Console.WriteLine("Bruger slettet succesfuldt!");
            }
            else
            {
                Console.WriteLine("Bruger ikke fundet.");
            }
            Console.ReadKey();
        }

        private static void ModifyUser()
        {
            Console.Clear();
            Console.WriteLine("Ændr Brugeroplysninger:");

            var emailInput = new UserInput<string>()
                .Title("Indtast email på den bruger, der skal ændres:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast brugerens email: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string email = emailInput.GetInput();

            var user = authManager.GetUser(email);
            if (user == null)
            {
                Console.WriteLine("Bruger ikke fundet.");
                Console.ReadKey();
                return;
            }

            var newUsernameInput = new UserInput<string>()
                .Title($"Nuværende Brugernavn: {user.Username}")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast nyt brugernavn (eller tryk enter for at beholde det nuværende): ",
                    validationFunc: input => (true, input)
                );
            string newUsername = newUsernameInput.GetInput();
            user.Username = !string.IsNullOrEmpty(newUsername) ? newUsername : user.Username;

            var newPasswordInput = new UserInput<string>()
                .Title("Indtast nyt kodeord (eller tryk enter for at beholde det nuværende):")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast nyt kodeord: ",
                    validationFunc: input => (true, input)
                );
            string newPassword = newPasswordInput.GetInput();
            user.Password = !string.IsNullOrEmpty(newPassword) ? newPassword : user.Password;

            var newPermissionInput = new UserInput<int>()
                .Title($"Nuværende Tilladelse: {(user.PermissionFlag == 1 ? "Admin" : "Bruger")}")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast ny tilladelse (1 for Admin, 0 for Bruger): ",
                    validationFunc: input =>
                    {
                        bool isValid = int.TryParse(input, out var value) && (value == 0 || value == 1);
                        return (isValid, value);
                    }
                );
            user.PermissionFlag = newPermissionInput.GetInput();

            authManager.UpdateUser(user);
            Console.WriteLine("Brugeroplysninger opdateret succesfuldt!");
            Console.ReadKey();
        }

        private static void ListUsers()
        {
            Console.Clear();
            Console.WriteLine("Liste over Brugere:");
            var users = authManager.GetUsers();
            foreach (var user in users)
            {
                Console.WriteLine($"Brugernavn: {user.Username}, Email: {user.Email}, Tilladelse: {(user.PermissionFlag == 1 ? "Admin" : "Bruger")}");
            }
            Console.ReadKey();
        }
    }
}