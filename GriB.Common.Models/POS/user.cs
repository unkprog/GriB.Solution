using System;

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

    public class user_db : model_base
    {
        public int db   { get; set; }
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

    public class user_person : model_base
    {
        public int sex { get; set; }
        public DateTime birth { get; set; }
        public string fname { get; set; }
        public string mname { get; set; }
        public string lname { get; set; }
        public string email { get; set; }

    }

    public class user_full : user
    {
        public user_full()
        {
            person = new user_person();
            db = new sqldb_full();
        }
        public int pid { get; set; }
        public user_person person { get; set; }
        public sqldb_full db { get; set; }

    }
}