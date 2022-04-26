using System.ComponentModel.DataAnnotations;

namespace ProCardapio.Domain
{
    public class RedeSocial
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nome { get; set; }

        [Required]
        public string URL { get; set; }
     
        public int? RestauranteId { get; set; }

        public Restaurante Restaurante { get; set; }
    }
}