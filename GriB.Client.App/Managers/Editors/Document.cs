using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;
using System;

namespace GriB.Client.App.Managers.Editors
{
    public static class Document
    {

        private static document readFromValues(object[] values) => new document() { id = (int)values[0], doctype = (int)values[1], option = (int)values[2], date = (DateTime)values[3], salepoint = new salepoint() { id = (int)values[4] }, salepointto = new salepoint() { id = (int)values[5] } , contractor = new contractor() { id = (int)values[6] }, typecost= (int)values[7], salepointname = (string)values[8], sum = (double)values[9] };

        private const string cmdGet = @"Editor\Document\[get]";
        public static List<document> GetDocuments(this Query query, document_params docpar)
        {
            List<document> result = new List<document>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = docpar.id }, new SqlParameter() { ParameterName = "@doctype", Value = docpar.doctype }, new SqlParameter() { ParameterName = "@salepoint", Value = docpar.salepoint }
            , new SqlParameter() { ParameterName = "@datefrom", Value = docpar.datefrom }, new SqlParameter() { ParameterName = "@dateto", Value = docpar.dateto} }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static document GetDocument(this Query query, int id)
        {
            document_params docpar = new document_params() { id = id };
            List<document> documents = GetDocuments(query, docpar);
            return (documents == null || documents.Count == 0 ? new document() { id = id } : documents[0]);
        }

        private const string cmdSet = @"Editor\Document\[set]";
        public static document SetDocument(this Query query, document document, int user)
        {
            document result = document;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@u", user), new SqlParameter("@doctype", result.doctype), new SqlParameter("@option", result.option), new SqlParameter("@date", result.date)
            , new SqlParameter("@salepoint", result.salepoint?.id), new SqlParameter("@salepointto", result.salepointto?.id), new SqlParameter("@contractor", result.contractor?.id), new SqlParameter("@typecost", result.typecost) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return result;
        }

        private const string cmdDel = @"Editor\Document\[del]";
        public static void DelDocument(this Query query, int id, int user)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

        // TODO: Прикрутить фильтр по доступу по торговой точке
        private const string cmdGetCompositionNew = @"Editor\Document\Position\[get_new]";
        public static document_position GetDocumentPositionNew(this Query query, int id, int salepoint)
        {
            document_position result = new document_position();
            query.Execute(cmdGetCompositionNew, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@salepoint", salepoint) }
            , (values) =>
            {
                result = new document_position() { index = (int)values[1], quantity = (double)values[3], product = new product() { id = (int)values[2], name = (string)values[4], sellingprice = (double)values[5], unit = (int)values[6], unit_name = (string)values[7] } };
            });

            return result;
        }
    }
}