using System;

namespace Patrick_Menu.Menu.Components
{
    internal class ConfirmPrompt
    {
        private string _warningMessage;
        private string _promptMessage;
        private ConsoleColor _warningColor;
        private ConsoleColor _promptColor;

        public ConfirmPrompt()
        {
            _warningColor = ConsoleColor.Yellow; // Default warning color
            _promptColor = ConsoleColor.White;   // Default prompt color
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

        public bool Ask()
        {
            Console.ForegroundColor = _warningColor;
            Console.WriteLine(_warningMessage);
            Console.ResetColor();

            Console.ForegroundColor = _promptColor;
            Console.Write(_promptMessage + " y/N (N): ");
            Console.ResetColor();

            string input = Console.ReadLine()?.Trim().ToLower();

            return input == "y";
        }
    }
}