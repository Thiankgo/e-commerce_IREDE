using System.Text.Json.Serialization;

namespace ECommerceStore.DTOs
{
    public class SaleDto
    {
        [JsonPropertyName("product")]
        public required int Product { get; set; }

        [JsonPropertyName("quantity")]
        public required int Quantity { get; set; }
    }
}
