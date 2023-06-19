import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { CadastrosService } from 'src/app/shared/services/cadastros.service';
import { ConsultasService } from 'src/app/shared/services/consultas.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit{

  public resposta: string = "";
  public categoria: Array<string> = ["Alimentos", "Limpeza", "Eletrônicos", "Vestuário", "Brinquedos", "Acessórios"];
  public medida: Array<string> = ["Kg", "Mt", "Un", "Lt", "Cx", "Pc"];
  public token:any = localStorage.getItem('authorization');    
  public id:any;
  public dados: any;

  constructor(private router:Router, private loginService:LoginService, private formBuilder: FormBuilder, private cadastrosService: CadastrosService, private consultaService: ConsultasService, private activatedRoute: ActivatedRoute){
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
    this.consultaService.consultaProdutoPorId(this.id).pipe(first()).subscribe({
      next: (res) => {
        this.dados = res[0][0];        
        this.editForm.patchValue({
          id: this.dados.id,
          nome: this.dados.nome,          
          quantidade: this.dados.quantidade,
          medida: this.dados.medida,
          categoria: this.dados.categoria,
        });                
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  public editForm: FormGroup = this.formBuilder.group({
    id: ['', Validators.required],
    nome: ['', Validators.required],
    precoCusto: ['', Validators.required],
    precoVenda: ['', Validators.required],
    quantidade: ['', Validators.compose([Validators.required, Validators.min(1)])],
    medida: ['', Validators.required],
    categoria: ['', Validators.required]
  });

  public async submitForm() {        
    if (this.editForm.valid) {        
      console.log('Editar');
      //this.cadastroForm.reset();
    } else {
      console.error("Valores inválidos no formulário");
    }
  }
}
