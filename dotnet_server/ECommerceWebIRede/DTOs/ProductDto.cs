namespace MyApi.DTOs {
    public class ProductDto {
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? Image { get; set; }
        public required string CategoryName { get; set; }
    }
}