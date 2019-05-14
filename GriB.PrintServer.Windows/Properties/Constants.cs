namespace GriB.PrintServer.Windows.Properties
{
    internal static class Constants
    {
        internal const string sourceAppImage = "GriB.PrintServer.Windows.Icons.{0}.png";
        internal const string serviceName = "GriB.PrintServer.Windows.Service";

        internal const int LOCALSERVER = 1;
        internal static string CloudServer
        {
            get
            {
                return (LOCALSERVER == 1 ? "http://localhost:50970" : Settings.Default.CloudServer);
            }
        }
    }
}
