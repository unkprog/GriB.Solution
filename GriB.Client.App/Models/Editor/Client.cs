namespace GriB.Client.App.Models.Editor
{
    public class client : Common.Models.pos.settings.employee
    {
        public client() : base()
        {
        }

        public client(client cli) : base(cli)
        {
        }


        public string name { get => string.Concat(fname, !string.IsNullOrEmpty(fname) && !string.IsNullOrEmpty(mname) ? " " : string.Empty, mname, (!string.IsNullOrEmpty(fname) || !string.IsNullOrEmpty(mname)) && !string.IsNullOrEmpty(lname) ? " " : string.Empty, lname); }

    }
}