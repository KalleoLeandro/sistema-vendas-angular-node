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

  public validarDados(formulario:FormGroup):Observable<boolean>{
    return this.http.post<boolean>(`${this.url}validarformulario`, formulario.getRawValue() , this.httpOptions);    
  }

  public consultaCep(cep:string): Observable<any>{
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json`);    
  }

  public consultaListaUsuarios(): Observable<any>{
    return this.http.get<any>(`${this.url}listausuarios`);    
  }

  public consultaUsuarioPorId(id:number): Observable<any>{
    return this.http.get<any>(`${this.url}listausuarioporid?id=${id}`);
  }
}
