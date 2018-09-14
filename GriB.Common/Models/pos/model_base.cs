using System;

namespace GriB.Common.Models.pos
{
    public class model_base
    {
        public int id { get; set; }
    }

    public class model_sys : model_base
    {
        public int      d  { get; set; }
        public DateTime cd { get; set; }
        public int      cu { get; set; }
        public DateTime ud { get; set; }
        public int      uu { get; set; }
    }
}