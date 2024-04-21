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
}
