using GriB.Common.Models.pos;
using GriB.Common.Models.Security;
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
        public string site { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }

    public class salepoint : reference
    {
        public int company_id { get; set; }
        public string city { get; set; }
        public string address { get; set; }
        public string schedule { get; set; }
    }

    public class salepointaccess
    {
        public salepoint salepoint { get; set; }
        public bool isaccess { get; set; }
    }

    public class employee : Common.Models.pos.settings.employee
    {
        public bool isfullaccess { get; set; }
        public bool isaccess { get; set; }
        public int openonlogin { get; set; }
        public int defaultsalepoint { get; set; }

        public List<salepointaccess> accesssalepoints { get; set; }

        public employee() : base()
        {
            accesssalepoints = new List<salepointaccess>();
        }

        public employee(Common.Models.pos.settings.employee empl) : base(empl)
        {
            if (empl is employee)
            {
                employee _empl = (employee)empl;
                isfullaccess = _empl.isfullaccess;
                isaccess = _empl.isaccess;
                openonlogin = _empl.openonlogin;
                defaultsalepoint = _empl.defaultsalepoint;
                accesssalepoints = new List<salepointaccess>(_empl.accesssalepoints);
            }
            else
                accesssalepoints = new List<salepointaccess>();

            isfullaccess = isaccess = (empl?.pid == 0);
        }

        public employee(PrincipalData data) : base()
        {
            id = data.User.id;
            phone = data.User.phone;
            sex = data.Person.sex;
            birth = data.Person.birth;
            fname = data.Person.fname;
            mname = data.Person.mname;
            lname = data.Person.lname;
            email = data.Person.email;
            accesssalepoints = new List<salepointaccess>();
        }
    }

    public class employeecard : employee
    {
        public string name { get => string.Concat(fname, !string.IsNullOrEmpty(fname) && !string.IsNullOrEmpty(mname) ? " " : string.Empty, mname, (!string.IsNullOrEmpty(fname) || !string.IsNullOrEmpty(mname)) && !string.IsNullOrEmpty(lname) ? " " : string.Empty, lname); }
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
        public string code { get; set; }
        public string nameshort { get; set; }
    }

    public class unit_rate
    {
        public unit unit { get; set; }
        public DateTime date { get; set; }
        public double value { get; set; }
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

    public class category_card : category
    {
        public category_card()
        {
            parentname = string.Empty;
        }
        public string parentname { get; set; }
    }

    public class price_item
    {
        public DateTime date { get; set; }
        public double price { get; set; }
    }

    public class product : reference_hierarhy
    {
        public product()
        {
            photo = string.Empty;
            description = string.Empty;
            vendorcode = string.Empty;
            barcode = string.Empty;
            costprices = new List<price_item>();
            sellingprices = new List<price_item>();
            accesssalepoints = new List<salepointaccess>();
        }
        public int    type         { get; set; }
        public int    category     { get; set; }
        public string photo        { get; set; }
        public string description  { get; set; }
        public string vendorcode   { get; set; }
        public string barcode      { get; set; }
        public bool   putonsale    { get; set; }

        public int    unit         { get; set; }
        public double quantity     { get; set; }
        public int    currency     { get; set; }
        public double costprice    { get; set; }
        public double sellingprice { get; set; }

        public List<price_item> costprices { get; set; }
        public List<price_item> sellingprices { get; set; }
        public List<salepointaccess> accesssalepoints { get; set; }
    }

}