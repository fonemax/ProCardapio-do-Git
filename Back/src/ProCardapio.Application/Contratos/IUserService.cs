using System.Threading.Tasks;
using ProCardapio.Application.Dtos;
using ProCardapio.Domain;

namespace ProCardapio.Application.Contratos
{
    public interface IUserService
    {
        Task<UserDto> AddUserAsync(User model);
        Task<User> CheckUserNameAsync(User model);      
        Task<UserDto> GetUserByLoginAsync(string nome, string senha);
        Task<UserDto> FindByNameAsync(string usuario);  
        Task<User> CheckPasswordAsync(UserDto user, string senha);    
    }
}