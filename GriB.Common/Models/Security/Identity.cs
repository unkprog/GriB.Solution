using GriB.Common.Models.pos;
using System.Security.Principal;

namespace GriB.Common.Models.Security
{
    public class Identity : IIdentity
    {
        public Identity(user user, user_person user_person)
        {
            User = user;
            Person = user_person;
        }

        public user User { get; private set; }
        public user_person Person { get; private set; }

    #region IIdentity
        public string Name => User == null ? string.Empty : User.phone;

        public string AuthenticationType => "Password";

        public bool IsAuthenticated => User != null;
    #endregion
    }
}
