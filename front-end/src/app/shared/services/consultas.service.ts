import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  private url: string = "http://localhost:3000/";

   public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',    
    })
  }  

  constructor(private http: HttpClient) { }

  public validarDados(formulario:FormGroup, token:string):Observable<boolean>{
    this.httpOptions.headers = this.httpOptions.headers.set('authorization', `${token}`);
    return this.http.post<boolean>(`${this.url}validarformulario`, formulario.getRawValue() , this.httpOptions);    
  }

  public consultaCep(cep:string): Observable<any>{
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json`);    
  }

  public consultaListaUsuarios(token:string): Observable<any>{
    this.httpOptions.headers = this.httpOptions.headers.set('authorization', `${token}`);
    return this.http.get<any>(`${this.url}listausuarios`, this.httpOptions);    
  }

  public consultaUsuarioPorId(id:number, token:string): Observable<any>{
    this.httpOptions.headers = this.httpOptions.headers.set('authorization', `${token}`);
    return this.http.get<any>(`${this.url}listausuarioporid?id=${id}`, this.httpOptions);
  }
  
  public consultaListaProdutos(token:string):Observable<any>{
    this.httpOptions.headers = this.httpOptions.headers.set('authorization', `${token}`);
    return this.http.get<any>(`${this.url}listaprodutos`, this.httpOptions);
  }

  public consultaListaProdutosPorNome(nome:string, token:string):Observable<any>{

    return this.http.get<any>(`${this.url}listaprodutopornome/${nome}`, this.httpOptions);
  }

  public consultaProdutoPorId(id:number,token:string):Observable<any>{
    return this.http.get<any>(`${this.url}listaprodutoporid?id=${id}`, this.httpOptions);
  }
}
