using System;
using System.Collections.Generic;

namespace Patrick_Menu.Menu.Components
{
    internal class SelectionPrompt
    {
        private string _title;
        private ConsoleColor _titleColor;
        private List<string> _choices;
        private ConsoleColor _choiceColor;
        private int _pageSize;
        private string _moreChoicesText;
        private bool _clearConsole;

        public SelectionPrompt()
        {
            _choices = new List<string>();
            _pageSize = 10; // default page size
            _moreChoicesText = "(Ryk op og ned for at se flere programmer)";
            _titleColor = ConsoleColor.White; // default title color
            _choiceColor = ConsoleColor.White; // default choice color
            _clearConsole = true; // default behavior is to clear the console
        }

        public SelectionPrompt Title(string title)
        {
            _title = title;
            return this;
        }

        public SelectionPrompt TitleColor(ConsoleColor color)
        {
            _titleColor = color;
            return this;
        }

        public SelectionPrompt PageSize(int pageSize)
        {
            _pageSize = pageSize;
            return this;
        }

        public SelectionPrompt MoreChoicesText(string moreChoicesText)
        {
            _moreChoicesText = moreChoicesText;
            return this;
        }

        public SelectionPrompt AddChoices(IEnumerable<string> choices)
        {
            _choices.AddRange(choices);
            return this;
        }

        public SelectionPrompt ChoiceColor(ConsoleColor color)
        {
            _choiceColor = color;
            return this;
        }

        public SelectionPrompt ClearConsole(bool clear)
        {
            _clearConsole = clear;
            return this;
        }

        public string Prompt()
        {
            int selectedIndex = 0;
            int startLine = Console.CursorTop;

            while (true)
            {
                if (_clearConsole)
                {
                    Console.Clear();
                }
                else
                {
                    // Clear only the menu area
                    Console.SetCursorPosition(0, startLine);
                    Console.Write(new string(' ', Console.WindowWidth)); // Clear the current line
                }

                if (!string.IsNullOrEmpty(_title))
                {
                    Console.ForegroundColor = _titleColor;
                    Console.WriteLine(_title);
                    Console.ResetColor();
                }

                for (int i = 0; i < _choices.Count; i++)
                {
                    if (i == selectedIndex)
                    {
                        Console.ForegroundColor = ConsoleColor.Green; // Highlight selected choice
                        Console.WriteLine($"> {_choices[i]}");
                        Console.ResetColor();
                    }
                    else
                    {
                        Console.ForegroundColor = _choiceColor;
                        Console.WriteLine($"  {_choices[i]}");
                        Console.ResetColor();
                    }
                }

                Console.WriteLine(_moreChoicesText);

                var key = Console.ReadKey(true).Key;

                if (key == ConsoleKey.UpArrow)
                {
                    selectedIndex = (selectedIndex == 0) ? _choices.Count - 1 : selectedIndex - 1;
                }
                else if (key == ConsoleKey.DownArrow)
                {
                    selectedIndex = (selectedIndex == _choices.Count - 1) ? 0 : selectedIndex + 1;
                }
                else if (key == ConsoleKey.Enter)
                {
                    return _choices[selectedIndex];
                }
            }
        }
    }
}