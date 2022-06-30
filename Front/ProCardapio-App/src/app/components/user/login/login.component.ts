import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Injectable,EventEmitter } from '@angular/core';
import { User } from '@app/models/User';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss'],
  
})
@Injectable()
export class LoginComponent implements OnInit {
   model: any = {};

   constructor(
      private fb: FormBuilder,
      private spinner: NgxSpinnerService,
      private userService: UserService,
      private router: Router,
      private toastr: ToastrService
   ) {}

   ngOnInit(): void {
      if (localStorage.getItem('token') !== null)
         this.router.navigate(['/restaurantes/lista']);
      if (localStorage.getItem('token') === null) {
         this.router.navigate(['/users/login']);
      }
   }

   public login() {
      this.userService.login(this.model).subscribe(
         () => {
            if (localStorage.getItem('token') === null) {
               this.router.navigate(['/users/login']);
               this.toastr.error('Usuario ou Senha incorretos');
            }
            if (localStorage.getItem('token') !== null)
               this.router.navigate(['/restaurantes/lista']);
         },
         (error) => {
            this.toastr.error('Usuario ou senha incorretos');
         }
      );
   }

}
