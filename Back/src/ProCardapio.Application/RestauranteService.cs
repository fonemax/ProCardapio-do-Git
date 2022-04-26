using System;
using System.Threading.Tasks;
using AutoMapper;
using ProCardapio.Application.Contratos;
using ProCardapio.Application.Dtos;
using ProCardapio.Domain;
using ProCardapio.Persistence.Contratos;

namespace ProCardapio.Application
{
    public class RestauranteService : IRestauranteService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IRestaurantePersist _restaurantePersist;
        private readonly IMapper _mapper;
        public RestauranteService(IGeralPersist geralPersist,
                                  IRestaurantePersist restaurantePersist,
                                  IMapper mapper)
        {
            _geralPersist = geralPersist;
            _restaurantePersist = restaurantePersist;
            _mapper = mapper;
        }
        
        public async Task<RestauranteDto> AddRestaurante(RestauranteDto model)
        {
            try
            {
                var restaurante = _mapper.Map<Restaurante>(model);

                _geralPersist.Add<Restaurante>(restaurante);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var restauranteResult = await _restaurantePersist.GetRestauranteByIdAsync(restaurante.Id);
                    return _mapper.Map<RestauranteDto>(restauranteResult);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }

        public async Task<RestauranteDto> UpdateRestaurante(int restauranteId, RestauranteDto model)
        {
            try
            {
                var restaurante = await _restaurantePersist.GetRestauranteByIdAsync(restauranteId);
                if (restaurante == null) return null;

                model.Id = restaurante.Id;
                _mapper.Map(model, restaurante);

                _geralPersist.Update<Restaurante>(restaurante);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var restauranteResult = await _restaurantePersist.GetRestauranteByIdAsync(restaurante.Id);
                    return _mapper.Map<RestauranteDto>(restauranteResult);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteRestaurante(int restauranteId)
        {
            try
            {
                var restaurante = await _restaurantePersist.GetRestauranteByIdAsync(restauranteId);
                if (restaurante == null) throw new Exception("Restaurante para delete não encontrado.");

                _geralPersist.Delete<Restaurante>(restaurante);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RestauranteDto[]> GetAllRestaurantesAsync()
        {
            try
            {
                var restaurantes = await _restaurantePersist.GetAllRestaurantesAsync();
                if (restaurantes == null) return null;

                var restaurantesResult = _mapper.Map<RestauranteDto[]>(restaurantes);

                return restaurantesResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RestauranteDto[]> GetAllRestaurantesByNomeAsync(string nome)
        {
            try
            {
                var restaurantes = await _restaurantePersist.GetAllRestaurantesByNomeAsync(nome);
                if (restaurantes == null) return null;

                var restaurantesResult = _mapper.Map<RestauranteDto[]>(restaurantes);

                return restaurantesResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<RestauranteDto> GetRestauranteByIdAsync(int restauranteId)
        {
            try
            {
                var restaurante = await _restaurantePersist.GetRestauranteByIdAsync(restauranteId);
                if (restaurante == null) return null;

                var restauranteResult = _mapper.Map<RestauranteDto>(restaurante);

                return restauranteResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}