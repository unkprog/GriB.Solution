using System;

namespace GriB.Common.Models.pos.settings
{
    public class employee : model_sys
    {
        public string phone { get; set; }
        public string pass { get; set; }
        public int sex { get; set; }
        public DateTime birth { get; set; }
        public string fname { get; set; }
        public string mname { get; set; }
        public string lname { get; set; }
        public string email { get; set; }
    }
}
