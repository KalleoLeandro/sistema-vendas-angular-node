import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListaProdutosResponse } from 'src/app/shared/models/Produto';
import { ConsultasService } from 'src/app/shared/services/consultas.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { VendaService } from 'src/app/shared/services/venda.service';

@Component({
  selector: 'app-efetuar-venda',
  templateUrl: './efetuar-venda.component.html',
  styleUrls: ['./efetuar-venda.component.css']
})
export class EfetuarVendaComponent {
  public resposta: string = "";
  public produto: string = "";
  public produtoTitulo: string = "";
  public total: number = 0;
  public token = sessionStorage.getItem('authorization');
  public listaProdutos: Array<ListaProdutosResponse> = [];
  public listaVenda: Array<any> = [];
  public aviso: boolean = true;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private consultaService: ConsultasService, private vendaService: VendaService, private router: Router) {
    if (this.token === null) {
      this.router.navigate(['/']);
    } else {
      this.loginService.validarToken(sessionStorage.getItem('authorization') as string).subscribe({
        next: (res) => {
        },
        error: (err) => {
          console.log(err);
          sessionStorage.removeItem("authorization");
          this.router.navigate(['/']);
        }
      });
    }
  }

  public vendaForm: FormGroup = this.formBuilder.group({
    nomeProduto: [''],
    listaVenda: [[], [Validators.required, this.arrayMinLength(1)]],
    quantidade: ['']
  });

  public limparFormulario() {
    const itensCarrinho = this.listaVenda.map((item) => ({
      id: item.id,
      quantidade: Number(item.quantidade)
    }));

    this.vendaService.adicionarProdutos(itensCarrinho, this.token as string).subscribe({
      next: (res) => {
        this.listaVenda = [];
        this.total = 0;
        this.listaProdutos = [];
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.vendaForm.reset();
  }

  public listarProdutosPorNome() {
    if (this.produto != "") {
      this.consultaService.consultaListaProdutosPorNome(this.produto, this.token as string).subscribe({
        next: (res) => {
          this.listaProdutos = res;
          const listaFormatada: Array<ListaProdutosResponse> = this.listaProdutos.map(x => {
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
                    
          this.listaProdutos = this.itensComIdDiferente(listaFormatada, this.listaVenda);
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.listaProdutos = [];
    }
  }

  public itensComIdDiferente(lista1: any[], lista2: any[]): any[] {
    // Filtra os itens da lista1 cujo id não está na lista2
    const itensNaoPresentes = lista1.filter(item1 => !lista2.some(item2 => item1.id === item2.id));
  
    return itensNaoPresentes;
  }

  public adicionarProduto(id: number) {
    const listaVendaControl = this.vendaForm.get('listaVenda');
    const item = this.listaProdutos.find(x => x.id === id);
    const quantidadeSelecionada = Number(this.vendaForm.get('quantidade')?.value);

    if (!item) {
      this.resposta = "Produto não encontrado na lista";
      document.getElementById('botaoModal')?.click();
      return;
    }

    const itemAdicionado = {
      id: item.id,
      nome: item.nome,
      quantidade: quantidadeSelecionada,
      valorUnitario: Number(item.preco_venda),
      preco: Number(item.preco_venda) * quantidadeSelecionada
    }
    if (listaVendaControl) {
      if (Number.isFinite(itemAdicionado.quantidade) && (itemAdicionado.quantidade > 0 && itemAdicionado.quantidade <= item.quantidade)) {
        this.alterarQuantidadeProdutos([itemAdicionado], 'remover').subscribe({
          next: (res) => {
            this.vendaForm.controls['listaVenda'].setValue([...(listaVendaControl.value || []), itemAdicionado]);
            this.listaVenda = [...this.vendaForm.get('listaVenda')?.value];
            this.vendaForm.controls['quantidade'].setValue('');
            this.produto = '';
            this.vendaForm.controls['nomeProduto'].setValue('');
            this.listaProdutos = [];
            this.atualizarTotal();
          },
          error: (error) => {
            this.resposta = "Erro ao adicionar ao carrinho";
            document.getElementById('botaoModal')?.click();
          }

        })

      } else {
        this.resposta = "Informe uma quantidade válida de itens";
        document.getElementById('botaoModal')?.click();
      }      
    }
  }

  public alterarQuantidadeProdutos(produtos: Array<any>, tipoAlteracao: string): Observable<any> {
    if (tipoAlteracao === 'remover') {
      return this.vendaService.removerProdutos(produtos, this.token as string);
    } else {
      return this.vendaService.adicionarProdutos(produtos, this.token as string);
    }
  }

  public excluirProduto(id: number) {
    const item = this.listaVenda.find(x => x.id === id);

    if (!item) {
      this.resposta = "Produto não encontrado no carrinho";
      document.getElementById('botaoModal')?.click();
      return;
    }

    const itemRemovido = {
      id: item.id,
      quantidade: Number(item.quantidade)
    }
    this.alterarQuantidadeProdutos([itemRemovido], 'adicionar').subscribe({
      next: (res) => {
        let lista = this.vendaForm.get('listaVenda')?.value;
        lista = lista.filter((x: { id: number; }) => { return x.id !== id });
        this.vendaForm.controls['listaVenda'].setValue(lista);
        this.listaVenda = [...this.vendaForm.get('listaVenda')?.value];
        this.vendaForm.controls['quantidade'].setValue('');
        this.produto = '';
        this.vendaForm.controls['nomeProduto'].setValue('');
        this.listaProdutos = [];
        this.atualizarTotal();
      },
      error: (err) => {
        this.resposta = "Erro ao  uma excluir item do carrinho";
        document.getElementById('botaoModal')?.click();
      }
    })
  }

  public submitForm() {
    const lista = [...(this.vendaForm.get('listaVenda')?.value || [])];

    this.vendaService.efetuarVenda(lista, this.token!).subscribe({
      next: (res) => {
        this.resposta = "Venda efetuada com sucesso!";
        document.getElementById('botaoModal')?.click();
        this.vendaForm.controls['listaVenda'].setValue([]);
        this.listaVenda = [];
        this.vendaForm.controls['nomeProduto'].setValue('');
        this.vendaForm.controls['quantidade'].setValue('');
        this.produto = '';
        this.listaProdutos = [];
        this.total = 0;
      },
      error: (res) =>{
        this.resposta = "Erro ao efetuar venda!";
        document.getElementById('botaoModal')?.click();
      }
    });

  }

  public listaVendaControls(): FormArray {

    return this.vendaForm.get('listaVenda')?.value as FormArray;
  }

  public arrayMinLength(min: number) {
    return (control: AbstractControl) => {
      if (control.value && control.value.length < min) {
        return { arrayMinLength: { requiredLength: min, actualLength: control.value.length } };
      }
      return null;
    };
  }


  public formatarValor(valor: number): string {
    return `${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  }

  private atualizarTotal(): void {
    this.total = this.listaVenda.reduce((acumulador, item) => acumulador + Number(item.preco || 0), 0);
  }

}
