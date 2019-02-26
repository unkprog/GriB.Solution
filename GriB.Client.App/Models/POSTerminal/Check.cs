using GriB.Client.App.Models.Editor;
using GriB.Common.Models.pos;
using System;
using System.Collections.Generic;

namespace GriB.Client.App.Models.POSTerminal
{
    public class check_setclient_params
    {
        public int check { get; set; }
        public int client { get; set; }
    }

    public class check_setcomment_params
    {
        public int check { get; set; }
        public string comment { get; set; }
    }

    public class check_setdiscount_params
    {
        public int check { get; set; }
        public double discount { get; set; }
        public int discountref { get; set; }
    }

    public class check_add_pos_params
    {
        public int check { get; set; }
        public int product { get; set; }
        public double quantity { get; set; }
    }

    public class check : model_sys
    {
        public const int ciClose = 1;
        public const int ciCancel = ciClose << 1;

        public check()
        {
            comment = string.Empty;
            positions = new List<check_position>();
        }
        public salepoint salepoint { get; set; }
        public int options     { get; set; }
        public client client   { get; set; }
        public int number      { get; set; }
        public change change   { get; set; }
        public double discount { get; set; }
        public string comment  { get; set; }
        public double sum      { get; set; }
        public discount discountref { get; set; }

        public List<check_position> positions { get; set; }
    }

    public class checkcard : check
    {
        public DateTime date => cd;
    }

    public class check_position : model_base_position
    {
        public product product  { get; set; }
        public double  quantity { get; set; }
        public double  price    { get; set; }
    }

    public class check_close_params
    {
        public int check         { get; set; }
        public int salepoint     { get; set; }
        public int client        { get; set; }
        public int paymentType   { get; set; }
        public int paymentOption { get; set; }
        public double paymentSum { get; set; }
        public string comment    { get; set; }
    }

   
}