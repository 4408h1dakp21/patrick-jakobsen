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
                    Celciusomregner celciusomregner = new Celciusomregner();
                    celciusomregner.runApp();
                    break;

                case "Valutaomregner":
                    Valutaomregner valutaomregner = new Valutaomregner();
                    valutaomregner.runApp();
                    break;


                case "Rumfanget":
                    Rumfanget rumfanget = new Rumfanget();
                    rumfanget.runApp();
                    break;

                case "Terningkastet":
                    Terningkastet terningkastet = new Terningkastet();
                    terningkastet.runApp();
                    break;

                case "Pythagoras":
                    Pythagoras pythagoras = new Pythagoras();
                    pythagoras.runApp();
                    break;

                case "Alder":
                    Alder alder = new Alder();
                    alder.runApp();
                    break;

                case "Guess Number":
                    GuessNumber guessNumber = new GuessNumber();
                    guessNumber.runApp();
                    break;

                case "Exit":
                    System.Environment.Exit(1);
                    break;
            }
        }
    }
}
