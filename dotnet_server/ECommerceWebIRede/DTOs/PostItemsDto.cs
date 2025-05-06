namespace MyApi.DTOs {
    public class PostItemsDto {
        public required string Email { get; set; }
        public required string Token { get; set; }
        public required List<SaleDto> Sales { get; set; }
    }
}