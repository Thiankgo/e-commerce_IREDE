using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.DTOs;
using MyApi.Models;

namespace MyApi.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase {
        private readonly AppDbContext _db;
        public ProductsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll() {
            var products = await _db.Products.Include(p => p.Category)
                                  .OrderBy(p => p.Name)
                                  .ToListAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id) {
            var product = await _db.Products.Include(p => p.Category)
                               .FirstOrDefaultAsync(p => p.Id == id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductDto dto) {
            var category = await _db.Categories.FirstOrDefaultAsync(c => c.Name == dto.CategoryName);
            var product = new Product { Name = dto.Name, Description = dto.Description,
                Price = dto.Price, Quantity = dto.Quantity, Image = dto.Image, Category = category };
            _db.Products.Add(product);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }
    }
}