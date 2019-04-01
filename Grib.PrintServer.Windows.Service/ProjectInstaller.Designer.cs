namespace GriB.PrintServer.Windows.Service
{
    partial class ProjectInstaller
    {
        /// <summary>
        /// Обязательная переменная конструктора.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Освободить все используемые ресурсы.
        /// </summary>
        /// <param name="disposing">истинно, если управляемый ресурс должен быть удален; иначе ложно.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Код, автоматически созданный конструктором компонентов

        /// <summary>
        /// Требуемый метод для поддержки конструктора — не изменяйте 
        /// содержимое этого метода с помощью редактора кода.
        /// </summary>
        private void InitializeComponent()
        {
            this.SvcProcessInstaller = new System.ServiceProcess.ServiceProcessInstaller();
            this.SvcInstaller = new System.ServiceProcess.ServiceInstaller();
            // 
            // SvcProcessInstaller
            // 
            this.SvcProcessInstaller.Password = null;
            this.SvcProcessInstaller.Username = null;
            // 
            // SvcInstaller
            // 
            this.SvcInstaller.ServiceName = "Service";
            // 
            // ProjectInstaller
            // 
            this.Installers.AddRange(new System.Configuration.Install.Installer[] {
            this.SvcProcessInstaller,
            this.SvcInstaller});

        }

        #endregion

        private System.ServiceProcess.ServiceProcessInstaller SvcProcessInstaller;
        private System.ServiceProcess.ServiceInstaller SvcInstaller;
    }
}