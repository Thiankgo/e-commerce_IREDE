namespace MyApi.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public int SaleId { get; set; }
        public Sale? Sale { get; set; }

        public int UserId { get; set; }
        public User? User { get; set; }
    }
}