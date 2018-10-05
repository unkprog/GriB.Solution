using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using GriB.Client.App.Models;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.Editors
{
    public static class Organization
    {
        private const string cmdGet = @"Organization\[get]";
        private static t_org readFromValues(object[] values) => new t_org() { id = (int)values[0], d = (int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5], name = (string)values[6], type = (int)values[7], pid = (int)values[8] };

        public static List<t_org> GetOrganizations(this Query query, int type)
        {
            List<t_org> result = new List<t_org>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@field", Value = string.Empty }, new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter() { ParameterName = "@type", Value = type } }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        public static t_org GetOrganization(this Query query, int id)
        {
            t_org result = new t_org();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter() { ParameterName = "@field", Value = "id" }, new SqlParameter() { ParameterName = "@id", Value = id }, new SqlParameter() { ParameterName = "@type", Value = 0 } }
            , (values) =>
            {
                result = readFromValues(values);
            });

            return result;
        }

        private const string cmdSet = @"Organization\[set]";
        public static t_org SetOrganization(this Query query, t_org org)
        {
            t_org result = org;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@id", org.id), new SqlParameter("@cu", org.cu), new SqlParameter("@uu", org.uu), new SqlParameter("@name", org.name), new SqlParameter("@type", org.type), new SqlParameter("@pid", org.pid) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return GetOrganization(query, result.id);
        }

        private const string cmdGetInfo = @"Organization\Info\[get]";
        public static t_org GetOrganizationInfo(this Query query, t_org org)
        {
            t_org result = org;

            query.Execute(cmdGetInfo, new SqlParameter[] { new SqlParameter("@id", org.id) }
            , (values) =>
            {
                org.info = new t_org_info() { phone = (string)values[1], email = (string)values[2], site = (string)values[3] };
            });

            return result;
        }

        private const string cmdSetInfo = @"Organization\Info\[set]";
        public static t_org SetOrganizationInfo(this Query query, t_org org)
        {
            t_org result = org;
            query.Execute(cmdSetInfo, new SqlParameter[] { new SqlParameter("@id", org.id), new SqlParameter("@phone", org.info.phone), new SqlParameter("@email", org.info.email), new SqlParameter("@site", org.info.site) }
            , (values) => { });

            return result;
        }

        private const string cmdGetInfo1 = @"Organization\Info1\[get]";
        public static t_org GetOrganizationInfo1(this Query query, t_org org)
        {
            t_org result = org;

            query.Execute(cmdGetInfo1, new SqlParameter[] { new SqlParameter("@id", org.id) }
            , (values) =>
            {
                org.info1 = new t_org_info1() { address = (string)values[1], schedule = (string)values[2] };
            });

            return result;
        }

        private const string cmdSetInfo1 = @"Organization\Info1\[set]";
        public static t_org SetOrganizationInfo1(this Query query, t_org org)
        {
            t_org result = org;
            query.Execute(cmdSetInfo1, new SqlParameter[] { new SqlParameter("@id", org.id), new SqlParameter("@address", org.info1.address), new SqlParameter("@schedule", org.info1.schedule) }
            , (values) => { });

            return result;
        }

    }
}