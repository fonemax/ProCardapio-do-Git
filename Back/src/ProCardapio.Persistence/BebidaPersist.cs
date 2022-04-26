using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCardapio.Domain;
using ProCardapio.Persistence.Contextos;
using ProCardapio.Persistence.Contratos;

namespace ProCardapio.Persistence
{
    public class BebidaPersist : IBebidaPersist
    {
        private readonly ProCardapioContext _context;
        
        public BebidaPersist(ProCardapioContext context)
        {
            _context = context;

        }

        public async Task<Bebida> GetBebidaByIdsAsync(int restauranteId, int bebidaId)
        {
            IQueryable<Bebida> query = _context.Bebidas;

            query = query.AsNoTracking().OrderBy(q => q.Id).Where(r => r.RestauranteId == restauranteId && r.Id == bebidaId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Bebida[]> GetBebidasByRestauranteIdAsync(int restauranteId)
        {
            IQueryable<Bebida> query = _context.Bebidas;

            query = query.AsNoTracking().OrderBy(q => q.Id).Where(r => r.RestauranteId == restauranteId);

            return await query.ToArrayAsync();
        }
    }
}