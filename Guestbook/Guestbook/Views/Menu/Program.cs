using Guestbook.Views.Admin;
using System.Text;

namespace Guestbook.Views.Menu

{
    internal class Program
    {
        public static bool _exit = false;
        public static string username = "";
        public static string password = "";
        public static string email = "";
        public static bool isAuth = false;
        public static bool isAdmin = false;

        static void Main(string[] args)
        {
            while (!_exit)
            {

                Console.CursorVisible = false;
                Console.Clear();
                Console.OutputEncoding = Encoding.UTF8; // added support for æ/ø/å

                if (isAuth)
                {
                    if (isAdmin)
                    {
                        AdminView.run();
                    }
                    else
                    {
                        MenuView.showMenu();
                    }
                } else {
                    MenuView.showMenu();
                }
               
                    

            }
        }
    }
}
