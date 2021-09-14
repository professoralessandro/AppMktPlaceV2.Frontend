import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrarTipoWorkflowComponent } from './cadastrar-tipo-workflow/cadastrar-tipo-workflow.component';
import { DeletarTipoWorkflowComponent } from './deletar-tipo-workflow/deletar-tipo-workflow.component';
import { TiposWorkflowsComponent } from './tipos-workflows.component';

const routes: Routes = [
  { path: 'tiposworkflows', component: TiposWorkflowsComponent },
  { path: 'tiposworkflows/cadastro', component: CadastrarTipoWorkflowComponent },
  { path: 'tiposworkflows/cadastro/:id', component: CadastrarTipoWorkflowComponent },
  { path: 'tiposworkflows/deletar/:id', component: DeletarTipoWorkflowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposWorkflowsRoutingModule { }
