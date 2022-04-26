using System.Threading.Tasks;
using ProCardapio.Application.Dtos;

namespace ProCardapio.Application.Contratos
{
    public interface IRestauranteService
    {
        Task<RestauranteDto> AddRestaurante(RestauranteDto model);
        Task<RestauranteDto> UpdateRestaurante(int restauranteId, RestauranteDto model);
        Task<bool> DeleteRestaurante(int restauranteId);

        Task<RestauranteDto[]> GetAllRestaurantesAsync();
        Task<RestauranteDto[]> GetAllRestaurantesByNomeAsync(string nome);      
        Task<RestauranteDto> GetRestauranteByIdAsync(int restauranteId);
    }
}