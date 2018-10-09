using GriB.Common.Models.pos;

namespace GriB.Client.App.Models
{
    public class t_org : model_reference
    {
        public t_org()
        {
            info = new t_org_info();
            info1 = new t_org_info1();
        }
        public int type { get; set; }
        public t_org_info  info  { get; set; }
        public t_org_info1 info1 { get; set; }
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

    public class t_org_info1
    {
        public t_org_info1()
        {
            address = string.Empty;
            schedule = string.Empty;
        }
        public string address  { get; set; }
        public string schedule { get; set; }

    }

}