namespace MyApi.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }

        public List<Item>? Items { get; set; } // Relacionamento 1:N com Items
    }
}