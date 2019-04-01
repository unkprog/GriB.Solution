using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Web.Http.Dispatcher;

namespace GriB.PrintServer.Windows.Controllers
{
    class ControllersResolver : DefaultAssembliesResolver
    {
        public override ICollection<Assembly> GetAssemblies()
        {
            ICollection<Assembly> baseAssemblies = base.GetAssemblies();
            List<Assembly> assemblies = new List<Assembly>(baseAssemblies);

            string path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, Path.GetFileName(Assembly.GetEntryAssembly().Location));

            assemblies.Add(Assembly.LoadFrom(path));

            return assemblies;
        }
    }
}
