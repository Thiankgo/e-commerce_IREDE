using Microsoft.AspNetCore.Mvc;
using MyApi.Data;
using MyApi.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _db;
        public CategoryController(AppDbContext db) => _db = db;

        [HttpGet]
        public IActionResult GetAll() => Ok(_db.Categories.OrderBy(c => c.Name));

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Category dto)
        {
            if (string.IsNullOrEmpty(dto.Name)) return BadRequest(new { message = "Invalid category", status = 400 });
            _db.Categories.Add(dto);
            await _db.SaveChangesAsync();
            return StatusCode(201, dto);
        }
    }
}