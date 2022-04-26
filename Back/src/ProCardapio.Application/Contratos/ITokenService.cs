using System.Threading.Tasks;
using ProCardapio.Application.Dtos;
using ProCardapio.Domain;

namespace ProCardapio.Application.Contratos
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}