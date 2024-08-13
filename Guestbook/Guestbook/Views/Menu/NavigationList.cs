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
            }

        }
    }
}
