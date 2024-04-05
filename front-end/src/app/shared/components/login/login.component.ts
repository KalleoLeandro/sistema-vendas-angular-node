import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import * as forge from 'node-forge';
import { Cripto } from '../../models/Cripto';
import { privateKey } from '../../models/PrivateKey';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit{

  public publicKey = privateKey;

  public loginForm: FormGroup = this.formBuilder.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  });

  public invalido: boolean = false;

  public login: any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {

  }
  ngOnInit(): void {
    this.loginService.validarToken(sessionStorage.getItem('authorization') as string).subscribe({
      next: (res)=>{        
        this.router.navigate(['../sistema/home']);
      },
      error: (err)=>{        
        if(!sessionStorage.getItem('authorization') === null){
          console.error("Token expirado");
        }        
      }
    })
  }

  public pubKey: any = forge.pki.publicKeyFromPem(this.publicKey);
  public encryptText: string = '';
  public hash: Cripto = {
    hash: ''
  };


  public submitForm() {
    this.login = {
      usuario: this.loginForm.controls['usuario'].value,
      senha: this.loginForm.controls['senha'].value
    }
    const publicKeyForge = forge.pki.publicKeyFromPem(this.publicKey);
    const encryptedData = forge.util.encode64(publicKeyForge.encrypt(JSON.stringify(this.login)));
    this.hash.hash = encryptedData;
    this.loginService.login(this.hash).subscribe({
      next: (res) => {        
        sessionStorage.setItem('authorization', res.body.token);
        this.router.navigate(['../sistema/home']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.loginForm.patchValue({
            usuario: '',
            senha: ''
          })
          this.invalido = true;
        }
      }
    });  }

  public change() {    
    if (this.loginForm.controls['usuario'].value != '' || this.loginForm.controls['senha'].value != '') {
      this.invalido = false;
    }
  }
}
