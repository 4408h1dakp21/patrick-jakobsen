# Basic Programming

A collection of small applications developed during various core modules - Basic Programming.

## Table of Contents

- [Introduction](#introduction)
- [Applications](#applications)
- [Installation](#installation)
- [ToolBox](#toolbox)

## Introduction

This project includes a series of small applications that I developed during my H1 course in basic programming. Each application has a specific purpose and illustrates different aspects of programming in C#.

## Applications

Description: These are all the current applications available in the menu!

### Application 1: Celsius Converter

**Description:** This program allows the user to input a temperature in Celsius and converts it to Reamur and Fahrenheit.

### Application 2: Currency Converter

**Description:** This program allows the user to input an amount in DKK, which is then converted to USD, GBP, EUR, and SEK.

**Note:** The values used in the application are as follows (as of 05/08/2024):
- USD = 6.80 (US Dollars)
- GBP = 8.71 (British Pounds)
- EUR = 7.46 (Euros)
- SEK = 0.64 (Swedish Krona)

### Application 3: Volume Calculator

**Description:** This program allows the user to input height, width, and length to calculate the volume.

### Application 4: Dice Roll

**Description:** This program uses C#'s `Random` class to simulate rolling a die, generating a random number between 1 and 6, and displaying the result in the console.

### Application 5: Pythagorean Theorem

**Description:** This program prompts the user to input two numbers, which are used to calculate the hypotenuse of a right triangle using the Pythagorean theorem: \(a^2 + b^2 = c^2\).

## Installation

Follow these steps to install and run the project:

1. Download or clone the repository:
   ```bash
   git clone https://github.com/4408h1dakp21/patrick-jakobsen.git
   ```
2. Open the project folder in Visual Studio 2022:
   ```bash
   cd patrick-jakobsen
   ```
3. Open the solution in Visual Studio:
   ```bash
   start Patrick_Menu.sln
   ```
4. Build the solution:
   - In Visual Studio, press `Ctrl+Shift+B` to build the entire solution.

5. Run the application:
   - In Visual Studio, press `F5` to run the application.

## ToolBox

This project includes a ToolBox.dll that contains all these components, making it easy to use them. Simply declare the ToolBox at the top with `using ToolBox;`. After declaring it, you can use the components as described in the documentation below.

## UserInput

Description: The UserInput component validates the input provided by the user. You need to declare the type of input. Here’s how to use the currently supported types:

#### Int:
```C#
var userInput = new UserInput<int>()
    .Title("Enter an integer value:")
    .TitleColor(ConsoleColor.Cyan)
    .Prompt(
        promptText: "Please enter an integer: ",
        validationFunc: input =>
        {
            bool isValid = int.TryParse(input, out var value);
            return (isValid, value);
        }
    );

int intValue = userInput.GetInput();
Console.WriteLine($"You entered the integer: {intValue}");
```

#### Double:
```C#
var userInput = new UserInput<double>()
    .Title("Enter a double value:")
    .TitleColor(ConsoleColor.Magenta)
    .Prompt(
        promptText: "Please enter a double: ",
        validationFunc: input =>
        {
            bool isValid = double.TryParse(input, out var value);
            return (isValid, value);
        }
    );

double doubleValue = userInput.GetInput();
Console.WriteLine($"You entered the double: {doubleValue}");
```

#### String:
```C#
var userInput = new UserInput<string>()
    .Title("Enter a string value:")
    .TitleColor(ConsoleColor.Green)
    .Prompt(
        promptText: "Please enter a string: ",
        validationFunc: input => (true, input) // Always valid for strings
    );

string stringValue = userInput.GetInput();
Console.WriteLine($"You entered the string: {stringValue}");
```

## SelectionPrompt

Description: The `SelectionPrompt` is a handy component that allows you to add choices, a title, and more, so you can customize it as you like!

```C#
var app = new SelectionPrompt()
    .Title("Select a Program to Try")
    .TitleColor(ConsoleColor.Blue)
    .PageSize(10)
    .MoreChoicesText("(Scroll up and down to see more programs)")
    .AddChoices(new[] {
        "Celsius Converter", "Currency Converter", "Volume Calculator", "Dice Roll", "Pythagorean Theorem", "Age Calculator", "Guess Number", "Exit"
    })
    .ChoiceColor(ConsoleColor.Green)
    .ClearConsole(false) // Do not clear the console
    .Prompt();
```

## ConfirmPrompt

Description: The `ConfirmPrompt` allows you to ask the user a yes/no question with a default accepted key, like `n` or `y`. This will enable users to simply press enter to accept the default key.

```C#
var confirmPrompt = new ConfirmPrompt()
    .WarningMessage("")
    .PromptMessage("Would you like to roll again?")
    .WarningColor(ConsoleColor.White)
    .defaultAccept("y")
    .PromptColor(ConsoleColor.White);

if (!confirmPrompt.Ask())
{
    throwAgain = true;
}
```

## Authors

- [@pallepadehat](https://github.com/Pallepadehat)
