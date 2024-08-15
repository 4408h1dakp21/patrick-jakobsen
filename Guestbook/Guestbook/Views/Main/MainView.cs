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
                Console.WriteLine($"Velkommen til gæstebogen, {Program.username}!");

                var menu = new SelectionPrompt()
                    .Title("Hvad vil du gerne gøre?")
                    .TitleColor(ConsoleColor.Cyan)
                    .PageSize(10)
                    .MoreChoicesText("(Brug op- og nedpiletasterne til at navigere)")
                    .AddChoices(new[]
                    {
                        new Choice("Vis alle kommentarer"),
                        new Choice("Tilføj kommentar"),
                        new Choice("Se mine kommentarer"),
                        new Choice("Rediger mine kommentarer"),
                        new Choice("Afslut")
                    })
                    .ChoiceColor(ConsoleColor.Green)
                    .ClearConsole(false);

                string selectedOption = menu.Prompt();

                switch (selectedOption)
                {
                    case "Vis alle kommentarer":
                        ViewAllComments();
                        break;
                    case "Tilføj kommentar":
                        AddComment();
                        break;
                    case "Se mine kommentarer":
                        ViewMyComments();
                        break;
                    case "Rediger mine kommentarer":
                        EditMyComments();
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
            Console.WriteLine("Tilføj kommentar:");

            var titleInput = new UserInput<string>()
                .Title("Indtast titel:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast kommentarens titel: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string title = titleInput.GetInput();

            var descriptionInput = new UserInput<string>()
                .Title("Indtast beskrivelse:")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast kommentarens beskrivelse: ",
                    validationFunc: input => (!string.IsNullOrEmpty(input), input)
                );
            string description = descriptionInput.GetInput();

            Comment newComment = new Comment(Program.email, title, description);
            comments.Add(newComment);
            SaveComment(newComment);

            Console.WriteLine("Kommentar tilføjet succesfuldt!");
            Console.ReadKey();
        }

        private static void ViewAllComments()
        {
            Console.Clear();
            Console.WriteLine("Kommentarer:");

            var allComments = comments;
            if (allComments.Count == 0)
            {
                Console.WriteLine("Der er ingen kommentarer.");
            }
            else
            {
                foreach (var comment in allComments)
                {
                    Console.WriteLine("-------------------------------");
                    Console.WriteLine($"Titel: {comment.Title}");
                    Console.WriteLine($"Beskrivelse: {comment.Description}");
                    Console.WriteLine("-------------------------------");
                }
            }
            Console.ReadKey();
        }

        private static void ViewMyComments()
        {
            Console.Clear();
            Console.WriteLine("Mine kommentarer:");

            var myComments = comments.FindAll(c => c.UserEmail == Program.email);
            if (myComments.Count == 0)
            {
                Console.WriteLine("Du har ingen kommentarer.");
            }
            else
            {
                foreach (var comment in myComments)
                {
                    Console.WriteLine("-------------------------------");
                    Console.WriteLine($"Titel: {comment.Title}");
                    Console.WriteLine($"Beskrivelse: {comment.Description}");
                    Console.WriteLine("-------------------------------");
                }
            }
            Console.ReadKey();
        }

        private static void EditMyComments()
        {
            Console.Clear();
            Console.WriteLine("Rediger mine kommentarer:");

            var myComments = comments.FindAll(c => c.UserEmail == Program.email);
            if (myComments.Count == 0)
            {
                Console.WriteLine("Du har ingen kommentarer.");
                Console.ReadKey();
                return;
            }

            // Konverter listen af kommentar titler til en liste af Choice objekter
            var commentChoices = myComments.Select(c => new Choice(c.Title)).ToList();

            var selectionPrompt = new SelectionPrompt()
                .Title("Vælg en kommentar at redigere:")
                .TitleColor(ConsoleColor.Cyan)
                .PageSize(10)
                .MoreChoicesText("(Brug op- og nedpiletasterne til at navigere)")
                .AddChoices(commentChoices) // Send listen af Choice objekter her
                .ChoiceColor(ConsoleColor.Green)
                .ClearConsole(false);

            string selectedTitle = selectionPrompt.Prompt();
            var selectedComment = myComments.FirstOrDefault(c => c.Title == selectedTitle);

            if (selectedComment == null)
            {
                Console.WriteLine("Kommentar ikke fundet.");
                Console.ReadKey();
                return;
            }

            var newTitleInput = new UserInput<string>()
                .Title($"Nuværende titel: {selectedComment.Title}")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast ny titel (eller tryk enter for at beholde den nuværende): ",
                    validationFunc: input => (true, input)
                );
            string newTitle = newTitleInput.GetInput();
            selectedComment.Title = !string.IsNullOrEmpty(newTitle) ? newTitle : selectedComment.Title;

            var newDescriptionInput = new UserInput<string>()
                .Title("Indtast ny beskrivelse (eller tryk enter for at beholde den nuværende):")
                .TitleColor(ConsoleColor.Green)
                .Prompt(
                    promptText: "Indtast ny beskrivelse: ",
                    validationFunc: input => (true, input)
                );
            string newDescription = newDescriptionInput.GetInput();
            selectedComment.Description = !string.IsNullOrEmpty(newDescription) ? newDescription : selectedComment.Description;

            UpdateCommentsFile();
            Console.WriteLine("Kommentar opdateret succesfuldt!");
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