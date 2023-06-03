import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConsultasService } from '../../services/consultas.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CadastrosService } from '../../services/cadastros.service';
import { first } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

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
    id: [''],
    endereco_id: [''],
    contato_id: [''],
    dados_login_id: [''],
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

  public id: any;

  public dados: any;
  public token = localStorage.getItem('authorization');

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private consultaService: ConsultasService, private cadastrosService: CadastrosService, private router: Router, private activatedRoute: ActivatedRoute) {
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

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.consultaService.consultaUsuarioPorId(this.id).pipe(first()).subscribe({
      next: (res) => {
        this.dados = res[0][0];
        this.editForm.patchValue({
          id: this.dados.id,
          endereco_id: this.dados.endereco_id,
          contato_id: this.dados.contato_id,
          dados_login_id: this.dados.dados_login_id,
          nome: this.dados.nome,
          cpf: this.dados.cpf,
          dataNascimento: this.formataData(this.dados.data_nascimento),
          sexo: this.dados.sexo,
          cep: this.dados.cep,
          rua: this.dados.rua,
          numero: this.dados.numero,
          bairro: this.dados.bairro,
          cidade: this.dados.cidade,
          uf: this.dados.uf,
          telefone: this.dados.telefone,
          celular: this.dados.celular,
          email: this.dados.email,
          login: this.dados.login,
          perfil: this.dados.perfil
        });
      }, error: (err) => {
        console.log(err);
      }
    });
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

  public async submitForm() {    
    if (this.editForm.valid) {
      this.consultaService.validarDados(this.editForm).subscribe({
        next: (res) => {
          this.cadastrosService.atualizarUsuario(this.editForm).pipe(first()).subscribe(()=>{
            document.getElementById("botaoModal")?.click();
          });                    
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.error("Valores inválidos no formulário");
    }
  } 

  public redireciona(){
    this.router.navigate(['./sistema/listarusuarios']);
  }

  public formataData(data: string): string {
    const dateStr = data;
    const date = new Date(dateStr);
    const formattedDate = date.toISOString().substring(0, 10);
    return formattedDate;
  }
}
