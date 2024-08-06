using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu.Programmer
{
    internal class Rumfanget
    {
        public void runApp()
        {
            // Variabler til a gemme værdigerne
            bool continueConversion = true;
            double height = 0;
            double width = 0;
            double length = 0;

            // Loop som håndtere flere valg
            while (continueConversion)
            {
                try
                {
                    Console.Clear(); // Clear console

                    // Bruger input for at få måle enhed
                    Console.WriteLine("Vælg en måle enhed (mm, cm, m, in, ft):");
                    string volumetricUnit = Console.ReadLine().ToLower();

                    // Bruger input for at få højde, bredde og længe
                    Console.WriteLine("Indtast Højde:");
                    height = double.Parse(Console.ReadLine());
                    Console.WriteLine("Indtast Bredde:");
                    width = double.Parse(Console.ReadLine());
                    Console.WriteLine("Indtast Længde:");
                    length = double.Parse(Console.ReadLine());

                    // Konvetere ud fra valgte måle enhed
                    double conversionUnit = volumetricUnit switch
                    {
                        "mm" => 1e-9,
                        "cm" => 1e-6,
                        "m" => 1,
                        "in" => 0.000016387064,
                        "ft" => 0.0283168466,
                        _ => throw new FormatException("Ugyldig måleenhed")
                    };

                    // Udregn Rumfanget cm
                    double volumeCubicMeters = height * width * length * conversionUnit;

                    // Bruger input for rumfanget måle enhed output
                    Console.WriteLine("Vælg en output måle enhed (l, m3, cm3, usgal, ft3, in3):");
                    string calculateVolume = Console.ReadLine().ToLower();

                    // Conversion factor for output
                    double outputVolume = calculateVolume switch
                    {
                        "l" => volumeCubicMeters * 1000,
                        "m3" => volumeCubicMeters,
                        "cm3" => volumeCubicMeters * 1e6,
                        "usgal" => volumeCubicMeters * 264.172052,
                        "ft3" => volumeCubicMeters * 35.3146667,
                        "in3" => volumeCubicMeters * 61023.7441,
                        _ => throw new FormatException("Ugyldig output måleenhed")
                    };

                    // Skriv resultat til console
                    Console.WriteLine($"Rumfanget: {outputVolume} {calculateVolume}");

                    // Tjek om brugeren ville lave en ny udregning
                    Console.WriteLine("Vil du foretage en ny udregning? (ja/nej)");
                    string response = Console.ReadLine().ToLower();

                    if (response != "ja")
                    {
                        continueConversion = false;
                    }
                }
                catch (FormatException ex)
                {
                    // Handle invalid input
                    Console.Clear();
                    Console.WriteLine(ex.Message);
                    Console.WriteLine("Dit input er ikke gyldigt! Indtast et gyldigt tal.");
                    Console.WriteLine("Tryk på en tast for at forsøge igen.");
                    Console.ReadKey();
                }
            }

            // Farewell message
            Console.WriteLine("Tak for at du brugte rumfang udregner. Farvel!");
        }
    }
}
