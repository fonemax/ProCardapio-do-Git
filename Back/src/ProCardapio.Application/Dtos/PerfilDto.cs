using System.ComponentModel.DataAnnotations;
using ProCardapio.Domain;

namespace ProCardapio.Application.Dtos
{
    public class PerfilDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        
        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(1, ErrorMessage ="O campo {0} deve ter no mínimo 1 caracteres."),
        MaxLength(30, ErrorMessage ="O campo {0} deve ter no máximo 30 caracteres.")]
        public string PrimeiroNome { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(1, ErrorMessage ="O campo {0} deve ter no mínimo 1 caracteres."),
        MaxLength(30, ErrorMessage ="O campo {0} deve ter no máximo 30 caracteres.")]
        public string UltimoNome { get; set; }

        public int Escolaridade { get; set; }

        public string Email { get; set; }

        public string Telefone { get; set; }

        public string Interesse { get; set; }
    }
}