using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu.Programmer
{
    public class Celciusomregner
    {

        public void runApp()
        {
            bool continueConversion = true;

            while (continueConversion)
            {
                Console.Clear(); // clear console
                Console.WriteLine("Indtast en værdig i celsius");  // Skriv til console

                // Håndter brugerinput og tjekker om det er et gyldigt tal og laver udregningen
                try
                {
                    double celsius = double.Parse(Console.ReadLine());

                    // Omregning til Reamur
                    double reamur = celsius * 0.8;

                    // Omregning til Fahrenheit
                    double fahrenheit = celsius * 1.8 + 32;

                    // Skriv til console
                    Console.WriteLine($"Temperatur i Reamur: {reamur}");
                    Console.WriteLine($"Temperatur i Fahrenheit: {fahrenheit}");

                    Console.WriteLine("Vil du foretage en ny udregning? (ja/nej)");
                    string response = Console.ReadLine().ToLower();

                    if (response != "ja")
                    {
                        continueConversion = false;
                    }
                }
                catch (FormatException)
                {
                    // Fortæller brugeren om det er et ugyldigt input og starter programmet igen
                    Console.Clear();
                    Console.WriteLine("Dit input er ikke gyldigt! Indtast et gyldigt tal.");
                    Console.WriteLine("Tryk på en tast for at forsøge igen.");
                    Console.ReadKey();
                }
            }

            //Farvel besked!
            Console.WriteLine("Tak for at du brugte celsius omregner. Farvel!");
        }
    }
}
