import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ConsultasService } from '../../services/consultas.service';
import { CadastrosService } from '../../services/cadastros.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent {

  public perfil: Array<string> = ["dev", "user", "adm"];
  public resposta: string = "";

  public estados: Array<{ nome: string }> = [
    {
      nome: "AC"
    },
    {
      nome: "AL"
    },
    {
      nome: "AP"
    },
    {
      nome: "AM"
    },
    {
      nome: "BA"
    },
    {
      nome: "CE"
    },
    {
      nome: "DF"
    },
    {
      nome: "ES"
    },
    {
      nome: "MA"
    },
    {
      nome: "GO"
    },
    {
      nome: "MS"
    },
    {
      nome: "MT"
    },
    {
      nome: "MG"
    },
    {
      nome: "PA"
    },
    {
      nome: "PB"
    },
    {
      nome: "PR"
    },
    {
      nome: "PE"
    },
    {
      nome: "PI"
    },
    {
      nome: "RJ"
    },
    {
      nome: "RN"
    },
    {
      nome: "RS"
    },
    {
      nome: "RO"
    },
    {
      nome: "RR"
    },
    {
      nome: "SC"
    },
    {
      nome: "SP"
    },
    {
      nome: "SE"
    },
    {
      nome: "TO"
    }
  ];

  public cadastroForm: FormGroup = this.formBuilder.group({
    nome: [''],
    cpf: [''],
    dataNascimento: [''],
    sexo: ['m'],
    cep: [''],
    rua: [{ value: '', disabled: true }],
    numero: [''],
    bairro: [{ value: '', disabled: true }],
    cidade: [{ value: '', disabled: true }],
    uf: [{ value: '', disabled: true }],
    telefone: [''],
    celular: [''],
    email:[''],
    login: [''],
    senha: [''],
    perfil: ['']
  });

  public token = localStorage.getItem('authorization');

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private consultaService: ConsultasService, private cadastrosService: CadastrosService, private router: Router) {
    if (this.token === null) {
      this.router.navigate(['/']);
    } else {
      this.loginService.validarToken(localStorage.getItem('authorization') as string).subscribe({
        next: (res) => {          
        },          
        error: (err) => {
          console.log(err);
          localStorage.removeItem("authorization");
          this.router.navigate(['/']);
        }
      });
    }    
  }

  public async submitForm() {
    if (this.cadastroForm.valid) {
      this.consultaService.validarDados(this.cadastroForm).subscribe({
        next: (res) => {                
          this.cadastrarUsuario();
          this.cadastroForm.reset();
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.error("Valores inválidos no formulário");
    }
  }

  public async consultarCep() {
    const cep = (this.cadastroForm.controls['cep'].value).replace("-", "");
    this.consultaService.consultaCep(cep).subscribe({
      next: (res) => {
        this.cadastroForm.patchValue({
          rua: res.logradouro,
          bairro: res.bairro,
          cidade: res.localidade,
          uf: res.uf
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public limparFormulario() {
    //this.cadastroForm.reset();
    this.cadastroForm.patchValue({
      sexo:'m'
    })
  }

  public cadastrarUsuario() {
    this.cadastrosService.cadastrarUsuario(this.cadastroForm).subscribe({
      next: (res)=>{     
        this.resposta = res;
        document.getElementById("botaoModal")?.click();               
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
