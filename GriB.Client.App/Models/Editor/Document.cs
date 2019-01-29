using System;
using System.Collections.Generic;
using GriB.Common.Models.pos;

namespace GriB.Client.App.Models.Editor
{
    public class base_params
    {
        public base_params()
        {
            id = 0;
            salepoint = 0;
            datefrom = new DateTime(1899, 12, 30);
            dateto = new DateTime(1899, 12, 30);
        }
        public int id { get; set; }
        public int salepoint { get; set; }
        public DateTime datefrom { get; set; }
        public DateTime dateto { get; set; }
    }

    public class sales_params : base_params
    {
    }

    public class payments_params : base_params
    {
        public payments_params() : base()
        {
            client = 0;
            type = 0;
        }
        public int client { get; set; }
        public int type { get; set; }
    }

    public class document_params : base_params
    {
        public document_params() : base()
        {
            doctype = 0;
            salepointto = 0;
        }
        public int doctype { get; set; }
        public int salepointto { get; set; }
        public int contractor { get; set; }
        public int reason { get; set; }
    }

    public class document : model_sys
    {
        public const int Arrival = 10;
        public const int Writeoff = 40;
        public const int Movement = 50;

        public const int Consumption = 20;
        public const int Return = 30;
        public const int Production = 60;

        public document()
        {
            positions = new List<document_position>();
            comment = string.Empty;
            date = DateTime.Now;
        }

        public int doctype { get; set; }
        public int options { get; set; }
        public DateTime date { get; set; }
        public salepoint salepoint { get; set; }
        public salepoint salepointto { get; set; }
        public contractor contractor { get; set; }
        public reason reason { get; set; }
        public int typecost { get; set; }
        public List<document_position> positions { get; set; }
        public string comment { get; set; }
        public double sum { get; set; }
    }


    public class document_position : model_base_position
    {
        public product product { get; set; }
        public double quantity { get; set; }
        public double price { get; set; }
        public double sum { get; set; }
    }


    public class saledocument : model_sys
    {
        public saledocument()
        {
            comment    = string.Empty;
            positions = new List<document_position>();
        }
        public int options { get; set; }
        public int number  { get; set; }
        public int change  { get; set; }
        public salepoint salepoint { get; set; }
        public client client       { get; set; }
        public double discount     { get; set; }
        public string comment      { get; set; }
        public double sum { get; set; }

        public List<document_position> positions { get; set; }
    }
}