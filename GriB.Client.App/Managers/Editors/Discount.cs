using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Client.App.Models.Editor;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.Editors
{
    public static class Discount
    {
        private static discount readFromValues(object[] values) => new discount() { id = (int)values[0], name = (string)values[1], value = (double)values[2] };

        private const string cmdGet = @"Editor\Discount\[get]";
        public static List<discount> GetDiscounts(this Query query)
        {
            List<discount> result = new List<discount>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static discount GetDiscount(this Query query, int id)
        {
            discount result = new discount();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\Discount\[set]";
        public static discount SetDiscount(this Query query, discount discount, int user)
        {
            discount result = discount;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", discount.id), new SqlParameter("@u", user), new SqlParameter("@name", discount.name), new SqlParameter("@value", discount.value) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetDiscount(query, result.id);
        }

        private const string cmdDel = @"Editor\Discount\[del]";
        public static void DelDiscount(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }


        private const string cmdGetSalepointAcces = @"Editor\Discount\SalepointAccess\[get]";
        public static discount GetDiscountSalepointAccess(this Query query, discount discount)
        {
            discount result = discount;
            result.accesssalepoints = new List<salepointaccess>();

            query.Execute(cmdGetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", discount.id), new SqlParameter("@type", Organization.typeDivision) }
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

        private const string cmdSetSalepointAcces = @"Editor\Discount\SalepointAccess\[set]";
        public static discount SetDiscountSalepointAccess(this Query query, discount discount)
        {
            discount result = discount;
            foreach (var item in result.accesssalepoints)
                query.Execute(cmdSetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", discount.id), new SqlParameter("@salepoint", item.salepoint.id), new SqlParameter("@isaccess", item.isaccess) }
                , (values) => { });
            return result;
        }
    }
}