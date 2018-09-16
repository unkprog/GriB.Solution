using GriB.Common.Models.pos;
using System.Security.Principal;

namespace GriB.Common.Models.Security
{
    public class PrincipalData
    {
        public user User { get; set; }
        public user_person Person { get; set; }
    }

    public class Principal : IPrincipal
    {
        public Principal(user user, user_person user_person)
        {
            Identity = new Identity(user, user_person);
        }

        public Principal(PrincipalData data) : this(data?.User, data?.Person)
        {

        }

        public IIdentity Identity { get; private set; }

        public bool IsInRole(string role)
        {
            throw new System.NotImplementedException();
        }
    }
}
