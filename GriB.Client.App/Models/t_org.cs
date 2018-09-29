using GriB.Common.Models.pos;

namespace GriB.Client.App.Models
{
    public class t_org : model_reference
    {
        public t_org()
        {
            info = new t_org_info();
        }
        public int type { get; set; }
        public t_org_info info { get; set; }
    }

    public class t_org_info 
    {
        public t_org_info()
        {
            phone = string.Empty;
            email = string.Empty;
            site = string.Empty;
        }
        public string phone { get; set; }
        public string email { get; set; }
        public string site  { get; set; }

    }
}