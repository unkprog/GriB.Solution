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

        private static category_card readFromValuesCard(object[] values) => new category_card() { id = (int)values[0], pid = (int)values[1], name = (string)values[2], photo = (string)values[3], parentname = (string)values[4] };
        private const string cmdGetCard = @"Category\[get_card]";
        public static List<category_card> GetCategoriesCard(this Query query)
        {
            List<category_card> result = new List<category_card>();
            query.Execute(cmdGetCard, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValuesCard(values));
            });

            return result;
        }

        private const string cmdGetNotThis = @"Category\[get_not_this]";
        public static List<category> GetCategoriesNotThis(this Query query, int id)
        {
            List<category> result = new List<category>();
            query.Execute(cmdGetNotThis, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id } }
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
        public static void DelCategory(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

        private const string cmdGetDescription = @"Category\Description\[get]";
        public static category GetCategoryDescription(this Query query, category category)
        {
            category result = category;
            query.Execute(cmdGetDescription, new SqlParameter[] { new SqlParameter("@id", category.id), new SqlParameter("@description", category.description) }
            , (values) =>
            {
                category.description = (string)values[1];
            });

            return result;
        }

        private const string cmdSetDescription = @"Category\Description\[set]";
        public static category SetCategoryDescription(this Query query, category category)
        {
            category result = category;
            query.Execute(cmdSetDescription, new SqlParameter[] { new SqlParameter("@id", category.id), new SqlParameter("@description", category.description) }
            , (values) => { });
            return result;
        }

        private const string cmdGetSalepointAcces = @"Category\SalepointAccess\[get]";
        public static category GetCategorySalepointAccess(this Query query, category category)
        {
            category result = category;
            result.accesssalepoints = new List<salepointaccess>();

            query.Execute(cmdGetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", category.id), new SqlParameter("@type", Organization.typeDivision) }
            , (values) =>
            {
                int idx = 0;
                salepointaccess item = new salepointaccess()
                {
                    salepoint = new salepoint() { id = (int)values[idx++], name = (string)values[idx++], company_id = (int)values[idx++], city = (string)values[idx++], address = (string)values[idx++], schedule = (string)values[idx++] }
                    , isaccess = (bool)values[idx++]
                };
                result.accesssalepoints.Add(item);
            });

            return result;
        }

        private const string cmdSetSalepointAcces = @"Category\SalepointAccess\[set]";
        public static category SetCategorySalepointAccess(this Query query, category category)
        {
            category result = category;
            //try
            //{

                foreach (var item in result.accesssalepoints)
                    query.Execute(cmdSetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", category.id), new SqlParameter("@salepoint", item.salepoint.id), new SqlParameter("@isaccess", item.isaccess) }
                    , (values) => { });
            //}
            //catch (Exception ex)
            //{
            //    int i = 0;
            //}

            return result;
        }
    }
}