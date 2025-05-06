using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using MyApi.Data;
using MyApi.DTOs;
using MyApi.Models;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace MyApi.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext db, IConfiguration config) {
            _db = db;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto) {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email && u.Password == dto.Password);
            if (user == null)
                return Unauthorized(new { message = "E-mail ou senha incorretos" });

            var token = GenerateJwt(user);
            return Ok(new { user.Id, user.Name, user.Email, user.Avatar, Token = token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto) {
            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest(new { message = "E-mail já está em uso" });

            var user = new User { Name = dto.Name, Email = dto.Email, Password = dto.Password, Avatar = dto.Avatar };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            var token = GenerateJwt(user);
            return Created("", new { user.Id, user.Name, user.Email, user.Avatar, Token = token });
        }

        private string GenerateJwt(User user) {
            var jwtKey = _config["Jwt:Key"];
            var jwtIssuer = _config["Jwt:Issuer"];
            var jwtAudience = _config["Jwt:Audience"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Iss, jwtIssuer),
                new Claim(JwtRegisteredClaimNames.Aud, jwtAudience)
            };

            var token = new JwtSecurityToken(jwtIssuer, jwtAudience, claims,
                expires: DateTime.UtcNow.AddMinutes(10), signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}