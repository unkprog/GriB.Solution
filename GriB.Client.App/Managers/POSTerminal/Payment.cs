﻿using System;
using System.Collections.Generic;
using GriB.Common.Sql;
using GriB.Client.App.Models.POSTerminal;
using System.Data.SqlClient;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Managers.POSTerminal
{
    public static class Payment
    {
        private static payment readFromValues(object[] values) {
            int cnt = 0;
            return new payment() { id = (int)values[cnt++], cd = (DateTime)values[cnt++], check = new check() { id = (int)values[cnt++] }, ptype = (int)values[cnt++], sum = (double)values[cnt++], options = (int)values[cnt++], comment = (string)values[cnt++]
            , salepoint = new salepoint() { id = (int)values[cnt++], name = (string)values[cnt++] }
            , client = new client() { id = (int)values[cnt++], fname = (string)values[cnt++], mname = (string)values[cnt++], lname = (string)values[cnt++] }
            , cu = (int)values[cnt++], doctype = (int)values[cnt++]
            , costincome = new costincome() { id = (int)values[cnt++], name = (string)values[cnt++] }
            , account = new account() { id = (int)values[cnt++], name = (string)values[cnt++] }
            };
        }

        private const string cmdGet = @"POSTerminal\Payment\[get]";
        public static List<payment> GetPayments(this Query query, payments_params docpar, Dictionary<int, employeecard> employees)
        {
            List<payment> result = new List<payment>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = docpar.id }
            , new SqlParameter() { ParameterName = "@type", Value = docpar.type }, new SqlParameter() { ParameterName = "@salepoint", Value = docpar.salepoint }, new SqlParameter() { ParameterName = "@employee", Value = docpar.employee }
            , new SqlParameter() { ParameterName = "@option", Value = (docpar.options != 0 ? (1 << docpar.options) : 0) }, new SqlParameter() { ParameterName = "@client", Value = docpar.client }
            , new SqlParameter() { ParameterName = "@datefrom", Value = Reports.Helper.Date(docpar.datefrom) }, new SqlParameter() { ParameterName = "@dateto", Value = Reports.Helper.DateReportEnd(docpar.dateto) }, new SqlParameter() { ParameterName = "@doctype", Value = docpar.doctype }}
            , (values) =>
            {
                payment item = readFromValues(values);
                if(employees!= null)
                {
                    employeecard empl;
                    if (employees.TryGetValue(item.cu, out empl))
                    {
                        item.employee = empl;
                    }
                }
                result.Add(item);
            });

            return result;
        }

        public static payment GetPayment(this Query query, int id)
        {
            payments_params docpar = new payments_params() { id = id };
            List<payment> payments = GetPayments(query, docpar, null);
            payment result = (payments == null || payments.Count == 0 ? new payment() { id = id, ptype = 1, cd = DateTime.Now } : payments[0]);
            return result;
        }

        private const string cmdSet = @"POSTerminal\Payment\[set]";
        public static payment SetPayment(this Query query, payment payment, int user)
        {
            payment result = payment;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", result.id), new SqlParameter("@u", user), new SqlParameter("@doctype", payment.doctype), new SqlParameter("@check", result.check == null?0:result.check.id), new SqlParameter("@type", result.ptype), new SqlParameter("@sum", result.sum)
                , new SqlParameter("@option", result.options), new SqlParameter("@client", result.client == null ? 0 :result.client.id), new SqlParameter("@salepoint", result.salepoint == null ? 0: result.salepoint.id)
                , new SqlParameter("@costincome", result.costincome == null ? 0 :result.costincome.id), new SqlParameter("@account", result.account == null ? 0 :result.account.id)
            }
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


        private const string cmdGetComment = @"POSTerminal\Payment\Comment\[get]";
        public static void GetComment(this Query query, payment payment)
        {
            query.Execute(cmdGetComment, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = payment.id } }
            , (values) => { payment.comment = (string)values[1]; });
        }

        private const string cmdSetComment = @"POSTerminal\Payment\Comment\[set]";
        public static void SetComment(this Query query, payment payment)
        {
            query.Execute(cmdSetComment, new SqlParameter[] { new SqlParameter() { ParameterName = "@id", Value = payment.id }, new SqlParameter() { ParameterName = "@comment", Value = payment.comment } }
            , (values) => { });
        }
    }
}