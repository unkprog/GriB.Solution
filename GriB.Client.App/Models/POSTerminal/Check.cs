﻿
using GriB.Client.App.Models.Editor;
using GriB.Common.Models.pos;
using System.Collections.Generic;

namespace GriB.Client.App.Models.POSTerminal
{
    public class add_pos_params
    {
        public int check { get; set; }
        public int product { get; set; }
        public double quantity { get; set; }
    }

    public class check : model_sys
    {
        public check()
        {
            comment = string.Empty;
            positions = new List<check_position>();
        }
        public int salepoint { get; set; }
        public int options { get; set; }
        public int client  { get; set; }
        public int number  { get; set; }
        public int change  { get; set; }
        public double discount { get; set; }
        public string comment { get; set; }

        public List<check_position> positions { get; set; }
    }

    public class check_position : model_base_position
    {
        public int     index    { get; set; }
        public product product  { get; set; }
        public double  quantity { get; set; }
        public double  price    { get; set; }
    }
}