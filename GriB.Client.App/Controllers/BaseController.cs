using GriB.Client.App.Managers;
using GriB.Client.App.Managers.Editors;
using GriB.Client.App.Models.Editor;
using GriB.Common.Models.pos;
using GriB.Common.Models.Security;
using GriB.Common.Sql;
using GriB.Common.Web.Http;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web;

namespace GriB.Client.App.Controllers
{
    public class BaseController : BaseApiController
    {
        public HttpResponseMessage TryCatchResponseQuery(Func<Query, HttpResponseMessage> func)
        {
            return TryCatchResponse(() =>
            {
                Principal principal = (Principal)HttpContext.Current.User;
                using (Query query = CreateQuery(principal.Data.Database.ConnectionString(principal.Data.Server), AppSettings.Database.Path.Query))
                {
                    return func.Invoke(query);
                }
            });
        }

        public Dictionary<int, employeecard> GetFindEmployees(Query query, HttpEmployeesMessage responseMessage)
        {
            Dictionary<int, employeecard> employees = new Dictionary<int, employeecard>();
            employeecard employee;
            foreach (var emp in responseMessage.Employees)
            {
                if (!employees.TryGetValue(emp.id, out employee))
                {
                    employee = (employeecard)Employee.GetEmployee(query, new employeecard(emp));
                    employees.Add(emp.id, employee);
                }
            }
            return employees;
        }
    }
}