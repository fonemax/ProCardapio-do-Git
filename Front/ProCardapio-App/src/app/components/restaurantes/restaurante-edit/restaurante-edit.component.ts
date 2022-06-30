import { Component, OnInit } from '@angular/core';
import {
   AbstractControl,
   FormArray,
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurante } from '@app/models/Restaurante';
import { PratoService } from '@app/services/prato.service';
import { RestauranteService } from '@app/services/restaurante.service';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BebidaService } from '@app/services/bebida.service';
//import { RedeSocialService } from '@app/services/redeSocial.service';
import { PratosListaComponent } from '@app/components/pratos/pratos-lista/pratos-lista.component';
import { Prato } from '@app/models/Prato';
//import { RedeSocial } from '@app/models/RedeSocial';
import { of } from 'rxjs';
import {
   debounceTime,
   distinctUntilChanged,
   filter,
   map,
   startWith,
   switchMap,
} from 'rxjs/operators';

@Component({
   selector: 'app-restaurante-edit',
   templateUrl: './restaurante-edit.component.html',
   styleUrls: ['./restaurante-edit.component.scss'],
})
export class RestauranteEditComponent implements OnInit {
   modalRef: BsModalRef;
   registerForm!: FormGroup;
   restaurante = {} as Restaurante;
   restauranteId: number;
   pratoId: number;
   estadoSalvar: string = 'putRestaurante';
   imagemURL = 'assets/upload.png';
   file: File;
   pratoAtual = { id: 0, nome: '', indice: 0 };
   bebidaAtual = { id: 0, nome: '', indice: 0 };
   // redeSocialAtual = { id: 0, nome: '', indice: 0 };
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
      private spinner: NgxSpinnerService,
      private bebidaService: BebidaService
   ) // private redeSocialService:RedeSocialService
   {}

   ngOnInit(): void {
   
     
      this.validacao();
      this.carregarRestaurante();
      if (localStorage.getItem('token') !== null)
      this.router.navigate(['/restaurantes/edit/id']);
   if (localStorage.getItem('token') === null) 
      this.router.navigate(['/users/login']);
      
      
   }

   private validacao(): void {
      this.registerForm = this.fb.group({
         id: [],
         nome: [
            '',
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(50),
            ],
         ],
         local: [
            '',
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(50),
            ],
         ],
         tipo: ['', Validators.required],
         garfos: ['', [Validators.required, Validators.max(10)]],
         telefone: ['', Validators.required],
         email: ['', [Validators.required, Validators.email]],
         imagemURL: [''],
         pratos: this.fb.array([]),
         bebidas: this.fb.array([]),
         redesSociais: this.fb.array([]),
      });
   }

   criaPrato(prato: any): FormGroup {
      return this.fb.group({
         id: [prato.id],
         nome: [
            prato.nome,
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(50),
            ],
         ],
         descricao: [
            prato.descricao,
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(50),
            ],
         ],
         preco: [prato.preco, Validators.required],
         imagemURL: [prato.imagemURL],
      });
   }

   criaBebida(bebida: any): FormGroup {
      return this.fb.group({
         id: [bebida.id],
         nome: [
            bebida.nome,
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(50),
            ],
         ],
         descricao: [
            bebida.descricao,
            [
               Validators.required,
               Validators.minLength(4),
               Validators.maxLength(50),
            ],
         ],
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
      this.pratos.push(this.criaPrato({ id: 0 }));
   }

   adicionarBebida() {
      this.bebidas.push(this.criaPrato({ id: 0 }));
   }

   adicionarRedeSocial() {
      this.redesSociais.push(this.criaRedeSocial({ id: 0 }));
   }

   /*removerPrato2(id: number) {
      this.pratos.removeAt(id);
      this.pratoId=id;
     console.log(this.pratoId,this.restaurante.id);
   }*/

   public removerPrato(indice: number, id: number): void {
      this.pratos.removeAt(indice);
      this.pratoService
         .deletePrato(this.restaurante.id, id)
         .subscribe(
            () => {
               this.toastr.success('Prato Excluído com sucesso.', 'Sucesso!');
               this.pratos.removeAt(this.pratoAtual.indice);
            },
            (error: any) => {
               this.toastr.error(
                  `Erro ao excluir Prato: <br> ${this.pratoAtual.nome}`,
                  ''
               );
               console.error(error);
            }
         )
         .add(() => this.spinner.hide());
   }

   public declineDeletePrato(): void {
      this.modalRef.hide();
   }

   public removerBebida(indice: number, id: number): void {
      this.bebidas.removeAt(indice);
      this.bebidaService
         .deleteBebida(this.restaurante.id, id)
         .subscribe(
            () => {
               this.toastr.success('Bebida excluída com sucesso!.', 'Sucesso!');
               this.bebidas.removeAt(this.bebidaAtual.indice);
            },
            (error: any) => {
               this.toastr.error(
                  `Erro ao excluir Prato: <br> ${this.bebidaAtual.nome}`,
                  ''
               );
               console.error(error);
            }
         )
         .add(() => this.spinner.hide());

      // removerBebida2(id: number) {
      // this.bebidas.removeAt(id);
      // this.bebidas.push(this.criaPrato({ id: 0 }));
   }

   removerRedeSocial(id: number) {
      this.redesSociais.removeAt(id);
   }

   /* public removerRedeSocial(indice: number, id: number): void {
      this.redesSociais.removeAt(indice);
      this.redeSocialService
         .deleteRedeSocial(this.restaurante.id, id)
         .subscribe(
            () => {
               this.toastr.success('Rede Social excluída com sucesso!.', 'Sucesso!');
               this.redesSociais.removeAt(this.redeSocialAtual.indice);
            },
            (error: any) => {
               this.toastr.error(
                  `Erro ao excluir Prato: <br> ${this.bebidaAtual.nome}`,
                  ''
               );
               console.error(error);
            }
         )
         .add(() => this.spinner.hide());
         }*/

   public carregarRestaurante(): void {
      this.restauranteId = +this.activatedRouter.snapshot.paramMap.get('id');
      if (this.restauranteId !== null && this.restauranteId !== 0) {
         this.estadoSalvar = 'putRestaurante';
         this.spinner.show();
         this.restauranteService
            .getRestauranteById(this.restauranteId)
            .subscribe(
               (restaurante: Restaurante) => {
                  this.restaurante = { ...restaurante };
                  if (this.restaurante.imagemURL !== '') {
                     this.imagemURL =
                        environment.apiURL +
                        'Resources/Images/' +
                        this.restaurante.imagemURL;
                  }
                  this.restaurante.pratos.forEach((prato) => {
                     this.pratos.push(this.criaPrato(prato));
                  });
                  this.restaurante.bebidas.forEach((bebida) => {
                     this.bebidas.push(this.criaBebida(bebida));
                  });
                  this.restaurante.redesSociais.forEach((redes) => {
                     this.redesSociais.push(this.criaRedeSocial(redes));
                  });
               },

               (error: any) => {
                  this.toastr.error('Erro ao carregar Restaurante', 'Erro!');
                  console.error(error);
               }
            )
            .add(() => this.spinner.hide());
      }
   }

   public onFileChange(ev: any): void {
      const reader = new FileReader();
      reader.onload = (event: any) => (this.imagemURL = event.target.result);

      this.file = ev.target.files;
      reader.readAsDataURL(this.file[0]);

      this.upLoadImagem();
   }

   public upLoadImagem(): void {
      this.spinner.show();
      this.restauranteService
         .postUpload(this.restauranteId, this.file)
         .subscribe(
            () => {
               this.carregarRestaurante();
               this.toastr.success(
                  'Imagem Atualizada com Sucesso.',
                  'Sucesso!'
               );
            },
            (error: any) => {
               this.toastr.error(
                  'Erro ao atualizar a imagem do Restaurante.',
                  'Erro!'
               );
               console.error(error);
            }
         )
         .add(() => this.spinner.hide());
   }

   atualizarRestaurante() {
      var Id = this.restaurante.id;

      this.restaurante = Object.assign(
         { id: this.restaurante.id },
         this.registerForm.value
      );
      this.restaurante.id = Id;

      this.restauranteService[this.estadoSalvar](this.restaurante)
         .subscribe(
            (restauranteRet: Restaurante) => {
               this.toastr.success('Restaurante Salvo com Sucesso', 'Sucesso!');
               this.router.navigate([
                  `/restaurantes/edit/${restauranteRet.id}`,
               ]);
            },
            (error: any) => {
               console.error(error);
               this.toastr.error('Erro teste ao Salvar Restaurante.', 'Erro!');
            }
         )
         .add(() => this.spinner.hide());
   }
}
