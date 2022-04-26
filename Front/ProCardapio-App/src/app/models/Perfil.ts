import { User } from "./User";

export interface Perfil {

   id: number;
   userId: number;
   primeiroNome: string;
   ultimoNome: string;
   escolaridade: string;
   email: string;
   telefone: string;
   interesse: string;
   user: User;
}
