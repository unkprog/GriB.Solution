using GriB.Common.Models.pos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace GriB.Console.Test
{
    class Program
    {
        static void Main(string[] args)
        {

            string email = "supposcloud@gmail.com", address = "bsisoftx@mail.ru";
            string password = "hrauCooh4m@p4Sah";

            NewHeadlessEmail(email, password, address, "SSSS", "test");
            //var loginInfo = new NetworkCredential(email, password);
            //var msg = new MailMessage();
            //var smtpClient = new SmtpClient("smtp.gmail.com", 587);

            //msg.From = new MailAddress(email);
            //msg.To.Add(new MailAddress(address));
            //msg.Subject = "Subject";
            //msg.Body = "Body";
            //msg.IsBodyHtml = true;

            //smtpClient.EnableSsl = true;
            //smtpClient.UseDefaultCredentials = false;
            //smtpClient.Credentials = loginInfo;
            //smtpClient.Send(msg);


            //var fromAddress = new MailAddress("supposcloudm@gmail.com", "Support");
            //var toAddress = new MailAddress("bsisoftx@mail.com", "To bsisoft");
            //const string fromPassword = "hrauCooh4m@p4Sah";
            //const string subject = "Subject";
            //const string body = "Body";

            //var smtp = new SmtpClient
            //{
            //    Host = "smtp.gmail.com",
            //    Port = 587,
            //    EnableSsl = true,
            //    DeliveryMethod = SmtpDeliveryMethod.Network,
            //    UseDefaultCredentials = false,
            //    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
            //    //, Timeout = 10
            //};
            //using (var message = new MailMessage(fromAddress, toAddress)
            //{
            //    Subject = subject,
            //    Body = body
            //})
            //{
            //    smtp.Send(message);
            //}
            System.Console.WriteLine();
        }

        public static void NewHeadlessEmail(string fromEmail, string password, string toAddress, string subject, string body)
        {
            using (System.Net.Mail.MailMessage myMail = new System.Net.Mail.MailMessage())
            {
                myMail.From = new MailAddress(fromEmail);
                myMail.To.Add(toAddress);
                myMail.Subject = subject;
                myMail.IsBodyHtml = true;
                myMail.Body = body;

                using (System.Net.Mail.SmtpClient s = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587))
                {
                    //ServicePointManager.ServerCertificateValidationCallback = CertificateValidationCallBack;
                    s.DeliveryMethod = SmtpDeliveryMethod.Network;
                    s.UseDefaultCredentials = false;
                    s.Credentials = new System.Net.NetworkCredential(myMail.From.ToString(), password);
                    s.EnableSsl = true;
                    s.Send(myMail);
                }
            }
        }

        public static bool CertificateValidationCallBack(
       object sender,
       System.Security.Cryptography.X509Certificates.X509Certificate certificate,
       System.Security.Cryptography.X509Certificates.X509Chain chain,
       System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
                return true;

            //// If the certificate is a valid, signed certificate, return true.
            //if (sslPolicyErrors == System.Net.Security.SslPolicyErrors.None)
            //{
            //    Session.SessionManager.WriteToLog("SmtpClientAppSettings: Проверка сертификата - ошибок не обнаружено...");
            //    return true;
            //}

            //// If there are errors in the certificate chain, look at each error to determine the cause.
            //if ((sslPolicyErrors & System.Net.Security.SslPolicyErrors.RemoteCertificateChainErrors) != 0)
            //{
            //    if (chain != null && chain.ChainStatus != null)
            //    {
            //        foreach (System.Security.Cryptography.X509Certificates.X509ChainStatus status in chain.ChainStatus)
            //        {
            //            if ((certificate.Subject == certificate.Issuer) && (status.Status == System.Security.Cryptography.X509Certificates.X509ChainStatusFlags.UntrustedRoot))
            //            {
            //                Session.SessionManager.WriteToLog("SmtpClientAppSettings: Проверка сертификата - самоподписанный сертификат...");
            //                continue;
            //            }
            //            else
            //            {
            //                if (status.Status != System.Security.Cryptography.X509Certificates.X509ChainStatusFlags.NoError)
            //                {
            //                    // If there are any other errors in the certificate chain, the certificate is invalid,
            //                    // so the method returns false.
            //                    Session.SessionManager.WriteToLog("SmtpClientAppSettings: Проверка сертификата - ошибка " + status.Status + "...");
            //                    return false;
            //                }
            //            }
            //        }
            //    }

            //    // When processing reaches this line, the only errors in the certificate chain are 
            //    // untrusted root errors for self-signed certificates. These certificates are valid
            //    // for default Exchange server installations, so return true.
            //    Session.SessionManager.WriteToLog("SmtpClientAppSettings: Проверка сертификата - ок...");
            //    return true;
            //}
            //else
            //{
            //    // In all other cases, return false.
            //    Session.SessionManager.WriteToLog("SmtpClientAppSettings: Проверка сертификата - ошибка не определена...");
            //    return false;
            //}
        }

    }
}
