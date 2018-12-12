using GriB.Common.Models.pos;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Models.POSTerminal
{
    public class payment : model_sys
    {
        public check  check   { get; set; }
        public int    type    { get; set; }
        public double sum     { get; set; }
        public int    option  { get; set; }
        public client client  { get; set; }
        public string comment { get; set; }
    }
}