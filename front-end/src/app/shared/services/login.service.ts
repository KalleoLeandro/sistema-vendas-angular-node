import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/Login';
import { Cripto } from '../models/Cripto';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private url: string = "http://localhost:3000/";    

    constructor(private http: HttpClient) {
    
  }
  
  public login(hash:Cripto): Observable<any>{    
    return this.http.post<any>(`${this.url}login`, hash, {observe: 'response'});
  }

  public validarToken(token:string): Observable<any>{    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `${token}`,
      })
    }
    return this.http.post<any>(`${this.url}validarToken`, {},httpOptions);    
  }
}
