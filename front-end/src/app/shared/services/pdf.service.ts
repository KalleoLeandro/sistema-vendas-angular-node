import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private url: string = "http://localhost:3000/";

  public httpOptionsJSON = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public httpOptionsHTML = {
    headers: new HttpHeaders({
      'Content-Type': 'text/html',
      responseType: 'blob'
    })
  }


  constructor(private http: HttpClient) { }

  gerarHtmlListaProdutos(dadosProdutos: any): string {
    // Lógica para gerar o HTML a partir dos dados da compra
    let html = `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 50px;
          }
          h1 {
            color: #333;
          }          
        </style>
      </head>
      <body>
        <h1>Lista de produtos disponíveis</h1>
        <table>
          <thead>
            <tr>
              <th>Nome do Produto</th>
              <th>Preço Unitário</th>
              <th>Quantidade</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>`;

    // Adicione linhas da tabela para cada produto
    dadosProdutos.forEach((produto: any) => {
      html += `<tr>
        <td>${produto.nome}</td>
        <td>${produto.preco_custo}</td>
        <td>${produto.preco_venda}</td>
        <td>${produto.medida}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.categoria}</td>
      </tr>`;
    });

    // Adicione o total geral
    html += `</tbody>      
    </table>
    </body>
    </html>`;
    return html;
  }

  gerarHtmlListaUsuarios(dadosUsuarios: any): string {
    // Lógica para gerar o HTML a partir dos dados da compra
    let html = `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 50px;
          }
          h1 {
            color: #333;
          }          
        </style>
      </head>
      <body>
        <h1>Lista de usuários disponíveis</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Sexo</th>
            </tr>
          </thead>
          <tbody>`;

    // Adicione linhas da tabela para cada produto
    dadosUsuarios.forEach((usuario: any) => {
      html += `<tr>
        <td>${usuario.id}</td>       
        <td>${usuario.nome}</td>        
        <td>${usuario.cpf}</td>
        <td>${usuario.data_nascimento}</td>
        <td>${usuario.sexo}</td>
      </tr>`;
    });

    // Adicione o total geral
    html += `</tbody>      
    </table>
    </body>
    </html>`;
    return html;
  }

  gerarHtmlRelatorioVenda(dadosVenda: any[], totalVenda: number): string {
    let html = `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #222;
          }
          h1 {
            margin-bottom: 8px;
          }
          p {
            margin-top: 0;
            margin-bottom: 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background: #f5f5f5;
          }
          .valor {
            text-align: right;
          }
          .total {
            margin-top: 24px;
            text-align: right;
            font-size: 18px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <h1>Relatório de Venda</h1>
        <p>Data de emissão: ${new Date().toLocaleString('pt-BR')}</p>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Total do Produto</th>
            </tr>
          </thead>
          <tbody>`;

    dadosVenda.forEach((item: any) => {
      const quantidade = Number(item.quantidade || 0);
      const valorUnitario = Number(item.valorUnitario || 0);
      const totalProduto = Number(item.preco || (quantidade * valorUnitario));

      html += `<tr>
        <td>${item.nome}</td>
        <td>${quantidade}</td>
        <td class="valor">${this.formatarMoeda(valorUnitario)}</td>
        <td class="valor">${this.formatarMoeda(totalProduto)}</td>
      </tr>`;
    });

    html += `</tbody>
        </table>
        <div class="total">Total da venda: ${this.formatarMoeda(totalVenda)}</div>
      </body>
    </html>`;

    return html;
  }

  gerarHtmlDashboard(dadosDashboard: any): string {
    let html = `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #222;
          }
          h1, h2 {
            margin-bottom: 12px;
          }
          .cards {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 24px;
          }
          .card {
            border: 1px solid #ccc;
            padding: 12px;
            border-radius: 6px;
          }
          .card-title {
            font-size: 12px;
            text-transform: uppercase;
            color: #666;
            margin-bottom: 6px;
          }
          .card-value {
            font-size: 20px;
            font-weight: bold;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 8px;
            text-align: left;
          }
          th {
            background: #f5f5f5;
          }
          .valor {
            text-align: right;
          }
        </style>
      </head>
      <body>
        <h1>Relatório do Dashboard</h1>
        <p>Data de emissão: ${new Date().toLocaleString('pt-BR')}</p>

        <div class="cards">
          <div class="card">
            <div class="card-title">Lucros (mês)</div>
            <div class="card-value">${this.formatarMoeda(Number(dadosDashboard.lucroMes || 0))}</div>
          </div>
          <div class="card">
            <div class="card-title">Lucros (anual)</div>
            <div class="card-value">${this.formatarMoeda(Number(dadosDashboard.lucroAnual || 0))}</div>
          </div>
          <div class="card">
            <div class="card-title">Produtos em falta</div>
            <div class="card-value">${Number(dadosDashboard.produtosEmFalta || 0)}</div>
          </div>
          <div class="card">
            <div class="card-title">Produto mais vendido</div>
            <div class="card-value">${dadosDashboard.produtoMaisVendido || '-'}</div>
          </div>
        </div>

        <h2>Lucros por mês</h2>
        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>`;

    (dadosDashboard.vendasPorMes || []).forEach((item: any) => {
      html += `<tr>
        <td>${item.label}</td>
        <td class="valor">${this.formatarMoeda(Number(item.valor || 0))}</td>
      </tr>`;
    });

    html += `</tbody>
        </table>

        <h2>Estoque por categoria</h2>
        <table>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>`;

    (dadosDashboard.estoquePorCategoria || []).forEach((item: any) => {
      html += `<tr>
        <td>${item.label}</td>
        <td>${Number(item.valor || 0)}</td>
      </tr>`;
    });

    html += `</tbody>
        </table>
      </body>
    </html>`;

    return html;
  }

  private formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor);
  }

  public gerarPdfProdutos(token: string, dadosProdutos: any): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/html',
      'authorization': token
    });

    const dados = this.gerarHtmlListaProdutos(dadosProdutos);

    return this.http.post(`${this.url}gerarpdf`, dados, {
      headers: headers,
      responseType: 'blob'
    });
  }

  public gerarPdfUsuarios(token: string, dadosUsuarios: any): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/html',
      'authorization': token
    });

    const dados = this.gerarHtmlListaUsuarios(dadosUsuarios);

    return this.http.post(`${this.url}gerarpdf`, dados, {
      headers: headers,
      responseType: 'blob'
    });
  }

  public gerarPdfVenda(token: string, dadosVenda: any[], totalVenda: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/html',
      'authorization': token
    });

    const dados = this.gerarHtmlRelatorioVenda(dadosVenda, totalVenda);

    return this.http.post(`${this.url}gerarpdf`, dados, {
      headers: headers,
      responseType: 'blob'
    });
  }

  public gerarPdfDashboard(token: string, dadosDashboard: any): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/html',
      'authorization': token
    });

    const dados = this.gerarHtmlDashboard(dadosDashboard);

    return this.http.post(`${this.url}gerarpdf`, dados, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
