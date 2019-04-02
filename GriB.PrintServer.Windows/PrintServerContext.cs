using System;
using System.Linq;
using System.Drawing;
using System.IO;
using System.Reflection;
using System.Windows.Forms;
using System.Threading;
using System.ComponentModel;
using GriB.PrintServer.Windows.Common;
using GriB.PrintServer.Windows.Properties;
using System.Collections.Generic;

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
        Bitmap printActiveWBitmap = GetAppImage("print_active_w") as Bitmap;
        Bitmap printDisableWBitmap = GetAppImage("print_disabled_w") as Bitmap;
        Server _server;
        Printer _printer;
        BackgroundWorker _bwPrintServiceCheck;
        BackgroundWorker _bwPrintFilesCheck;

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

            notifyIcon.Icon = Icon.FromHandle(printDisableWBitmap.GetHicon());
            notifyIcon.DoubleClick += showConfigHandler;
            notifyIcon.ContextMenuStrip = notifyContextMenu;
            notifyIcon.Visible = true;

            _bwPrintServiceCheck = new BackgroundWorker();
            _bwPrintServiceCheck.WorkerReportsProgress = true;
            _bwPrintServiceCheck.ProgressChanged += _bwPrintServiceCheck_ProgressChanged;
            _bwPrintServiceCheck.DoWork += _bwPrintServiceCheck_DoWork;
            _bwPrintServiceCheck.RunWorkerAsync();

            _bwPrintFilesCheck = new BackgroundWorker();
            _bwPrintFilesCheck.WorkerReportsProgress = true;
            _bwPrintFilesCheck.DoWork += _bwPrintFilesCheck_DoWork;
            _bwPrintFilesCheck.RunWorkerAsync();

            _printer = new Printer();
            _printer.OnEndPrint += _printer_OnEndPrint;
            _printer.OnErrorPrint += _printer_OnErrorPrint;
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
                    notifyIcon.Icon = Icon.FromHandle(printActiveWBitmap.GetHicon());
                }
            }
            else
            {
                if (toolStripItemStartStop.Text != "Старт")
                {
                    toolStripItemStartStop.Text = "Старт";
                    toolStripItemStartStop.Image = printActiveBitmap;
                    notifyIcon.Icon = Icon.FromHandle(printDisableWBitmap.GetHicon());
                }
            }
            toolStripItemStartStop.Enabled = true;
        }

        void Exit(object sender, EventArgs e)
        {
            StopService();
            if (_printer != null)
            {
                _printer.OnErrorPrint -= _printer_OnErrorPrint;
                _printer.OnEndPrint -= _printer_OnEndPrint;
            }
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
            {
                _server.Stop();
                _server = null;
            }
        }

        private void _bwPrintServiceCheck_DoWork(object sender, DoWorkEventArgs e)
        {
            int progress = 0;
            while (true)
            {
                progress++;
                _bwPrintServiceCheck.ReportProgress(progress);
                if (progress > 3)
                    progress = 0;
                Thread.Sleep(2000);
            }
        }

        private void _bwPrintServiceCheck_ProgressChanged(object sender, ProgressChangedEventArgs e)
        {
            if (_server != null)
                SetStateUi(_server.IsServerRuning());
            else
                SetStateUi(false);
        }

        private Dictionary<string, string> listChecks = new Dictionary<string, string>();
        private Dictionary<string, string> listDocuments = new Dictionary<string, string>();

        private void _bwPrintFilesCheck_DoWork(object sender, DoWorkEventArgs e)
        {
            while (true)
            {
                if (_printer != null && !_printer.IsPrinting && listChecks.Count == 0 && listDocuments.Count == 0)
                {
                    string[] filesCheck = Directory.GetFiles(FileHelper.GetFolderChecks());
                    if (filesCheck != null && filesCheck.Length > 0)
                    {
                        foreach (var fileName in filesCheck)
                            listChecks.Add(fileName, fileName);
                    }

                    string[] filesDocuments = Directory.GetFiles(FileHelper.GetFolderDocuments());
                    if (filesDocuments != null && filesDocuments.Length > 0)
                    {
                        foreach (var fileName in filesDocuments)
                            listDocuments.Add(fileName, fileName);
                    }
                }
                Thread.Sleep(2000);
            }
        }

        private void NextPrint()
        {
            if (listChecks.Count > 0)
                _printer.PrintDocument(listChecks.Values.First());
            else if (listDocuments.Count > 0)
                _printer.PrintDocument(listDocuments.Values.First());

        }

        private void RemovePrint(string fileName)
        {
            FileInfo fi = new FileInfo(fileName);
            if (fi.Directory.Name == Constants.folderChecks)
            {
                if (listChecks.ContainsKey(fileName))
                    listChecks.Remove(fileName);
            }
            else
            {
                if (listDocuments.ContainsKey(fileName))
                    listDocuments.Remove(fileName);
            }
        }

        private void _printer_OnEndPrint(object sender, string fileName)
        {
            if (File.Exists(fileName))
                File.Delete(fileName);
            RemovePrint(fileName);
            NextPrint();
        }

        private void _printer_OnErrorPrint(object sender, string fileName)
        {
            if (File.Exists(fileName))
            {
                FileInfo fi = new FileInfo(fileName);
                string fileTo = string.Concat(fi.Directory.Name == Constants.folderChecks ? FileHelper.GetFolderChecksPrintError() : FileHelper.GetFolderDocumentsPrintError(), "\\", fi.Name);
                File.Move(fileName, fileTo);
                RemovePrint(fileName);
                NextPrint();
            }
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
