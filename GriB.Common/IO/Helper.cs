using System;
using System.IO;

namespace GriB.Common.IO
{
    public static class Helper
    {
        public static void ForEachDirectoryFiles(string path, string searchPattern, SearchOption searchOption, Action<FileInfo> action)
        {
            if (!Directory.Exists(path))
                return;

            if (action == null)
                return;

            DirectoryInfo di = new DirectoryInfo(path);
            FileInfo[] files = di.GetFiles(searchPattern, searchOption);

            if (files == null || files.Length == 0)
                return;

            foreach (var file in files)
            {
                action(file);
            }
        }
    }
}
