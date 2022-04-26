import { Bebida } from "./Bebida";
import { Prato } from "./Prato";
import { RedeSocial } from "./RedeSocial";

export interface Restaurante {
  id: number;
  nome: string;
  local: string;
  garfos: number;
  imagemURL?: string;
  tipo: string;
  telefone: string;
  email: string;
  redesSociais: RedeSocial[];
  pratos: Prato[];
  bebidas: Bebida[];
}
