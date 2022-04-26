import { Restaurante } from "./Restaurante";

export interface Prato {
  id: number;
  nome: string;
  preco : number;
  descricao: string;
  imagemURL?: string;
  restauranteId: number;
  restaurante: Restaurante;
}
