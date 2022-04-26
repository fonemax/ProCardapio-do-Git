using System.ComponentModel.DataAnnotations;

namespace ProCardapio.Domain
{
    public class Bebida
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nome { get; set; }

        [Required]
        public decimal Preco  { get; set; }

        [Required]
        [MaxLength(50)]
        public string Descricao { get; set; }
        
        public string ImagemURL { get; set; }

        [Required]
        public int? RestauranteId { get; set; }
        public Restaurante Restaurante { get; set; }
    }
}