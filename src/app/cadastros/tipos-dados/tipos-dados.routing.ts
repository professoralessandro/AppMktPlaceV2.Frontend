import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrarTipoDadoComponent } from './cadastrar-tipo-dado/cadastrar-tipo-dado.component';
import { DeletarTipoDadoComponent } from './deletar-tipo-dado/deletar-tipo-dado.component';
import { TiposDadosComponent } from './tipos-dados.component';

const routes: Routes = [
  { path: 'tiposdados', component: TiposDadosComponent },
  { path: 'tiposdados/cadastro', component: CadastrarTipoDadoComponent },
  { path: 'tiposdados/cadastro/:id', component: CadastrarTipoDadoComponent },
  { path: 'tiposdados/deletar/:id', component: DeletarTipoDadoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposDadosRoutingModule { }
