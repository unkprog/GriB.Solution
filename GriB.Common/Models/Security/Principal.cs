using GriB.Common.Models.pos;
using System.Security.Principal;

namespace GriB.Common.Models.Security
{
    public class PrincipalData
    {
        public user User { get; set; }
        public user_person Person { get; set; }
        public sqldb Database { get; set; }
        public sqlsrv Server { get; set; }
    }

    public class Principal : IPrincipal
    {
        public Principal(PrincipalData data)
        {
            Data = data;
            Identity = new Identity(Data?.User, Data?.Person);
        }

        public IIdentity Identity { get; private set; }
        public PrincipalData Data { get; private set; }

        public bool IsInRole(string role)
        {
            throw new System.NotImplementedException();
        }

        public string GetKey()
        {
            string key = string.Concat("id=", Data.User.id, ";phone=", Data.User.phone, ";s=", Data.Database.server, ";b=", Data.Database.id);
            byte[] utf8Bytes = System.Text.Encoding.UTF8.GetBytes(key);
            return System.Convert.ToBase64String(utf8Bytes);
        }
    }
}
