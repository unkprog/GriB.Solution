﻿using GriB.PrintServer.Windows.Common;
using GriB.PrintServer.Windows.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;

namespace GriB.PrintServer.Windows.Controllers
{
    //[RoutePrefix("api")]
    public class PrintController : ApiController
    {
        [ActionName("printers")]
        public HttpResponseMessage GetPrinters()
        {
            List<string> printers = new List<string>();
            foreach (string printer in System.Drawing.Printing.PrinterSettings.InstalledPrinters)
            {
                printers.Add(printer);
            }

            return Request.CreateResponse(HttpStatusCode.OK, new { printers });
        }

        [HttpPost]
        [ActionName("PrintCheck")]
        public HttpResponseMessage PrintCheck(PrintCheckModel printCheck)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
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
                            writer.Write(printCheck.dataPrint);
                        }
                    }
                    response = Request.CreateResponse(HttpStatusCode.OK, new { printFile = FileHelper.RelativeFileName(printFile) });
                }
                else
                    response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось поставить чек в очередь на печать.");
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
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
                    response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Не удалось поставить документ в очередь на печать.");
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
            return response;
        }
    }
}