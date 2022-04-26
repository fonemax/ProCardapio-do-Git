using System.Collections.Generic;

namespace ProCardapio.Domain
{
    public class Voto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RestauranteId { get; set; }
        public int PratoId { get; set; }
        public int Garfo { get; set; }
    }
}