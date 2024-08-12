using Patrick_Menu.Programmer;
using Patrick_Menu.Programmer.ArrayOpgaver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu.Menu
{
    internal class AppList
    {
        public void getAppList(string AppList) {
            switch (AppList)
            {
                case "Celciusomregner":
                    Celciusomregner.runApp();
                    break;
                case "Valutaomregner":
                    Valutaomregner.runApp();
                    break;
                case "Rumfanget":
                    Rumfanget.runApp();
                    break;
                case "Terningkastet":
                    Terningkastet.runApp();
                    break;

                case "Pythagoras":
                    Pythagoras.runApp();
                    break;
                case "Alder":
                    Alder.runApp();
                    break;
                case "Guess Number":
                    GuessNumber.runApp();
                    break;

                case "Porto":
                    Porto.runApp();
                    break;

                case "Morsekoden":
                    Morsekoden.runApp();
                    break;

                case "Array1":
                    Array1.runApp();
                    break;

                case "Login":
                    Login.runApp();
                    break;

                case "Name Search":
                    NameSearch.runApp();
                    break;

                case "StatistikProgram":
                    StatistikProgram.runApp();
                    break;

                case "Exit":
                    Console.CursorVisible = true; // shows the cursor again before exiting, so you can use the console after the program exits
                    Program._exit = true;
                    break;
            }
        }
    }
}
