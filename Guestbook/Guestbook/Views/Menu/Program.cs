using ToolBox;
using System.Text;

namespace Guestbook.Views.Menu

{
    internal class Program
    {

        public static bool _exit = false;

        static void Main(string[] args)
        {

            while (!_exit)
            {

                Console.CursorVisible = false;
                Console.Clear();
                Console.OutputEncoding = Encoding.UTF8; // added support for æ/ø/å
                MenuView.showMenu();

            }



        }
    }
}
