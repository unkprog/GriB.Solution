using Microsoft.AspNetCore.Mvc;

namespace GriB.Site.Controllers
{
    public class PricesController : Controller
    {
        // GET: Prices
        public IActionResult Index()
        {
            return View();
        }
    }
}