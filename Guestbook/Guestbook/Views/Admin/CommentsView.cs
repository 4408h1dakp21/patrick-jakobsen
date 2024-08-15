using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ToolBox;

namespace Guestbook.Views.Admin
{
    internal class CommentsView
    {
        private static List<Comment> comments = new List<Comment>();
        private static string commentsFilePath = "user_comments.csv";

        public static void run()
        {
            LoadComments();
            while (true)
            {
                Console.Clear();
                Console.WriteLine("Admin - Administrer Kommentarer:");

                var menu = new SelectionPrompt()
                    .Title("Hvad vil du gerne gøre?")
                    .TitleColor(ConsoleColor.Cyan)
                    .PageSize(10)
                    .MoreChoicesText("(Brug op- og ned-piletasterne for at navigere)")
                    .AddChoices(new[]
                    {
                        new Choice("Vis Alle Kommentarer"),
                        new Choice("Slet en Kommentar"),
                        new Choice("Afslut")
                    })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false);

                string selectedOption = menu.Prompt();

                switch (selectedOption)
                {
                    case "Vis Alle Kommentarer":
                        ViewAllComments();
                        break;
                    case "Slet en Kommentar":
                        DeleteComment();
                        break;
                    case "Afslut":
                        comments.Clear();
                        return;
                }
            }
        }

        private static void LoadComments()
        {
            if (!File.Exists(commentsFilePath))
                return;

            string[] lines = File.ReadAllLines(commentsFilePath);
            foreach (string line in lines)
            {
                Comment comment = Comment.FromCsvString(line);
                if (comment != null)
                {
                    comments.Add(comment);
                }
            }
        }

        private static void SaveCommentsToFile()
        {
            using StreamWriter sw = new StreamWriter(commentsFilePath);
            foreach (var comment in comments)
            {
                sw.WriteLine(comment.ToCsvString());
            }
        }

        private static void ViewAllComments()
        {
            Console.Clear();
            Console.WriteLine("Alle Kommentarer:");

            if (comments.Count == 0)
            {
                Console.WriteLine("Ingen kommentarer tilgængelige.");
            }
            else
            {
                foreach (var comment in comments)
                {
                    Console.WriteLine($"Bruger Email: {comment.UserEmail}");
                    Console.WriteLine($"Titel: {comment.Title}");
                    Console.WriteLine($"Beskrivelse: {comment.Description}");
                    Console.WriteLine("-------------------------------");
                }
            }
            Console.WriteLine("Tryk på en vilkårlig tast for at vende tilbage til menuen.");
            Console.ReadKey();
        }

        private static void DeleteComment()
        {
            Console.Clear();
            Console.WriteLine("Slet en Kommentar:");

            if (comments.Count == 0)
            {
                Console.WriteLine("Ingen kommentarer tilgængelige at slette.");
                Console.ReadKey();
                return;
            }

            // Konverter listen af kommentar titler til en liste af Choice objekter
            var commentChoices = comments.Select(c => new Choice($"{c.Title} (af {c.UserEmail})")).ToList();

            var selectionPrompt = new SelectionPrompt()
                .Title("Vælg en kommentar at slette:")
                .TitleColor(ConsoleColor.Cyan)
                .PageSize(10)
                .MoreChoicesText("(Brug op- og ned-piletasterne for at navigere)")
                .AddChoices(commentChoices)
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false);

            string selectedChoice = selectionPrompt.Prompt();
            var selectedComment = comments.FirstOrDefault(c => $"{c.Title} (af {c.UserEmail})" == selectedChoice);

            if (selectedComment == null)
            {
                Console.WriteLine("Kommentar ikke fundet.");
                Console.ReadKey();
                return;
            }

            var confirmPrompt = new ConfirmPrompt()
                .PromptMessage("Er du sikker på, at du vil slette denne kommentar?")
                .WarningMessage("Denne handling kan ikke fortrydes.")
                .WarningColor(ConsoleColor.Red)
                .defaultAccept("n")
                .PromptColor(ConsoleColor.Yellow);

            if (confirmPrompt.Ask())
            {
                comments.Remove(selectedComment);
                SaveCommentsToFile();
                Console.WriteLine("Kommentar slettet succesfuldt!");
            }
            else
            {
                Console.WriteLine("Sletning annulleret.");
            }
            Console.ReadKey();
        }
    }

    internal class Comment
    {
        public string UserEmail { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public Comment(string userEmail, string title, string description)
        {
            UserEmail = userEmail;
            Title = title;
            Description = description;
        }

        public string ToCsvString()
        {
            return $"{UserEmail};{Title};{Description}";
        }

        public static Comment FromCsvString(string csvLine)
        {
            string[] values = csvLine.Split(';');
            if (values.Length < 3) return null;

            return new Comment(values[0], values[1], values[2]);
        }
    }
}