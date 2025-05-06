using Microsoft.EntityFrameworkCore;
using MyApi.Models;

namespace MyApi.Data {
    public class AppDbContext: DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options) {}
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Item> Items { get; set; }
    }
}