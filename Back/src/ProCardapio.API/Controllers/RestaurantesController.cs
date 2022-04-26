using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProCardapio.Application.Contratos;
using ProCardapio.Application.Dtos;

namespace ProCardapio.API.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class RestaurantesController : ControllerBase
    {
        private readonly IRestauranteService _restauranteService;

        private readonly IWebHostEnvironment _hostEnvironment;

        public RestaurantesController(IRestauranteService restauranteService, IWebHostEnvironment hostEnvironment)
        {
            _restauranteService = restauranteService;
            _hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var restaurantes = await _restauranteService.GetAllRestaurantesAsync();
                if (restaurantes == null) return NoContent();

                return Ok(restaurantes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Restaurantes. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var restaurante = await _restauranteService.GetRestauranteByIdAsync(id);
                if (restaurante == null) return NoContent();

                return Ok(restaurante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Restaurante. Erro: {ex.Message}");
            }
        }

        [HttpGet("{nome}/nome")]
        public async Task<IActionResult> GetByNome(string nome)
        {
            try
            {
                var restaurantes = await _restauranteService.GetAllRestaurantesByNomeAsync(nome);
                if (restaurantes == null) return NoContent();

                return Ok(restaurantes);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Restaurante. Erro: {ex.Message}");
            }
        }

        [HttpPost("upload-image/{restauranteId}")]
        public async Task<IActionResult> UploadImage(int restauranteId)
        {
            try
            {
                var restaurante = await _restauranteService.GetRestauranteByIdAsync(restauranteId);
                if (restaurante == null) return NoContent();

                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    DeleteImage(restaurante.ImagemURL);
                    restaurante.ImagemURL = await SaveImage(file);
                }

                var RestauranteRet = await _restauranteService.UpdateRestaurante(restauranteId, restaurante);

                return Ok(RestauranteRet);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Adicionar Restaurante. Erro: {ex.Message}");
            }   
        }

        [HttpPost]
        public async Task<IActionResult> Post(RestauranteDto model)
        {
            try
            {
                var restaurante = await _restauranteService.AddRestaurante(model);
                if (restaurante == null) return NoContent();

                return Ok(restaurante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Adicionar Restaurante. Erro: {ex.Message}");
            }   
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, RestauranteDto model)
        {
            try
            {
                var idPratos = new List<int>();
                var idBebidas = new List<int>();
                var idRedes = new List<int>();

                foreach (var item in model.Pratos)
                {
                    idPratos.Add(item.Id);
                }
                foreach (var item in model.Bebidas)
                {
                    idBebidas.Add(item.Id);
                }
                foreach (var item in model.RedesSociais)
                {
                    idRedes.Add(item.Id);
                }

                var rest = await _restauranteService.GetRestauranteByIdAsync(id);
                if (rest == null) return NotFound();

                var pratos = rest.Pratos.Where(prato => !idPratos.Contains(prato.Id)).ToList<PratoDto>();
                var bebidas = rest.Bebidas.Where(bebida => !idBebidas.Contains(bebida.Id)).ToList<BebidaDto>();
                var redesSociais = rest.RedesSociais.Where(redes => !idRedes.Contains(redes.Id)).ToList<RedeSocialDto>();

                if (pratos.Count > 0)
                    pratos.ForEach(prato => _restauranteService.DeleteRestaurante(prato.Id));

                if (bebidas.Count > 0)
                pratos.ForEach(bebida => _restauranteService.DeleteRestaurante(bebida.Id));

                var restaurante = await _restauranteService.UpdateRestaurante(id, model);
                if (restaurante == null) return NoContent();

                return Ok(restaurante);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Atualizar Restaurante. Erro: {ex.Message}");
            }   
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var restaurante = await _restauranteService.GetRestauranteByIdAsync(id);
                if (restaurante == null) return NoContent();

                if (await _restauranteService.DeleteRestaurante(id))
                {
                    DeleteImage(restaurante.ImagemURL);
                    return Ok(new { message =  "Deletado"});
                }
                else
                {
                    throw new Exception("Problema não específico ao excluir Restaurante!");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Excluir Restaurante. Erro: {ex.Message}");
            }   
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            var imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)
                    .Take(10).ToArray()).Replace(' ', '-');

            imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
