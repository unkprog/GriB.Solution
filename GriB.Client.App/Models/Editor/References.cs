using GriB.Common.Models.pos;
using GriB.Common.Models.Security;
using System;
using System.Collections.Generic;

namespace GriB.Client.App.Models.Editor
{
    public class reference : model_base
    {
        public reference()
        {
            name = string.Empty;
        }
        public string name { get; set; }
    }

    public class reference_hierarhy : reference
    {
        public int pid { get; set; }
    }




}