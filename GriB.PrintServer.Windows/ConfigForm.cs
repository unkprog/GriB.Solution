using System.Windows.Forms;

namespace GriB.PrintServer.Windows
{
    public partial class ConfigForm : Form
    {
        public ConfigForm()
        {
            InitializeComponent();
        }

        public void ReadSettings()
        {
            this.textBoxIdentificator.Text = Properties.Settings.Default.pskey;
            this.textBoxPort.Text = Properties.Settings.Default.ServicePort.ToString();
        }

        private void buttonApply_Click(object sender, System.EventArgs e)
        {
            Properties.Settings.Default.pskey = this.textBoxIdentificator.Text;

            int port;
            if (int.TryParse(this.textBoxPort.Text, out port))
                Properties.Settings.Default.ServicePort = port;

            Properties.Settings.Default.Save();

            this.DialogResult = DialogResult.OK;
        }


        private void buttonCancel_Click(object sender, System.EventArgs e)
        {
            this.DialogResult = DialogResult.Cancel;
        }

        private void textBoxPort_KeyPress(object sender, KeyPressEventArgs e)
        {
            e.Handled = !char.IsDigit(e.KeyChar) && !char.IsControl(e.KeyChar);
        }

    }
}
