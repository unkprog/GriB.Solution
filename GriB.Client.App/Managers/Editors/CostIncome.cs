using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class CostIncome
    {
        public const int typeIncome = 1;
        public const int typeCost   = 2;

        private static costincome readFromValues(object[] values) => new costincome() { id = (int)values[0], name = (string)values[1], type = (int)values[2] };

        private const string cmdGet = @"Editor\CostIncome\[get]";
        public static List<costincome> GetCostIncomes(this Query query, int type)
        {
            List<costincome> result = new List<costincome>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty }, new SqlParameter() { ParameterName = "@type", Value = type } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static costincome GetCostIncome(this Query query, int id)
        {
            costincome result = new costincome();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty }, new SqlParameter() { ParameterName = "@type", Value = 0 } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\CostIncome\[set]";
        public static costincome SetCostIncome(this Query query, costincome costincome, int user)
        {
            costincome result = costincome;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", costincome.id), new SqlParameter("@u", user), new SqlParameter("@type", costincome.type), new SqlParameter("@name", costincome.name) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetCostIncome(query, result.id);
        }

        private const string cmdDel = @"Editor\CostIncome\[del]";
        public static void DelCostIncome(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

    }
}