
namespace MyApi.Models
{
    public class Category
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Image { get; set; }

        public List<Product>? Products { get; set; } // Relacionamento 1:N com Products
    }
}