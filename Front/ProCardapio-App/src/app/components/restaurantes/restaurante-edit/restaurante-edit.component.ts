import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurante } from '@app/models/Restaurante';
import { PratoService } from '@app/services/prato.service';
import { RestauranteService } from '@app/services/restaurante.service';
import { environment } from '@environments/environment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurante-edit',
  templateUrl: './restaurante-edit.component.html',
  styleUrls: ['./restaurante-edit.component.scss']
})
export class RestauranteEditComponent implements OnInit {
   registerForm!: FormGroup;
   restaurante = {} as Restaurante;
   restauranteId: number;
   estadoSalvar: string = 'putRestaurante';
   imagemURL = 'assets/upload.png';
   file: File;

   get pratos(): FormArray {
      return <FormArray>this.registerForm.get('pratos');
   }

   get bebidas(): FormArray {
      return <FormArray>this.registerForm.get('bebidas');
   }

   get redesSociais(): FormArray {
      return <FormArray>this.registerForm.get('redesSociais');
   }

   constructor(
      private fb: FormBuilder,
      private activatedRouter: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router,
      private modalService: BsModalService,
      private restauranteService: RestauranteService,
      private pratoService: PratoService,
      private spinner: NgxSpinnerService) { }

   ngOnInit(): void {
      this.validacao();
      this.carregarRestaurante();
   }

   private validacao(): void {
      this.registerForm = this.fb.group({
         id: [],
         nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         local: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         tipo: ['', Validators.required],
         garfos: ['',[Validators.required, Validators.max(10)]],
         telefone: ['', Validators.required],
         email: ['',[Validators.required, Validators.email]],
        imagemURL: [''],
        pratos: this.fb.array([]),
         bebidas: this.fb.array([]),
        redesSociais: this.fb.array([]),
      });
   }

   criaPrato(prato: any): FormGroup {
      return this.fb.group({
         id: [prato.id],
         nome: [prato.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         descricao: [prato.descricao, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         preco: [prato.preco, Validators.required],
         imagemURL: [prato.imagemURL],
      });
   }

   criaBebida(bebida: any): FormGroup {
      return this.fb.group({
         id: [bebida.id],
         nome: [bebida.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         descricao: [bebida.descricao, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         preco: [bebida.preco, Validators.required],
         imagemURL: [bebida.imagemURL],
      });
   }

   criaRedeSocial(redeSocial: any): FormGroup {
      return this.fb.group({
         id: [redeSocial.id],
         nome: [redeSocial.nome, Validators.required],
         url: [redeSocial.url, Validators.required],
      });
   }

   adicionarPrato() {
      this.pratos.push(this.criaPrato({id: 0}));
   }

   adicionarBebida() {
      this.bebidas.push(this.criaPrato({id: 0}));
   }

   adicionarRedeSocial() {
      this.redesSociais.push(this.criaRedeSocial({id: 0}));
   }

   removerPrato(id: number) {
      this.pratos.removeAt(id);
   }

   removerBebida(id: number) {
      this.bebidas.removeAt(id);
   }

   removerRedeSocial(id: number) {
      this.redesSociais.removeAt(id);
   }

  public carregarRestaurante(): void {
   this.restauranteId = +this.activatedRouter.snapshot.paramMap.get('id');
   if (this.restauranteId !== null && this.restauranteId !== 0) {
      this.estadoSalvar = 'putRestaurante';
      this.spinner.show();
      this.restauranteService.getRestauranteById(this.restauranteId).subscribe(
         (restaurante: Restaurante ) => {

            this.restaurante = {... restaurante};
            if (this.restaurante.imagemURL !== '' ){
               this.imagemURL = environment.apiURL + 'Resources/Images/'+ this.restaurante.imagemURL;
            }
            this.restaurante.pratos.forEach(prato => {
               this.pratos.push(this.criaPrato(prato));
            });
            this.restaurante.bebidas.forEach(bebida => {
               this.bebidas.push(this.criaBebida(bebida));
            });
            this.restaurante.redesSociais.forEach(redes => {
               this.redesSociais.push(this.criaRedeSocial(redes));
            });


      },

      (error: any) => {
         this.toastr.error('Erro ao carregar Restaurante','Erro!')
         console.error(error);
      }
      ).add(() => this.spinner.hide());
   }
}

  public onFileChange(ev: any): void {
      const reader = new FileReader();
      reader.onload = (event: any) => this.imagemURL = event.target.result;

      this.file = ev.target.files;
      reader.readAsDataURL(this.file[0]);

      this.upLoadImagem();
   }

   public upLoadImagem(): void {
      this.spinner.show();
      this.restauranteService.postUpload(this.restauranteId, this.file).subscribe(
         () => {
            this.carregarRestaurante();
            this.toastr.success('Imagem Atualizada com Sucesso.','Sucesso!');
         },
         (error: any) => {
            this.toastr.error('Erro ao atualizar a imagem do Restaurante.','Erro!');
            console.error(error);
         },
      ).add(() => this.spinner.hide());
   }

       atualizarRestaurante() {

         var Id = this.restaurante.id

         this.restaurante = Object.assign({id: this.restaurante.id}, this.registerForm.value);
         this.restaurante.id = Id

         this.restauranteService[this.estadoSalvar](this.restaurante).subscribe(
            (restauranteRet: Restaurante) => {
               this.toastr.success('Restaurante Salvo com Sucesso','Sucesso!');
               this.router.navigate([`/restaurantes/edit/${restauranteRet.id}`]);

            },
            (error: any) => {
               console.error(error);
               this.toastr.error('Erro teste ao Salvar Restaurante.','Erro!');
            }
         ).add(() => this.spinner.hide());
   }
}
