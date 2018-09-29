﻿using System;
using System.Collections.Generic;

namespace GriB.Common.Models.pos
{
    public class model_base
    {
        public int id { get; set; }
    }

    public class model_sys : model_base
    {
        public int      d  { get; set; }
        public DateTime cd { get; set; }
        public int      cu { get; set; }
        public DateTime ud { get; set; }
        public int      uu { get; set; }
    }

    public class model_login : model_base
    {
        public string user { get; set; }
        public string pass { get; set; }

    }

    public class model_property : model_base
    {
        public int    typeval { get; set; }
        public string name    { get; set; }
    }

    public class model_property_value : model_base
    {
        public model_property_value()
        {
            property = new model_property();
        }

        public model_property property { get; set; }
        public string         value    { get; set; }
    }

    public class model_reference : model_sys
    {
        public model_reference()
        {
        }

        public string name { get; set; }
    }
}