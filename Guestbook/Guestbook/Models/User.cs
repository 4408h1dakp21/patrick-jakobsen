using System;

public class User
{
    public string Username { get; set; }
    
    public string Email { get; set; }
    public string Password { get; set; }
    public int PermissionFlag { get; set; }  // 0 for normal user, 1 for admin

    public User(string username, string password, string email, int permissionFlag)
    {
        Username = username;
        Email = email;
        Password = password;
        PermissionFlag = permissionFlag;
    }

    public string ToCsvString()
    {
        return $"{Username},{Password},{Email},{PermissionFlag}";
    }

    public static User FromCsvString(string csvLine)
    {
        string[] parts = csvLine.Split(',');
        if (parts.Length == 4)
        {
            return new User(parts[0], parts[1], parts[2], int.Parse(parts[3]));
        }
        return null;
    }
}