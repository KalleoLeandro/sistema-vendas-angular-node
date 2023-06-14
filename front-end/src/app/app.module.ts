import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { MainComponent } from './shared/components/main/main.component';
import { CadastroUsuarioComponent } from './shared/components/cadastro-usuario/cadastro-usuario.component';
import { ConsultaUsuarioComponent } from './shared/components/consulta-usuario/consulta-usuario.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { ErroComponent } from './shared/components/erro/erro.component';
import { LoginService } from './shared/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { ConsultasService } from './shared/services/consultas.service';
import { NgxMaskModule } from 'ngx-mask';
import { CadastrosService } from './shared/services/cadastros.service';
import { EditarUsuarioComponent } from './shared/components/editar-usuario/editar-usuario.component';
import { CadastrarProdutoComponent } from './shared/components/cadastrar-produto/cadastrar-produto.component';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { ConsultaProdutoComponent } from './shared/components/consulta-produto/consulta-produto.component';
import { DecimalPipe } from '@angular/common';
import { CustomNumberPipe } from './shared/pipe/custom-number.pipe';
import { EditarProdutoComponent } from './shared/components/editar-produto/editar-produto.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    CadastroUsuarioComponent,
    ConsultaUsuarioComponent,
    DashboardComponent,
    ErroComponent,
    EditarUsuarioComponent,
    CadastrarProdutoComponent,    
    ConsultaProdutoComponent,
    CustomNumberPipe,
    EditarProdutoComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: false
    }),
    CurrencyMaskModule
  ],
  exports:[
    CustomNumberPipe
  ],
  providers: [LoginService,
    ConsultasService,  
    CadastrosService,
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
