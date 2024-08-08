using System.IO;
using System.Text;

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
                Console.OutputEncoding = Encoding.UTF8; // add support for æ/ø/å
                MenuView.showMenu();
            }
        }
    }
}
