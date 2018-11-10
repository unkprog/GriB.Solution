using System.Collections.Generic;
using GriB.Common.Models.Security;

namespace GriB.Client.App.Models.Editor
{
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
}