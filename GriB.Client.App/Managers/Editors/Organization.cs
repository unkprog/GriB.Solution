using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using GriB.Client.App.Models;
using GriB.Common.Models.pos;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.Editors
{
    public static class Organization
    {
        private const string cmdGet = @"Organization\[get]";
        private static t_org readFromValues(object[] values) => new t_org() { id = (int)values[0], d = (int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5], name = (string)values[6], type = (int)values[7] };

        public static List<t_org> GetOrganizations(this Query query)
        {
            List<t_org> result = new List<t_org>();
            query.Execute(cmdGet, new SqlParameter[] { }
            , (values) =>
            {
                result.Add(readFromValues(values));
            });

            return result;
        }

        private const string cmdSet = @"Organization\[set]";
        public static t_org SetOrganization(this Query query, t_org org)
        {
            t_org result = org;
            query.Execute(cmdSet, new SqlParameter[] { new SqlParameter("@cu", org.cu), new SqlParameter("@uu", org.uu), new SqlParameter("@name", org.name), new SqlParameter("@type", org.type) }
            , (values) =>
            {
                org.id = (int)values[0];
            });

            return result;
        }

        private const string cmdGetInfo = @"Organization\Info\[get]";
        public static t_org GetOrganizationInfo(this Query query, t_org org)
        {
            t_org result = org;

            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter("@id", org.id) }
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

    }
}