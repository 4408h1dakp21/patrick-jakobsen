using Patrick_Menu.Programmer;
using Spectre.Console;

namespace Patrick_Menu.Menu
{
    public class Program
    {
        static void Main(string[] args)
        {
            AppList appList = new AppList();

            AnsiConsole.Write(
            new FigletText("Programmer")
             .LeftJustified()
             .Color(Color.Green));

            // sprøg for hvilket program brugeren ville køre!
            var app = AnsiConsole.Prompt(
                new SelectionPrompt<string>()
                    .Title("Vælg et [green]Program [/] Du vil prøve")
                    .PageSize(10)
                    .MoreChoicesText("[grey](Ryk op og ned for at se flere programmer)[/]")
                    .AddChoices(new[] {
                        "Celciusomregner", "Valutaomregner", "Rumfanget", "Terningkastet", "Pythagoras", "Alder", "Guess Number", "Exit"
                    }));


            appList.getAppList(app);

        }
    }
}
