import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrarTipoLancamentoComponent } from './cadastrar-tipo-lancamento/cadastrar-tipo-lancamento.component';
import { DeletarTipoLancamentoComponent } from './deletar-tipo-lancamento/deletar-tipo-lancamento.component';
import { TiposLancamentosComponent } from './tipos-lancamentos.component';

const routes: Routes = [
  { path: 'tiposlancamentos', component: TiposLancamentosComponent },
  { path: 'tiposlancamentos/cadastro', component: CadastrarTipoLancamentoComponent },
  { path: 'tiposlancamentos/cadastro/:id', component: CadastrarTipoLancamentoComponent },
  { path: 'tiposlancamentos/deletar/:id', component: DeletarTipoLancamentoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposLancamentosRoutingModule { }
