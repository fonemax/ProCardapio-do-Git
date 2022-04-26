import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/User';
import { UserService } from '@app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
   selector: 'app-registro',
   templateUrl: './registro.component.html',
   styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
   user = {} as  User;
   form!: FormGroup;

   get f(): any {
      return this.form.controls;
   }

   constructor(private fb: FormBuilder,
               private spinner: NgxSpinnerService,
               private userService: UserService,
               private router: Router,
               private toastr: ToastrService) { }

   ngOnInit(): void {
      this.validacao();
   }

   private validacao(): void {

      const formOptions: AbstractControlOptions = {
         validators: ValidatorField.MustMatch('senha','senhaConfirm')
      };

      this.form = this.fb.group({
         nomeUsuario: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
         senha: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
         senhaConfirm: ['',Validators.required],
         termos: [null, Validators.pattern('true')],
      }, formOptions);
   }

   public resetForm(): void {
      this.form.reset();
   }

   public cssValidator(campoForm: FormControl): any {
      return {'is-invalid': campoForm.errors && campoForm.touched};
   }

   public salvarRegistro(): void {
      if (this.form.valid) {
         this.spinner.show();

         this.user = {... this.form.value};
         console.log(this.user);
         this.userService.postRegistro(this.user).subscribe(
            (userRet: User) => {
               this.toastr.success('Usuário Registrado com Sucesso','Sucesso!');
               this.router.navigate(['/users/login']);
               //this.router.navigate([`/users/perfil/${userRet.id}`]);
            },
            (error: any) => {
               console.error(error);
               this.toastr.error('Erro ao Registrar Usuário.','Erro!');
            }
         ).add(() => this.spinner.hide());
      }
   }
}
