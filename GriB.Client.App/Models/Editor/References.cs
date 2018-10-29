using GriB.Common.Models.pos;
using System;
using System.Collections.Generic;

namespace GriB.Client.App.Models.Editor
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

    public class salepointaccess
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

        public List<salepointaccess> accesssalepoints { get; set; }

        public employee() : base()
        {
            accesssalepoints = new List<salepointaccess>();
        }

        public employee(Common.Models.pos.settings.employee empl) : base(empl)
        {
            accesssalepoints = new List<salepointaccess>();
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

    public class unit : reference
    {
        public unit()
        {
            code = string.Empty;
            nameshort = string.Empty;
        }
        public string code      { get; set; }
        public string nameshort { get; set; }
    }

    public class unit_rate 
    {
        public unit     unit  { get; set; }
        public DateTime date  { get; set; }
        public double   value { get; set; }
    }

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
}