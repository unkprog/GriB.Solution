using GriB.Common.Models.pos;

namespace GriB.Common.Models.Print
{
    public class printserver : model_sys
    {
        public string name        { get; set; }
        public string pskey       { get; set; }
        public string description { get; set; }
    }

    public class printserverremote
    {
        public string pskey     { get; set; }
        public string ipaddress { get; set; }
        public int    port      { get; set; }
    }
}
