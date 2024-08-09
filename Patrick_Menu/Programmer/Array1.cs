using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Patrick_Menu.Programmer
{
    internal class Array1
    {
        public static void runApp()
        {
            int[] array  = new int[9];

            // Indsæt tallene 1-9 ved hjælp af en løkke
            for (int i = 0; i < 9; i++)
            {
                array[i] = i + 1;
            }

            // Find tallet på index plads nr. 5 vha en løkke
            // Index 5 i arrayet svarer til den sjette plads
            int index = 5;
            int valueAtIndex = array[index];
            Console.WriteLine($"Tallet på index {index} er {valueAtIndex}");

            // Ændr dette element, så det indeholder den dobbelte værdi af det forrige element
            if (index > 0)
            {
                array[index] = array[index - 1] * 2;
            }

            // Udskriv det opdaterede array for at se ændringen
            Console.WriteLine("Opdateret array:");
            for (int i = 0; i < 9; i++)
            {
                Console.Write(array[i] + " ");
            }

            Console.ReadKey();
        }

    }
}
