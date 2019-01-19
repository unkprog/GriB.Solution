using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;
using System;

namespace GriB.Client.App.Managers.Editors
{
    public static class Document
    {

        private static document readFromValues(object[] values) => new document() { id = (int)values[0], doctype = (int)values[1], option = (int)values[2], date = (DateTime)values[3], salepoint = new salepoint() { id = (int)values[4], name = (string)values[8] }, salepointto = new salepoint() { id = (int)values[5] } , contractor = new contractor() { id = (int)values[6], name = (string)values[9] }, typecost= (int)values[7], sum = (double)values[10] };

        private const string cmdGet = @"Editor\Document\[get]";
        public static List<document> GetDocuments(this Query query, document_params docpar)
        {
            List<document> result = new List<document>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = docpar.id }, new SqlParameter() { ParameterName = "@doctype", Value = docpar.doctype }
            , new SqlParameter() { ParameterName = "@salepoint", Value = docpar.salepoint } , new SqlParameter() { ParameterName = "@contractor", Value = docpar.contractor }
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
            document result = (documents == null || documents.Count == 0 ? new document() { id = id } : documents[0]);
            GetPositions(query, result);
            return result;
        }

        private const string cmdSet = @"Editor\Document\[set]";
        public static document SetDocument(this Query query, document document, int user)
        {
            document result = document;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@u", user), new SqlParameter("@doctype", result.doctype), new SqlParameter("@option", result.option), new SqlParameter("@date", result.date)
            , new SqlParameter("@salepoint", result.salepoint?.id), new SqlParameter("@salepointto", result.salepointto ==null ? 0 : result.salepointto.id), new SqlParameter("@contractor", result.contractor?.id), new SqlParameter("@typecost", result.typecost) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            int index = 0;
            foreach(var pos in result.positions)
            {
                pos.id = result.id;
                pos.index = index;
                index++;
            }

            DelPositionMax(query, result.id, index);

            foreach (var pos in result.positions)
            {
                SetPosition(query, pos);
            }

            return result;
        }

        private const string cmdGetPositions = @"Editor\Document\Position\[get]";
        public static document GetPositions(this Query query, document document)
        {
            document result = document;
            result.positions = new List<document_position>();
            query.Execute(cmdGetPositions, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = result.id } }
            , (values) =>
            {
                int c = 1;
                result.positions.Add(new document_position() { index = (int)values[c++], product = new product() { id = (int)values[c++], name = (string)values[c++] }, quantity = (double)values[c++], price = (double)values[c++] });
            });

            return result;
        }

        private const string cmdSetPosition = @"Editor\Document\Position\[set]";
        public static document_position SetPosition(this Query query, document_position position)
        {
            document_position result = position;
            query.Execute(cmdSetPosition, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = result.id }, new SqlParameter() { ParameterName = "@index", Value = result.index }, new SqlParameter() { ParameterName = "@product", Value = result.product.id }, new SqlParameter() { ParameterName = "@quantity", Value = result.quantity }, new SqlParameter() { ParameterName = "@price", Value = result.price } }
            , (values) =>
            {
                int c = 1;
                result.index = (int)values[c++];
                result.product.id = (int)values[c++];
                result.product.name = (string)values[c++];
                result.quantity = (double)values[c++];
                result.price = (double)values[c++];
            });

            if (result.quantity <= 0)
                DelPosition(query, result);

            return result;
        }


        private const string cmdDelPosition = @"Editor\Document\Position\[del]";
        public static void DelPosition(this Query query, document_position position)
        {
            document_position result = position;
            query.Execute(cmdDelPosition, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = result.id }, new SqlParameter() { ParameterName = "@index", Value = result.index } }
            , (values) => { });
        }

        private const string cmdDelPositionMax = @"Editor\Document\Position\[delmax]";
        public static void DelPositionMax(this Query query, int doc, int maxIndex)
        {
            query.Execute(cmdDelPositionMax, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = doc }, new SqlParameter() { ParameterName = "@index", Value = maxIndex } }
            , (values) => { });
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