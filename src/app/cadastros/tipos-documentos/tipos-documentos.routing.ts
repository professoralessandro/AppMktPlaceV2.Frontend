import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrarTiposDocumentosComponent } from './cadastrar-tipos-documentos/cadastrar-tipos-documentos.component';
import { DeletarTiposDocumentosComponent } from './deletar-tipos-documentos/deletar-tipos-documentos.component';
import { TiposDocumentosComponent } from './tipos-documentos.component';

const routes: Routes = [
  { path: 'tiposdocumentos', component: TiposDocumentosComponent },
  { path: 'tiposdocumentos/cadastro', component: CadastrarTiposDocumentosComponent },
  { path: 'tiposdocumentos/cadastro/:id', component: CadastrarTiposDocumentosComponent },
  { path: 'tiposdocumentos/deletar/:id', component: DeletarTiposDocumentosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposDocumentosRoutingModule { }
