namespace ECommerceStore.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string? Image { get; set; }
        public int CategoryId { get; set; }
        public required Category Category { get; set; }
    }
}