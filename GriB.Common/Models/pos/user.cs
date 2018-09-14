namespace GriB.Common.Models.pos
{
    public class register_user
    {
        public string phone { get; set; }
    }

    public class login_user
    {
        public string phone { get; set; }
        public string pass  { get; set; }
    }

    public class user : model_sys
    {
        public string phone { get; set; }
    }

    public class user_role : model_base
    {
        public int user { get; set; }
        public int role { get; set; }
    }

    public class user_sec : model_base
    {
        public string pass { get; set; }
    }
}