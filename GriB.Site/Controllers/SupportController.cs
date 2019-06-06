using Microsoft.AspNetCore.Mvc;

namespace GriB.Site.Controllers
{
    public class SupportController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}