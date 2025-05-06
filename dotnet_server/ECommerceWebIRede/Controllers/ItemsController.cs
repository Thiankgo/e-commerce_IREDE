using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ECommerceStore.Data;
using ECommerceStore.DTOs;
using ECommerceStore.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerceStore.Controllers
{
    [ApiController]
    [Route("api/items")]
    public class ItemsController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;
        private const string Secret = "ecommerce_secret_super_segura_123456789";
        public ItemsController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        [HttpGet]
        public async Task<IActionResult> GetItems([FromQuery] string token)
        {
            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token vazio", status = 400 });

            try
            {
                // 1) valida o token
                var jwtSettings = _config.GetSection("Jwt");
                var keyBytes = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);
                var handler = new JwtSecurityTokenHandler();
                handler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out _);

                // 2) extrai o sub (userId)
                var jwt = handler.ReadJwtToken(token);
                var sub = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
                if (sub == null || !int.TryParse(sub, out var userId))
                    return StatusCode(500, new { message = "Erro interno do servidor", status = 500 });

                // 3) busca os itens do usuário e projeta exatamente como no SQL
                var sales = await _db.Items
                    .Where(i => i.UserId == userId)
                    .Select(i => new
                    {
                        id = i.Id,
                        name = i.Product.Name,
                        price = i.Price,
                        image = i.Product.Image,
                        category = i.Product.Category.Name,
                        date = i.Sale.Date,
                        quantity = i.Quantity
                    })
                    .OrderBy(i => i.id)
                    .ToListAsync();

                return Ok(sales);
            }
            catch (SecurityTokenExpiredException ex)
            {
                // mesmo status e formato do Node.js para token expirado
                return StatusCode(500, new { message = ex.GetType().Name, status = 500 });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro interno do servidor", status = 500 });
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostItems([FromBody] PostItemsDto dto)
        {
            // 1) verifica token vazio
            if (string.IsNullOrEmpty(dto.Token))
                return BadRequest(new { message = "Token vazio", status = 400 });

            // 2) valida token
            int userIdFromToken;
            try
            {
                var jwtSettings = _config.GetSection("Jwt");
                var keyBytes = Encoding.UTF8.GetBytes(jwtSettings["Key"]!);

                var handler = new JwtSecurityTokenHandler();
                handler.ValidateToken(dto.Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidateAudience = true,
                    ValidAudience = jwtSettings["Audience"],
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                }, out _);

                var jwt = handler.ReadJwtToken(dto.Token);
                var sub = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;
                if (sub == null || !int.TryParse(sub, out userIdFromToken))
                    throw new Exception();

            }
            catch (SecurityTokenExpiredException ex)
            {
                return StatusCode(500, new { message = ex.GetType().Name, status = 500 });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro interno do servidor", status = 500 });
            }

            // 3) abre transação
            await using var transaction = await _db.Database.BeginTransactionAsync();
            try
            {
                // 4) busca usuário por email
                var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
                if (user == null)
                    return NotFound(new { message = "Usuário não encontrado", status = 404 });

                // 5) confere que o token pertence a este usuário
                if (user.Id != userIdFromToken)
                    return StatusCode(500, new { message = "Erro interno do servidor", status = 500 });

                // 6) cria nova sale
                var sale = new Sale { Date = DateTime.UtcNow };
                _db.Sales.Add(sale);
                await _db.SaveChangesAsync();

                // 7) itera sobre itens, checa estoque e adiciona Item
                foreach (var s in dto.Sales)
                {
                    var product = await _db.Products.FindAsync(s.Product);
                    if (product == null)
                        throw new Exception();               // cairá em catch genérico

                    if (product.Quantity < s.Quantity)
                        throw new Exception();               // estoque insuficiente

                    // cria item
                    var item = new Item
                    {
                        UserId = user.Id,
                        ProductId = product.Id,
                        Quantity = s.Quantity,
                        Price = product.Price,
                        SaleId = sale.Id,
                        User = user,
                        Product = product,
                        Sale = sale
                    };
                    _db.Items.Add(item);

                    // atualiza estoque
                    product.Quantity -= s.Quantity;
                }

                // 8) salva e commit
                await _db.SaveChangesAsync();
                await transaction.CommitAsync();

                return StatusCode(201, new { message = "Itens adicionados com sucesso" });
            }
            catch
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "Erro interno do servidor", status = 500 });
            }
        }
    }
}