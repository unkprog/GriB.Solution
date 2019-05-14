using System;
using System.Collections.Generic;
using System.Windows.Forms;
using CefSharp.WinForms.Internals;

namespace Grib.App.Windows.JavaScript
{
    public class Bridge
    {
        public Bridge(Form context)
        {
            commands = new Dictionary<string, Action<string>>();
            this.context = context;
        }

        Dictionary<string, Action<string>> commands;
        Form context;
        public void command(string command, string data)
        {
            Action<string> action;
            if (commands.TryGetValue(command, out action) && context != null)
                //context.Invoke(new MethodInvoker(() =>
                //{
                //    action.Invoke(data);
                //}));
                context.InvokeOnUiThreadIfRequired(() => action.Invoke(data));
        }

        public void AddCommand(string command, Action<string> action)
        {
           if (!commands.ContainsKey(command))
                commands.Add(command, action);
        }
    }
}
