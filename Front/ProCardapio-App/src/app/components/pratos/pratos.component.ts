import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { RestauranteDetalheComponent } from '../restaurantes/restaurante-detalhe/restaurante-detalhe.component';
import { Prato } from '@app/models/Prato';
import { PratoService } from '@app/services/prato.service';
import { RestauranteService } from '@app/services/restaurante.service';
import { RestauranteEditComponent } from '../restaurantes/restaurante-edit/restaurante-edit.component';
import { Restaurante } from '@app/models/Restaurante';




@Component({
  selector: 'app-pratos',
  templateUrl: './pratos.component.html',
  styleUrls: ['./pratos.component.scss']
})


export class PratosComponent implements OnInit {


  get bsConfig(): any {
    return {
      adaptativePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm',
      containerClass: 'theme-default',
      showWeekNumbers: false

    };
  }


  constructor(private localeService: BsLocaleService) {
    this.localeService.use('pt-br');

    var string = string;
    string="https://localhost:5001/Resources/ImagePrato/"

   }



  ngOnInit(): void {
  }

}
