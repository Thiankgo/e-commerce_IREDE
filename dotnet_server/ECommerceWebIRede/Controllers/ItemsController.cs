using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApi.Data;
using MyApi.DTOs;
using MyApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/items")]
    public class ItemsController : ControllerBase
    {
        private readonly AppDbContext _db;
        private const string Secret = "ecommerce_secret";
        public ItemsController(AppDbContext db) => _db = db;

        [HttpGet]
        public async Task<IActionResult> GetItems([FromQuery] string token)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var claims = handler.ReadJwtToken(token).Claims;
                var userId = int.Parse(claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);

                var sales = await _db.Items
                    .Where(i => i.UserId == userId)
                    .Select(i => new { i.Id, i.Quantity, i.Price, i.Product.Name, i.Product.Image, Category = i.Product.Category.Name, i.Sale.Date })
                    .OrderBy(i => i.Id)
                    .ToListAsync();

                return Ok(sales);
            }
            catch
            {
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostItems([FromBody] PostItemsDto dto)
        {
            using var transaction = await _db.Database.BeginTransactionAsync();
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var userId = int.Parse(handler.ReadJwtToken(dto.Token).Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);

                var sale = new Sale { Date = DateTime.UtcNow };
                _db.Sales.Add(sale);
                await _db.SaveChangesAsync();

                foreach (var s in dto.Sales)
                {
                    var product = await _db.Products.FindAsync(s.ProductId);
                    if (product == null || product.Quantity < s.Quantity) throw new Exception();

                    var item = new Item { UserId = userId, ProductId = s.ProductId, Quantity = s.Quantity, Price = product.Price, SaleId = sale.Id };
                    product.Quantity -= s.Quantity;
                    _db.Items.Add(item);
                }

                await _db.SaveChangesAsync();
                await transaction.CommitAsync();
                return StatusCode(201, new { message = "Itens adicionados com sucesso" });
            }
            catch
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }
    }
}