using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Product
    {

        private static product readFromValues(object[] values) => new product() { id = (int)values[0], pid = (int)values[1], type = (int)values[2], category = (int)values[3], name = (string)values[4], photo = (string)values[5] };

        private const string cmdGet = @"Product\[get]";
        public static List<product> GetProducts(this Query query)
        {
            List<product> result = new List<product>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static product GetProduct(this Query query, int id)
        {
            product result = new product();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Product\[set]";
        public static product SetProduct(this Query query, product product, int user)
        {
            product result = product;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@u", user), new SqlParameter("@pid", product.pid), new SqlParameter("@type", product.type), new SqlParameter("@category", product.category), new SqlParameter("@name", product.name), new SqlParameter("@photo", product.photo) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetProduct(query, result.id);
        }

        private const string cmdDel = @"Product\[del]";
        public static void DelProduct(this Query query, int id)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => { });
        }

        private const string cmdGetDescription = @"Product\Description\[get]";
        public static product GetProductDescription(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdGetDescription, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@description", product.description) }
            , (values) =>
            {
                product.description = (string)values[1];
            });

            return result;
        }

        private const string cmdSetDescription = @"Product\Description\[set]";
        public static product SetProductDescription(this Query query, product product)
        {
            product result = product;
            query.Execute(cmdSetDescription, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@description", product.description) }
            , (values) => { });
            return result;
        }

        private const string cmdGetSalepointAcces = @"Product\SalepointAccess\[get]";
        public static product GetProductSalepointAccess(this Query query, product product)
        {
            product result = product;
            result.accesssalepoints = new List<salepointaccess>();

            query.Execute(cmdGetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@type", Organization.typeDivision) }
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

        private const string cmdSetSalepointAcces = @"Product\SalepointAccess\[set]";
        public static product SetProductSalepointAccess(this Query query, product product)
        {
            product result = product;
            foreach (var item in result.accesssalepoints)
                query.Execute(cmdSetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", product.id), new SqlParameter("@salepoint", item.salepoint.id), new SqlParameter("@isaccess", item.isaccess) }
                , (values) => { });
            return result;
        }
    }
}