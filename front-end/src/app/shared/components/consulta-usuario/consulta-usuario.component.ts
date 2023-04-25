import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ConsultasService } from '../../services/consultas.service';
import { Router } from '@angular/router';
import { ListaUsuariosResponse } from '../../models/User';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.css']
})
export class ConsultaUsuarioComponent implements OnInit{
  
  public token = localStorage.getItem('authorization');
  public lista:Array<ListaUsuariosResponse> = [];  

  constructor(private loginService: LoginService, private consultaService: ConsultasService, private router: Router){
    if (this.token === null) {
      this.router.navigate(['/']);
    } else {
      this.loginService.validarToken(localStorage.getItem('authorization') as string).subscribe({
        next: (res) => {          
        },          
        error: (err) => {
          console.log(err);
          localStorage.removeItem("authorization");
          this.router.navigate(['/']);
        }
      });
    }   
  }

  ngOnInit(): void {
    this.consultaService.consultaListaUsuarios().subscribe({
      next: (res) => {   
        this.lista = res;
        const listaFormatada: Array<ListaUsuariosResponse> = this.lista.map(x => {
          const novoObjeto: ListaUsuariosResponse = {
            id: x.id,
            nome: x.nome, 
            cpf: x.cpf,
            data_nascimento: new Date(x.data_nascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '/'),
            sexo: x.sexo
          };
          return novoObjeto;
        });        
       this.lista = listaFormatada;
      },
      error: (err) => {
        console.log(err);        
      }
    });
  }

  public editarUsuairo(id:number){    
    this.consultaService.enviarDados(id); 
    this.router.navigate(['./sistema/editarusuario']);
  }
}
