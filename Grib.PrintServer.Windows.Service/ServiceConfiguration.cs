using System.ServiceProcess;

namespace GriB.PrintServer.Windows.Service
{
    class ServiceConfiguration
    {
        public static string DisplayName
        {
            get { return "Print-server POS Cloud"; }
        }

        public static string ServiceName
        {
            get { return "Print-server POS Cloud"; }
        }

        public static string Description
        {
            get
            {
                return "Print-server POS Cloud is a helper developed to manage the state of the proxy for the employess whilst of the internal network.";
            }
        }

        public static ServiceStartMode StartType
        {
            get { return ServiceStartMode.Automatic; }
        }

        public static ServiceAccount AccountType
        {
            get { return ServiceAccount.LocalService; }
        }

        
    }
}
