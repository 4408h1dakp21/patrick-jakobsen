﻿using System;
using System.Collections.Generic;

namespace ToolBox
{
    // Represents a menu item, which can optionally contain sub-choices
    public class Choice
    {
        public string Name { get; set; }
        public List<Choice> SubChoices { get; set; }
        public bool IsSubChoice { get; set; } // Property to indicate sub-choices

        public Choice(string name, bool isSubChoice = false)
        {
            Name = name;
            SubChoices = new List<Choice>();
            IsSubChoice = isSubChoice;
        }

        public bool HasSubChoices => SubChoices.Count > 0;
    }

    public class SelectionPrompt
    {
        private string _title;
        private ConsoleColor _titleColor;
        private List<Choice> _choices;
        private ConsoleColor _choiceColor;
        private ConsoleColor _subChoiceColor; // Color for sub-choices
        private int _pageSize;
        private string _moreChoicesText;
        private bool _clearConsole;
        private Stack<List<Choice>> _menuStack; // Stack to track previous menus

        public SelectionPrompt()
        {
            _choices = new List<Choice>();
            _pageSize = 10; // default page size
            _moreChoicesText = "(Use Up/Down to navigate, Enter to select, Backspace to go back)";
            _titleColor = ConsoleColor.White; // default title color
            _choiceColor = ConsoleColor.White; // default choice color
            _subChoiceColor = ConsoleColor.Cyan; // default color for sub-choices
            _clearConsole = true; // default behavior is to clear the console
            _menuStack = new Stack<List<Choice>>(); // Initialize the stack
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

        public SelectionPrompt AddChoices(IEnumerable<Choice> choices)
        {
            _choices.AddRange(choices);
            return this;
        }

        public SelectionPrompt ChoiceColor(ConsoleColor color)
        {
            _choiceColor = color;
            return this;
        }

        public SelectionPrompt SubChoiceColor(ConsoleColor color)
        {
            _subChoiceColor = color;
            return this;
        }

        public SelectionPrompt ClearConsole(bool clear)
        {
            _clearConsole = clear;
            return this;
        }

        public string Prompt()
        {
            // Initialize the stack with the main choices
            _menuStack.Clear();
            _menuStack.Push(_choices);
            return DisplayChoices();
        }

        private string DisplayChoices()
        {
            var choices = _menuStack.Peek();
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

                for (int i = 0; i < choices.Count; i++)
                {
                    if (i == selectedIndex)
                    {
                        Console.ForegroundColor = ConsoleColor.Green; // Highlight selected choice
                        Console.WriteLine($"> {choices[i].Name}");
                        Console.ResetColor();
                    }
                    else
                    {
                        // Apply different colors for sub-choices
                        Console.ForegroundColor = choices[i].IsSubChoice ? _subChoiceColor : _choiceColor;
                        Console.WriteLine($"  {choices[i].Name}");
                        Console.ResetColor();
                    }
                }

                Console.WriteLine(_moreChoicesText);

                var key = Console.ReadKey(true).Key;

                if (key == ConsoleKey.UpArrow)
                {
                    selectedIndex = (selectedIndex == 0) ? choices.Count - 1 : selectedIndex - 1;
                }
                else if (key == ConsoleKey.DownArrow)
                {
                    selectedIndex = (selectedIndex == choices.Count - 1) ? 0 : selectedIndex + 1;
                }
                else if (key == ConsoleKey.Enter)
                {
                    if (choices[selectedIndex].HasSubChoices)
                    {
                        // Push current menu to stack and display sub-choices
                        _menuStack.Push(choices[selectedIndex].SubChoices);
                        // Clear console for sub-choices display
                        Console.Clear();
                        var selectedSubChoice = DisplayChoices();
                        if (selectedSubChoice != null)
                        {
                            // Return selected choice if not null
                            return selectedSubChoice;
                        }
                    }
                    else
                    {
                        // Return the name of the selected choice
                        return choices[selectedIndex].Name;
                    }
                }
            }
        }
    }
}
