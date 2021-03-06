using System;
using System.IO;
using GriB.Print.Windows.Properties;

namespace GriB.Print.Windows.Common
{
    public static class FileHelper
    {
        public static string GetFolder(string folderName)
        {
            return string.Concat(AppDomain.CurrentDomain.BaseDirectory, folderName);
        }

        public static bool CheckFolder(string folderName)
        {
            bool result = true;
            try
            {
                string path = GetFolder(folderName);
                result = CheckFolderPath(path);
            }
            catch
            {
                result = false;
            }

            return result;
        }

        public static bool CheckFolderPath(string path)
        {
            bool result = true;
            try
            {
                
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
            }
            catch
            {
                result = false;
            }

            return result;
        }

        public static string GetFolderDocuments()
        {
            CheckFolder(Constants.folderDocuments);
            return GetFolder(Constants.folderDocuments);
        }

        public static string GetFolderDocumentsPrintError()
        {
            string path = GetFolderDocuments();
            CheckFolder(string.Concat(Constants.folderDocuments, "\\", "Error"));
            return GetFolder(string.Concat(path, "\\", "Error"));
        }

        public static bool CheckFolderDocuments()
        {
            return CheckFolder(Constants.folderDocuments);
        }

        public static string GetFolderChecks()
        {
            CheckFolder(Constants.folderChecks);
            return GetFolder(Constants.folderChecks);
        }

        public static string GetFolderChecksPrintError()
        {
            string path = GetFolderChecks();
            return GetFolder(string.Concat(path, "\\", "Error"));
        }

        public static bool CheckFolderChecks()
        {
            return CheckFolder(Constants.folderChecks);
        }

        public static string NewPrintFileName()
        {
            return string.Concat(DateTime.Now.Ticks, "_", Guid.NewGuid().ToString().Replace("-", ""), ".html");
            
        }

        public static string NewPrintFileNameDocument()
        {
            return string.Concat(GetFolderDocuments(), "\\", NewPrintFileName());
        }

        public static string NewPrintFileNameCheck()
        {
            return string.Concat(GetFolderChecks(), "\\", NewPrintFileName());
        }

        public static string RelativeFileName(string fileName)
        {
            if (!string.IsNullOrEmpty(fileName))
                return fileName.Replace(AppDomain.CurrentDomain.BaseDirectory, "");
            else return string.Empty;
        }

    }
}
