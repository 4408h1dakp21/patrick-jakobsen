using Guestbook.Views.Menu;
using System;
using System.Collections.Generic;
using System.IO;
using ToolBox;

namespace Guestbook.Views.Main
{
    internal class MainView
    {
        private static List<Comment> comments = new List<Comment>();
        private static string commentsFilePath = "user_comments.csv";

        public static void run()
        {
            LoadComments();
            while (true)
            {
                Console.Clear();
                Console.WriteLine($"Welcome to the Guestbook, {Program.username}!");

                var menu = new SelectionPrompt()
                    .Title("What would you like to do?")
                    .TitleColor(ConsoleColor.Cyan)
                    .PageSize(10)
                    .MoreChoicesText("(Use up and down arrow keys to navigate)")
                    .AddChoices(new[]
                    {
                        new Choice("Show all comments"),
                        new Choice("Add Comment"),
                        new Choice("View My Comments"),
                        new Choice("Edit My Comments"),
                        new Choice("Exit")
                    })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false);

                string selectedOption = menu.Prompt();

                switch (selectedOption)
                {
                    case "Show all comments":
                        ViewAllComments();
                        break;
                    case "Add Comment":
                        AddComment();
                        break;
                    case "View My Comments":
                        ViewMyComments();
                        break;
                    case "Edit My Comments":
                        EditMyComments();
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

        private static void SaveComment(Comment comment)
        {
            using StreamWriter sw = File.AppendText(commentsFilePath);
            sw.WriteLine(comment.ToCsvString());
        }

        private static void UpdateCommentsFile()
        {
            using StreamWriter sw = new StreamWriter(commentsFilePath);
            foreach (var comment in comments)
            {
                sw.WriteLine(comment.ToCsvString());
            }
        }

        private static void AddComment()
        {
            Console.Clear();
            Console.WriteLine("Add Comment:");

            var titleInput = new UserInput<string>()
                .Title("Enter title:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Please enter the comment title: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string title = titleInput.GetInput();

            var descriptionInput = new UserInput<string>()
                .Title("Enter description:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Please enter the comment description: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string description = descriptionInput.GetInput();

            Comment newComment = new Comment(Program.email, title, description);
            comments.Add(newComment);
            SaveComment(newComment);

            Console.WriteLine("Comment added successfully!");
            Console.ReadKey();
        }

        private static void ViewAllComments()
        {
            Console.Clear();
            Console.WriteLine("Comments:");

            var allComments = comments;
            if (allComments.Count == 0)
            {
                Console.WriteLine("There is no comments.");
            }
            else
            {
                foreach (var comment in allComments)
                {
                    Console.WriteLine("-------------------------------");
                    Console.WriteLine($"Title: {comment.Title}");
                    Console.WriteLine($"Description: {comment.Description}");
                    Console.WriteLine("-------------------------------");
                }
            }
            Console.ReadKey();
        }

        private static void ViewMyComments()
        {
            Console.Clear();
            Console.WriteLine("My Comments:");

            var myComments = comments.FindAll(c => c.UserEmail == Program.email);
            if (myComments.Count == 0)
            {
                Console.WriteLine("You have no comments.");
            }
            else
            {
                foreach (var comment in myComments)
                {
                    Console.WriteLine("-------------------------------");
                    Console.WriteLine($"Title: {comment.Title}");
                    Console.WriteLine($"Description: {comment.Description}");
                    Console.WriteLine("-------------------------------");
                }
            }
            Console.ReadKey();
        }

        private static void EditMyComments()
        {
            Console.Clear();
            Console.WriteLine("Edit My Comments:");

            var myComments = comments.FindAll(c => c.UserEmail == Program.email);
            if (myComments.Count == 0)
            {
                Console.WriteLine("You have no comments.");
                Console.ReadKey();
                return;
            }

            // Convert the list of comment titles into a list of Choice objects
            var commentChoices = myComments.Select(c => new Choice(c.Title)).ToList();

            var selectionPrompt = new SelectionPrompt()
                .Title("Select a comment to edit:")
                .TitleColor(ConsoleColor.Cyan)
                .PageSize(10)
                .MoreChoicesText("(Use up and down arrow keys to navigate)")
                .AddChoices(commentChoices) // Pass the list of Choice objects here
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false);

            string selectedTitle = selectionPrompt.Prompt();
            var selectedComment = myComments.FirstOrDefault(c => c.Title == selectedTitle);

            if (selectedComment == null)
            {
                Console.WriteLine("Comment not found.");
                Console.ReadKey();
                return;
            }

            var newTitleInput = new UserInput<string>()
                .Title($"Current Title: {selectedComment.Title}")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Enter new title (or press enter to keep current): ",
                    validationFunc: input => (true, input)
                );
            string newTitle = newTitleInput.GetInput();
            selectedComment.Title = !string.IsNullOrEmpty(newTitle) ? newTitle : selectedComment.Title;

            var newDescriptionInput = new UserInput<string>()
                .Title("Enter new description (or press enter to keep current):")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Enter new description: ",
                    validationFunc: input => (true, input)
                );
            string newDescription = newDescriptionInput.GetInput();
            selectedComment.Description = !string.IsNullOrEmpty(newDescription) ? newDescription : selectedComment.Description;

            UpdateCommentsFile();
            Console.WriteLine("Comment updated successfully!");
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