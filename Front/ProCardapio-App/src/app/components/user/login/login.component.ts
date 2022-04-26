import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   model: any = {};

   constructor(private fb: FormBuilder,
      private spinner: NgxSpinnerService,
      private userService: UserService,
      private router: Router,
      private toastr: ToastrService) { }

  ngOnInit(): void {
   if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/dashboard']);
   }
  }

  public login() {
     this.userService.login(this.model).subscribe(
        () => {
           this.router.navigate(['/dashboard']);
        },
        error => {
           this.toastr.error('Erro ao logar Usuário.');
        }
     );
  }

}
