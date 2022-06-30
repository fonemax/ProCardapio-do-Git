/*import { HttpClient } from '@angular/common/http';
i mport { RedeSocial } from '@app/models/RedeSocial';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class RedeSocialService {

  baseURL = environment.apiURL + 'v1/RedeSocial';

  constructor(private hhtp: HttpClient) { }

  public getRedeSocialByRestauranteId(restauranteId: number): Observable<RedeSocial[]> {
    return this.hhtp
    .get<RedeSocial[]>(`${this.baseURL}?restauranteId=${restauranteId}`)
    .pipe(take(1));
  }

  public saveRedeSocial(restauranteId: number, redesSociais: RedeSocial[]): Observable<RedeSocial[]> {
    return this.hhtp
    .put<RedeSocial[]>(`${this.baseURL}/${restauranteId}`, redesSociais)
  }

  public deleteRedeSocial(restauranteId: number, redeSocialId: number): Observable<any> {
    return this.hhtp
    .delete(`${this.baseURL}/${restauranteId}/${redeSocialId}`)
    .pipe(take(1));
  }

}
/