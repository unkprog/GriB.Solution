using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;

namespace GriB.PrintServer.Windows.Service
{
    public static class Program
    {
        /// <summary>
        /// Главная точка входа для приложения.
        /// </summary>
        static void Main(string[] args)
        {
            if (Environment.UserInteractive)
            {
                //Service service = new Service();
                //service.OnStartAndOnStop(args);
            }
            else
            {
                ServiceBase[] ServicesToRun;
                ServicesToRun = new ServiceBase[] { new Service() };
                ServiceBase.Run(ServicesToRun);
            }
        }

        static Service service = null;
        public static void Run()
        {
            Service service = new Service();
            service.StartSvc(null);
        }

        public static void Stop()
        {
            if (service != null)
                service.StopSvc();
        }
    }
}
