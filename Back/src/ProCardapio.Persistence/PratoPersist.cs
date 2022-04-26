using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCardapio.Domain;
using ProCardapio.Persistence.Contextos;
using ProCardapio.Persistence.Contratos;

namespace ProCardapio.Persistence
{
    public class PratoPersist : IPratoPersist
    {
        private readonly ProCardapioContext _context;
        
        public PratoPersist(ProCardapioContext context)
        {
            _context = context;

        }

        public async Task<Prato> GetPratoByIdsAsync(int restauranteId, int pratoId)
        {
            IQueryable<Prato> query = _context.Pratos;

            query = query.AsNoTracking().OrderBy(q => q.Id).Where(r => r.RestauranteId == restauranteId && r.Id == pratoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Prato[]> GetPratosByRestauranteIdAsync(int restauranteId)
        {
            IQueryable<Prato> query = _context.Pratos;

            query = query.AsNoTracking().OrderBy(q => q.Id).Where(r => r.RestauranteId == restauranteId);

            return await query.ToArrayAsync();
        }
    }
}