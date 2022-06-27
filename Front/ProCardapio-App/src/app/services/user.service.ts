import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '@app/models/User';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserService {

  baseURL = environment.apiURL + 'v1/users';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private hhtp: HttpClient) { }

  public postRegistro(user: User): Observable<User> {
   user.nomeUsuario = user.nomeUsuario.charAt(0).toUpperCase() + user.nomeUsuario.substr(1).toLowerCase();
   return this.hhtp
     .post<User>(this.baseURL+'/registro', user)
     .pipe(take(1));
   }

   public login(user: User) {
      user.nomeUsuario = user.nomeUsuario.charAt(0).toUpperCase() + user.nomeUsuario.substr(1).toLowerCase();
      return this.hhtp
        .post<User>(this.baseURL+'/login', user).pipe(
           map((response: any) => {
              const user = response;
              if (user) {
                 localStorage.setItem('token', user.token);
                 this.decodedToken = this.jwtHelper.decodeToken(user.token);
                 }
           })
        );
   }

   public loggedIn() {
      const token = localStorage.getItem('token');
      return this.jwtHelper.isTokenExpired(token);
   }

}
