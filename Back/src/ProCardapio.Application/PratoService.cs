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
    public class PratoService : IPratoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IPratoPersist _pratoPersist;
        private readonly IMapper _mapper;
        public PratoService(IGeralPersist geralPersist, 
                            IPratoPersist pratoPersist,
                            IMapper mapper)
        {
            _pratoPersist = pratoPersist;
            _geralPersist = geralPersist;
            _mapper = mapper;

        }
        public async Task AddPrato(int restauranteId, PratoDto model)
        {
            try
            {
                var prato = _mapper.Map<Prato>(model);
                prato.RestauranteId = restauranteId;
                _geralPersist.Add<Prato>(prato);
                await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }

        public async Task<PratoDto[]> SavePratos(int restauranteId, PratoDto[] models)
        {
            try
            {
                var pratos = await _pratoPersist.GetPratosByRestauranteIdAsync(restauranteId);
                if (pratos == null) return null;

                foreach (var model in models)
                {
                    if (model.Id == 0)
                    {
                        await AddPrato(restauranteId, model);
                    }
                    else
                    {
                        var prato = pratos.FirstOrDefault(prato => prato.Id == model.Id);
                        model.RestauranteId = restauranteId;
                        _mapper.Map(model, prato);
                        _geralPersist.Update<Prato>(prato);
                        await _geralPersist.SaveChangesAsync();
                    }
                }
             
                var pratosResult = await _pratoPersist.GetPratosByRestauranteIdAsync(restauranteId);
                return _mapper.Map<PratoDto[]>(pratosResult);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeletePrato(int restauranteId, int pratoId)
        {
            try
            {
                var prato = await _pratoPersist.GetPratoByIdsAsync(restauranteId, pratoId);
                if (prato == null) throw new Exception("Prato para delete não encontrado.");

                _geralPersist.Delete<Prato>(prato);
                return await _geralPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PratoDto[]> GetPratosByRestauranteIdAsync(int restauranteId)
        {
            try
            {
                var pratos = await _pratoPersist.GetPratosByRestauranteIdAsync(restauranteId);
                if (pratos == null) return null;

                var pratosResult = _mapper.Map<PratoDto[]>(pratos);

                return pratosResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<PratoDto> GetPratoByIdsAsync(int restauranteId, int pratoId)
        {
            try
            {
                var prato = await _pratoPersist.GetPratoByIdsAsync(restauranteId, pratoId);
                if (prato == null) return null;

                var pratoResult = _mapper.Map<PratoDto>(prato);

                return pratoResult;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}