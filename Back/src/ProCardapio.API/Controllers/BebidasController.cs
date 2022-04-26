using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProCardapio.Application.Contratos;
using ProCardapio.Application.Dtos;

namespace ProCardapio.API.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class BebidasController : ControllerBase
    {
        private readonly IBebidaService _bebidaService;

        public BebidasController(IBebidaService bebidaService)
        {
            _bebidaService = bebidaService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(int restauranteId)
        {
            try
            {
                var bebidas = await _bebidaService.GetBebidasByRestauranteIdAsync(restauranteId);
                if (bebidas == null) return NoContent();

                return Ok(bebidas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao Recuperar Bebidas. Erro: {ex.Message}");
            }
        }

        [HttpPut("{restauranteId}")]
        public async Task<IActionResult> SaveBebidas(int restauranteId, BebidaDto[] models)
        {
            try
            {
                var bebidas = await _bebidaService.SaveBebidas(restauranteId, models);
                if (bebidas == null) return NoContent();

                return Ok(bebidas);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao Salvar Bebidas. Erro: {ex.Message}");
            }   
        }

        [HttpDelete("{restauranteId}/{bebidaId}")]
        public async Task<IActionResult> Delete(int restauranteId, int bebidaId)
        {
            try
            {
                var bebida = await _bebidaService.GetBebidaByIdsAsync(restauranteId, bebidaId);
                if (bebida == null) return NoContent();

                return await _bebidaService.DeleteBebida(bebida.RestauranteId, bebida.Id)
                    ? Ok(new { message =  "Bebida Deletado"} )
                    : throw new Exception("Problema não específico ao excluir Bebida!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Excluir Restaurante. Erro: {ex.Message}");
            }   
        }
    }
}
