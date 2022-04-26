using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProCardapio.Application.Contratos;
using ProCardapio.Application.Dtos;
using ProCardapio.Domain;
using ProCardapio.Persistence.Contratos;

namespace ProCardapio.Application
{
    public class BebidaService : IBebidaService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IBebidaPersist _bebidaPersist;
        private readonly IMapper _mapper;
        public BebidaService(IGeralPersist geralPersist, 
                            IBebidaPersist bebidaPersist,
                            IMapper mapper)
        {
            _bebidaPersist = bebidaPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;

        }
        public async Task AddBebida(int restauranteId, BebidaDto model)
        {
            try
            {
                var bebida = _mapper.Map<Bebida>(model);
                bebida.RestauranteId = restauranteId;
                _geralPersist.Add<Bebida>(bebida);
                await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }

        public async Task<BebidaDto[]> SaveBebidas(int restauranteId, BebidaDto[] models)
        {
            try
            {
                var bebidas = await _bebidaPersist.GetBebidasByRestauranteIdAsync(restauranteId);
                if (bebidas == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddBebida(restauranteId, model);
                    }
                    else
                    {
                        var bebida = bebidas.FirstOrDefault(bebida => bebida.Id == model.Id);
                        model.RestauranteId = restauranteId;
                        _mapper.Map(model, bebida);
                        _geralPersist.Update<Bebida>(bebida);
                        await _geralPersist.SaveChangesAsync();
                    }
                }
             
                var bebidasResult = await _bebidaPersist.GetBebidasByRestauranteIdAsync(restauranteId);
                return _mapper.Map<BebidaDto[]>(bebidasResult);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteBebida(int restauranteId, int bebidaId)
        {
            try
            {
                var bebida = await _bebidaPersist.GetBebidaByIdsAsync(restauranteId, bebidaId);
                if (bebida == null) throw new Exception("Bebida para delete não encontrado.");

                _geralPersist.Delete<Bebida>(bebida);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<BebidaDto[]> GetBebidasByRestauranteIdAsync(int restauranteId)
        {
            try
            {
                var bebidas = await _bebidaPersist.GetBebidasByRestauranteIdAsync(restauranteId);
                if (bebidas == null) return null;

                var bebidasResult = _mapper.Map<BebidaDto[]>(bebidas);

                return bebidasResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<BebidaDto> GetBebidaByIdsAsync(int restauranteId, int bebidaId)
        {
            try
            {
                var bebida = await _bebidaPersist.GetBebidaByIdsAsync(restauranteId, bebidaId);
                if (bebida == null) return null;

                var bebidaResult = _mapper.Map<BebidaDto>(bebida);

                return bebidaResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}