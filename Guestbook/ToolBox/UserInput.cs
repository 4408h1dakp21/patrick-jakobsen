using System;

namespace ToolBox
{
    public class UserInput<T>
    {
        private string _title;
        private ConsoleColor _titleColor;
        private string _promptText;
        private Func<string, (bool isValid, T value)> _validationFunc;
        private T _defaultValue;
        private bool _isPassword;

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

        public UserInput<T> AsPassword()
        {
            _isPassword = true;
            return this;
        }

        public T GetInput()
        {
            while (true)
            {
                Console.ForegroundColor = _titleColor;
                Console.WriteLine(_title);
                Console.ResetColor();

                string input = ReadInput();

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

        private string ReadInput()
        {
            if (_isPassword)
            {
                return ReadPassword();
            }
            else
            {
                Console.Write(_promptText);
                return Console.ReadLine();
            }
        }

        private string ReadPassword()
        {
            Console.Write(_promptText);
            string input = string.Empty;
            while (true)
            {
                var keyInfo = Console.ReadKey(intercept: true);
                if (keyInfo.Key == ConsoleKey.Enter)
                {
                    Console.WriteLine();
                    break;
                }
                else if (keyInfo.Key == ConsoleKey.Backspace)
                {
                    if (input.Length > 0)
                    {
                        input = input.Substring(0, input.Length - 1);
                        Console.Write("\b \b"); // Remove last character from the console
                    }
                }
                else
                {
                    input += keyInfo.KeyChar;
                    Console.Write("*"); // Display asterisk instead of actual character
                }
            }
            return input;
        }
    }
}