using System;
using System.Linq;
using System.Diagnostics;
using System.Reflection;

namespace GriB.Common.Diagnostics
{
    public interface ILogger
    {
        bool IsLogging { get; set; }

        string Source { get; set; }
        /// <summary>
        /// Запись отладочного сообщения
        /// </summary>
        void WriteDebug(string message, string trace);

        /// <summary>
        /// Запись сообщения ошибки
        /// </summary>
        void WriteError(string error, string trace);

        /// <summary>
        /// Запись сообщения ошибки
        /// </summary>
        void WriteError(Exception ex);

        // <summary>
        /// Запись информационного сообщения
        /// </summary>
        void WriteInfo(string info, string trace);
    }


    public class Logger : ILogger
    {
        public Logger()
        {

        }

        public bool IsLogging { get; set; }
        public string Source { get; set; }

        /// <summary>
        /// Запись отладочного сообщения
        /// </summary>
        public virtual void WriteDebug(string message, string trace)
        {
            //Write(message, "Debug");
        }

        /// <summary>
        /// Запись сообщения ошибки
        /// </summary>
        public virtual void WriteError(string error, string trace)
        {
            Write(error, EventLogEntryType.Error, trace);
        }

        /// <summary>
        /// Запись сообщения ошибки
        /// </summary>
        public virtual void WriteError(Exception ex)
        {
            WriteError(ex.Message, ex.StackTrace);
        }

        // <summary>
        /// Запись информационного сообщения
        /// </summary>
        public virtual void WriteInfo(string info, string trace)
        {
            Write(info, EventLogEntryType.Information, trace);
        }

        public virtual void Write(string message, EventLogEntryType eventType, string trace = null, int eventId = -1, short category = -1)
        {
            if (IsLogging)
            {
                string eventMessage = message;
                if (!string.IsNullOrEmpty(trace))
                    eventMessage = string.Concat(eventMessage, Environment.NewLine, Environment.NewLine, "Stack trace:", Environment.NewLine, trace);
#if DEBUG
                Debug.WriteLine(eventMessage, eventType.ToString());
#endif
                string source = GetSource();
                using (EventLog eventLog = new EventLog("Application"))
                {
                    eventLog.Source = source; // "Application";
                    eventLog.WriteEntry(eventMessage, eventType, eventId, category);
                }
            }
        }

        private string GetSource()
        {
            // If the caller has explicitly set a source value, just use it.
            if (!string.IsNullOrWhiteSpace(Source)) { return Source; }

            try
            {
                var assembly = Assembly.GetEntryAssembly();

                // GetEntryAssembly() can return null when called in the context of a unit test project.
                // That can also happen when called from an app hosted in IIS, or even a windows service.

                if (assembly == null)
                {
                    assembly = Assembly.GetExecutingAssembly();
                }


                if (assembly == null)
                {
                    // From http://stackoverflow.com/a/14165787/279516:
                    assembly = new StackTrace().GetFrames().Last().GetMethod().Module.Assembly;
                }

                if (assembly == null) { return "Application"; }

                return assembly.GetName().Name;
            }
            catch
            {
                return "Application";
            }
        }
    }
}
