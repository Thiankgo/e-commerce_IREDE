namespace MyApi.DTOs {
    public class RegisterDto {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string? Avatar { get; set; }
    }
}