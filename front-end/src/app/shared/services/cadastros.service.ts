import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastrosService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',      
    })
  }

  constructor(private http: HttpClient) { }

  public cadastrarUsuario(formulario:FormGroup):Observable<string>{
    return this.http.post<string>(`http://localhost:3000/cadastrarusuario`, formulario.getRawValue() , this.httpOptions);    
  }
}
