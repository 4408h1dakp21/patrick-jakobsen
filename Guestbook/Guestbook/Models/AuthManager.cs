using System;
using System.Collections.Generic;
using System.IO;

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

    public void SignUp(string email, string username ,string password)
    {
        if (users.Exists(u => u.Email == email))
        {
            Console.WriteLine("Username already exists.");
            return;
        }

        User newUser = new User(username, password, email, 1); // Always sign up as a normal user (permissionFlag = 0)
        users.Add(newUser);
        SaveUser(newUser);
        Console.WriteLine("User signed up successfully!");
    }

    public User SignIn(string email, string password)
    {
        User user = users.Find(u => u.Email == email && u.Password == password);
        if (user == null)
        {
            Console.WriteLine("Invalid username or password.");
            return null;
        }

        Console.WriteLine($"Sign-in successful! Welcome, {user.Email}.");
        if (user.PermissionFlag == 1)
        {
            Console.WriteLine("You have admin privileges.");
        }
        else
        {
            Console.WriteLine("You have normal user privileges.");
        }

        return user;
    }
}