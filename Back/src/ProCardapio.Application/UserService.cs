using System;
using System.Threading.Tasks;
using AutoMapper;
using ProCardapio.Application.Contratos;
using ProCardapio.Application.Dtos;
using ProCardapio.Domain;
using ProCardapio.Persistence.Contratos;

namespace ProCardapio.Application
{
    public class UserService : IUserService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IUserPersist _userPersist;
        private readonly IMapper _mapper;
        public UserService(IGeralPersist geralPersist,
                           IUserPersist userPersist,
                           IMapper mapper)
        {
            _geralPersist = geralPersist;
            _userPersist = userPersist;
            _mapper = mapper;
        }
        
        public async Task<UserDto> AddUserAsync(User user)
        {
            try
            {
                //var user = _mapper.Map<User>(model);

                _geralPersist.Add<User>(user);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var userResult = await _userPersist.GetUserByIdAsync(user.Id);
                    return _mapper.Map<UserDto>(userResult);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }
        public async Task<User> CheckPasswordAsync(UserDto userDto, string senha)
        {
            try
            {
                var user = await _userPersist.GetUserByLoginAsync(userDto.NomeUsuario, senha);
                if (user == null) return null;

                var userResult = _mapper.Map<UserDto>(user);

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<User> CheckUserNameAsync(User model)
        {
            try
            {
                var user = await _userPersist.GetUserByUserNameAsync(model.NomeUsuario);
                if (user == null) return null;

                return user;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // public async Task<User> CheckUserNameAsync(User user)
        // {
        //     try
        //     {
        //         var user = await _userPersist.GetUserByLoginAsync(userDto.NomeUsuario, senha);
        //         if (user == null) return null;

        //         var userResult = _mapper.Map<UserDto>(user);

        //         return user;
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }

        public async Task<UserDto> FindByNameAsync(string usuario)
        {
            try
            {
                var user = await _userPersist.FindByNameAsync(usuario);
                if (user == null) return null;

                var userResult = _mapper.Map<UserDto>(user);

                return userResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // public async Task<RestauranteDto> UpdateRestaurante(int restauranteId, RestauranteDto model)
        // {
        //     try
        //     {
        //         var restaurante = await _restaurantePersist.GetRestauranteByIdAsync(restauranteId);
        //         if (restaurante == null) return null;

        //         model.Id = restaurante.Id;
        //         _mapper.Map(model, restaurante);

        //         _geralPersist.Update<Restaurante>(restaurante);

        //         if (await _geralPersist.SaveChangesAsync())
        //         {
        //             var restauranteResult = await _restaurantePersist.GetRestauranteByIdAsync(restaurante.Id);
        //             return _mapper.Map<RestauranteDto>(restauranteResult);
        //         }
        //         return null;
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }

        // public async Task<bool> DeleteRestaurante(int restauranteId)
        // {
        //     try
        //     {
        //         var restaurante = await _restaurantePersist.GetRestauranteByIdAsync(restauranteId);
        //         if (restaurante == null) throw new Exception("Restaurante para delete não encontrado.");

        //         _geralPersist.Delete<Restaurante>(restaurante);
        //         return await _geralPersist.SaveChangesAsync();

        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }

        // public async Task<RestauranteDto[]> GetAllRestaurantesAsync()
        // {
        //     try
        //     {
        //         var restaurantes = await _restaurantePersist.GetAllRestaurantesAsync();
        //         if (restaurantes == null) return null;

        //         var restaurantesResult = _mapper.Map<RestauranteDto[]>(restaurantes);

        //         return restaurantesResult;
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }

        // public async Task<RestauranteDto[]> GetAllRestaurantesByNomeAsync(string nome)
        // {
        //     try
        //     {
        //         var restaurantes = await _restaurantePersist.GetAllRestaurantesByNomeAsync(nome);
        //         if (restaurantes == null) return null;

        //         var restaurantesResult = _mapper.Map<RestauranteDto[]>(restaurantes);

        //         return restaurantesResult;
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }

        public async Task<UserDto> GetUserByLoginAsync(string nome, string senha)
        {
            try
            {
                var user = await _userPersist.GetUserByLoginAsync(nome, senha);
                if (user == null) return null;

                var userResult = _mapper.Map<UserDto>(user);

                return userResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}