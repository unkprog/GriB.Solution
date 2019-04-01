using System;
using System.Drawing;
using System.IO;
using System.Reflection;
using System.Windows.Forms;
using System.Threading;
using System.Runtime.InteropServices;
using System.ComponentModel;

namespace GriB.PrintServer.Windows
{
    public class PrintServerContext : ApplicationContext
    {
        NotifyIcon notifyIcon = new NotifyIcon();
        ConfigForm configWindow = new ConfigForm();


        public static Image GetAppImage(string imageName)
        {
            Stream stream = Assembly.GetEntryAssembly().GetManifestResourceStream(string.Format(Properties.Constants.sourceAppImage, imageName));
            return (stream == null ? null : new Bitmap(stream));
        }

        EventHandler showConfigHandler;
        ToolStripItem toolStripItemStartStop = null;
        Bitmap printActiveBitmap = GetAppImage("print_active") as Bitmap;
        Bitmap printDisableBitmap = GetAppImage("print_disabled") as Bitmap;
        Server _server;
        Thread threadPrinServerChecher;
        BackgroundWorker _backgroundWorker;

        public PrintServerContext()
        {
            showConfigHandler = new EventHandler(ShowConfig);
            ContextMenuStrip notifyContextMenu = new ContextMenuStrip();
            notifyContextMenu.Items.Add("Настройки", GetAppImage("settings"), showConfigHandler);
            notifyContextMenu.Items.Add(new ToolStripSeparator());

            toolStripItemStartStop = notifyContextMenu.Items.Add("Старт", printActiveBitmap, new EventHandler(StartStopService));
            toolStripItemStartStop.Enabled = false;

            notifyContextMenu.Items.Add(new ToolStripSeparator());
            notifyContextMenu.Items.Add("Выход", GetAppImage("exit"), new EventHandler(Exit));


            notifyIcon.Icon = Icon.FromHandle(printDisableBitmap.GetHicon());
            notifyIcon.DoubleClick += showConfigHandler;
            notifyIcon.ContextMenuStrip = notifyContextMenu;
            notifyIcon.Visible = true;

            //this.threadPrinServerChecher = new Thread(new ThreadStart(this.PrintServiceCheckProc));
            //this.threadPrinServerChecher.Start();
            

            _backgroundWorker = new BackgroundWorker();
            _backgroundWorker.WorkerReportsProgress = true;
            _backgroundWorker.ProgressChanged += _backgroundWorker_ProgressChanged;
            _backgroundWorker.DoWork += PrintServiceCheckProc;

            _backgroundWorker.RunWorkerAsync();
            StartService();
        }

        void ShowConfig(object sender, EventArgs e)
        {
            if (configWindow.Visible)
                configWindow.Focus();
            else
                configWindow.ShowDialog();
        }

        private void StartStopService(object sender, EventArgs e)
        {
            toolStripItemStartStop.Enabled = false;
            if (toolStripItemStartStop.Text == "Старт")
                StartService();
            else
                StopService();
        }

        private void SetStateUi(bool isRuning)
        {
            if (isRuning)
            {
                if (toolStripItemStartStop.Text != "Стоп")
                {
                    toolStripItemStartStop.Text = "Стоп";
                    toolStripItemStartStop.Image = printDisableBitmap;
                    notifyIcon.Icon = Icon.FromHandle(printActiveBitmap.GetHicon());
                }
            }
            else
            {
                if (toolStripItemStartStop.Text != "Старт")
                {
                    toolStripItemStartStop.Text = "Старт";
                    toolStripItemStartStop.Image = printActiveBitmap;
                    notifyIcon.Icon = Icon.FromHandle(printDisableBitmap.GetHicon());
                }
            }
            toolStripItemStartStop.Enabled = true;
        }
        void Exit(object sender, EventArgs e)
        {
            StopService();
            notifyIcon.Visible = false;
            Application.Exit();
        }

        private void StartService()
        {
            if (_server == null)
                _server = new Server();
            _server.Start();
        }

        private void StopService()
        {
            if (_server != null)
                _server.Stop();
        }

        private void PrintServiceCheckProc(object sender, DoWorkEventArgs e)
        {
            bool result = false;
            int progress = 0;
            while (true)
            {
                if (_server != null)
                {
                    //result = _server.IsServerRuning();
                    progress++;
                    _backgroundWorker.ReportProgress(progress);
                    //configWindow.Invoke((ThreadStart)delegate { SetStateUi(result); }, null);
                }
                Thread.Sleep(2000);
            }
        }

        private void _backgroundWorker_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            SetStateUi(_server.IsServerRuning());
        }
        //StartService()


        //private static bool IsInstalledService()
        //{
        //    return ServiceController.GetServices().FirstOrDefault(s => s.ServiceName == Properties.Constants.serviceName) != null;
        //}

        //private void InstallService()
        //{
        //    string[] commandLineOptions = new string[1] { "/LogFile=install.log" };
        //    string exeFilename = typeof(Service.Service).Assembly.Location;

        //    AssemblyInstaller installer = new AssemblyInstaller(exeFilename, commandLineOptions);

        //    installer.UseNewContext = true;
        //    installer.Install(null);
        //    installer.Commit(null);

        //}

        //private void StartService()
        //{
        //    //if (!IsInstalledService())
        //    //    //InstallService();
        //    //    PrintServiceInstaller.InstallService();

        //    //ServiceController controller = new ServiceController(Properties.Constants.serviceName);
        //    //if (controller.Status == ServiceControllerStatus.Stopped)
        //    //    controller.Start();
        //    Service.Program.Run();
        //}

        //private void StopService()
        //{
        //    //ServiceController controller = new ServiceController(Properties.Constants.serviceName);
        //    //if (controller.Status == ServiceControllerStatus.Running)
        //    //    controller.Stop();
        //    Service.Program.Stop();
        //}

        //private static void UninstallService()
        //{
        //    //string[] commandLineOptions = new string[1] { "/LogFile=uninstall.log" };
        //    //string exeFilename = Assembly.GetEntryAssembly().Location;

        //    //AssemblyInstaller installer = new AssemblyInstaller(exeFilename, commandLineOptions);

        //    //installer.UseNewContext = true;
        //    //installer.Uninstall(null);
        //    PrintServiceInstaller.UninstallService();

        //}
    }
}
