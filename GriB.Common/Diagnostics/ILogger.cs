using System;
using System.Linq;
using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.Logging.ExtraInformation;

namespace GriB.Common.Diagnostics
{
    public interface ILogger
    {
        bool IsLoggingEnabled();

        /// <summary>
        /// Get debug context information
        /// </summary>
        IDictionary<string, object> GetDebugInfo();

        /// <summary>
        /// Get Managed-Security context information
        /// </summary>
        IDictionary<string, object> GetManagedSecurityInfo();

        /// <summary>
        /// Get Unmanaged-Security context information
        /// </summary>
        IDictionary<string, object> GetUnmanagedSecurityInfo();

        /// <summary>
        /// Get COM+ context information
        /// </summary>
        IDictionary<string, object> GetComPlusInfo();

        /// <summary>
        /// Запись отладочного сообщения
        /// </summary>
        void WriteDebug(string message);

        #region Write
        void Write(object message);
        void Write(object message, IDictionary<string, object> properties);
        void Write(object message, IEnumerable<string> categories);
        void Write(object message, string category);
        void Write(object message, IEnumerable<string> categories, IDictionary<string, object> properties);
        void Write(object message, IEnumerable<string> categories, int priority);
        void Write(object message, string category, IDictionary<string, object> properties);
        void Write(object message, string category, int priority);
        void Write(object message, IEnumerable<string> categories, int priority, IDictionary<string, object> properties);
        void Write(object message, IEnumerable<string> categories, int priority, int eventId);
        void Write(object message, string category, int priority, IDictionary<string, object> properties);
        void Write(object message, string category, int priority, int eventId);
        void Write(object message, IEnumerable<string> categories, int priority, int eventId, TraceEventType severity);
        void Write(object message, string category, int priority, int eventId, TraceEventType severity);
        void Write(object message, IEnumerable<string> categories, int priority, int eventId, TraceEventType severity, string title);
        void Write(object message, string category, int priority, int eventId, TraceEventType severity, string title);
        void Write(object message, IEnumerable<string> categories, TraceEventType severity, string title = null, IDictionary<string, object> properties = null, int priority = -1, int eventId = -1);
        void Write(object message, string category, int priority, int eventId, TraceEventType severity, string title, IDictionary<string, object> properties);
        #endregion
    }


    public class Logger : ILogger
    {
        /// <summary>
        /// EL LogWriter object
        /// </summary>
        protected LogWriter logWriter;

        public Logger()
        {
            LogWriterFactory logWriterFactory = new LogWriterFactory();
            logWriter = logWriterFactory.Create();
        }

        protected void WriteApplicationEvent(string eventName, EventLogEntryType entryType, int eventId = -1)
        {
            try
            {
                string sourceName = "EL5Logger";
                if (!EventLog.SourceExists(sourceName))
                    EventLog.CreateEventSource(sourceName, "Application");

                if (eventId == -1)
                    EventLog.WriteEntry(sourceName, eventName, entryType);
                else
                    EventLog.WriteEntry(sourceName, eventName, entryType, eventId);
            }
            catch (Exception ex)
            {
                Debug.Fail("WriteApplicationEvent failed!", ex.ToString());
            }
        }

        public virtual bool IsLoggingEnabled()
        {
            return logWriter.IsLoggingEnabled();
        }

        public virtual IDictionary<string, object> GetDebugInfo()
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            DebugInformationProvider provider = new DebugInformationProvider();
            provider.PopulateDictionary(dict);
            return dict;
        }

        public virtual IDictionary<string, object> GetManagedSecurityInfo()
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            ManagedSecurityContextInformationProvider provider = new ManagedSecurityContextInformationProvider();
            provider.PopulateDictionary(dict);
            return dict;
        }

        public virtual IDictionary<string, object> GetUnmanagedSecurityInfo()
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            UnmanagedSecurityContextInformationProvider provider = new UnmanagedSecurityContextInformationProvider();
            provider.PopulateDictionary(dict);
            return dict;
        }

        public virtual IDictionary<string, object> GetComPlusInfo()
        {
            Dictionary<string, object> dict = new Dictionary<string, object>();
            ComPlusInformationProvider provider = new ComPlusInformationProvider();
            provider.PopulateDictionary(dict);
            return dict;
        }

        public virtual void WriteDebug(string message)
        {
            Write(message, "Debug");
        }

        #region ILogger.Write
        public virtual void Write(object message)
        {
            Write(message, new string[] { }, TraceEventType.Information, string.Empty, null, -1, -1);
        }

        public virtual void Write(object message, IDictionary<string, object> properties)
        {
            Write(message, new string[] { }, TraceEventType.Information, string.Empty, properties, -1, -1);
        }

        public virtual void Write(object message, IEnumerable<string> categories)
        {
            Write(message, categories, TraceEventType.Information, string.Empty, null, -1, -1);
        }

        public virtual void Write(object message, string category)
        {
            Write(message, new string[] { category }, TraceEventType.Information, string.Empty, null, -1, -1);
        }

        public virtual void Write(object message, IEnumerable<string> categories, IDictionary<string, object> properties)
        {
            Write(message, categories, TraceEventType.Information, string.Empty, properties, -1, -1);
        }

        public virtual void Write(object message, IEnumerable<string> categories, int priority)
        {
            Write(message, categories, TraceEventType.Information, string.Empty, null, priority, -1);
        }

        public virtual void Write(object message, string category, IDictionary<string, object> properties)
        {
            Write(message, new string[] { category }, TraceEventType.Information, string.Empty, properties, -1, -1);
        }

        public virtual void Write(object message, string category, int priority)
        {
            Write(message, new string[] { category }, TraceEventType.Information, string.Empty, null, priority, -1);
        }

        public virtual void Write(object message, IEnumerable<string> categories, int priority, IDictionary<string, object> properties)
        {
            Write(message, categories, TraceEventType.Information, string.Empty, properties, priority, -1);
        }

        public virtual void Write(object message, IEnumerable<string> categories, int priority, int eventId)
        {
            Write(message, categories, TraceEventType.Information, string.Empty, null, priority, eventId);
        }

        public virtual void Write(object message, string category, int priority, IDictionary<string, object> properties)
        {
            Write(message, new string[] { category }, TraceEventType.Information, string.Empty, properties, priority, -1);
        }

        public virtual void Write(object message, string category, int priority, int eventId)
        {
            Write(message, new string[] { category }, TraceEventType.Information, string.Empty, null, priority, eventId);
        }

        public virtual void Write(object message, IEnumerable<string> categories, int priority, int eventId, TraceEventType severity)
        {
            Write(message, categories, severity, string.Empty, null, priority, eventId);
        }

        public virtual void Write(object message, string category, int priority, int eventId, TraceEventType severity)
        {
            Write(message, new string[] { category }, severity, string.Empty, null, priority, eventId);
        }

        public virtual void Write(object message, IEnumerable<string> categories, int priority, int eventId, TraceEventType severity, string title)
        {
            Write(message, categories, severity, title, null, priority, eventId);
        }

        public virtual void Write(object message, string category, int priority, int eventId, TraceEventType severity, string title)
        {
            Write(message, new string[] { category }, severity, title, null, priority, eventId);
        }

        public virtual void Write(object message, IEnumerable<string> categories, TraceEventType severity, string title = null, IDictionary<string, object> properties = null, int priority = -1, int eventId = -1)
        {
            try
            {
                if (logWriter.IsLoggingEnabled())
                {
                    LogEntry entry = new LogEntry();

                    if (categories != null && categories.Count() > 0)
                        entry.Categories = categories.ToArray();
                    if (message != null)
                        entry.Message = message.ToString();
                    if (!string.IsNullOrEmpty(title))
                        entry.Title = title;
                    if (eventId != -1)
                        entry.EventId = eventId;
                    if (priority != -1)
                        entry.Priority = priority;
                    if (properties != null)
                        entry.ExtendedProperties = properties;
                    entry.Severity = severity;

                    if (logWriter.ShouldLog(entry))
                        logWriter.Write(entry);
                }
                else
                {
                    WriteApplicationEvent("Resources.Warning_LoggingDisabled", EventLogEntryType.Warning);
                }
            }
            catch (Exception ex)
            {
                WriteApplicationEvent(ex.ToString(), EventLogEntryType.Error, LogWriter.LogWriterFailureEventID);
            }
        }

        public virtual void Write(object message, string category, int priority, int eventId, TraceEventType severity, string title, IDictionary<string, object> properties)
        {
            Write(message, new string[] { category }, severity, title, properties, priority, eventId);
        }
        #endregion

    }
}
