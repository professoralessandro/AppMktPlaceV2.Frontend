import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrosTiposTelefonesComponent } from './tipos-telefones/cadastros-tipos-telefones/cadastros-tipos-telefones.component';
import { FormsModule } from '@angular/forms';
import { TiposTelefonesRoutingModule } from './tipos-telefones/tipos-telefones.routing';
import { RouterModule } from '@angular/router';
import { TiposConfiguracoesComponent } from './tipos-configuracoes/tipos-configuracoes.component';
import { CadastrosTiposConfiguracoesComponent } from './tipos-configuracoes/cadastros-tipos-configuracoes/cadastros-tipos-configuracoes.component';
import { DeletarTiposTelefonesComponent } from './tipos-telefones/deletar-tipos-telefones/deletar-tipos-telefones.component';
// tslint:disable-next-line:max-line-length
import { DeletarTiposConfiguracoesComponent } from './tipos-configuracoes/deletar-tipos-configuracoes/deletar-tipos-configuracoes.component';
import { TiposConfiguracoesRoutingModule } from './tipos-configuracoes/tipos-configuracoes.routing';
import { TiposTelefonesComponent } from './tipos-telefones/tipos-telefones.component';
import { GridComponent } from '../components/grid/grid.component';
import { CompTitleComponent } from '../components/comp-title/comp-title.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CadastrarTiposDocumentosComponent } from './tipos-documentos/cadastrar-tipos-documentos/cadastrar-tipos-documentos.component';
import { DeletarTiposDocumentosComponent } from './tipos-documentos/deletar-tipos-documentos/deletar-tipos-documentos.component';
import { TiposDocumentosRoutingModule } from './tipos-documentos/tipos-documentos.routing';
import { TiposDocumentosComponent } from './tipos-documentos/tipos-documentos.component';
import { TiposParametrosComponent } from './tipos-parametros/tipos-parametros.component';
import { TiposLancamentosComponent } from './tipos-lancamentos/tipos-lancamentos.component';
import { TiposWorkflowsComponent } from './tipos-workflows/tipos-workflows.component';
import { CadastrarTipoLancamentoComponent } from './tipos-lancamentos/cadastrar-tipo-lancamento/cadastrar-tipo-lancamento.component';
import { DeletarTipoLancamentoComponent } from './tipos-lancamentos/deletar-tipo-lancamento/deletar-tipo-lancamento.component';
import { TiposLancamentosRoutingModule } from './tipos-lancamentos/tipos-lancamentos.routing';
import { CadastrarTipoParametroComponent } from './tipos-parametros/cadastrar-tipo-parametro/cadastrar-tipo-parametro.component';
import { DeletarTipoParametroComponent } from './tipos-parametros/deletar-tipo-parametro/deletar-tipo-parametro.component';
import { TiposParametrosRoutingModule } from './tipos-parametros/tipos-parametros.routing';
import { TiposDadosComponent } from './tipos-dados/tipos-dados.component';
import { CadastrarTipoDadoComponent } from './tipos-dados/cadastrar-tipo-dado/cadastrar-tipo-dado.component';
import { DeletarTipoDadoComponent } from './tipos-dados/deletar-tipo-dado/deletar-tipo-dado.component';
import { DeletarTipoWorkflowComponent } from './tipos-workflows/deletar-tipo-workflow/deletar-tipo-workflow.component';
import { CadastrarTipoWorkflowComponent } from './tipos-workflows/cadastrar-tipo-workflow/cadastrar-tipo-workflow.component';
import { TiposWorkflowsRoutingModule } from './tipos-workflows/tipos-workflows.routing';
import { TiposDadosRoutingModule } from './tipos-dados/tipos-dados.routing';
import { GroupsComponent } from './groups/groups.component';
import { InsertGroupsComponent } from './groups/insert-groups/insert-groups.component';
import { DeleteGroupsComponent } from './groups/delete-groups/delete-groups.component';
import { GroupsRoutingModule } from './groups/groups.routing';
import { UsersComponent } from './users/users.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UserRoutingModule } from './users/user.routing';


@NgModule({
  declarations: [
    CadastrosTiposTelefonesComponent,
    DeletarTiposTelefonesComponent,
    TiposTelefonesComponent,
    CadastrosTiposConfiguracoesComponent,
    DeletarTiposConfiguracoesComponent,
    TiposConfiguracoesComponent,
    GridComponent,
    CompTitleComponent,
    CadastrarTiposDocumentosComponent,
    DeletarTiposDocumentosComponent,
    TiposDocumentosComponent,
    TiposParametrosComponent,
    TiposLancamentosComponent,
    TiposWorkflowsComponent,
    CadastrarTipoLancamentoComponent,
    DeletarTipoLancamentoComponent,
    CadastrarTipoParametroComponent,
    DeletarTipoParametroComponent,
    TiposDadosComponent,
    CadastrarTipoDadoComponent,
    DeletarTipoDadoComponent,
    DeletarTipoWorkflowComponent,
    CadastrarTipoWorkflowComponent,
    GroupsComponent,
    InsertGroupsComponent,
    DeleteGroupsComponent,
    UsersComponent,
    DeleteUserComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TiposTelefonesRoutingModule,
    TiposConfiguracoesRoutingModule,
    TiposDocumentosRoutingModule,
    TiposLancamentosRoutingModule,
    TiposParametrosRoutingModule,
    TiposWorkflowsRoutingModule,
    TiposDadosRoutingModule,
    GroupsRoutingModule,
    UserRoutingModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ]
})
export class CadastrosModule { }
