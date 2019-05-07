using System.Linq;

namespace GriB.Installer.UI.ViewModels
{
    public partial class MainViewModel
    {
        private BaseCommand backCommand;
        public BaseCommand BackCommand
        {
            get
            {
                return backCommand ??
                  (backCommand = new BaseCommand(obj =>
                  {
                      if (CurrentViewModel == _intallProgressViewModel)
                      {
                          CurrentViewModel = _welcomeViewModel;
                      }
                      else if (CurrentViewModel == _finishViewModel)
                          CurrentViewModel = _intallProgressViewModel;

                  }));
            }
        }

        private BaseCommand nextCommand;
        public BaseCommand NextCommand
        {
            get
            {
                return nextCommand ??
                  (nextCommand = new BaseCommand(obj =>
                  {
                      if (CurrentViewModel == _welcomeViewModel)
                          CurrentViewModel = _applicationViewModel;
                      else if (CurrentViewModel == _applicationViewModel)
                      {
                          if (_applicationViewModel.CheckNextCommand())
                          {
                              CurrentViewModel = _intallProgressViewModel;
                              _intallProgressViewModel.StartUploadAndInstall(_applicationViewModel.InstallPath, _applicationViewModel.AppItems.Where(f => f.IsInstall).ToList());
                          }
                      }
                      else if (CurrentViewModel == _intallProgressViewModel)
                          CurrentViewModel = _finishViewModel;
                      else if (CurrentViewModel == _finishViewModel)
                          InstallerApplication.MainView.Close();
                  }));
            }
        }

        private BaseCommand cancelCommand;
        public BaseCommand CancelCommand
        {
            get
            {
                return cancelCommand ??
                  (cancelCommand = new BaseCommand(obj =>
                  {
                      InstallerApplication.MainView.Close();
                  }));
            }
        }
    }
}
