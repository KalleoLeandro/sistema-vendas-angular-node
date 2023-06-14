import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { MainComponent } from './shared/components/main/main.component';
import { CadastroUsuarioComponent } from './shared/components/cadastro-usuario/cadastro-usuario.component';
import { ConsultaUsuarioComponent } from './shared/components/consulta-usuario/consulta-usuario.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ErroComponent } from './shared/components/erro/erro.component';
import { EditarUsuarioComponent } from './shared/components/editar-usuario/editar-usuario.component';
import { CadastrarProdutoComponent } from './shared/components/cadastrar-produto/cadastrar-produto.component';
import { ConsultaProdutoComponent } from './shared/components/consulta-produto/consulta-produto.component';
import { EditarProdutoComponent } from './shared/components/editar-produto/editar-produto.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sistema', component: MainComponent, children: [
    { path: 'home', component: DashboardComponent},
    { path: 'listarusuarios', component: ConsultaUsuarioComponent},
    { path: 'cadastrarusuarios', component: CadastroUsuarioComponent},
    { path: 'editarusuario/:id', component: EditarUsuarioComponent},
    { path: 'cadastrarprodutos', component: CadastrarProdutoComponent},
    { path: 'listarprodutos', component: ConsultaProdutoComponent},
    { path: 'editarpeduto/:id', component: EditarProdutoComponent}]    
  },
  { path: '404', component: ErroComponent},
  {path: '**', component: ErroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
