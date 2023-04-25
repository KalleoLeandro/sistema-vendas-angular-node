import { ChangeDetectorRef, Component } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CadastrosService } from '../../services/cadastros.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {

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

  public editForm: FormGroup = this.formBuilder.group({
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
    email: [''],
    login: [''],
    senha: [''],
    perfil: ['']
  });

  public token = localStorage.getItem('authorization');

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private consultaService: ConsultasService, private cadastrosService: CadastrosService, private router: Router, private cdRef: ChangeDetectorRef) {
    if (this.token === null) {
      this.router.navigate(['/']);
    } else {
      this.loginService.validarToken(localStorage.getItem('authorization') as string).subscribe({
        next: async (res) => {        
          await this.carregaDados();
          setTimeout(() => {
            console.log(this.editForm);
          }, 10000);
        },
        error: (err) => {
          console.log(err);
          localStorage.removeItem("authorization");
          this.router.navigate(['/']);
        }
      });
    }
  }

  public async carregaDados() {
    await this.consultaService.dadosEditar.subscribe(retorno => {
      const id = retorno;
      this.consultaService.consultaUsuarioPorId(id).subscribe({
        next: (res) => {
          const valores:any = res[0][0];              
          this.preencheFormulario(valores);          
        },
        error: (err) => {
          console.log(err);
        }
      });
    });
  }

  public preencheFormulario(valores: any) {
    this.editForm.patchValue({
      nome: valores.nome,
      /*cpf: valores.cpf,
      dataNascimento: valores.data_nascimento,
      sexo: valores.sexo,
      cep: valores.cep,
      rua: [{ value: valores.rua, disabled: true }],
      numero: valores.numero,
      bairro: [{ value: valores.bairro, disabled: true }],
      cidade: [{ value: valores.cidade, disabled: true }],
      uf: [{ value: valores.uf, disabled: true }],
      telefone: valores.telefone,
      celular: valores.celular,
      email: valores.email,
      login: valores.login,
      senha: '',
      perfil: valores.perfil
      */
    });    
  }




  public async submitForm() {
    if (this.editForm.valid) {
      this.consultaService.validarDados(this.editForm).subscribe({
        next: (res) => {
          this.cadastrarUsuario();
          this.editForm.reset();
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
    const cep = (this.editForm.controls['cep'].value).replace("-", "");
    this.consultaService.consultaCep(cep).subscribe({
      next: (res) => {
        this.editForm.patchValue({
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

  public imprimeForm() {
    console.log(this.editForm);
  }

  public limparFormulario() {
    //this.cadastroForm.reset();
    this.editForm.patchValue({
      sexo: 'm'
    })
  }

  public cadastrarUsuario() {
    this.cadastrosService.cadastrarUsuario(this.editForm).subscribe({
      next: (res) => {
        this.resposta = res;
        document.getElementById("botaoModal")?.click();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
