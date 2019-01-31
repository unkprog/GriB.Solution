using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Account
    {
        private static account readFromValues(object[] values) => new account() { id = (int)values[0], name = (string)values[1], number = (string)values[2] };

        private const string cmdGet = @"Editor\Account\[get]";
        public static List<account> GetAccounts(this Query query)
        {
            List<account> result = new List<account>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty }, new SqlParameter() { ParameterName = "@number", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static account GetAccount(this Query query, int id)
        {
            account result = new account();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty }, new SqlParameter() { ParameterName = "@number", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\Account\[set]";
        public static account SetAccount(this Query query, account account, int user)
        {
            account result = account;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", account.id), new SqlParameter("@u", user), new SqlParameter("@name", account.name), new SqlParameter("@number", account.number) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetAccount(query, result.id);
        }

        private const string cmdDel = @"Editor\Account\[del]";
        public static void DelAccount(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

    }
}