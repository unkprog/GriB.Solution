using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Sql;
using GriB.Client.App.Models.Editor;
using System;
using GriB.Client.App.Models.POSTerminal;

namespace GriB.Client.App.Managers.Editors
{
    public static class Document
    {

        private static document readFromValues(object[] values) => new document() { id = (int)values[0], doctype = (int)values[1], options = (int)values[2], date = (DateTime)values[3], salepoint = new salepoint() { id = (int)values[4], name = (string)values[9] }, salepointto = new salepoint() { id = (int)values[5], name = (string)values[10] }, contractor = new contractor() { id = (int)values[6], name = (string)values[11] }, typecost= (int)values[7], reason = new reason() { id = (int)values[8], name = (string)values[12] }, sum = (double)values[13] };

        private const string cmdGet = @"Editor\Document\[get]";
        public static List<document> GetDocuments(this Query query, document_params docpar)
        {
            List<document> result = new List<document>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = docpar.id }, new SqlParameter() { ParameterName = "@doctype", Value = docpar.doctype }
            , new SqlParameter() { ParameterName = "@salepoint", Value = docpar.salepoint }, new SqlParameter() { ParameterName = "@salepointto", Value = docpar.salepointto }
            , new SqlParameter() { ParameterName = "@contractor", Value = docpar.contractor }, new SqlParameter() { ParameterName = "@reason", Value = docpar.reason }
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
            GetComment(query, result);
            GetPositions(query, result);
            return result;
        }

        private const string cmdSet = @"Editor\Document\[set]";
        public static document SetDocument(this Query query, document document, int user)
        {
            document result = document;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@u", user), new SqlParameter("@doctype", result.doctype), new SqlParameter("@options", result.options), new SqlParameter("@date", result.date), new SqlParameter("@typecost", result.typecost)
            , new SqlParameter("@salepoint",  result.salepoint == null ? 0 : result.salepoint.id), new SqlParameter("@salepointto", result.salepointto ==null ? 0 : result.salepointto.id)
            , new SqlParameter("@contractor",  result.contractor == null? 0 : result.contractor.id), new SqlParameter("@reason", result.reason == null ? 0 : result.reason.id) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            SetComment(query, result);

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

        private const string cmdGetComment = @"Editor\Document\Comment\[get]";
        public static void GetComment(this Query query, document document)
        {
            query.Execute(cmdGetComment, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = document.id } }
            , (values) => { document.comment = (string)values[1]; });
        }

        private const string cmdSetComment = @"Editor\Document\Comment\[set]";
        public static void SetComment(this Query query, document document)
        {
            query.Execute(cmdSetComment, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = document.id }, new SqlParameter() { ParameterName = "@comment", Value = document.comment } }
            , (values) => { });
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



        //private static saledocument readSaleFromValues(object[] values) => new saledocument() { id = (int)values[0], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu= (int)values[5]
        //    , options = (int)values[6], number= (int)values[7], change=(int)values[8], discount=(double)values[9], comment=(string)values[10]
        //    , salepoint = new salepoint() { id = (int)values[11], name = (string)values[12] }
        //    , client = new client() { id = (int)values[13], fname = (string)values[14], mname = (string)values[15], lname = (string)values[16] }
        //    , sum = (double)values[17]
        //};

        //private const string cmdGetSale = @"POSTerminal\Check\[getcard]";
        //public static List<saledocument> GetSales(this Query query, sales_params docpar)
        //{
        //    List<check> result = new List<check>();
        //    query.Execute(cmdGetSale, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = docpar.id }
        //    , new SqlParameter() { ParameterName = "@salepoint", Value = docpar.salepoint }
        //    , new SqlParameter() { ParameterName = "@datefrom", Value = docpar.datefrom }, new SqlParameter() { ParameterName = "@dateto", Value = docpar.dateto} }
        //    , (values) =>
        //    {
        //        result.Add(readSaleFromValues(values));
        //    });

        //    return result;
        //}
    }
}