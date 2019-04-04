using Microsoft.Win32;
using System;
using System.Drawing;
using System.Drawing.Printing;
using System.Management;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace GriB.PrintServer.Windows
{
    public class Printer
    {
        const float DPI = 96.0f;

        private static float PixelsToInches(float pixels, int digits = 2)
        {
            float value = (pixels / DPI); // DPI = 96, to milimeters = * 25.4f
            double mult = Math.Pow(10.0, digits);
            double result = Math.Truncate(mult * value) / mult;
            return (float)result;
        }

        private static RectangleF GetMargins()
        {
            PrinterSettings printerSettings = new PrinterSettings();
            PageSettings pageSettings = printerSettings.DefaultPageSettings;
            RectangleF margins = new RectangleF(
                                                 PixelsToInches(pageSettings.PrintableArea.Left)
                                               , PixelsToInches(pageSettings.PaperSize.Width - pageSettings.PrintableArea.Right)
                                               , PixelsToInches(pageSettings.PrintableArea.Top)
                                               , PixelsToInches(pageSettings.PaperSize.Height - pageSettings.PrintableArea.Bottom)
                                               );
            return margins;
        }

        private static string ValueToStrig(float value)
        {
            return value.ToString("F2").Replace(',', '.');
        }

        // Установка принтера по умолчанию
        ////Вариант #1
        //public static bool SetDefaultPrinter1(string defaultPrinter)
        //{
        //    using (ManagementObjectSearcher objectSearcher = new ManagementObjectSearcher("SELECT * FROM Win32_Printer"))
        //    {
        //        using (ManagementObjectCollection objectCollection = objectSearcher.Get())
        //        {
        //            foreach (ManagementObject mo in objectCollection)
        //            {
        //                if (string.Compare(mo["Name"].ToString(), defaultPrinter, true) == 0)
        //                {
        //                    mo.InvokeMethod("SetDefaultPrinter", null, null);
        //                    return true;
        //                }
        //            }
        //        }
        //    }
        //    return false;
        //}

        ////Вариант #2
        //[DllImport("winspool.drv", CharSet = CharSet.Unicode, SetLastError = true)]
        //[return: MarshalAs(UnmanagedType.Bool)]
        //public static extern bool GetDefaultPrinter(StringBuilder pszBuffer, ref int size);
        //[DllImport("winspool.drv", CharSet = CharSet.Unicode, SetLastError = true)]
        //[return: MarshalAs(UnmanagedType.Bool)]
        //public static extern bool SetDefaultPrinter(string Name);


        object footer, header, margin_left, margin_right, margin_top, margin_bottom, Print_Background, Shrink_To_Fit, font;
        private void SaveDefaultPrintSettings()
        {
            using (RegistryKey registryKey = Registry.CurrentUser.CreateSubKey("Software\\Microsoft\\Internet Explorer\\PageSetup"))
            {
                footer = registryKey.GetValue("footer");
                header = registryKey.GetValue("header");
                margin_left = registryKey.GetValue("margin_left");
                margin_right = registryKey.GetValue("margin_right");
                margin_top = registryKey.GetValue("margin_top");
                margin_bottom = registryKey.GetValue("margin_bottom");
                Print_Background = registryKey.GetValue("Print_Background");
                Shrink_To_Fit = registryKey.GetValue("Shrink_To_Fit");
                font = registryKey.GetValue("font");
                header = registryKey.GetValue("header");
            }
        }

        private void RestorePrintSettings()
        {
            SaveDefaultPrintSettings();
            RectangleF margins = GetMargins();
            using (RegistryKey registryKey = Registry.CurrentUser.CreateSubKey("Software\\Microsoft\\Internet Explorer\\PageSetup"))
            {
                if (footer != null) registryKey.SetValue("footer", footer);
                if (header != null) registryKey.SetValue("header", header);
                if (margin_left != null) registryKey.SetValue("margin_left", margin_left);
                if (margin_right != null) registryKey.SetValue("margin_right", margin_right);
                if (margin_top != null) registryKey.SetValue("margin_top", margin_top);
                if (margin_bottom != null) registryKey.SetValue("margin_bottom", margin_bottom);
                if (Print_Background != null) registryKey.SetValue("Print_Background", Print_Background);
                if (Shrink_To_Fit != null) registryKey.SetValue("Shrink_To_Fit", Shrink_To_Fit);
                if (font != null) registryKey.SetValue("font", font);
            }
        }

        private void SetupPrintSettings()
        {
            SaveDefaultPrintSettings();
            RectangleF margins = GetMargins();
            using (RegistryKey registryKey = Registry.CurrentUser.CreateSubKey("Software\\Microsoft\\Internet Explorer\\PageSetup"))
            {
                registryKey.SetValue("footer", "");
                registryKey.SetValue("header", "");
                registryKey.SetValue("margin_left", ValueToStrig(margins.X));
                registryKey.SetValue("margin_right", ValueToStrig(margins.Y));
                registryKey.SetValue("margin_top", ValueToStrig(margins.Width));
                registryKey.SetValue("margin_bottom", ValueToStrig(margins.Height));
                registryKey.SetValue("Print_Background", "yes");
                registryKey.SetValue("Shrink_To_Fit", "no");
                registryKey.SetValue("font", "");
            }
        }

        public event EventHandler<string> OnEndPrint;
        public event EventHandler<string> OnErrorPrint;

        public bool IsPrinting { get; private set; } = false;

        public void PrintDocument(string fileName)
        {
            IsPrinting = true;
            try
            {
                // download each page and dump the content
                Task<object> task = MessageLoopPrintDocument.Run(DoWorkPrintDocument, fileName);
                task.Wait();
                OnEndPrint?.Invoke(this, fileName);
            }
            catch (Exception ex)
            {
                //System.Diagnostics.Debug.WriteLine("DoWorkPrintDocument failed: " + ex.Message);
                OnErrorPrint?.Invoke(this, fileName);
            }
            finally
            {
                IsPrinting = false;
            }
        }

        private async Task<object> DoWorkPrintDocument(object[] args)
        {
            SetupPrintSettings();
            //return null;
            WebBrowser browser = new WebBrowser();
            try
            {
                browser.ScriptErrorsSuppressed = true;

                if (browser.Document == null && browser.ActiveXInstance == null)
                    throw new ApplicationException("Unable to initialize the underlying WebBrowserActiveX");

                // get the underlying WebBrowser ActiveX object;
                // this code depends on SHDocVw.dll COM interop assembly,
                // generate SHDocVw.dll: "tlbimp.exe ieframe.dll",
                // and add as a reference to the project
                var wbax = (SHDocVw.WebBrowser)browser.ActiveXInstance;

                TaskCompletionSource<bool> loadedTcs = null, printedTcs = null;
                WebBrowserDocumentCompletedEventHandler documentCompletedHandler = (s, e) => loadedTcs.TrySetResult(true); // turn event into awaitable task
                SHDocVw.DWebBrowserEvents2_PrintTemplateTeardownEventHandler printTemplateTeardownHandler = (p) => printedTcs.TrySetResult(true); // turn event into awaitable task

                // navigate to each URL in the list
                foreach (var url in args)
                {
                    loadedTcs = new TaskCompletionSource<bool>();
                    browser.DocumentCompleted += documentCompletedHandler;
                    try
                    {
                        browser.Navigate(url.ToString());
                        await loadedTcs.Task;
                    }
                    finally
                    {
                        browser.DocumentCompleted -= documentCompletedHandler;
                    }

                    //// the DOM is ready, 
                    //System.Diagnostics.Debug.WriteLine(url.ToString());
                    //System.Diagnostics.Debug.WriteLine(browser.Document.Body.OuterHtml);

                    // print the document
                    printedTcs = new TaskCompletionSource<bool>();
                    wbax.PrintTemplateTeardown += printTemplateTeardownHandler;
                    try
                    {
                        browser.Print();
                        // await for PrintTemplateTeardown - the end of printing
                        await printedTcs.Task;
                    }
                    finally
                    {
                        wbax.PrintTemplateTeardown -= printTemplateTeardownHandler;
                    }
                    //System.Diagnostics.Debug.WriteLine(url.ToString() + " printed.");
                }
            }
            finally
            {
                browser.Dispose();
                RestorePrintSettings();
            }
            //System.Diagnostics.Debug.WriteLine("End working.");
            return null;
        }

    }

    // a helper class to start the message loop and execute an asynchronous task
    internal static class MessageLoopPrintDocument
    {
        public static async Task<object> Run(Func<object[], Task<object>> worker, params object[] args)
        {
            var tcs = new TaskCompletionSource<object>();
            var thread = new Thread(() =>
            {
                EventHandler idleHandler = null;

                idleHandler = async (s, e) =>
                {
                    // handle Application.Idle just once
                    Application.Idle -= idleHandler;

                    // return to the message loop
                    await Task.Yield();

                    // and continue asynchronously propogate the result or exception
                    try
                    {
                        var result = await worker(args);
                        tcs.SetResult(result);
                    }
                    catch (Exception ex)
                    {
                        tcs.SetException(ex);
                    }

                    // signal to exit the message loop Application.Run will exit at this point
                    Application.ExitThread();
                };

                // handle Application.Idle just once
                // to make sure we're inside the message loop
                // and SynchronizationContext has been correctly installed
                Application.Idle += idleHandler;
                Application.Run();
            });

            // set STA model for the new thread
            thread.SetApartmentState(ApartmentState.STA);

            // start the thread and await for the task
            thread.Start();
            try
            {
                return await tcs.Task;
            }
            finally
            {
                thread.Join();
            }
        }
    }
}
