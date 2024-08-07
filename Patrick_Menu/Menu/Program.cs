using Patrick_Menu.Menu.Components;
using System.IO;

namespace Patrick_Menu.Menu
{
    public class Program
    {
        public static bool _exit = false;
        static void Main(string[] args)
        {
            while (!_exit)
            {
                Console.Clear();
                MenuView.showMenu();
            }

   

        }
    }
}
