using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceStore.Data;
using ECommerceStore.DTOs;
using ECommerceStore.Models;

namespace ECommerceStore.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ProductsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _db.Products
                .Include(p => p.Category)               // faz o JOIN na tabela Category
                .OrderBy(p => p.Name)                   // ORDER BY p.Name ASC
                .Select(static p => new ProductDto          
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    Image = p.Image,
                    Category = p.Category.Name 
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _db.Products
            .Include(p => p.Category)               // faz o JOIN com Category
            .Where(p => p.Id == id)                 // WHERE p.id = @id
            .Select(p => new ProductDto             // projeta só os campos necessários
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                Quantity = p.Quantity,
                Image = p.Image,
                Category = p.Category.Name         // nome da categoria
            })
            .FirstOrDefaultAsync();                 // pega o primeiro (ou null)

        if (product == null)
            return NotFound(new { error = "Produto não encontrado" });

        return Ok(product);
    }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProductDto dto)
        {
            var category = await _db.Categories.FirstOrDefaultAsync(c => c.Name == dto.Category);
            var prod = new Product { Name = dto.Name, Description = dto.Description, Price = dto.Price, Quantity = dto.Quantity, Image = dto.Image, Category = category! };
            _db.Products.Add(prod);
            await _db.SaveChangesAsync();
            return StatusCode(201, prod);
        }
    }
}