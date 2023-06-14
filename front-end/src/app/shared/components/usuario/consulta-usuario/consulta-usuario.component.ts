import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/Usuario';
import { CadastrosService } from 'src/app/shared/services/cadastros.service';
import { ConsultasService } from 'src/app/shared/services/consultas.service';
import { LoginService } from 'src/app/shared/services/login.service';


@Component({
  selector: 'app-consulta',
  templateUrl: './consulta-usuario.component.html',
  styleUrls: ['./consulta-usuario.component.css']
})
export class ConsultaUsuarioComponent implements OnInit{
  
  public token = localStorage.getItem('authorization');
  public lista:Array<Usuario> = [];  
  public resposta:string = "";
  public confirmacao:boolean = true;
  public userId:number=0;

  constructor(private loginService: LoginService, private cadastrosService: CadastrosService,private consultaService: ConsultasService, private router: Router){
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
        const listaFormatada: Array<Usuario> = this.lista.map(x => {
          const novoObjeto: Usuario = {
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

  public excluirUsuario(id:number){
    this.confirmacao = true;
    this.userId = id;
    this.resposta = "Tem certeza que deseja excluir esse usuário?";    
    document.getElementById('botaoModal')?.click();
  }


  public confirmar(){    
    this.confirmacao = false;
    this.cadastrosService.excluirUsuario(this.userId).subscribe({
      next: (res) =>{        
        this.resposta = "Usuário excluido com sucesso!";    
      },
      error: (err) =>{
        this.resposta = "Erro ao excluir usuário!";
        console.log(err);
      }
    });        
  }

  public concluir(){    
    window.location.reload();
  }

  public editarUsuairo(id:number){        
    this.router.navigate([`./sistema/editarusuario/${id}`]);
  }
}
