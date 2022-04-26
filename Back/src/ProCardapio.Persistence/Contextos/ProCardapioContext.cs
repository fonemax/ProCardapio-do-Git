using Microsoft.EntityFrameworkCore;
using ProCardapio.Domain;

namespace ProCardapio.Persistence.Contextos
{
    public class ProCardapioContext : DbContext
    {
        public ProCardapioContext(DbContextOptions<ProCardapioContext> options) : base(options) { }
        public DbSet<Restaurante> Restaurantes { get; set; }
        public DbSet<Prato> Pratos { get; set; }
        public DbSet<Bebida> Bebidas { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restaurante>()
                .HasMany(e => e.RedesSociais)
                .WithOne(rs => rs.Restaurante)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }
}