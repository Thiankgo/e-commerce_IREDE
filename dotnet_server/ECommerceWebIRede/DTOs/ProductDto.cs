namespace ECommerceStore.DTOs {
    public class ProductDto {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string? Image { get; set; }
        public required string Category { get; set; }
    }
}