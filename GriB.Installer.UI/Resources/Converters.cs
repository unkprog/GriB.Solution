using System;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Windows.Data;
using System.Windows.Media.Imaging;

namespace GriB.Installer.UI.Resources
{
    public sealed class ImageConverter : IValueConverter
    {
        internal static Uri GetUriImage(string imageName)
        {
            return new Uri(string.Concat("pack://application:,,,/GriB.Installer.UI;component/Resources/Images", imageName));
        }

        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            BitmapImage result = null;
            try
            {
                result = new BitmapImage(GetUriImage((string)value));
            }
            catch { }
            return result;
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
