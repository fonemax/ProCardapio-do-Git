using System.Threading.Tasks;
using ProCardapio.Domain;

namespace ProCardapio.Persistence.Contratos
{
    public interface IRestaurantePersist
    {
        Task<Restaurante[]> GetAllRestaurantesByNomeAsync(string nome);
        Task<Restaurante[]> GetAllRestaurantesAsync();
        Task<Restaurante> GetRestauranteByIdAsync(int restauranteId);
    }
}