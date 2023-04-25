import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

   public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',      
    })
  }
  
  public dadosEditar = new EventEmitter();

  constructor(private http: HttpClient) { }

  public validarDados(formulario:FormGroup):Observable<boolean>{
    return this.http.post<boolean>(`http://localhost:3000/validarformulario`, formulario.getRawValue() , this.httpOptions);    
  }

  public consultaCep(cep:string): Observable<any>{
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json`);    
  }

  public consultaListaUsuarios(): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/listausuarios`);    
  }

  public consultaUsuarioPorId(id:number): Observable<any>{
    return this.http.get<any>(`http://localhost:3000/listausuarioporid?id=${id}`);
  }

  public enviarDados(id:number){
    this.dadosEditar.emit(id);
  }

}
