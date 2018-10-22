﻿using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Client.App.Models;
using GriB.Client.App.Models.Editor;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.Editors
{
    public static class Employee
    {

        private static employee readFromValues(employee empl, object[] values)
        {
            empl.isaccess = (bool)values[1];
            empl.openonlogin = (int)values[2];
            return empl;
        }

        //public static List<t_org> GetOrganizations(this Query query, int type)
        //{
        //    List<t_org> result = new List<t_org>();
        //    query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@field", Value = string.Empty }, new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@name", Value = string.Empty }, new SqlParameter() { ParameterName = "@type", Value = type } }
        //    , (values) =>
        //    {
        //        result.Add(readFromValues(values));
        //    });

        //    return result;
        //}

        private const string cmdGet = @"Employee\[get]";
        public static employee GetEmployee(this Query query, employee empl)
        {
            employee result = empl;
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter("@id", empl?.id) }
            , (values) =>
            {
                result = readFromValues(result, values);
            });

            return result;
        }


        private const string cmdSet = @"Employee\[set]";
        public static employee SetEmployee(this Query query, employee empl)
        {
            employee result = empl;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", empl.id), new SqlParameter("@isaccess", empl.isaccess), new SqlParameter("@openonlogin", empl.openonlogin) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return result;
        }

        private const string cmdDel = @"Employee\[del]";
        public static void DelEmployee(this Query query,int id)
        {
            query.Execute(cmdDel, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => { });
        }

        private const string cmdGetSalepointAcces = @"Employee\SalepointAccess\[get]";
        public static employee GetEmployeeSalepointAccess(this Query query, employee empl)
        {
            employee result = empl;
            result.accesssalepoints = new List<employee_salepointaccess>();

            query.Execute(cmdGetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", empl.id), new SqlParameter("@type", Organization.typeDivision) }
            , (values) =>
            {
                int idx = 0;
                employee_salepointaccess item = new employee_salepointaccess()
                {
                      salepoint = new salepoint() { id = (int)values[idx++], name = (string)values[idx++], company_id = (int)values[idx++], city = (string)values[idx++], address = (string)values[idx++], schedule = (string)values[idx++] }
                    , isaccess = (bool)values[idx++], isdefault = (bool)values[idx++]
                };
                result.accesssalepoints.Add(item);
            });

            return result;
        }

        private const string cmdSetSalepointAcces = @"Employee\SalepointAccess\[set]";
        public static employee SetEmployeeSalepointAccess(this Query query, employee empl)
        {
            employee result = empl;
            foreach(var item in  result.accesssalepoints)
            query.Execute(cmdSetSalepointAcces, new SqlParameter[] { new SqlParameter("@id", empl.id), new SqlParameter("@salepoint", item.salepoint.id), new SqlParameter("@isaccess",item.isaccess), new SqlParameter("@isdefault", item.isdefault) }
            , (values) => { });

            return result;
        }

    }
}