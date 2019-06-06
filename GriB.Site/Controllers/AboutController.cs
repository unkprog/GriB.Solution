using Microsoft.AspNetCore.Mvc;

namespace GriB.Site.Controllers
{
    public class AboutController : Controller
    {
        // GET: About
        public IActionResult Index()
        {
            return View();
        }
    }
}