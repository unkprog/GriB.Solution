using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using GriB.Common.Models.pos;
using GriB.Common.Sql;

namespace GriB.General.App.Managers.pos
{
    public static class Users
    {
        public static List<user> GetUsers(this Query query, int regtype, string find)
        {
            List<user> result = new List<user>();
            query.Execute("[user_get]", new SqlParameter[] { new SqlParameter("@regtype", regtype), new SqlParameter("@find", find) }
            , (values) =>
            {
                result.Add(new user() { id = (int)values[0], regtype = (int)values[1], phone = (string)values[2], email = (string)values[3] });
            });

            return result;
        }
        public static user GetUser(this Query query, int id)
        {
            user result = null;
            query.Execute("[user_get_id]", new SqlParameter[] { new SqlParameter("@id", id) }
            , (values) =>
            {
                result = new user() { id = (int)values[0], cd = (DateTime)values[1], cu = (string)values[2], ud = (DateTime)values[3], uu = (string)values[4], regtype = (int)values[5], phone = (string)values[6], email = (string)values[7] };
            });
            return result;
        }

        public static user Insert(this Query query, user user)
        {
            user result = null;
            query.Execute("[user_ins]", new SqlParameter[] { new SqlParameter("@cu", AppSettings.Database.su), new SqlParameter("@uu", AppSettings.Database.su), new SqlParameter("@regtype", user.regtype), new SqlParameter("@phone", user.phone), new SqlParameter("@email", user.email) }
            , (values) =>
            {
                result = query.GetUser((int)values[0]);
            });

            return result;
        }

        public static void SetPassword(this Query query, user_sec user_sec)
        {
            //user result = null;
            query.Execute("[user_sec_pass]", new SqlParameter[] { new SqlParameter("@id", user_sec.id), new SqlParameter("@pass", user_sec.pass) }
            , (values) =>
            {
                //result = query.GetUser((int)values[0]);
            });
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
    }
}