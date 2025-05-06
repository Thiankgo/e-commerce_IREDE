using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.DTOs;
using MyApi.Models;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _db.Products.Include(p => p.Category).OrderBy(p => p.Name).ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _db.Products.Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == id);
            return product == null ? NotFound(new { error = "Produto não encontrado" }) : Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductDto dto)
        {
            var category = await _db.Categories.FirstOrDefaultAsync(c => c.Name == dto.CategoryName);
            var prod = new Product { Name = dto.Name, Description = dto.Description, Price = dto.Price, Quantity = dto.Quantity, Image = dto.Image, Category = category! };
            _db.Products.Add(prod);
            await _db.SaveChangesAsync();
            return StatusCode(201, prod);
        }
    }
}