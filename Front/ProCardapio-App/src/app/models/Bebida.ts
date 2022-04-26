import { Restaurante } from "./Restaurante";

export interface Bebida {
  id: number;
  nome: string;
  preco : number;
  descricao: string;
  imagemURL?: string;
  restauranteId: number;
  restaurante: Restaurante;
}
