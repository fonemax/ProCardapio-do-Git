import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-nav',
   templateUrl: './nav.component.html',
   styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
   isCollapsed = false;
   constructor(private fb: FormBuilder,
      private spinner: NgxSpinnerService,
      public userService: UserService,
      private router: Router,
      private toastr: ToastrService
   ) { }

   ngOnInit(): void {

   }

   public showMenu(): boolean {
      return this.router.url !== '/users/login';
   }

   logado() {
      return this.userService.loggedIn();
   }

   logout() {
      localStorage.removeItem('token');
      this.toastr.show('Usuário saiu do sistema!');
      this.router.navigate(['/users/login']);
   }

   entrar() {
      console.log('entrar');
      this.router.navigate(['/users/login']);
   }
}
