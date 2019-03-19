using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.POSTerminal;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.POSTerminal
{
    public static class Change
    {

        private static change readFromValues(object[] values) => new change() { id = (int)values[0], d=(int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5], salepoint = new salepoint() { id = (int)values[6] }, options = (int)values[7] };

        private const string cmdNew = @"POSTerminal\Change\[new]";
        public static change New(this Query query, int u, int salepoint)
        {
            change result = new change();
            query.Execute(cmdNew, new SqlParameter[] { new SqlParameter("@u", u), new SqlParameter("@salepoint", salepoint) }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdClose = @"POSTerminal\Change\[close]";
        public static void Close(this Query query, int u, int id)
        {
            query.Execute(cmdClose, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", u), new SqlParameter("@options", 1) }
            , (values) =>
            {
            });
        }

        private const string cmdGetOpen = @"POSTerminal\Change\[getopen]";
        public static change GetOpen(this Query query, int salepoint)
        {
            change result = new change();
            query.Execute(cmdGetOpen, new SqlParameter[] { new SqlParameter("@salepoint", salepoint) }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        //public static List<change> GetChange(this Query query, int id)
        //{
        //    List<change> result = new List<change>();
        //    query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@salepoint", Value = 0 } }
        //    , (values) =>
        //    {
        //        result.Add(readFromValues(values));
        //    });

        //    return result;
        //}

        

    }
}