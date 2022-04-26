
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Restaurante } from '@app/models/Restaurante';
import { RestauranteService } from '@app/services/restaurante.service';
import { environment } from '@environments/environment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

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


  public restaurantes: Restaurante[] = [];
  public restFilter: Restaurante[] = [];

  modalRef?: BsModalRef;

  public larguraImg: number = 150;
  public margemImg: number = 2;
  public exibirImg: boolean = true;
  private filtroListado: string = '';
  public restauranteId: number = 0;




  public get filtroListaRest(): string {
    return this.filtroListado;
  }

  public set filtroListaRest(value: string) {
    this.filtroListado = value;
    this.restFilter = this.filtroListado ? this.filtrarRestaurantes(this.filtroListado) : this.restaurantes;
  }

  public filtrarRestaurantes(filtrarPor: string): Restaurante[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.restaurantes.filter(
      (restaurante: any) => restaurante.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      )
  }

  constructor(
    private restauranteService: RestauranteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.carregarRestaurantes();
  }

  public alterarImg(): void {
    this.exibirImg = !this.exibirImg;
  }

  public retornaImagem(imagemURL: string): string {
    return (imagemURL !== '')
      ? `${environment.apiURL}Resources/Images/${imagemURL}`
      : 'assets/semImagem.jpg'
  }

  public carregarRestaurantes(): void {
    this.restauranteService.getAllRestaurantes().subscribe(
      (restaurantesResp: Restaurante[]) => {
        this.restaurantes = restaurantesResp;
        this.restFilter = this.restaurantes;
      },
      (error: any) => {
        console.error(error);
        this.toastr.error('Erro ao carregar Restaurantes','Erro!');
      }
    ).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, restauranteId: number): void {
    event.stopPropagation();
    this.restauranteId = restauranteId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();this.spinner.show();
    this.restauranteService.deleteRestaurante(this.restauranteId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('O Restaurante foi excluído com sucesso.','Excluído!');
          this.carregarRestaurantes();
        }
      },
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
  }

  get bsConfig(): any {
   return {
     adaptativePosition: true,
     dateInputFormat: 'DD/MM/YYYY HH:mm',
     containerClass: 'theme-default',
     showWeekNumbers: false

   };
 }





}

