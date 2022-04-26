import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
     private fb: FormBuilder,
     private spinner: NgxSpinnerService,
     ) { }

  ngOnInit(): void {
    this.validacao();
  }

  public validacao(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha','senhaConfirm')
    };

    this.form = this.fb.group({
      primeiroNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      ultimoNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      escolaridade: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      interesse: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      senha: ['', [Validators.minLength(4), Validators.maxLength(15)]],
      senhaConfirm: ['',Validators.required],
      // imagemURL: ['', Validators.required],
    }, formOptions);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarPerfil(): void {

   // if (this.form.valid) {
   //    this.spinner.show();
   //    this.restaurante = (this.estadoSalvar === 'postRestaurante')
   //    ? {... this.form.value}
   //    : {id: this.restaurante.id, ... this.form.value};

   //    this.restauranteService[this.estadoSalvar](this.restaurante).subscribe(
   //       (restauranteRet: Restaurante) => {
   //          this.toastr.success('Restaurante Salvo com Sucesso','Sucesso!')
   //          this.router.navigate([`/restaurantes/detalhe/${restauranteRet.id}`]);
   //       },
   //       (error: any) => {
   //          console.error(error);
   //          this.toastr.error('Erro ao Salvar Restaurante.','Erro!');
   //       }
   //       ).add(() => this.spinner.hide());
   //    }
   // }
  }
}
