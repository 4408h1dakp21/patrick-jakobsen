using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu
{
    internal class Pythagoras
    {
        public void runApp()
        {
            double GetValidNumber(string prompt)
            {
                double number;
                while (true)
                {
                    Console.Write(prompt);
                    string input = Console.ReadLine();
                    if (double.TryParse(input, out number))
                    {
                        return number;
                    }
                    Console.WriteLine("Hmm, det ser ikke rigtigt ud. Prøv igen!");
                }
            }

            // Bed brugeren om at indtaste to tal
            Console.WriteLine("Hej! Lad os finde hypotenusen med Pythagoras' sætning.");
            double a = GetValidNumber("Indtast det første tal (a): ");
            double b = GetValidNumber("Indtast det andet tal (b): ");

            // Beregn hypotenusen
            double c = Math.Sqrt((a * a) + (b * b));

            // Udskriv resultatet
            Console.WriteLine($"\nHypotenusen (c) er: {c:F2}");

            // Find ud af hvilket tal der er størst
            if (a > b)
            {
                Console.WriteLine($"Det første tal (a = {a}) er størst.");
            }
            else if (b > a)
            {
                Console.WriteLine($"Det andet tal (b = {b}) er størst.");
            }
            else
            {
                Console.WriteLine("Begge tal (a og b) er lige store.");
            }
        }
    }
}
