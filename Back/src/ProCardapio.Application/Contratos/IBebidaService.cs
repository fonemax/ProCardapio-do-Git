using System.Threading.Tasks;
using ProCardapio.Application.Dtos;

namespace ProCardapio.Application.Contratos
{
    public interface IBebidaService
    {
        Task<BebidaDto[]> SaveBebidas(int restauranteId, BebidaDto[] models);
        Task<bool> DeleteBebida(int restauranteId, int bebidaId);

        Task<BebidaDto[]> GetBebidasByRestauranteIdAsync(int restauranteId);        
        Task<BebidaDto> GetBebidaByIdsAsync(int restauranteId, int bebidaId);
    }
}