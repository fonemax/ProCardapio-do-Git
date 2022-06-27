import { Component, OnInit, TemplateRef } from '@angular/core';
import {
   AbstractControl,
   FormArray,
   FormBuilder,
   FormControl,
   FormGroup,
   Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Restaurante } from '@app/models/Restaurante';
import { Prato } from '@app/models/Prato';
import { RestauranteService } from '@app/services/restaurante.service';
import { PratoService } from '@app/services/prato.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from '@environments/environment';

@Component({
   selector: 'app-restaurante-detalhe',
   templateUrl: './restaurante-detalhe.component.html',
   styleUrls: ['./restaurante-detalhe.component.scss'],
})
export class RestauranteDetalheComponent implements OnInit {
   modalRef: BsModalRef;
   restaurante = {} as Restaurante;
   restauranteId: number;
   imagemURL = 'assets/upload.png';
   estadoSalvar: string = 'postRestaurante';
   pratoAtual = { id: 0, nome: '', indice: 0 };
   file: File;

   form!: FormGroup;

   get f(): any {
      return this.form.controls;
   }
   get modoEditar(): boolean {
      return this.estadoSalvar === 'putRestaurante';
   }

   get pratos(): FormArray {
      return this.form.get('pratos') as FormArray;
   }

   constructor(
      private fb: FormBuilder,
      private activatedRouter: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router,
      private modalService: BsModalService,
      private restauranteService: RestauranteService,
      public pratoService: PratoService,
      private spinner: NgxSpinnerService
   ) {}

   ngOnInit(): void {
      this.validacao();
      this.carregarRestaurante();
   }

   // função que carrega restaurante para edição
     public carregarRestaurante(): void {
      this.restauranteId = +this.activatedRouter.snapshot.paramMap.get('id');
      if (this.restauranteId !== null && this.restauranteId !== 0) {
         this.estadoSalvar = 'putRestaurante';
       //  this.spinner.show();
         this.restauranteService
            .getRestauranteById(this.restauranteId)
            .subscribe(
               (restaurante: Restaurante) => {
                  this.restaurante = { ...restaurante };
                  this.form.patchValue(this.restaurante);
                  if (this.restaurante.imagemURL !== '') {
                     this.imagemURL =
                        environment.apiURL +
                        'Resources/Images/' +
                        this.restaurante.imagemURL;
                  }
                  //this.carregarPratos(this.restauranteId); // se náo tiver o include na resposta
                  this.restaurante.pratos.forEach((prato) => {
                     this.pratos.push(this.criarPrato(prato));
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
     // função para carrega os pratos do restaurante na pagina de edição do restaurante
   public carregarPratos(restauranteId: number): void {
      this.pratoService
         .getPratosByRestauranteId(restauranteId)
         .subscribe(
            (pratosRet: Prato[]) => {
               pratosRet.forEach((prato) => {
                  this.pratos.push(this.criarPrato(prato));
               });
            },
            (error: any) => {
               this.toastr.error('Erro ao carregar Pratos', 'Erro!');
               console.error(error);
            }
         )
         .add(() => this.spinner.hide());
   }

   //Função que cria um novo restaurante
   public salvarRestaurante(): void {
      if (this.form.valid && this.restaurante.id == undefined) {
         this.spinner.show();
         this.restaurante =
            this.estadoSalvar ==='putRestaurante'
               ? { ...this.form.value }
               : { id: this.restaurante.id, ...this.form.value };
         this.restauranteService[this.estadoSalvar](this.restaurante)
            .subscribe(
               (restauranteRet: Restaurante) => {
                  this.toastr.success(
                     'Restaurante Salvo com Sucesso',
                     'Sucesso!'
                  );
                  this.router.navigate([
                     `/restaurantes/edit/${restauranteRet.id}`,
                  ]);
               },

               (error: any) => {
                  console.error(error);
                  this.toastr.error('Erro ao Salvar Restaurante.', 'Erro!');
               },
               console.log(this.restaurante)
            )
            .add(() => this.spinner.hide());
      }
   }
    //função que salva novo  prato no banco de dados
   public salvarPratos(): void {
      if (this.form.controls.pratos.valid) {
         this.spinner.show();
         this.pratoService
            .savePratos(this.restauranteId, this.form.value.pratos)
            .subscribe(
               () => {
                  this.toastr.success('Pratos salvos com Sucesso.', 'Sucesso!');
                  this.pratos.reset();
               },
               (error: any) => {
                  this.toastr.error('Erro ao salvar Pratos.', 'Erro!');
                  console.error(error);
               }
            )
            .add(() => this.spinner.hide());
      }
   }

    // validadores formularios restaurante
   private validacao(): void {
      this.form = this.fb.group({
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
      });
   }

   public adicionarPrato(): void {
      this.pratos.push(this.criarPrato({ id: 0 } as Prato));
   }


   // função que cria formularios novo prato
   criarPrato(prato: Prato): FormGroup {
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
       //reseta formulários
   public resetForm(): void {
      this.form.reset();
   }

   public cssValidator(campoForm: FormControl | AbstractControl): any {
      return { 'is-invalid': campoForm?.errors && campoForm?.touched };
   }

   // rempove prato da lista
   public removerPrato(template: TemplateRef<any>, indice: number): void {
      this.pratoAtual.id = this.pratos.get(indice + '.id').value;
      this.pratoAtual.nome = this.pratos.get(indice + '.nome').value;
      this.pratoAtual.indice = indice;
      this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
   }

   public confirmDeletePrato(): void {
      this.modalRef.hide();
      this.spinner.show();

      this.pratoService
         .deletePrato(this.restauranteId, this.pratoAtual.id)
         .subscribe(
            () => {
               this.toastr.success('Prato Excluído com sucesso.', 'Sucesso!');
               this.pratos.removeAt(this.pratoAtual.indice);
            },
            (error: any) => {
               this.toastr.error(
                  `Erro ao exxcluir Prato: <br> ${this.pratoAtual.nome}`,
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



   // funçaõ que salva a imagem no disco
  public onFileChange(ev: any): void {
      const reader = new FileReader();
      reader.onload = (event: any) => (this.imagemURL = event.target.result);

      this.file = ev.target.files;
      reader.readAsDataURL(this.file[0]);

     // this.upLoadImagem();
   }

      // funçao que carrega imagem
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
}
