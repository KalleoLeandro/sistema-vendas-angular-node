import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ListaProdutosResponse } from '../../models/Produto';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css']
})
export class ConsultaProdutoComponent implements OnInit{

  public token = localStorage.getItem('authorization');
  public confirmacao: boolean = true;
  public lista:Array<ListaProdutosResponse> = [];  
  public resposta:string = "";

  constructor(private loginService: LoginService, private router:Router, private consultaService: ConsultasService){
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
    this.consultaService.consultaListaProdutos().subscribe({
      next: (res) => {   
        this.lista = res;
        const listaFormatada: Array<ListaProdutosResponse> = this.lista.map(x => {          
          const novoObjeto: ListaProdutosResponse = {
            id: x.id,
            nome: x.nome, 
            preco_custo: x.preco_custo,
            preco_venda: x.preco_venda,
            quantidade: x.quantidade,
            medida: x.medida,
            categoria: x.categoria
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


}
