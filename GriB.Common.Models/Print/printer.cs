using GriB.Common.Models.pos;
using GriB.Common.Models.Print.Editor;

namespace GriB.Common.Models.Print
{
    public class printer : model_sys
    {
        public printer()
        {
            printserver = new printserver();
            salepoint = new reference();
            name = string.Empty;
            logo = string.Empty;
            header = string.Empty;
            footer = string.Empty;
        }
        public string name   { get; set; }
        public printserver printserver { get; set; }
        public reference salepoint { get; set; }
        public int    labelsize { get; set; }
        public string logo      { get; set; }
        public string header    { get; set; }
        public string footer    { get; set; }
    }
}
