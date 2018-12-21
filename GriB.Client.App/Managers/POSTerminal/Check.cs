using System;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.POSTerminal;
using System.Collections.Generic;

namespace GriB.Client.App.Managers.POSTerminal
{
    public static class Check
    {
        private static check readFromValues(object[] values)
        {
            int c = 0;
            return new check() { id = (int)values[c++],  d = (int)values[c++], cd = (DateTime)values[c++], cu = (int)values[c++], ud = (DateTime)values[c++], uu = (int)values[c++], salepoint = (int)values[c++]
                               , options = (int)values[c++], client = (int)values[c++], number = (int)values[c++], change = (int)values[c++]
                               , discount = (double)values[c++], comment = (string)values[c++] };
        }

        private const string cmdNew = @"POSTerminal\Check\[new]";
        public static check NewCheck(this Query query, int user, int salepoint, int change)
        {
            check result = null;
            query.Execute(cmdNew, new SqlParameter[] { new SqlParameter() { ParameterName = "@u", Value = user }, new SqlParameter() { ParameterName = "@salepoint", Value = salepoint }, new SqlParameter() { ParameterName = "@change", Value = change } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }


        private const string cmdGet = @"POSTerminal\Check\[get]";
        public static check GetCheck(this Query query, int check)
        {
            check result = null;
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = check } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdDel = @"POSTerminal\Check\[del]";
        public static check DeleteCheck(this Query query, int user, int check)
        {
            check result = null;
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter() { ParameterName = "@u", Value = user }, new SqlParameter() { ParameterName = "@id", Value = check } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdNewAll = @"POSTerminal\Check\[new_all]";
        public static List<check> NewAll(this Query query, int user, int salepoint, int change)
        {
            List<check> result = new List<check>();
            query.Execute(cmdNewAll, new SqlParameter[] { new SqlParameter() { ParameterName = "@u", Value = user }, new SqlParameter() { ParameterName = "@salepoint", Value = salepoint }, new SqlParameter() { ParameterName = "@change", Value = change } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        private const string cmdGetPositions = @"POSTerminal\Check\Position\[get]";
        public static check GetPositions(this Query query, check check)
        {
            check result = check;
            result.positions = new List<check_position>();
            query.Execute(cmdGetPositions, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = result.id } }
            , (values) =>
            {
                int c = 1;
                result.positions.Add(new check_position() { index = (int)values[c++], product = new Models.Editor.product() { id = (int)values[c++], name = (string)values[c++] }, quantity = (double)values[c++], price = (double)values[c++] });
            });

            return result;
        }

        private const string cmdAddPosition = @"POSTerminal\Check\Position\[add]";
        public static check_position AddPosition(this Query query, check_position position)
        {
            check_position result = position;
            query.Execute(cmdAddPosition, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = result.id }, new SqlParameter() { ParameterName = "@product", Value = result.product.id }, new SqlParameter() { ParameterName = "@quantity", Value = result.quantity } }
            , (values) =>
            {
                int c = 1;
                result.index = (int)values[c++];
                result.product.id = (int)values[c++];
                result.product.name = (string)values[c++];
                result.quantity = (double)values[c++];
                result.price = (double)values[c++];
            });

            return result;
        }

        private const string cmdClose = @"POSTerminal\Check\[close]";
        public static check Close(this Query query, check check, int user)
        {
            check result = check;
            query.Execute(cmdClose, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = result.id }, new SqlParameter("@u", user), new SqlParameter() { ParameterName = "@salepoint", Value = result.salepoint }
            , new SqlParameter() { ParameterName = "@options", Value = result.options }, new SqlParameter() { ParameterName = "@client", Value = result.client }, new SqlParameter() { ParameterName = "@discount", Value = result.discount }
            , new SqlParameter() { ParameterName = "@number", Value = result.number }, new SqlParameter() { ParameterName = "@change", Value = result.change }, new SqlParameter() { ParameterName = "@comment", Value = result.comment } }
            , (values) => { });

            return result;
        }

        private const string cmdSetClient = @"POSTerminal\Check\[setclient]";
        public static void SetClient(this Query query, int check, int client, int user)
        {
            query.Execute(cmdSetClient, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = check }, new SqlParameter("@u", user), new SqlParameter() { ParameterName = "@client", Value = client } }
            , (values) => { });
        }

        private const string cmdSetDiscount = @"POSTerminal\Check\[setdiscount]";
        public static void SetDiscount(this Query query, int check, double discount, int user)
        {
            query.Execute(cmdSetDiscount, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = check }, new SqlParameter("@u", user), new SqlParameter() { ParameterName = "@discount", Value = discount } }
            , (values) => { });
        }

        private const string cmdSetComment = @"POSTerminal\Check\[setcomment]";
        public static void SetComment(this Query query, int check, string comment, int user)
        {
            query.Execute(cmdSetDiscount, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = check }, new SqlParameter("@u", user), new SqlParameter() { ParameterName = "@comment", Value = comment } }
            , (values) => { });
        }
    }
}