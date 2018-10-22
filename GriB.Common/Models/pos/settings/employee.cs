using System;

namespace GriB.Common.Models.pos.settings
{
    public class employee : model_sys
    {
        public int      pid   { get; set; }
        public string   phone { get; set; }
        public string   pass  { get; set; }
        public int      sex   { get; set; }
        public DateTime birth { get; set; }
        public string   fname { get; set; }
        public string   mname { get; set; }
        public string   lname { get; set; }
        public string   email { get; set; }

        public employee() : base() { }
        public employee(employee empl) : base(empl)
        {
            pid   = empl.pid;
            phone = empl.phone;
            pass  = empl.pass;
            sex   = empl.sex;
            birth = empl.birth;
            fname = empl.fname;
            mname = empl.mname;
            lname = empl.lname;
            email = empl.email;
        }
    }
}
