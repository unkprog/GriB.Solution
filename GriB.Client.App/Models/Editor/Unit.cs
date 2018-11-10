using System;

namespace GriB.Client.App.Models.Editor
{
    public class unit : reference
    {
        public unit()
        {
            code = string.Empty;
            nameshort = string.Empty;
        }
        public string code { get; set; }
        public string nameshort { get; set; }
    }

    public class unit_rate
    {
        public unit unit { get; set; }
        public DateTime date { get; set; }
        public double value { get; set; }
    }
}