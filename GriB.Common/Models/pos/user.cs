namespace GriB.Common.Models.pos
{
    public class user : model_sys
    {
        public int    regtype { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
    }

    public class user_sec : model_base
    {
        public string pass { get; set; }
    }
}