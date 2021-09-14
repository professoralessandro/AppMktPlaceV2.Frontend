import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrosTiposTelefonesComponent } from './cadastros-tipos-telefones/cadastros-tipos-telefones.component';
import { DeletarTiposTelefonesComponent } from './deletar-tipos-telefones/deletar-tipos-telefones.component';
import { TiposTelefonesComponent } from './tipos-telefones.component';

const routes: Routes = [
  { path: 'tipostelefones', component: TiposTelefonesComponent },
  { path: 'tipostelefones/cadastro', component: CadastrosTiposTelefonesComponent },
  { path: 'tipostelefones/cadastro/:id', component: CadastrosTiposTelefonesComponent },
  { path: 'tipostelefones/deletar/:id', component: DeletarTiposTelefonesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposTelefonesRoutingModule { }
