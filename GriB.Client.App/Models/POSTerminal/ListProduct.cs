using GriB.Common.Models.pos;

namespace GriB.Client.App.Models.POSTerminal
{
    public class posparamsselect
    {
        public int category { get; set; }
        public int salepoint { get; set; }
    }

    public class posproductitem : model_base
    {
        public bool iscategory { get; set; }
        public string name { get; set; }
        public string photo { get; set; }

        public double price { get; set; }
    }
}