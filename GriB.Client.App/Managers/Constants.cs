using System;

namespace GriB.Client.App.Managers
{
    public static class Constants
    {
        internal static readonly DateTime minReportDate = new DateTime(1899, 12, 30);
        internal static readonly string dateFormat = "dd.MM.yyyy";
        internal static readonly string dateFormatWitTime = "dd.MM.yyyy HH:mm:ss";
    }
}