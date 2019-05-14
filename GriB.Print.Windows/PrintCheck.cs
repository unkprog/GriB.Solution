using GriB.Common.Models.Print;
using GriB.Print.Windows.Common;
using GriB.Print.Windows.Properties;
using System;
using System.IO;
using System.Text;


namespace GriB.Print.Windows
{
    public static class PrintCheck
    {
        public static string Print(printserverdata data)
        {
            string result = string.Empty;

            if (FileHelper.CheckFolderChecks())
            {
                result = FileHelper.NewPrintFileNameCheck();
                using (FileStream fs = new FileStream(result, FileMode.CreateNew))
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
            }
            else
                throw new Exception("Не удалось поставить чек в очередь на печать.");

            return result;
        }
        internal static Stream GetAppCSS(string cssName)
        {
            return typeof(PrintCheck).Assembly.GetManifestResourceStream(string.Format(Constants.sourceAppCss, cssName));
        }


        public static void RestoreCssCheck(string folderChecks)
        {
            string cssFolderFile = string.Concat(folderChecks, "\\css");
            FileHelper.CheckFolderPath(cssFolderFile);
            string cssFile = string.Concat(cssFolderFile, "\\app.print.min.css");
            if (!File.Exists(cssFile))
            {
                using (Stream cssStream = GetAppCSS("app.print.min"))
                {
                    if (cssStream != null)
                    {
                        using (var fileStream = new FileStream(cssFile, FileMode.Create, FileAccess.Write))
                        {
                            cssStream.CopyTo(fileStream);
                        }
                    }
                }
            }
        }
    }
}
