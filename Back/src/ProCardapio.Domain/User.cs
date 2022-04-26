using System.Collections.Generic;

namespace ProCardapio.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string NomeUsuario { get; set; }
        public string Senha { get; set; }
        public IEnumerable<Role> Roles { get; set; }
        //public Perfil Perfil { get; set; }

    }
}