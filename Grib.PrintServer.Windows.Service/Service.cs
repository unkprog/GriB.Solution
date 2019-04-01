using System;
using System.ServiceProcess;

namespace GriB.PrintServer.Windows.Service
{
    public partial class Service : ServiceBase
    {
        private Server _server;
       
        public Service()
        {
            InitializeComponent();
            this.ServiceName = "GriB.PrintServer.Windows.Service";
        }

        protected override void OnStart(string[] args)
        {
            _server = new Server();
            _server.Start();
        }

        protected override void OnStop()
        {
            if (_server != null)
                _server.Stop();
        }

        public void StartSvc(string[] args)
        {
            this.OnStart(args);
        }

        public void StopSvc()
        {
            this.OnStop();
        }
    }
}
