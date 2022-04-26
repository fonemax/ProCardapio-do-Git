using System.Threading.Tasks;
using ProCardapio.Domain;

namespace ProCardapio.Persistence.Contratos
{
    public interface IPratoPersist
    {
        Task<Prato[]> GetPratosByRestauranteIdAsync(int restauranteId);
        Task<Prato> GetPratoByIdsAsync(int restauranteId, int pratoId);
    }
}