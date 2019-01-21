using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Reason
    {
        private static reason readFromValues(object[] values) => new reason() { id = (int)values[0], name = (string)values[1] };

        private const string cmdGet = @"Editor\Reason\[get]";
        public static List<reason> GetReasons(this Query query)
        {
            List<reason> result = new List<reason>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static reason GetReason(this Query query, int id)
        {
            reason result = new reason();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\Reason\[set]";
        public static reason SetReason(this Query query, reason reason, int user)
        {
            reason result = reason;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", reason.id), new SqlParameter("@u", user), new SqlParameter("@name", reason.name) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetReason(query, result.id);
        }

        private const string cmdDel = @"Editor\Reason\[del]";
        public static void DelReason(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

    }
}