
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {Prato} from '@app/models/Prato';
import { PratoService } from '@app/services/prato.service';
import { environment } from '@environments/environment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Restaurante } from '@app/models/Restaurante';
import { RestauranteService } from '@app/services/restaurante.service';
import { DashboardComponent } from '@app/components/dashboard/dashboard.component';


@Component({
  selector: 'app-pratos-lista',
  templateUrl: './pratos-lista.component.html',
  styleUrls: ['./pratos-lista.component.scss']
})
export class PratosListaComponent implements OnInit {

 // constructor() { }

 // ngOnInit(): void {
 // }

//}

//export class RestauranteListaComponent implements OnInit {


  public pratos: Prato[] = [];
  public pratoFilter: Prato[] = [];
  public restaurantes: Restaurante[] = [];
  public restFilter: Restaurante[] = [];
  

  modalRef?: BsModalRef;

  public larguraImg: number = 150;
  public margemImg: number = 2;
  public exibirImg: boolean = true;
  private filtroListado: string = '';
  public restauranteId: number = 25;




  public get filtroListaPrato(): string {
    return this.filtroListado;
  }

  public set filtroListaPrato(value: string) {
    this.filtroListado = value;
    this.pratoFilter = this.filtroListado ? this.filtrarPrato(this.filtroListado) : this.pratos;
  }

  public filtrarPrato(filtrarPor: string): Prato[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.pratos.filter(
      (prato: any) => prato.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      )
  }

  constructor(
    private pratoService: PratoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarPratos(25);
  }

  public alterarImg(): void {
    this.exibirImg = !this.exibirImg;
  }

  public retornaImagem(imagemURL: string): string {
    return (imagemURL !== '')
      ? `${environment.apiURL}Resources/Images/${imagemURL}`
      : 'assets/semImagem.jpg'
  }

  public carregarPratos(restauranteId: number): void {
    this.pratoService
       .getPratosByRestauranteId(restauranteId)
       .subscribe(
          (pratosRet: Prato[]) => {
            this.pratos = pratosRet;
            this.pratoFilter = this.pratos;
            // pratosRet.forEach((prato) => {
               //this.pratos.push(this.criarPrato(prato));
          //   });
          },
          (error: any) => {
             this.toastr.error('Erro ao carregar Pratos', 'Erro!');
             console.error(error);
          }
       )
       .add(() => this.spinner.hide());
 }

/*  public carregarPratos(): void {
    this.pratoService.getPratosByRestauranteId(this.restauranteId).subscribe(
      (pratosResp: Prato[]) => {
        this.pratos = pratosResp;
        this.pratoFilter = this.pratos;
      },
      (error: any) => {
        console.error(error);
        this.toastr.error('Erro ao carregar Restaurantes','Erro!');
      }
    ).add(() => this.spinner.hide());
  }*/

  openModal(event: any, template: TemplateRef<any>, restauranteId: number): void {
    event.stopPropagation();
    this.restauranteId = restauranteId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

 /* confirm(): void {
    this.modalRef?.hide();this.spinner.show();
   // this.pratoService.deletePrato(this.pratoId).subscribe(
     // (result: any) => {
     //   if (result.message === 'Deletado') {
       //   this.toastr.success('O Restaurante foi excluído com sucesso.','Excluído!');
      //    this.carregarRestaurantes();
   ///     }
    //  },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao excluir Restaurante de cógigo ${this.restauranteId}`,'Erro!');
      }
    ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheRestaurante(id: number): void {
    this.router.navigate([`restaurantes/detalhe/${id}`]);
  }*/

  get bsConfig(): any {
   return {
     adaptativePosition: true,
     dateInputFormat: 'DD/MM/YYYY HH:mm',
     containerClass: 'theme-default',
     showWeekNumbers: false

   };
 }





}

