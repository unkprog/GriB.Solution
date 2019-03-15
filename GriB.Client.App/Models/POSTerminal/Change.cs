using GriB.Common.Models.pos;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Models.POSTerminal
{
    public class change : model_sys
    {
        public change()
        {
            this.salepoint = new salepoint();
        }
        public salepoint salepoint { get; set; }
        public int       options   { get; set; }
    }
}