using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Client.App.Models.Editor;
using GriB.Common.Sql;

namespace GriB.Client.App.Managers.Editors
{
    public static class Client
    {
        private const string cmdGet = @"Editor\Client\[get]";
        private static client readClientFromValues(object[] values) => new client() { id = (int)values[0], d = (int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5], phone = (string)values[6] };

        public static List<client> GetClients(this Query query, string phone)
        {
            List<client> result = new List<client>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter("@field", "phone"), new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter("@phone", phone) }
            , (values) =>
            {
                result.Add(readClientFromValues(values));
            });

            return result;
        }

        public static client GetClient(this Query query, int id)
        {
            client result = null;
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter("@field", "id"), new SqlParameter("@id", id), new SqlParameter("@phone", "") }
            , (values) =>
            {
                result = readClientFromValues(values);
            });
            return result;
        }

        private const string cmdIns = @"Editor\Client\[ins]";
        public static client Insert(this Query query, client client, int user)
        {
            client result = null;
            query.Execute(cmdIns, sqlParameters: new SqlParameter[] { new SqlParameter("@cu", user), new SqlParameter("@uu", user), new SqlParameter("@phone", client.phone) }
            , action: (values) =>
            {
                result = query.GetClient((int)values[0]);
            });

            return result;
        }


        private const string cmdPersonGet = @"Editor\Client\Person\[get]";
        public static client GetPerson(this Query query, client _client, int id)
        {
            client client = _client;
            query.Execute(cmdPersonGet, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => {
                client.sex = (int)values[1];
                client.birth = (DateTime)values[2];
                client.fname = (string)values[3];
                client.mname = (string)values[4];
                client.lname = (string)values[5];
                client.email = (string)values[6];
            });
            return client;
        }


        private static client readClientPersonFromValues(object[] values) => new client() { id = (int)values[0], d = (int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5],  pid = (int)values[6]
            , phone = (string)values[7],
            sex = (int)values[8], birth = (DateTime)values[9],
            fname = (string)values[10],
            mname = (string)values[11],
            lname = (string)values[12],
            email = (string)values[13]
        };

        private const string cmdGetClients = @"Editor\Client\Person\[clients]";
        public static List<client> GetClients(this Query query)
        {
            List<client> result = new List<client>();
            query.Execute(cmdGetClients, null
            , (values) =>
            {
                result.Add(readClientPersonFromValues(values));
            });

            return result;
        }

        private const string cmdGetClientPerson = @"Editor\Client\Person\[client]";
        public static client GetClientPerson(this Query query, int id)
        {
            client result = new client();
            query.Execute(cmdGetClientPerson, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) =>
            {
                result = readClientPersonFromValues(values);
            });

            return result;
        }

        private const string cmdDelClient = @"Editor\Client\[del]";
        public static void DelClient(this Query query, int id, int user)
        {
            query.Execute(cmdDelClient, new SqlParameter[] { new SqlParameter("@id", id), new SqlParameter("@u", user) }
            , (values) => { });
        }

        private const string cmdSetClient = @"Editor\Client\[set]";
        private const string cmdSetClientPerson = @"Editor\Client\Person\[set]";
        public static client SetClientPerson(this Query query, client cli, int user)
        {
            query.Execute(cmdSetClient, new SqlParameter[] { new SqlParameter("@id", cli.id),  new SqlParameter("@cu", user), new SqlParameter("@uu", user), new SqlParameter("@phone", cli.phone) }
            , (values) => { cli.id = (int)values[0]; });

            query.Execute(cmdSetClientPerson, new SqlParameter[] { new SqlParameter("@id", cli.id), new SqlParameter("@sex", cli.sex), new SqlParameter("@birth", cli.birth), new SqlParameter("@fname", cli.fname), new SqlParameter("@mname", cli.mname), new SqlParameter("@lname", cli.lname), new SqlParameter("@email", cli.email) }
            , (values) => { });

            return cli;
        }
    }
}