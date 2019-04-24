using GriB.Common.Models.Print.Editor;
using System.Collections.Generic;

namespace GriB.Client.App.Models.Editor
{
    public class category : reference_hierarhy
    {
        public category()
        {
            photo = string.Empty;
            description = string.Empty;
            accesssalepoints = new List<salepointaccess>();
        }
        public string photo { get; set; }
        public string description { get; set; }

        public List<salepointaccess> accesssalepoints { get; set; }
    }

    public class category_card : category
    {
        public category_card()
        {
            parentname = string.Empty;
        }
        public string parentname { get; set; }
    }
}