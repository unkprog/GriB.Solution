using GriB.Common.Models.pos;
using System.Collections.Generic;

namespace GriB.Client.App.Models.Editor
{
    public class reference : model_base
    {
        public string name { get; set; }
    }

    public class company : reference
    {
        public string site  { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }

    public class salepoint : reference
    {
        public int    company_id { get; set; }
        public string city       { get; set; }
        public string address    { get; set; }
        public string schedule   { get; set; }
    }

    public class employee_salepointaccess
    {
        public salepoint salepoint { get; set; }
        public bool isaccess       { get; set; }
    }

    public class employee : Common.Models.pos.settings.employee
    {
        public bool isfullaccess     { get; set; }
        public bool isaccess         { get; set; }
        public int  openonlogin      { get; set; }
        public int  defaultsalepoint { get; set; }

        public List<employee_salepointaccess> accesssalepoints { get; set; }

        public employee() : base()
        {
            accesssalepoints = new List<employee_salepointaccess>();
        }

        public employee(Common.Models.pos.settings.employee empl) : base(empl)
        {
            accesssalepoints = new List<employee_salepointaccess>();
            isfullaccess = isaccess = (empl?.pid == 0);
        }
    }

    public class employeecard : employee
    {
        public string name   { get => string.Concat(fname, !string.IsNullOrEmpty(fname) && !string.IsNullOrEmpty(mname) ? " " : string.Empty, mname, (!string.IsNullOrEmpty(fname) || !string.IsNullOrEmpty(mname)) && !string.IsNullOrEmpty(lname) ? " " : string.Empty, lname); }
        public string access { get => (isaccess || isfullaccess ? "Да" : "Нет"); }
        public employeecard(Common.Models.pos.settings.employee empl) : base(empl)
        {
            
        }
    }
}