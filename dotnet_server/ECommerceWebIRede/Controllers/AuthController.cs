using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MyApi.Data;
using MyApi.DTOs;
using MyApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private const string Secret = "ecommerce_secret_32_bytes_key!";

        private const string Iss = "ecommerce back";
        private const string Aud = "ecommerce front";
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        // GET api/auth?token=...
        [HttpGet]
        public IActionResult ValidateToken([FromQuery] string token)
        {
            if (string.IsNullOrEmpty(token))
                return BadRequest(new { message = "Token vazio", status = 400 });

            try
            {
                var handler = new JwtSecurityTokenHandler();
                handler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Secret)),
                    ValidateIssuer = true,
                    ValidIssuer = Iss,
                    ValidateAudience = true,
                    ValidAudience = Aud,
                    ValidateLifetime = true
                }, out _);

                var jwt = handler.ReadJwtToken(token);
                var userId = int.Parse(jwt.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);

                if (!_db.Users.Any(u => u.Id == userId))
                    return StatusCode(500, new { message = "Erro interno do servidor", status = 500 });

                return Ok(new { message = "Token válido", status = 200 });
            }
            catch (SecurityTokenExpiredException ex)
            {
                return StatusCode(500, new { message = ex.GetType().Name, status = 500 });
            }
            catch
            {
                return StatusCode(500, new { message = "Erro interno do servidor", status = 500 });
            }
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email)) return BadRequest(new { message = "Email vazio", status = 400 });
            if (string.IsNullOrEmpty(dto.Password)) return BadRequest(new { message = "Senha vazia", status = 400 });

            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);
            if (user == null) return Unauthorized(new { message = "E-mail ou senha incorretos", status = 401 });

            var token = GenerateToken(user);
            return Ok(new { user.Id, user.Name, user.Email, user.Avatar, token });
        }

        // POST api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Name)) return BadRequest(new { message = "Nome vazio", status = 400 });
            if (string.IsNullOrEmpty(dto.Email)) return BadRequest(new { message = "Email vazio", status = 400 });
            if (dto.Password.Length < 5) return BadRequest(new { message = "Senha deve conter 5 caracteres", status = 400 });

            if (_db.Users.Any(u => u.Email == dto.Email))
                return BadRequest(new { message = "E-mail já está em uso", status = 400 });

            var user = new User { Name = dto.Name, Email = dto.Email, Password = dto.Password, Avatar = dto.Avatar };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var token = GenerateToken(user);
            return StatusCode(201, new { user.Id, user.Name, user.Email, user.Avatar, token });
        }

        private string GenerateToken(User user)
        {
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);
            var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Iss, _config["Jwt:Issuer"]!),
                new Claim(JwtRegisteredClaimNames.Aud, _config["Jwt:Audience"]!)
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}