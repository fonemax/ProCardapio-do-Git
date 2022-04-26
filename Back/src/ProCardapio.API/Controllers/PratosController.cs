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
    public class PratosController : ControllerBase
    {
        private readonly IPratoService _pratoService;

        public PratosController(IPratoService pratoService)
        {
            _pratoService = pratoService;
        }

        [HttpGet("{restauranteId}")]
        public async Task<IActionResult> Get(int restauranteId)
        {
            try
            {
                var pratos = await _pratoService.GetPratosByRestauranteIdAsync(restauranteId);
                if (pratos == null) return NoContent();

                return Ok(pratos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao Recuperar Pratos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{restauranteId}")]
        public async Task<IActionResult> SavePratos(int restauranteId, PratoDto[] models)
        {
            try
            {
                var pratos = await _pratoService.SavePratos(restauranteId, models);
                if (pratos == null) return NoContent();

                return Ok(pratos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, 
                    $"Erro ao Salvar Pratos. Erro: {ex.Message}");
            }   
        }

        [HttpDelete("{restauranteId}/{pratoId}")]
        public async Task<IActionResult> Delete(int restauranteId, int pratoId)
        {
            try
            {
                var prato = await _pratoService.GetPratoByIdsAsync(restauranteId, pratoId);
                if (prato == null) return NoContent();

                return await _pratoService.DeletePrato(prato.RestauranteId, prato.Id)
                    ? Ok(new { message =  "Prato Deletado"} )
                    : throw new Exception("Problema não específico ao excluir Prato!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Excluir Restaurante. Erro: {ex.Message}");
            }   
        }
    }
}
