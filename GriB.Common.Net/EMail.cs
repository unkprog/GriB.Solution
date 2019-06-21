﻿using System.Net.Mail;

namespace GriB.Common.Net
{
    public class EMail
    {
        public static void SendEMail(string fromEmail, string password, string toAddress, string subject, string body)
        {
            using (MailMessage myMail = new MailMessage())
            {
                myMail.From = new MailAddress(fromEmail);
                myMail.To.Add(toAddress);
                myMail.Subject = subject;
                myMail.IsBodyHtml = true;
                myMail.Body = body;

                using (SmtpClient s = new SmtpClient("webmail.poscloudgb.ru", 25))
                {
                    s.DeliveryMethod = SmtpDeliveryMethod.Network;
                    s.UseDefaultCredentials = false;
                    s.Credentials = new System.Net.NetworkCredential(myMail.From.ToString(), password);
                    s.EnableSsl = false;
                    s.Send(myMail);
                }
            }
        }
    }
}
