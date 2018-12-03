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
            return new check() { id = (int)values[c++],  d = (int)values[c++], cd = (DateTime)values[c++], cu = (int)values[c++], ud = (DateTime)values[c++], uu = (int)values[c++]
                               , options = (int)values[c++], client = (int)values[c++], number = (int)values[c++], change = (int)values[c++]
                               , discount = (double)values[c++], comment = (string)values[c++] };
        }

        private const string cmdNew = @"POSTerminal\Check\[new]";
        public static check NewCheck(this Query query, int user, int change)
        {
            check result = null;
            query.Execute(cmdNew, new SqlParameter[] { new SqlParameter() { ParameterName = "@u", Value = user }, new SqlParameter() { ParameterName = "@change", Value = change } }
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
        public static List<check> NewAll(this Query query, int user, int change)
        {
            List<check> result = new List<check>();
            query.Execute(cmdNewAll, new SqlParameter[] { new SqlParameter() { ParameterName = "@u", Value = user }, new SqlParameter() { ParameterName = "@change", Value = change } }
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


    }
}