import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { PratosComponent } from './components/pratos/pratos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './shared/nav/nav.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxCurrencyModule } from 'ngx-currency';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RestauranteService } from './services/restaurante.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { RestauranteDetalheComponent } from './components/restaurantes/restaurante-detalhe/restaurante-detalhe.component';
import { RestauranteListaComponent } from './components/restaurantes/restaurante-lista/restaurante-lista.component';
import { UserComponent } from './components/user/user.component';
import { RegistroComponent } from './components/user/registro/registro.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { LoginComponent } from './components/user/login/login.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { PratoService } from './services/prato.service';
import { BebidaService } from './services/bebida.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { RestauranteEditComponent } from './components/restaurantes/restaurante-edit/restaurante-edit.component';
import { PratosListaComponent } from './components/pratos/pratos-lista/pratos-lista.component';


defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    RestaurantesComponent,
    RestauranteEditComponent,
    RestauranteDetalheComponent,
    RestauranteListaComponent,
    ContatosComponent,
    PratosComponent,
    BebidasComponent,
    PerfilComponent,
    DashboardComponent,
    TituloComponent,
    NavComponent,
    UserComponent,
    RegistroComponent,
    LoginComponent,
    PratosListaComponent,

   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    NgxCurrencyModule
  ],
  providers: [
    RestauranteService,
    PratoService,
    BebidaService,
    UserService,
    {
       provide: HTTP_INTERCEPTORS,
       useClass: AuthInterceptor,
       multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
