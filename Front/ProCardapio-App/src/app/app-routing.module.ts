import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { PratosComponent } from './components/pratos/pratos.component';
import { RestauranteDetalheComponent } from './components/restaurantes/restaurante-detalhe/restaurante-detalhe.component';
import { RestauranteListaComponent } from './components/restaurantes/restaurante-lista/restaurante-lista.component';
import { RestaurantesComponent } from './components/restaurantes/restaurantes.component';
import { RegistroComponent } from './components/user/registro/registro.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { BebidasComponent } from './components/bebidas/bebidas.component';
import { RestauranteEditComponent } from './components/restaurantes/restaurante-edit/restaurante-edit.component';
import { PratosListaComponent } from './components/pratos/pratos-lista/pratos-lista.component';

const routes: Routes = [
  {
    path: 'users', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent }
    ]
  },
  {
    path: 'users/perfil', component: PerfilComponent
  },
  { path: 'restaurantes', redirectTo: 'restaurantes/lista' },
  {
    path: 'restaurantes', component: RestaurantesComponent,
    children: [
      { path: 'detalhe/:id', component: RestauranteDetalheComponent },
      { path: 'edit/:id', component: RestauranteEditComponent },
      { path: 'detalhe', component: RestauranteDetalheComponent },
      { path: 'lista', component: RestauranteListaComponent },
    ]
  },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'pratos', component: PratosComponent },

  { path: 'lista-pratos', component:PratosListaComponent,
  children:[
  {  path: 'lista-pratos/:id', component:PratosListaComponent},
]
  },
  //{ path: 'lista-pratos', redirectTo: 'lista-pratos/:id' },

  { path: 'bebidas', component: BebidasComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
