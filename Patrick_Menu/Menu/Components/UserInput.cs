using System;

namespace Patrick_Menu.Menu.Components
{
    internal class UserInput<T>
    {
        private string _title;
        private ConsoleColor _titleColor;
        private string _promptText;
        private Func<string, (bool isValid, T value)> _validationFunc;
        private T _defaultValue;

        public UserInput()
        {
            _titleColor = ConsoleColor.White; // default title color
        }

        public UserInput<T> Title(string title)
        {
            _title = title;
            return this;
        }

        public UserInput<T> TitleColor(ConsoleColor color)
        {
            _titleColor = color;
            return this;
        }

        public UserInput<T> Prompt(string promptText, Func<string, (bool isValid, T value)> validationFunc, T defaultValue = default)
        {
            _promptText = promptText;
            _validationFunc = validationFunc;
            _defaultValue = defaultValue;
            return this;
        }

        public T GetInput()
        {
            while (true)
            {
                Console.ForegroundColor = _titleColor;
                Console.WriteLine(_title);
                Console.ResetColor();

                Console.Write(_promptText);
                string input = Console.ReadLine();

                if (string.IsNullOrWhiteSpace(input) && !Equals(_defaultValue, default(T)))
                {
                    input = _defaultValue.ToString();
                }

                var (isValid, value) = _validationFunc(input);
                if (isValid)
                {
                    return value;
                }

                Console.WriteLine("Invalid input. Please try again.");
            }
        }
    }
}