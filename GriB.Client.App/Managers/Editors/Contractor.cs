using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Contractor
    {
        private static contractor readFromValues(object[] values) => new contractor() { id = (int)values[0], name = (string)values[1] };

        private const string cmdGet = @"Editor\Contractor\[get]";
        public static List<contractor> GetContractors(this Query query)
        {
            List<contractor> result = new List<contractor>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static contractor GetContractor(this Query query, int id)
        {
            contractor result = new contractor();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\Contractor\[set]";
        public static contractor SetContractor(this Query query, contractor contractor, int user)
        {
            contractor result = contractor;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", contractor.id), new SqlParameter("@u", user), new SqlParameter("@name", contractor.name) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetContractor(query, result.id);
        }

        private const string cmdDel = @"Editor\Contractor\[del]";
        public static void DelContractor(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

    }
}