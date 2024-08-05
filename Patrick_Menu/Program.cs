using Spectre.Console; 

namespace Patrick_Menu
{
    public class Program
    {
        static void Main(string[] args)
        {
            
            AnsiConsole.Write(
            new FigletText("Min Menu")
             .LeftJustified()
             .Color(Color.Green));

            // sprøg for hvilket program brugeren ville køre!
            var app = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title("Vælg et [green]Program [/] Du vil prøve")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Ryk op og ned for at se flere programmer)[/]")
                    .AddChoices(new[] {
                        "Celciusomregner", "Valutaomregner", "Rumfanget"
                    }));

            // Skriv til console hvad du har valgt!
            AnsiConsole.WriteLine($"Godt valg. {app}, programmet starter nu!");

            switch(app)
            {
                case "Celciusomregner":
                    Celciusomregner celciusomregner = new Celciusomregner();
                    celciusomregner.runApp();
                    break;

                case "Valutaomregner":
                    Valutaomregner valutaomregner = new Valutaomregner();
                    valutaomregner.runApp();
                    break;


                case "Rumfanget":
                    Rumfanget rumfanget = new Rumfanget();
                    rumfanget.runApp();
                    break;
            }
            Console.ReadLine();
        }
    }
}
