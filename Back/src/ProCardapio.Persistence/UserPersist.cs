using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProCardapio.Domain;
using ProCardapio.Persistence.Contextos;
using ProCardapio.Persistence.Contratos;

namespace ProCardapio.Persistence
{
    public class UserPersist : IUserPersist
    {
        private readonly ProCardapioContext _context;
        public UserPersist(ProCardapioContext context)
        {
            _context = context;
        }

        public async Task<User> FindByNameAsync(string usuario)
        {
        {
            IQueryable<User> query = _context.Users;
                //.Include(r => r.Roles);

            query = query.AsNoTracking().OrderBy(q => q.Id)
                .Where(q => q.NomeUsuario == usuario);

            return await query.FirstOrDefaultAsync();
        }
        }

        // public async Task<Restaurante[]> GetAllRestaurantesAsync()
        // {
        //     IQueryable<Restaurante> query = _context.Restaurantes
        //         .Include(r => r.Pratos)
        //         .Include(r => r.Bebidas)
        //         .Include(r => r.RedesSociais);

        //     query = query.AsNoTracking().OrderBy(q => q.Id);

        //     return await query.ToArrayAsync();
        // }

        public async Task<User> GetUserByIdAsync(int id)
        {
            IQueryable<User> query = _context.Users;
                //.Include(r => r.Roles);

            query = query.AsNoTracking().OrderBy(q => q.Id).Where(x => x.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByLoginAsync(string nome, string senha)
        {
            IQueryable<User> query = _context.Users;
                //.Include(r => r.Roles);

            query = query.AsNoTracking().OrderBy(q => q.Id)
                .Where(q => q.NomeUsuario == nome && q.Senha == senha);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByUserNameAsync(string userName)
        {
            IQueryable<User> query = _context.Users;

            query = query.AsNoTracking().OrderBy(q => q.Id)
                .Where(q => q.NomeUsuario == userName);

            return await query.FirstOrDefaultAsync();
        }

    }
}