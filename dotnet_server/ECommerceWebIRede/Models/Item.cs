namespace ECommerceStore.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public float Price { get; set; }

        public int ProductId { get; set; }
        public required Product Product { get; set; }

        public int SaleId { get; set; }
        public required Sale Sale { get; set; }

        public int UserId { get; set; }
        public required User User { get; set; }
    }
}