using System.Windows.Controls;
using GriB.Installer.UI.Views.Pages;

namespace GriB.Installer.UI.ViewModels.Pages
{
    public class WelcomeViewModel : BaseViewModel
    {
        private UserControl _welcomePage = new Welcome();
        public override UserControl Page => _welcomePage;
    }
}
