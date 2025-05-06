using Microsoft.EntityFrameworkCore;
using MyApi.Models;

namespace MyApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Aqui mapeamos cada entidade para a tabela de mesmo nome em minúsculo,
            // que é como elas estão no seu PostgreSQL.

            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<Category>().ToTable("category");
            modelBuilder.Entity<Product>().ToTable("products");
            modelBuilder.Entity<Sale>().ToTable("sales");
            modelBuilder.Entity<Item>().ToTable("items");

            // Mapeia colunas de User
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.Password).HasColumnName("password");
                entity.Property(e => e.Avatar).HasColumnName("avatar");
            });

            // Mapeia colunas de Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Image).HasColumnName("image");
            });

            // Mapeia colunas de Product
            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.Price).HasColumnName("price");
                entity.Property(e => e.Quantity).HasColumnName("quantity");
                entity.Property(e => e.Image).HasColumnName("image");
                entity.Property(e => e.CategoryId).HasColumnName("id_category");
            });

            // Mapeia colunas de Sale
            modelBuilder.Entity<Sale>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Date).HasColumnName("date");
            });

            // Mapeia colunas de Item
            modelBuilder.Entity<Item>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Quantity).HasColumnName("quantity");
                entity.Property(e => e.Price).HasColumnName("price");
                entity.Property(e => e.UserId).HasColumnName("id_user");
                entity.Property(e => e.ProductId).HasColumnName("id_product");
                entity.Property(e => e.SaleId).HasColumnName("id_sale");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
