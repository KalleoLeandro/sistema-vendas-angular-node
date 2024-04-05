import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent{

  public token = sessionStorage.getItem('authorization');
  public usuarioAtivo:string = "";

  constructor(private loginService: LoginService, private router: Router){
    if (this.token === null) {
      this.router.navigate(['/']);
    } else {
      this.loginService.validarToken(sessionStorage.getItem('authorization') as string).subscribe({
        next: (res) => {  
        },          
        error: (err) => {
          console.error(err);
          sessionStorage.removeItem("authorization");
          this.router.navigate(['/']);
        }
      });
      this.loginService.userPorToken(sessionStorage.getItem('authorization') as string).subscribe({
        next: (res) => {
          this.usuarioAtivo = res.login;
        },          
        error: (err) => {
          console.error(err);
        }
      });
    }   
  }

  public logout(){    
    sessionStorage.removeItem("authorization");
    this.router.navigate(['/']);
  }
}
