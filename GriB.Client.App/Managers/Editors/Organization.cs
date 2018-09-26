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

        private const string cmdGetInfo = @"Organization\Info\[get]";

        public static t_org GetOrganizationInfo(this Query query, t_org org)
        {
            t_org result = org;
            if (result.properties == null)
                result.properties = new List<model_property_value>();

            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter("@id", org.id) }
            , (values) =>
            {
                result.properties.Add(new model_property_value() { id = (int)values[0], value = (string)values[1], property = new model_property() { id = (int)values[2], typeval = (int)values[3], name = (string)values[4] } });
            });

            return result;
        }
    }
}