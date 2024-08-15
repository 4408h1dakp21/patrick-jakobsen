using Guestbook.Views.Auth;

namespace Guestbook.Views.Menu
{
    internal class NavigationList
    {
        public static void run(string Route)
        {

            switch (Route)
            {
                case "Log ind":
                    SignIn.run();
                    break;

                case "Opret bruger":
                    SignUp.run();
                    break;

                // Admin

                case "Bruger kontrol":
                    if (Program.isAuth && Program.isAdmin)
                    {
                        Admin.UsersView.run();
                    }
                    else
                    {
                        Console.WriteLine("Du skal være logget ind for at få adgang til denne side.");
                    }
                    break;

                case "Kommentar kontrol":
                    if (Program.isAuth && Program.isAdmin)
                    {
                        Admin.CommentsView.run();
                    }
                    else
                    {
                        Console.WriteLine("Du skal være logget ind for at få adgang til denne side.");
                    }
                    break;
            }

        }
    }
}