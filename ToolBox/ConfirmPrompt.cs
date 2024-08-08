using System;
using System.Runtime.InteropServices;

namespace ToolBox
{
    public class ConfirmPrompt
    {
        private string _warningMessage;
        private string _promptMessage;
        private ConsoleColor _warningColor;
        private ConsoleColor _promptColor;
        private string _defaultAccept;

        public ConfirmPrompt()
        {
            _warningColor = ConsoleColor.Yellow; // Default warning color
            _promptColor = ConsoleColor.White;   // Default prompt color
            _defaultAccept = "n";                // Default accept value
        }

        public ConfirmPrompt WarningMessage(string warningMessage)
        {
            _warningMessage = warningMessage;
            return this;
        }

        public ConfirmPrompt PromptMessage(string promptMessage)
        {
            _promptMessage = promptMessage;
            return this;
        }

        public ConfirmPrompt WarningColor(ConsoleColor color)
        {
            _warningColor = color;
            return this;
        }

        public ConfirmPrompt PromptColor(ConsoleColor color)
        {
            _promptColor = color;
            return this;
        }

        public ConfirmPrompt defaultAccept(string defaultAccept)
        {
            _defaultAccept = defaultAccept;
            return this;
        }

        public bool Ask()
        {

            bool isConfirmed = false;
            Console.ForegroundColor = _warningColor;
            Console.WriteLine(_warningMessage);
            Console.ResetColor();

            Console.ForegroundColor = _promptColor;
            Console.Write(_promptMessage + $" y/N ({_defaultAccept}): ");
            Console.ResetColor();

           string input = Console.ReadLine()?.Trim().ToLower();

           var finalInput = String.IsNullOrEmpty(input) ? _defaultAccept : input;

            switch (finalInput)
                {
                case "y":
                    isConfirmed = true;
                    break;
                case "n":
                    isConfirmed = false;
                    break;
                default:
                    isConfirmed = true;
                    break;
            }

            return isConfirmed;
        }
    }
}