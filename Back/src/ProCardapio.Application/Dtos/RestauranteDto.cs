using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProCardapio.Application.Dtos
{
    public class RestauranteDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(50, ErrorMessage ="O campo {0} deve ter no máximo 50 caracteres.")]
        public string Nome { get; set; }
        
        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        MinLength(3, ErrorMessage ="O campo {0} deve ter no mínimo 4 caracteres."),
        MaxLength(50, ErrorMessage ="O campo {0} deve ter no máximo 50 caracteres.")]
        public string Local { get; set; }

        [Range(0,10, ErrorMessage ="O campo {0} deve ser >= 0 e <= 10")]
        public int Garfos { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage ="O campo {0} não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório.")]
        public string Tipo { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        Phone(ErrorMessage ="O campo {0} está inválido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage ="O campo {0} é obrigatório."),
        EmailAddress(ErrorMessage ="O campo {0} deve ser um e-mail válido.")]
        public string Email { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PratoDto> Pratos { get; set; }  
        public IEnumerable<BebidaDto> Bebidas { get; set; }      
    }
}