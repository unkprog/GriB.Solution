using System;

namespace GriB.Common.Models.pos
{
    public class model_base
    {
        public int id { get; set; }
    }

    public class model_sys : model_base
    {
        public DateTime cd { get; set; }
        public string   cu { get; set; }
        public DateTime ud { get; set; }
        public string   uu { get; set; }
    }
}