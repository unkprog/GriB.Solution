using GriB.Common.Models.pos;
using GriB.Client.App.Models.Editor;

namespace GriB.Client.App.Models.POSTerminal
{
    public class payment : model_sys
    {
        public const int DocTypeDefault = 10;
        public const int DocTypeDeposit = 20;
        public const int DocTypeWithdrawal = 30;

        public int       doctype   { get; set; }
        public check     check     { get; set; }
        public int       ptype     { get; set; }
        public double    sum       { get; set; }
        public int       options   { get; set; }
        public client    client    { get; set; }
        public salepoint    salepoint { get; set; }
        public employeecard employee  { get; set; }
        public costincome costincome { get; set; }
        public account account { get; set; }
        public string       comment   { get; set; }
    }
}