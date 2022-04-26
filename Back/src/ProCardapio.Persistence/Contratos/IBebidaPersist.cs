using System.Threading.Tasks;
using ProCardapio.Domain;

namespace ProCardapio.Persistence.Contratos
{
    public interface IBebidaPersist
    {
        Task<Bebida[]> GetBebidasByRestauranteIdAsync(int restauranteId);
        Task<Bebida> GetBebidaByIdsAsync(int restauranteId, int bebidaId);
    }
}