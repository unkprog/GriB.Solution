using System;
using System.Diagnostics;
using System.ServiceProcess;
using System.Threading;
using System.Windows.Forms;

namespace GriB.PrintServer.Windows
{
    static class Program
    {
        /// <summary>
        /// Главная точка входа для приложения.
        /// </summary>
        [STAThread]
        static void Main()
        {

            Mutex mutex = new Mutex(initiallyOwned: false);
            if (!mutex.WaitOne(0, exitContext: false))
            {
                MessageBox.Show("'Принт-сервер' уже запущен.");
                return;
            }
            GC.Collect();

            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new PrintServerContext());
            GC.KeepAlive(mutex);
        }
    }
}
