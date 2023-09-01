import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrosTiposConfiguracoesComponent } from './cadastros-tipos-configuracoes/cadastros-tipos-configuracoes.component';
import { DeletarTiposConfiguracoesComponent } from './deletar-tipos-configuracoes/deletar-tipos-configuracoes.component';
import { TiposConfiguracoesComponent } from './tipos-configuracoes.component';

const routes: Routes = [
  { path: 'tipos-configuracoes', component: TiposConfiguracoesComponent },
  { path: 'tipos-configuracoes/cadastro', component: CadastrosTiposConfiguracoesComponent },
  { path: 'tipos-configuracoes/cadastro/:id', component: CadastrosTiposConfiguracoesComponent },
  { path: 'tipos-configuracoes/deletar/:id', component: DeletarTiposConfiguracoesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposConfiguracoesRoutingModule { }
