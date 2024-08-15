using Guestbook.Views.Admin;
using Guestbook.Views.Main;
using Guestbook.Views.Menu;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using ToolBox;

public class AuthManager
{
    private List<User> users = new List<User>();
    private string filePath = "users.csv";

    public AuthManager()
    {
        LoadUsers();
    }

    private void LoadUsers()
    {
        if (!File.Exists(filePath))
            return;

        string[] lines = File.ReadAllLines(filePath);
        foreach (string line in lines)
        {
            User user = User.FromCsvString(line);
            if (user != null)
            {
                users.Add(user);
            }
        }
    }

    private void SaveUser(User user)
    {
        using StreamWriter sw = File.AppendText(filePath);
        sw.WriteLine(user.ToCsvString());
    }

    private void SaveAllUsers()
    {
        using StreamWriter sw = new StreamWriter(filePath, false);
        foreach (var user in users)
        {
            sw.WriteLine(user.ToCsvString());
        }
    }

    public void SignUp(string email, string username, string password)
    {
        if (!IsValidEmail(email))
        {
            Console.WriteLine("Ugyldigt emailformat.");
            return;
        }

        if (!IsValidPassword(password))
        {
            Console.WriteLine("Adgangskode opfylder ikke kravene.");
            return;
        }

        if (users.Exists(u => u.Email == email))
        {
            Console.WriteLine("Emailen eksisterer allerede.");
            return;
        }

        User newUser = new User(username, password, email, 0); // Always sign up as a normal user (permissionFlag = 0)
        users.Add(newUser);
        SaveUser(newUser);

        Console.WriteLine("Bruger tilmeldt succesfuldt!");
    }

    public void SignUpAdmin(string email, string username, string password)
    {
        if (!IsValidEmail(email))
        {
            Console.WriteLine("Ugyldigt emailformat.");
            return;
        }

        if (!IsValidPassword(password))
        {
            Console.WriteLine("Adgangskode opfylder ikke kravene.");
            return;
        }

        if (users.Exists(u => u.Email == email))
        {
            Console.WriteLine("Emailen eksisterer allerede.");
            return;
        }

        User newUser = new User(username, password, email, 1); // Admin user (permissionFlag = 1)
        users.Add(newUser);
        SaveUser(newUser);

        Console.WriteLine("Administrator tilmeldt succesfuldt!");
    }

    public User SignIn(string email, string password)
    {
        User user = users.Find(u => u.Email == email);
        if (user == null)
        {
            Console.WriteLine("Ugyldig email.");
            return null;
        }

        // Allow up to 3 attempts to enter the correct password
        int attempts = 3;
        while (attempts > 0)
        {
            if (user.Password == password)
            {
                Program.username = user.Username;
                Program.password = user.Password;
                Program.email = user.Email;

                Program.isAuth = true;

                if (user.PermissionFlag == 1)
                {
                    Program.isAdmin = true;
                    AdminView.run();
                }
                else
                {
                    Program.isAdmin = false;
                    Program.isAuth = true;
                    MainView.run();
                }

                return user;
            }
            else
            {
                attempts--;
                if (attempts > 0)
                {
                    Console.WriteLine($"Forkert adgangskode. Du har {attempts} forsøg tilbage.");
                    var passwordInput = new UserInput<string>()
                        .Title("")
                        .TitleColor(ConsoleColor.Green)
                        .Prompt(
                            promptText: "Indtast dit kodeord: ",
                            validationFunc: input => (true, input) // Altid gyldig for strenge
                        )
                        .AsPassword();

                    password = passwordInput.GetInput();
                }
            }
        }

        Console.WriteLine("For mange mislykkede forsøg. Kontoen er låst.");
        return null;
    }

    public bool DeleteUser(string email)
    {
        var user = users.Find(u => u.Email == email);
        if (user == null) return false;

        users.Remove(user);
        SaveAllUsers();
        return true;
    }

    public User GetUser(string email)
    {
        return users.Find(u => u.Email == email);
    }

    public void UpdateUser(User updatedUser)
    {
        var userIndex = users.FindIndex(u => u.Email == updatedUser.Email);
        if (userIndex >= 0)
        {
            users[userIndex] = updatedUser;
            SaveAllUsers();
        }
    }

    public List<User> GetUsers()
    {
        return users;
    }

    // Validation methods
    private bool IsValidEmail(string email)
    {
        // Basic email validation regex
        var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase);
        return emailRegex.IsMatch(email);
    }

    private bool IsValidPassword(string password)
    {
        // Password must be at least 6 characters long
        return password.Length >= 6;
    }
}
