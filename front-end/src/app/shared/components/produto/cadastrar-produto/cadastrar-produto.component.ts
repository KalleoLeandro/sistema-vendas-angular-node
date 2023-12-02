import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { ConsultasService } from '../../../services/consultas.service';
import { CadastrosService } from '../../../services/cadastros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent {

  public resposta: string = "";
  public categoria: Array<string> = ["Alimentos", "Limpeza", "Eletrônicos", "Vestuário", "Brinquedos", "Acessórios"];
  public medida: Array<string> = ["Kg", "Mt", "Un", "Lt", "Cx", "Pc"];

  public token = localStorage.getItem('authorization');  

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private cadastrosService: CadastrosService, private router: Router) {
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

  public cadastroForm: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    precoCusto: ['', Validators.required],
    precoVenda: ['', Validators.required],
    quantidade: ['', Validators.compose([Validators.required, Validators.min(1)])],
    medida: ['', Validators.required],
    categoria: ['', Validators.required]
  });

  public async submitForm() {        
    if (this.cadastroForm.valid) {        
      this.cadastrarProduto();      
      this.cadastroForm.reset();      
    } else {
      console.error("Valores inválidos no formulário");
    }
  }

  public limparFormulario() {
    this.cadastroForm.reset();
  }

  public cadastrarProduto() {    
    this.cadastrosService.cadastrarProduto(this.cadastroForm).subscribe({
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
