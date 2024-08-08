using System;
using System.Text;
using ToolBox;

namespace Patrick_Menu.Programmer
{
    internal class Morsekoden
    {
        public static void runApp()
        {
            bool continueConversion = true;

            while (continueConversion)
            {
                // Velkomst besked
                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("\r\n\r\n                                  _                 _               \r\n/'\\_/`\\                          ( )               ( )              \r\n|     |   _    _ __   ___    __  | |/')    _      _| |   __    ___  \r\n| (_) | /'_`\\ ( '__)/',__) /'__`\\| , <   /'_`\\  /'_` | /'__`\\/' _ `\\\r\n| | | |( (_) )| |   \\__, \\(  ___/| |\\`\\ ( (_) )( (_| |(  ___/| ( ) |\r\n(_) (_)`\\___/'(_)   (____/`\\____)(_) (_)`\\___/'`\\__,_)`\\____)(_) (_)\r\n                                                                    \r\n                                                                    \r\n\r\n");

                var userInput = new UserInput<string>()
                    .Title("Omdan din tekst til Morsekoden:")
                    .TitleColor(ConsoleColor.Green)
                    .Prompt(
                        promptText: "Indtast din tekst her: ",
                        validationFunc: input => (true, input) // Always valid for strings
                    );

                string textInput = userInput.GetInput().ToLower();
                char[] textInputArray = textInput.ToCharArray();

                StringBuilder morse = new StringBuilder();

                foreach (char c in textInputArray)
                {
                    if (c == ' ')
                    {
                        morse.Append("   "); // Separate words by three spaces
                    }
                    else
                    {
                        switch (c)
                        {
                            case 'a': morse.Append(".- "); break;
                            case 'b': morse.Append("-... "); break;
                            case 'c': morse.Append("-.-. "); break;
                            case 'd': morse.Append("-.. "); break;
                            case 'e': morse.Append(". "); break;
                            case 'f': morse.Append("..-. "); break;
                            case 'g': morse.Append("--. "); break;
                            case 'h': morse.Append(".... "); break;
                            case 'i': morse.Append(".. "); break;
                            case 'j': morse.Append(".--- "); break;
                            case 'k': morse.Append("-.- "); break;
                            case 'l': morse.Append(".-.. "); break;
                            case 'm': morse.Append("-- "); break;
                            case 'n': morse.Append("-. "); break;
                            case 'o': morse.Append("--- "); break;
                            case 'p': morse.Append(".--. "); break;
                            case 'q': morse.Append("--.- "); break;
                            case 'r': morse.Append(".-. "); break;
                            case 's': morse.Append("... "); break;
                            case 't': morse.Append("- "); break;
                            case 'u': morse.Append("..- "); break;
                            case 'v': morse.Append("...- "); break;
                            case 'w': morse.Append(".-- "); break;
                            case 'x': morse.Append("-..- "); break;
                            case 'y': morse.Append("-.-- "); break;
                            case 'z': morse.Append("--.. "); break;
                            case 'æ': morse.Append(".-.- "); break;
                            case 'ø': morse.Append("---. "); break;
                            case 'å': morse.Append(".--.- "); break;
                            default:
                                morse.Append($"[unknown:{c}] "); // Handle unsupported characters
                                break;
                        }
                    }
                }

                Console.WriteLine($"Morse code: {morse.ToString().Trim()}");

                var confirmPrompt = new ConfirmPrompt()
                    .WarningMessage("Ville du fortage en ny omdanning?")
                    .PromptMessage("")
                    .WarningColor(ConsoleColor.White)
                    .defaultAccept("y")
                    .PromptColor(ConsoleColor.White);

                continueConversion = confirmPrompt.Ask();
            }
        }
    }
}