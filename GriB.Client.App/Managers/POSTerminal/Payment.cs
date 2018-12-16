using System.Collections.Generic;
using GriB.Common.Sql;
using GriB.Client.App.Models.POSTerminal;
using System.Data.SqlClient;

namespace GriB.Client.App.Managers.POSTerminal
{
    public static class Payment
    {
        private static payment readFromValues(object[] values) => new payment() { id = (int)values[0], check = new check() { id = (int)values[1] }, type = (int)values[2], sum = (double)values[3], option = (int)values[4], client = new Models.Editor.client() { id = (int)values[5] }, comment = (string)values[6] };

        private const string cmdGet = @"POSTerminal\Payment\[get]";
        public static payment GetPayment(this Query query, int id)
        {
            payment result = new payment();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"POSTerminal\Payment\[set]";
        public static payment SetPayment(this Query query, payment payment, int user)
        {
            payment result = payment;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@u", user), new SqlParameter("@check", result.check), new SqlParameter("@type", result.type), new SqlParameter("@sum", result.sum), new SqlParameter("@option", result.option), new SqlParameter("@client", result.client.id), new SqlParameter("@comment", result.comment) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetPayment(query, result.id);
        }

        private const string cmdDel = @"POSTerminal\Payment\[del]";
        public static void DelPayment(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }
    }
}