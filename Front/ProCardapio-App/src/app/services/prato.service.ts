import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prato } from '@app/models/Prato';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class PratoService {

  baseURL = environment.apiURL + 'v1/pratos';

  constructor(private hhtp: HttpClient) { }

  public getPratosByRestauranteId(restauranteId: number): Observable<Prato[]> {
    return this.hhtp
    .get<Prato[]>(`${this.baseURL}/${restauranteId}`)
    .pipe(take(1));
  }

  public savePratos(restauranteId: number, pratos: Prato[]): Observable<Prato[]> {
    return this.hhtp
    .put<Prato[]>(`${this.baseURL}/${restauranteId}`, pratos)
  }

  public deletePrato(restauranteId: number, pratoId: number): Observable<any> {
    return this.hhtp
    .delete(`${this.baseURL}/${restauranteId}/${pratoId}`)
    .pipe(take(1));
  }
}
