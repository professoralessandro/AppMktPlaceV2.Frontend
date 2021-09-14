import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrosTiposConfiguracoesComponent } from './cadastros-tipos-configuracoes/cadastros-tipos-configuracoes.component';
import { DeletarTiposConfiguracoesComponent } from './deletar-tipos-configuracoes/deletar-tipos-configuracoes.component';
import { TiposConfiguracoesComponent } from './tipos-configuracoes.component';

const routes: Routes = [
  { path: 'teste', component: TiposConfiguracoesComponent },
  { path: 'teste/cadastro', component: CadastrosTiposConfiguracoesComponent },
  { path: 'teste/cadastro/:id', component: CadastrosTiposConfiguracoesComponent },
  { path: 'teste/deletar/:id', component: DeletarTiposConfiguracoesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposConfiguracoesRoutingModule { }
