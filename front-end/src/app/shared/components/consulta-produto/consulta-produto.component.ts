import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ListaProdutosResponse } from '../../models/Produto';
import { ConsultasService } from '../../services/consultas.service';
import { DecimalPipe } from '@angular/common';
import { CustomNumberPipe } from '../../pipe/custom-number.pipe';
import { CadastrosService } from '../../services/cadastros.service';

@Component({
  selector: 'app-consulta-produto',
  templateUrl: './consulta-produto.component.html',
  styleUrls: ['./consulta-produto.component.css']
})
export class ConsultaProdutoComponent implements OnInit {

  public token = localStorage.getItem('authorization');
  public confirmacao: boolean = true;
  public lista:Array<ListaProdutosResponse> = [];  
  public resposta:string = "";
  public productId: number = 0;

  constructor(private loginService: LoginService, private router:Router, private consultaService: ConsultasService, private cadastrosService: CadastrosService){
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

  public formatarValor(valor: number): string {
    return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }

  public editarProduto(id:number){
    console.log('Editar');
  }

  public excluirProduto(id:number){
    this.confirmacao = true;
    this.productId = id;
    this.resposta = "Tem certeza que deseja excluir esse usuário?";    
    document.getElementById('botaoModal')?.click();
  }

  public confirmar(){    
    this.confirmacao = false;
    this.cadastrosService.excluirProduto(this.productId).subscribe({
      next: (res) =>{        
        this.resposta = "Usuário excluido com sucesso!";
      },
      error: (err) =>{
        this.resposta = "Erro ao excluir usuário!";
        console.log(err);
      }
    });        
  }
}
