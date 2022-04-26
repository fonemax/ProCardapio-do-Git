using System.Threading.Tasks;
using ProCardapio.Domain;

namespace ProCardapio.Persistence.Contratos
{
    public interface IUserPersist
    {
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByLoginAsync(string nome, string senha);
        Task<User> GetUserByUserNameAsync(string userName);
        Task<User> FindByNameAsync(string usuario);
    }
}