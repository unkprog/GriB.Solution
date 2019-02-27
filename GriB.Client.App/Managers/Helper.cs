using GriB.Common.Models.pos;
using System;


namespace GriB.Client.App.Managers
{
    public static class Helper
    {
        public static string MinReportDate() => Constants.minReportDate.ToString(Constants.dateFormat);

        public static bool IsExistsDate(string _date, out DateTime outdate)
        {
            outdate = Date(_date);
            return outdate > Constants.minReportDate;
        }

        public static DateTime Date(string _date)
        {
            DateTime result = Constants.minReportDate;
            if(!DateTime.TryParseExact(_date, Constants.dateFormat, null, System.Globalization.DateTimeStyles.None, out result))
                result = Constants.minReportDate;
            return result;
        }

        public static DateTime DateReportEnd(string _date)
        {
            DateTime result = Constants.minReportDate;
            if (DateTime.TryParseExact(_date, Constants.dateFormat, null, System.Globalization.DateTimeStyles.None, out result) && result >  Constants.minReportDate)
                result = result.AddDays(1);
            return result;
        }

        public static bool IsEmptyValue(this model_base value)
        {
            return (value == null || value.id == 0);
        }

        public static int GetSqlParamValue(this model_base value)
        {
            return (value == null ? 0 : value.id);
        }
    }
}