using System;
using System.Collections.Generic;
using GriB.Common.Models.pos;

namespace GriB.Client.App.Models.Editor
{
    public class document_params 
    {
        public document_params()
        {
            id = 0;
            doctype = 0;
            salepoint = 0;
            datefrom = new DateTime(1899, 12, 30);
            dateto = new DateTime(1899, 12, 30);
        }
        public int id { get; set; }
        public int doctype { get; set; }
        public int salepoint { get; set; }
        public DateTime datefrom { get; set; }
        public DateTime dateto { get; set; }
    }

    public class document: model_sys
    {
        public const int Arrival = 10;
        public const int Consumption = 20;
        public const int Return = 30;
        public const int Writeoff = 40;
        public const int Movement = 50;
        public const int Production = 60;

        public document()
        {
            positions = new List<document_position>();
            salepointname = string.Empty;
            date = DateTime.Now;
        }

        public int doctype { get; set; }
        public int option { get; set; }
        public DateTime date { get; set; }
        public salepoint salepoint { get; set; }
        public salepoint salepointto { get; set; }
        public contractor contractor { get; set; }
        public int typecost { get; set; }
        public List<document_position> positions { get; set; }
        public string salepointname { get; set; }
        public double sum { get; set; }
    }


    public class document_position : model_base_position
    {
        public product product  { get; set; }
        public double  quantity { get; set; }
        public double  price    { get; set; }
        public double  sum      { get; set; }
    }
}