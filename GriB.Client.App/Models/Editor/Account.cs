using GriB.Common.Models.Print.Editor;

namespace GriB.Client.App.Models.Editor
{
    public class account : reference
    {
        public account()
        {
            number = string.Empty;
        }
        public string number { get; set; }
    }
}