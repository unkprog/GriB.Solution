using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Unit
    {
        public const int typeCurrency = 1;
        public const int typeUnit     = 2;

        private static unit readFromValues(object[] values) => new unit() { id = (int)values[0], code = (string)values[1], nameshort = (string)values[2], name = (string)values[3] };

        private const string cmdGet = @"Editor\Unit\[get]";
        public static List<unit> GetUnits(this Query query, int type)
        {
            List<unit> result = new List<unit>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@code", Value = string.Empty }, new SqlParameter() { ParameterName = "@nameshort", Value = string.Empty }, new SqlParameter() { ParameterName = "@name", Value = string.Empty }, new SqlParameter() { ParameterName = "@type", Value = type } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static unit GetUnit(this Query query, int id)
        {
            unit result = new unit();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@code", Value = string.Empty }, new SqlParameter() { ParameterName = "@nameshort", Value = string.Empty }, new SqlParameter() { ParameterName = "@name", Value = string.Empty }, new SqlParameter() { ParameterName = "@type", Value = 0 } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\Unit\[set]";
        public static unit SetUnit(this Query query, unit unit, int type, int user)
        {
            unit result = unit;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", unit.id), new SqlParameter("@u", user), new SqlParameter("@type", type), new SqlParameter("@code", unit.code), new SqlParameter("@nameshort", unit.nameshort), new SqlParameter("@name", unit.name) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetUnit(query, result.id);
        }

        private const string cmdDel = @"Editor\Unit\[del]";
        public static void DelUnit(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

    }
}