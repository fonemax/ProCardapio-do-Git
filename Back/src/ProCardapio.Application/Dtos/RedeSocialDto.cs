using System.ComponentModel.DataAnnotations;
using ProCardapio.Domain;

namespace ProCardapio.Application.Dtos
{
    public class RedeSocialDto
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(50, ErrorMessage ="O campo {0} deve ter no máximo 50 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(50, ErrorMessage ="O campo {0} deve ter no máximo 50 caracteres.")]
        public string URL { get; set; }

        public int RestauranteId { get; set; }
    }
}