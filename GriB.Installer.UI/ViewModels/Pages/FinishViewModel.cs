using System;
using System.Windows.Controls;
using GriB.Installer.UI.Views.Pages;

namespace GriB.Installer.UI.ViewModels.Pages
{

    public class FinishViewModel : BaseViewModel
    {
        public FinishViewModel()
        {
            _finish = new Finish() { DataContext = this };
        }

        private UserControl _finish;
        public override UserControl Page => _finish;
    }
}
