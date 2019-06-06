using Microsoft.AspNetCore.Mvc;

namespace GriB.Site.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}