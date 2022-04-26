using System.ComponentModel.DataAnnotations;
using ProCardapio.Domain;

namespace ProCardapio.Application.Dtos
{
    public class PratoDto
    {
        public int Id { get; set; }
        

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(50, ErrorMessage ="O campo {0} deve ter no máximo 50 caracteres.")]
        public string Nome { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório.")]
        public decimal Preco  { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(50, ErrorMessage ="O campo {0} deve ter no máximo 50 caracteres.")]
        public string Descricao { get; set; }
        
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage ="O campo {0} não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        public int RestauranteId { get; set; }
    }
}