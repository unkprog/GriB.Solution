using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Models.pos;
using GriB.Common.Sql;

namespace GriB.General.App.Managers.pos
{
    public static class Users
    {
        private const string cmdGet = @"user\[get]";
        private static user readUserFromValues(object[] values) => new user() { id = (int)values[0], d = (int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5], phone = (string)values[6] };

        public static List<user> GetUsers(this Query query, string phone)
        {
            List<user> result = new List<user>();
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter("@field", "phone"), new SqlParameter() { ParameterName = "@id", Value = 0 }, new SqlParameter("@phone", phone) }
            , (values) =>
            {
                result.Add(readUserFromValues(values));
            });

            return result;
        }

        public static user GetUser(this Query query, int id)
        {
            user result = null;
            query.Execute(cmdGet, new SqlParameter[] { new SqlParameter("@field", "id"), new SqlParameter("@id", id), new SqlParameter("@phone", "") }
            , (values) =>
            {
                result = readUserFromValues(values);
            });
            return result;
        }

        private const string cmdIns = @"user\[ins]";
        public static user Insert(this Query query, user user)
        {
            user result = null;
            query.Execute(cmdIns, sqlParameters: new SqlParameter[] { new SqlParameter("@cu", AppSettings.Database.su), new SqlParameter("@uu", AppSettings.Database.su), new SqlParameter("@phone", user.phone) }
            , action: (values) =>
            {
                result = query.GetUser((int)values[0]);
            });

            return result;
        }

        private const string cmdRoleIns = @"user\role\[ins]";
        public static user_role InsertRole(this Query query, user_role user_role)
        {
            user_role result = new user_role() { user = user_role.user, role = user_role.role };
            query.Execute(cmdRoleIns, new SqlParameter[] { new SqlParameter("@user", user_role.user), new SqlParameter("@role", user_role.role) }
            , (values) =>
            {
                result.id = (int)values[0];
            });

            return result;
        }

        private const string cmdPassGet = @"user\sec\[get]";
        public static user_sec GetPassword(this Query query, int id)
        {
            user_sec user_sec = null;
            query.Execute(cmdPassGet, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => {
                user_sec = new user_sec() { id = id, pass = (string)values[1] };
            });
            return user_sec;
        }

        private const string cmdPassSet = @"user\sec\[set]";
        public static void SetPassword(this Query query, user_sec user_sec)
        {
            query.Execute(cmdPassSet, new SqlParameter[] { new SqlParameter("@id", user_sec.id), new SqlParameter("@pass", user_sec.pass) }
            , (values) => { });
        }

        private static readonly string alphabet = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ01234567899876543210aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
        private static readonly Random r = new Random();

        public static string GeneratePassword(int length)
        {
            if (length < 1 || length > 128)
                throw new ArgumentException("password_length_incorrect", "length");

            var chArray = new char[length];
            var password = string.Empty;
            for (int i = 0; i < length; i++)
            {
                int j = r.Next(alphabet.Length);
                char nextChar = alphabet[j];
                chArray[i] = (nextChar);
            }
            return new string(chArray);
        }


        private const string cmdPersonGet = @"user\person\[get]";
        public static user_person GetPerson(this Query query, int id)
        {
            user_person user_person = null;
            query.Execute(cmdPersonGet, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => {
                user_person = new user_person() { id = id, sex = (int)values[1], birth = (DateTime)values[2], fname = (string)values[3], mname = (string)values[4], lname = (string)values[5], email = (string)values[6] };
            });
            return user_person;
        }

        private const string cmdDatabaseIns = @"user\db\[ins]";
        public static user_db DatabaseIns(this Query query, user_db user_db)
        {
            query.Execute(cmdDatabaseIns, new SqlParameter[] { new SqlParameter("@id", user_db.id), new SqlParameter("@db", user_db.db) }
            , (values) => { });
            return user_db;
        }

        private const string cmdDatabaseGet = @"user\db\[get]";
        public static user_db GetDatabase(this Query query, int id)
        {
            user_db user_db = null;
            query.Execute(cmdDatabaseGet, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) => {
                user_db = new user_db() { id = id, db = (int)values[1] };
            });
            return user_db;
        }

        private const string cmdGetFull = @"user\[get_full]";
        private static user_full readUserFullFromValues(object[] values) => new user_full() { id = (int)values[0], d = (int)values[1], cd = (DateTime)values[2], cu = (int)values[3], ud = (DateTime)values[4], uu = (int)values[5], pid = (int)values[6]
            , phone = (string)values[7]
            , person = new user_person() { sex = (int)values[8], birth = (DateTime)values[9], fname=(string)values[10], mname = (string)values[11], lname = (string)values[12], email = (string)values[13] }
            , db = new sqldb_full() { id = (int)values[15], catalog = (string)values[16], server = (int)values[17], sqlsrv = new sqlsrv() {  id= (int)values[17], address = (string)values[18] } }
        };
        public static List<user_full> GetUsersFull(this Query query, int id = 0)
        {
            List<user_full> result = new List<user_full>();
            query.Execute(cmdGetFull, new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) =>
            {
                result.Add(readUserFullFromValues(values));
            });

            return result;
        }
    }
}