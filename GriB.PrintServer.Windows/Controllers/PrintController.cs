﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using GriB.Web.Http;
using GriB.PrintServer.Windows.Common;
using GriB.Common.Models.Print;
using System.Reflection;

namespace GriB.PrintServer.Windows.Controllers
{
    //[RoutePrefix("api")]
    public class PrintController : BaseApiController
    {
        public new string PhysicalApplicationPath => Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

        [ActionName("printers")]
        public HttpResponseMessage GetPrinters()
        {
            List<string> printers = new List<string>();
            foreach (string printer in System.Drawing.Printing.PrinterSettings.InstalledPrinters)
            {
                printers.Add(printer);
            }

            return CreateResponse(HttpStatusCode.OK, new { printers });
        }

        [HttpPost]
        [ActionName("printcheck")]
        public HttpResponseMessage PrintCheck(printserverdata data)
        {
            HttpResponseMessage response = this.CreateResponse(HttpStatusCode.OK);
            string printFile = string.Empty;
            try
            {
                if (FileHelper.CheckFolderChecks())
                {
                    printFile = FileHelper.NewPrintFileNameCheck();
                    using (FileStream fs = new FileStream(printFile, FileMode.CreateNew))
                    {
                        using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8))
                        {
                            writer.WriteLine("<!DOCTYPE html>");
                            writer.WriteLine("<html>");
                            writer.WriteLine("<head>");
                            writer.WriteLine("    <link type=\"text/css\" rel=\"stylesheet\" href=\"css/app.print.min.css\" />");
                            writer.WriteLine("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />");
                            writer.WriteLine("</head>");
                            writer.WriteLine("<body>");
                            writer.WriteLine(data.document);
                            writer.WriteLine("</body>");
                            writer.WriteLine("</html>");
                        }
                    }
                    response = CreateResponse(HttpStatusCode.OK, new { printFile = FileHelper.RelativeFileName(printFile) });
                }
                else
                    response = CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось поставить чек в очередь на печать.");
            }
            catch (Exception ex)
            {
                WriteError(ex);
                response = CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            return response;
        }

        [HttpPost]
        [ActionName("PrintDocument")]
        public HttpResponseMessage PrintDocument(string printData)
        {
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            try
            {
                if (FileHelper.CheckFolderDocuments())
                {
                    using (FileStream fs = new FileStream(FileHelper.NewPrintFileNameDocument(), FileMode.CreateNew))
                    {
                        using (StreamWriter writer = new StreamWriter(fs, Encoding.UTF8))
                        {
                            writer.Write(printData);
                        }
                    }
                }
                else
                    response = CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось поставить документ в очередь на печать.");
            }
            catch (Exception ex)
            {
                WriteError(ex);
                response = CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            return response;
        }
    }
}
