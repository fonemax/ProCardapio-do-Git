using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCardapio.Domain;
using ProCardapio.Persistence.Contextos;
using ProCardapio.Persistence.Contratos;

namespace ProCardapio.Persistence
{
    public class RestaurantePersist : IRestaurantePersist
    {
        private readonly ProCardapioContext _context;
        public RestaurantePersist(ProCardapioContext context)
        {
            _context = context;
        }

        public async Task<Restaurante[]> GetAllRestaurantesAsync()
        {
            IQueryable<Restaurante> query = _context.Restaurantes
                .Include(r => r.Pratos)
                .Include(r => r.Bebidas)
                .Include(r => r.RedesSociais);

            query = query.AsNoTracking().OrderBy(q => q.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Restaurante[]> GetAllRestaurantesByNomeAsync(string nome)
        {
            IQueryable<Restaurante> query = _context.Restaurantes
                .Include(r => r.Pratos)
                .Include(r => r.Bebidas)
                .Include(r => r.RedesSociais);

            query = query.AsNoTracking().OrderBy(q => q.Id)
                .Where(q => q.Nome.ToLower()
                .Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Restaurante> GetRestauranteByIdAsync(int RestauranteId)
        {
            IQueryable<Restaurante> query = _context.Restaurantes
                .Include(r => r.Pratos)
                .Include(r => r.Bebidas)
                .Include(r => r.RedesSociais);

            query = query.AsNoTracking().OrderBy(q => q.Id).Where(r => r.Id == RestauranteId);

            return await query.FirstOrDefaultAsync();
        }

    }
}