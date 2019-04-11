using GriB.Common.Models.pos;

namespace GriB.Common.Models.Print
{
    public class printserver : model_sys
    {
        public string name        { get; set; }
        public string pskey       { get; set; }
        public string description { get; set; }
    }
}
