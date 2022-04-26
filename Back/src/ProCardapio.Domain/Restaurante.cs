using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProCardapio.Domain
{
    public class Restaurante
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Nome { get; set; }

        [Required]
        [MaxLength(50)]
        public string Local { get; set; }

        public int Garfos { get; set; }

        public string ImagemURL { get; set; }

        [Required]
        public string Tipo { get; set; }

        [Required]
        public string Telefone { get; set; }

        [Required]
        public string Email { get; set; }

        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        
        public IEnumerable<Prato> Pratos { get; set; }
        public IEnumerable<Bebida> Bebidas { get; set; }
    }
}