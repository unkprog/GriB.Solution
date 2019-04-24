using GriB.Common.Models.pos;

namespace GriB.Common.Models.Print.Editor
{
    public class reference : model_base
    {
        public reference()
        {
            name = string.Empty;
        }
        public string name { get; set; }
    }

    public class reference_hierarhy : reference
    {
        public int pid { get; set; }
    }

}