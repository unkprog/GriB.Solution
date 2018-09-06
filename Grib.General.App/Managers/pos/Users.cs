using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Models.pos;
using GriB.Common.Sql;

namespace GriB.General.App.Managers.pos
{
    public static class Users
    {
        public static List<user> GetUser(this Query query, int regtype, string find)
        {
            List<user> result = new List<user>();
            query.Execute("[get_user]", new SqlParameter[] { new SqlParameter("@regtype", regtype), new SqlParameter("@find", find) }
            , (values) =>
            {
                result.Add(new user() { id = (int)values[0], regtype = (int)values[1], phone = (string)values[2], email = (string)values[3] });
            });

            return result;
        }
    }
}