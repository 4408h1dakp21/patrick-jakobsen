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
                Console.WriteLine("Admin - Manage Comments:");

                var menu = new SelectionPrompt()
                    .Title("What would you like to do?")
                    .TitleColor(ConsoleColor.Cyan)
                    .PageSize(10)
                    .MoreChoicesText("(Use up and down arrow keys to navigate)")
                    .AddChoices(new[]
                    {
                        new Choice("View All Comments"),
                        new Choice("Delete a Comment"),
                        new Choice("Exit")
                    })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false);

                string selectedOption = menu.Prompt();

                switch (selectedOption)
                {
                    case "View All Comments":
                        ViewAllComments();
                        break;
                    case "Delete a Comment":
                        DeleteComment();
                        break;
                    case "Exit":
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
            Console.WriteLine("All Comments:");

            if (comments.Count == 0)
            {
                Console.WriteLine("No comments available.");
            }
            else
            {
                foreach (var comment in comments)
                {
                    Console.WriteLine($"User Email: {comment.UserEmail}");
                    Console.WriteLine($"Title: {comment.Title}");
                    Console.WriteLine($"Description: {comment.Description}");
                    Console.WriteLine("-------------------------------");
                }
            }
            Console.WriteLine("Press any key to return to the menu.");
            Console.ReadKey();
        }

        private static void DeleteComment()
        {
            Console.Clear();
            Console.WriteLine("Delete a Comment:");

            if (comments.Count == 0)
            {
                Console.WriteLine("No comments available to delete.");
                Console.ReadKey();
                return;
            }

            // Convert the list of comment titles into a list of Choice objects
            var commentChoices = comments.Select(c => new Choice($"{c.Title} (by {c.UserEmail})")).ToList();

            var selectionPrompt = new SelectionPrompt()
                .Title("Select a comment to delete:")
                .TitleColor(ConsoleColor.Cyan)
                .PageSize(10)
                .MoreChoicesText("(Use up and down arrow keys to navigate)")
                .AddChoices(commentChoices)
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false);

            string selectedChoice = selectionPrompt.Prompt();
            var selectedComment = comments.FirstOrDefault(c => $"{c.Title} (by {c.UserEmail})" == selectedChoice);

            if (selectedComment == null)
            {
                Console.WriteLine("Comment not found.");
                Console.ReadKey();
                return;
            }

            var confirmPrompt = new ConfirmPrompt()
                .PromptMessage("Are you sure you want to delete this comment?")
                .WarningMessage("This action cannot be undone.")
                .WarningColor(ConsoleColor.Red)
                .defaultAccept("n")
                .PromptColor(ConsoleColor.Yellow);

            if (confirmPrompt.Ask())
            {
                comments.Remove(selectedComment);
                SaveCommentsToFile();
                Console.WriteLine("Comment deleted successfully!");
            }
            else
            {
                Console.WriteLine("Deletion cancelled.");
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
            return $"{UserEmail},{Title},{Description}";
        }

        public static Comment FromCsvString(string csvLine)
        {
            string[] values = csvLine.Split(',');
            if (values.Length < 3) return null;

            return new Comment(values[0], values[1], values[2]);
        }
    }
}