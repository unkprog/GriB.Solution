﻿namespace GriB.Client.App.Models.Editor
{
    public class company : reference
    {
        public string site { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }

    public class salepoint : reference
    {
        public int company_id { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string schedule { get; set; }
    }

    public class salepointaccess
    {
        public salepoint salepoint { get; set; }
        public bool isaccess { get; set; }
    }
}