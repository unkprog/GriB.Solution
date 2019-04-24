using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Common.Models.Print;
using GriB.Common.Models.Print.Editor;

namespace GriB.Client.App.Managers.Editors
{
    public static class Printer
    {
        private static printer readFromValues(object[] values) => new printer() { id = (int)values[0], name = (string)values[1], labelsize = (int)values[2], logo = (string)values[3], header = (string)values[4], footer = (string)values[5], printserver = new printserver() { id = (int)values[6], pskey = (string)values[7], description = (string)values[8] }, salepoint = new reference() { id = (int)values[9], name = (string)values[10] } };

        private const string cmdGet = @"Editor\Printer\[get]";
        public static List<printer> GetPrinters(this Query query)
        {
            List<printer> result = new List<printer>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static printer GetPrinter(this Query query, int id)
        {
            printer result = new printer();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@name", Value = string.Empty } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Editor\Printer\[set]";
        public static printer SetPrinter(this Query query, printer printer, int user)
        {
            printer result = printer;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", printer.id), new SqlParameter("@u", user), new SqlParameter("@name", printer.name), new SqlParameter("@printserver", Helper.GetSqlParamValue(printer.printserver)), new SqlParameter("@salepoint", Helper.GetSqlParamValue(printer.salepoint))
                , new SqlParameter("@labelsize", printer.labelsize), new SqlParameter("@logo", printer.logo), new SqlParameter("@header", printer.header), new SqlParameter("@footer", printer.footer) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetPrinter(query, result.id);
        }

        private const string cmdDel = @"Editor\Printer\[del]";
        public static void DelPrinter(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

    }
}