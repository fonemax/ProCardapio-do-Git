import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante } from '../models/Restaurante';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class RestauranteService {

  baseURL = environment.apiURL + 'v1/restaurantes';

  constructor(private hhtp: HttpClient) { }

  public getAllRestaurantes(): Observable<Restaurante[]> {
    return this.hhtp
      .get<Restaurante[]>(this.baseURL)
      .pipe(take(1));
  }

  public getRestaurantesByNome(nome: string): Observable<Restaurante[]> {
    return this.hhtp
      .get<Restaurante[]>(`${this.baseURL}/${nome}/nome`)
      .pipe(take(1));
  }

  public getRestauranteById(id: number): Observable<Restaurante> {
    return this.hhtp
      .get<Restaurante>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public postRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.hhtp
      .post<Restaurante>(this.baseURL, restaurante)
      .pipe(take(1));
  }

  public putRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.hhtp
      .put<Restaurante>(`${this.baseURL}/${restaurante.id}`, restaurante)
      .pipe(take(1));
  }

  public deleteRestaurante(id: number): Observable<any> {
    return this.hhtp
      .delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  public postUpload(restauranteId: number, file: File): Observable<Restaurante> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.hhtp
      .post<Restaurante>(`${this.baseURL}/upload-image/${restauranteId}`, formData)
      .pipe(take(1));
  }

}
