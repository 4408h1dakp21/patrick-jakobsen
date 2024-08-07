using Patrick_Menu.Programmer;
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
                case "Exit":
                    Program._exit = true;
                    break;
            }
        }
    }
}
