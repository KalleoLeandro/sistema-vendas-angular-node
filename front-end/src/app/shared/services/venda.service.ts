import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  private url:string = "http://localhost:3000/";

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',      
    })
  }

  constructor(private http: HttpClient) { }

  public removerProdutos(produtos:Array<any>):Observable<any>{
    return this.http.post<any>(`${this.url}removerprodutos`, {produtos}, this.httpOptions);
  }

  public adicionarProdutos(produtos:Array<any>):Observable<any>{
    return this.http.post<any>(`${this.url}adicionarprodutos`, {produtos}, this.httpOptions);
  }

  public efetuarVenda(produtos:Array<any>, token:string):Observable<any>{
    return this.http.post<any>(`${this.url}efetuarvenda`, {produtos, token}, this.httpOptions);
  }
}
