using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Client.App.Models.POSTerminal;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.POSTerminal
{
    public static class Terminal
    {

        private static posproductitem readFromValues(object[] values) => new posproductitem() { id = (int)values[0], iscategory=(bool)values[1], name = (string)values[2], photo = (string)values[3] };

        private const string cmdGet = @"POSTerminal\[get]";
        public static List<posproductitem> GetSaleProducts(this Query query, posparamsselect posparams)
        {
            List<posproductitem> result = new List<posproductitem>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@category", Value = posparams.category }, new SqlParameter() { ParameterName = "@salepoint", Value = posparams.salepoint } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }
    }
}