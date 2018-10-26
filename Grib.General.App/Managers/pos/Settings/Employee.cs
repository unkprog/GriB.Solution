﻿using GriB.Common.Models.pos.settings;
using GriB.Common.Sql;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace GriB.General.App.Managers.pos.Settings
{
    public static class Employee
    {
        private static employee readEmployeeFromValues(object[] values) => new employee() { id = (int)values[0], d = (int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5],  pid = (int)values[6]
            , phone = (string)values[7],
            sex = (int)values[8], birth = (DateTime)values[9],
            fname = (string)values[10],
            mname = (string)values[11],
            lname = (string)values[12],
            email = (string)values[13],
            pass = (string)values[14]
        };

        private const string cmdGetEmploees = @"user\Get\[employees]";
        public static List<employee> GetEmployees(this Query query, int db)
        {
            List<employee> result = new List<employee>();
            query.Execute(cmdGetEmploees, new SqlParameter[] { new SqlParameter("@db", db) }
            , (values) =>
            {
                result.Add(readEmployeeFromValues(values));
            });

            return result;
        }

        private const string cmdGetEmploee = @"user\Get\[employee]";
        public static employee GetEmployee(this Query query, int id)
        {
            employee result = new employee();
            query.Execute(cmdGetEmploee, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) =>
            {
                result = readEmployeeFromValues(values);
            });

            return result;
        }

        private const string cmdDelEmploee = @"user\[del]";
        public static void DelEmployee(this Query query, int id)
        {
            query.Execute(cmdDelEmploee, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => { });
        }

        private const string cmdSetUserEmploee = @"user\[set]";
        private const string cmdSetUserDbEmploee = @"user\db\[set]";
        private const string cmdSetUserPersonEmploee = @"user\person\[set]";
        private const string cmdSetUserSecEmploee = @"user\sec\[set]";
        public static void SetEmployee(this Query query, int db, employee empl)
        {
            query.Execute(cmdSetUserEmploee, new SqlParameter[] { new SqlParameter("@id", empl.id), new SqlParameter("@db", db), new SqlParameter("@cu", empl.cu), new SqlParameter("@uu", empl.uu), new SqlParameter("@phone", empl.phone) }
            , (values) => { empl.id = (int)values[0]; });

            query.Execute(cmdSetUserDbEmploee, new SqlParameter[] { new SqlParameter("@id", empl.id), new SqlParameter("@db", db) }
            , (values) => { });

            query.Execute(cmdSetUserSecEmploee, new SqlParameter[] { new SqlParameter("@id", empl.id), new SqlParameter("@pass", empl.pass), new SqlParameter("@birth", empl.birth), new SqlParameter("@fname", empl.fname), new SqlParameter("@mname", empl.mname), new SqlParameter("@lname", empl.lname), new SqlParameter("@email", empl.email) }
            , (values) => { });


            query.Execute(cmdSetUserPersonEmploee, new SqlParameter[] { new SqlParameter("@id", empl.id), new SqlParameter("@sex", empl.sex), new SqlParameter("@birth", empl.birth), new SqlParameter("@fname", empl.fname), new SqlParameter("@mname", empl.mname), new SqlParameter("@lname", empl.lname), new SqlParameter("@email", empl.email) }
            , (values) => { });

        }

    }
}