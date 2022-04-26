using System.ComponentModel.DataAnnotations;
using ProCardapio.Domain;

namespace ProCardapio.Application.Dtos
{
    public class UserDto
    {
        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(15, ErrorMessage ="O campo {0} deve ter no máximo 15 caracteres.")]
        public string NomeUsuario { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(12, ErrorMessage ="O campo {0} deve ter no máximo 12 caracteres.")]
        public string Senha { get; set; }
    }
}