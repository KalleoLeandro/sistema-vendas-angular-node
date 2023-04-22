import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { MainComponent } from './shared/components/main/main.component';
import { CadastroComponent } from './shared/components/cadastro/cadastro.component';
import { ConsultaComponent } from './shared/components/consulta/consulta.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ErroComponent } from './shared/components/erro/erro.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sistema', component: MainComponent, children: [
    { path: 'home', component: DashboardComponent},
    { path: 'listarusuarios', component: ConsultaComponent},
    { path: 'cadastrarusuarios', component: CadastroComponent}]
  },
  { path: '404', component: ErroComponent},
  {path: '**', component: ErroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
