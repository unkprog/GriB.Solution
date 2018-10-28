using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Category
    {

        private static category readFromValues(object[] values) => new category() { id = (int)values[0], pid = (int)values[1], name = (string)values[2], photo = (string)values[3] };

        private const string cmdGet = @"Category\[get]";
        public static List<category> GetCategories(this Query query)
        {
            List<category> result = new List<category>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static category GetCategory(this Query query, int id)
        {
            category result = new category();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Category\[set]";
        public static category SetCategory(this Query query, category category, int user)
        {
            category result = category;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", category.id), new SqlParameter("@u", user), new SqlParameter("@pid", category.pid), new SqlParameter("@name", category.name), new SqlParameter("@photo", category.photo) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetCategory(query, result.id);
        }

        private const string cmdDel = @"Category\[del]";
        public static void DelCategory(this Query query, int id)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => { });
        }

    }
}