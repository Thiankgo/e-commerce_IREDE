namespace MyApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string? Image { get; set; }

        // Relacionamento N:1 com Category
        public int CategoryId { get; set; }
        public required Category Category { get; set; }

        public List<Item>? Items { get; set; } // Relacionamento 1:N com Items
    }
}