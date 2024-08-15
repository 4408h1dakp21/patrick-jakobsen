using Guestbook.Views.Auth;

namespace Guestbook.Views.Menu
{
    internal class NavigationList
    {
        public static void run(string Route)
        {

            switch (Route)
            {
                case "Sign In":
                    SignIn.run();
                    break;

                case "Sign Up":
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
                        Console.WriteLine("You need to be signed in to access this page.");
                    }
                    break;

                case "Vis kommentar":
                    if (Program.isAuth && Program.isAdmin)
                    {
                        Admin.CommentsView.run();
                    }
                    else
                    {
                        Console.WriteLine("You need to be signed in to access this page.");
                    }
                    break;
            }

        }
    }
}
