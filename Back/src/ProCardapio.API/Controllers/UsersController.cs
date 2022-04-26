using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProCardapio.Application.Contratos;
using ProCardapio.Application.Dtos;
using ProCardapio.Domain;

namespace ProCardapio.API.Controllers
{
    [ApiController]
    [Route("v1/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(ITokenService tokenService, 
                               IUserService userService, 
                               IMapper mapper)
        {
            _tokenService = tokenService;
            _userService = userService;
            _mapper = mapper;
        }

        // [HttpGet("GetUser")]
        // [Authorize]
        // public async Task<IActionResult> GetUser()
        // {
        //     try
        //     {
        //         return Ok(new User());
        //     }
        //     catch (Exception ex)
        //     {
        //         return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Recuperar Usuarios. Erro: {ex.Message}");
        //     }
        // }

        [HttpPost("Registro")]
        [AllowAnonymous]
        public async Task<IActionResult> Registro(UserDto userDto)
        {
            try
            {
                var user = _mapper.Map<User>(userDto);
                var checkUser = await _userService.CheckUserNameAsync(user);
                if (checkUser != null) return Ok(new { message =  "Nome de Usuário já existe!"});

                var result = await _userService.AddUserAsync(user);
                
                if (user == null) return NoContent();

                var userToReturn = _mapper.Map<UserDto>(user);
                

                return Ok(userToReturn);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Registrar Usuário. Erro: {ex.Message}");
            }  
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserDto userLogin)
        {
            try
            {
                var user = await  _userService.FindByNameAsync(userLogin.NomeUsuario);
                if (user == null) return NoContent();

                var result = await _userService.CheckPasswordAsync(user, userLogin.Senha);
                if (result == null) return Unauthorized();

                var userToReturn = _mapper.Map<UserDto>(result);
                userToReturn.Senha = null;

                return Ok(new {
                    token = _tokenService.GenerateToken(result),
                    user = userToReturn
                });

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao Logar Usuário. Erro: {ex.Message}");
            } 
        }
    }
}
