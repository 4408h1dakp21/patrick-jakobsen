﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using ToolBox;

namespace Patrick_Menu.Programmer
{
    internal class Terningkastet
    {

        private static ConsoleColor _terningColor;
        public static void runApp()
        {

            Console.Clear();

            bool throwAgain = true;

            while (throwAgain)
            {
                Random random = new Random();
                int terningKast = random.Next(1, 7);

                List<ConsoleColor> colorList = new List<ConsoleColor>
                    {
                        ConsoleColor.White,
                        ConsoleColor.Magenta,
                        ConsoleColor.Cyan,
                        ConsoleColor.Red,
                        ConsoleColor.Blue,
                        ConsoleColor.Yellow
                    };

                _terningColor = colorList[terningKast - 1]; // Minus 1 skal være der fordi c# er zero based index, men vi bruger 1 - 6 som terningkast

                Console.ForegroundColor = _terningColor;
                Console.WriteLine($"Du slog en {terningKast}");

                var confirmPrompt = new ConfirmPrompt()
                    .WarningMessage("")
                    .PromptMessage("Ville du slå igen?")
                    .WarningColor(ConsoleColor.White)
                    .defaultAccept("y")
                    .PromptColor(ConsoleColor.White);
                

                if (!confirmPrompt.Ask())
                {
                    throwAgain = false;
                }
            }
        }
    }
}
