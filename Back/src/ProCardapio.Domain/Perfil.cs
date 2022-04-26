using System.Collections.Generic;

namespace ProCardapio.Domain
{
    public class Perfil
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string PrimeiroNome { get; set; }
        public string UltimoNome { get; set; }
        public string Escolaridade { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Interesse { get; set; }
        public IEnumerable<Role> Roles { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<Voto> Votos { get; set; }
    }
}