
using GriB.Common.Models.pos;
using System.Collections.Generic;

namespace GriB.Client.App.Models.Editor
{
    public class discount : model_sys
    {
        public discount()
        {
            name = string.Empty;
            value = 0;
            accesssalepoints = new List<salepointaccess>();
        }

        public string name { get; set; }
        public double value { get; set; }

        public List<salepointaccess> accesssalepoints { get; set; }
    }
}