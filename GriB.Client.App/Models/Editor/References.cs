using GriB.Common.Models.pos;

namespace GriB.Client.App.Models.Editor
{
    public class reference : model_base
    {
        public string name { get; set; }
    }

    public class company : reference
    {
        public string site  { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }

    public class salepoint : reference
    {
        public int    company_id { get; set; }
        public string city       { get; set; }
        public string address    { get; set; }
        public string schedule   { get; set; }
    }
}