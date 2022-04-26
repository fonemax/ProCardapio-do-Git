using AutoMapper;
using ProCardapio.Application.Dtos;
using ProCardapio.Domain;

namespace ProCardapio.Application.Helpers
{
    public class ProCardapioProfile : Profile
    {
        public ProCardapioProfile()
        {
            CreateMap<Restaurante, RestauranteDto>().ReverseMap();
            CreateMap<Prato, PratoDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Bebida, BebidaDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Perfil, PerfilDto>().ReverseMap();
        }
    }
}