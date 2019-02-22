using System;
using System.Collections.Generic;

namespace GriB.Client.App.Models.Editor
{
    public class product : reference_hierarhy
    {
        public product()
        {
            photo = string.Empty;
            description = string.Empty;
            vendorcode = string.Empty;
            barcode = string.Empty;
            unit_name = string.Empty;
            category = new category();
            costprices = new List<price_item>();
            sellingprices = new List<price_item>();
            accesssalepoints = new List<salepointaccess>();
            composition = new List<product_composition>();
        }
        public int type { get; set; }
        public category category { get; set; }
        public string photo { get; set; }
        public string description { get; set; }
        public string vendorcode { get; set; }
        public string barcode { get; set; }
        public bool putonsale { get; set; }

        public int unit { get; set; }
        public string unit_name { get; set; }
        public double quantity { get; set; }
        public int currency { get; set; }
        public double costprice { get; set; }
        public double sellingprice { get; set; }

        public List<price_item> costprices { get; set; }
        public List<price_item> sellingprices { get; set; }
        public List<salepointaccess> accesssalepoints { get; set; }
        public List<product_composition> composition { get; set; }
    }

    public class price_item
    {
        public DateTime date { get; set; }
        public double price { get; set; }
    }

    public class product_composition
    {
        public int     index    { get; set; }
        public product product  { get; set; }
        public double  quantity { get; set; }
    }

}