import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../models/Login';
import { Buffer } from 'buffer';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import * as forge from 'node-forge';
import { Cripto } from '../../models/Cripto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  public publicKey = `-----BEGIN PUBLIC KEY-----
  MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyNuTGqyEJCxsdSR1regd
  spawehc20gjoyw1idxFQrjqz4GjUJnoU4b6lkuLGww7cLc24gykTcsu+LZvjd6/v
  vf9SiiNztWtL978RwDYzdImvQQa5dFkr+TNv8oZLWGXeX4OY5EHtPlxvLSoepN42
  afi8iU0A2hOOJE0egeEyKdYbddU7oal0cf5zqClTHUsLE0TKOvSIUKhAyovuoWGi
  rGhbRMpSOue3z88TMeSDeL3RLeU5qOfDlFWlHPrhUYkViEJJWw94XnKf6EniX7OG
  8ARLwmORVkKTGXq33YP2u+8OHqz/apKtH6FJ6xdMCh+VysNFDQiDDeSlusdyeKul
  k+XW9jC0mPSevRj22A4tCyJVcqzaEMGSZ63v6TGx1dWYDzuised7Fz5l58V5zisU
  X8troK5MiAr1kH3pF/wOI4heRrUyMP0pLSgFXr/QliOpuow82Jxr4Kvk/HTva9sU
  ZJ7l3BcQz+xMfBQAxaCHhKnMIK6DDTU3Te+7q96pgWizJI11ojinbr54SFeA5/1M
  AThaMvRRcxRB5XRHbMmQLW0acsGCFGqPr76uNYjppFiW0TIKftvRGN9+2W+9ZjIk
  3Ei63c5351kP0pToKvx5NMC3D45VmMHbJ9BEH7O1OthF8nzQ1n0zc+24ceKN8lhF
  9fyqI420ta5zJrFSLtBgoDMCAwEAAQ==
  -----END PUBLIC KEY-----`

  public loginForm: FormGroup = this.formBuilder.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  });

  public invalido: boolean = false;

  public login: any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {

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
        localStorage.setItem('authorization', res.body.token);
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
    });
  }

  public change() {    
    if (this.loginForm.controls['usuario'].value != '' || this.loginForm.controls['senha'].value != '') {
      this.invalido = false;
    }
  }
}
