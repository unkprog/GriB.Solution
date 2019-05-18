using System;
using System.Collections.Generic;
using Android.App;
using Android.Webkit;
using Java.Interop;

namespace Grib.App.Windows.JavaScript
{
    public class Bridge: Java.Lang.Object
    {
        public Bridge(Activity context)
        {
            commands = new Dictionary<string, Action<string>>();
            this.context = context;
        }

        Dictionary<string, Action<string>> commands;
        Activity context;

        [Export]
        [JavascriptInterface]
        public void command(string command, string data)
        {
            Action<string> action;
            if (commands.TryGetValue(command, out action) && context != null)
                context.RunOnUiThread(() => action.Invoke(data));
        }

        public void AddCommand(string command, Action<string> action)
        {
           if (!commands.ContainsKey(command))
                commands.Add(command, action);
        }
    }
}
