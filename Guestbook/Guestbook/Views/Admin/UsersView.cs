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

                // Using SelectionPrompt for menu
                var menu = new SelectionPrompt()
                    .Title("Admin User Management:")
                    .TitleColor(ConsoleColor.Cyan)
                    .PageSize(10)
                    .MoreChoicesText("(Use up and down arrow keys to navigate)")
                    .AddChoices(new[]
                    {
                        new Choice("Add Admin"),
                        new Choice("Delete User"),
                        new Choice("Modify User Information"),
                        new Choice("List Users"),
                        new Choice("Exit")
                    })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false);

                string selectedOption = menu.Prompt();

                switch (selectedOption)
                {
                    case "Add Admin":
                        AddAdmin();
                        break;
                    case "Delete User":
                        DeleteUser();
                        break;
                    case "Modify User Information":
                        ModifyUser();
                        break;
                    case "List Users":
                        ListUsers();
                        break;
                    case "Exit":
                        AdminView.run();
                        break;
                }
            }
        }

        private static void AddAdmin()
        {
            Console.Clear();
            Console.WriteLine("Add Admin:");

            var emailInput = new UserInput<string>()
                .Title("Enter email:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Please enter the admin email: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string email = emailInput.GetInput();

            var usernameInput = new UserInput<string>()
                .Title("Enter username:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Please enter the admin username: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string username = usernameInput.GetInput();

            var passwordInput = new UserInput<string>()
                .Title("Enter password:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Please enter the admin password: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string password = passwordInput.GetInput();

            authManager.SignUpAdmin(email, username, password);
            Console.WriteLine("Admin added successfully!");
            Console.ReadKey();
        }

        private static void DeleteUser()
        {
            Console.Clear();
            Console.WriteLine("Delete User:");

            var emailInput = new UserInput<string>()
                .Title("Enter the email of the user to delete:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Please enter the user's email: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string email = emailInput.GetInput();

            if (authManager.DeleteUser(email))
            {
                Console.WriteLine("User deleted successfully!");
            }
            else
            {
                Console.WriteLine("User not found.");
            }
            Console.ReadKey();
        }

        private static void ModifyUser()
        {
            Console.Clear();
            Console.WriteLine("Modify User Information:");

            var emailInput = new UserInput<string>()
                .Title("Enter the email of the user to modify:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Please enter the user's email: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string email = emailInput.GetInput();

            var user = authManager.GetUser(email);
            if (user == null)
            {
                Console.WriteLine("User not found.");
                Console.ReadKey();
                return;
            }

            var newUsernameInput = new UserInput<string>()
                .Title($"Current Username: {user.Username}")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Enter new username (or press enter to keep current): ",
                    validationFunc: input => (true, input)
                );
            string newUsername = newUsernameInput.GetInput();
            user.Username = !string.IsNullOrEmpty(newUsername) ? newUsername : user.Username;

            var newPasswordInput = new UserInput<string>()
                .Title("Enter new password (or press enter to keep current):")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Enter new password: ",
                    validationFunc: input => (true, input)
                );
            string newPassword = newPasswordInput.GetInput();
            user.Password = !string.IsNullOrEmpty(newPassword) ? newPassword : user.Password;

            var newPermissionInput = new UserInput<int>()
                .Title($"Current Permission: {(user.PermissionFlag == 1 ? "Admin" : "User")}")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Enter new permission (1 for Admin, 0 for User): ",
                    validationFunc: input =>
                    {
                        bool isValid = int.TryParse(input, out var value) && (value == 0 || value == 1);
                        return (isValid, value);
                    }
                );
            user.PermissionFlag = newPermissionInput.GetInput();

            authManager.UpdateUser(user);
            Console.WriteLine("User information updated successfully!");
            Console.ReadKey();
        }

        private static void ListUsers()
        {
            Console.Clear();
            Console.WriteLine("List of Users:");
            var users = authManager.GetUsers();
            foreach (var user in users)
            {
                Console.WriteLine($"Username: {user.Username}, Email: {user.Email}, Permission: {(user.PermissionFlag == 1 ? "Admin" : "User")}");
            }
            Console.ReadKey();
        }
    }
}