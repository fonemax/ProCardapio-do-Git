import { HttpClient } from '@angular/common/http';
import { Bebida } from '@app/models/Bebida';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class BebidaService {

  baseURL = environment.apiURL + 'v1/bebidas';

  constructor(private hhtp: HttpClient) { }

  public getBebidasByIdRestauranteId(restauranteId: number): Observable<Bebida[]> {
    return this.hhtp
    .get<Bebida[]>(`${this.baseURL}/${restauranteId}`)
    .pipe(take(1));
  }

  public saveBebidas(restauranteId: number, bebidas: Bebida[]): Observable<Bebida[]> {
    return this.hhtp
    .put<Bebida[]>(`${this.baseURL}/${restauranteId}`, bebidas)
  }

  public deleteBebida(restauranteId: number, bebidaId: number): Observable<any> {
    return this.hhtp
    .delete(`${this.baseURL}/${restauranteId}/${bebidaId}`)
    .pipe(take(1));
  }

}
