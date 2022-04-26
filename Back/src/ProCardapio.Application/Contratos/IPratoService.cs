using System.Threading.Tasks;
using ProCardapio.Application.Dtos;

namespace ProCardapio.Application.Contratos
{
    public interface IPratoService
    {
        Task<PratoDto[]> SavePratos(int restauranteId, PratoDto[] models);
        Task<bool> DeletePrato(int restauranteId, int pratoId);

        Task<PratoDto[]> GetPratosByRestauranteIdAsync(int RestauranteId);
        Task<PratoDto> GetPratoByIdsAsync(int restauranteId, int pratoId);
    }
}