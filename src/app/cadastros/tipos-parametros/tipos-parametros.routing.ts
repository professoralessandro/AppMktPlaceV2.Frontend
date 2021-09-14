import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CadastrarTipoParametroComponent } from './cadastrar-tipo-parametro/cadastrar-tipo-parametro.component';
import { DeletarTipoParametroComponent } from './deletar-tipo-parametro/deletar-tipo-parametro.component';
import { TiposParametrosComponent } from './tipos-parametros.component';

const routes: Routes = [
  { path: 'tiposparametros', component: TiposParametrosComponent },
  { path: 'tiposparametros/cadastro', component: CadastrarTipoParametroComponent },
  { path: 'tiposparametros/cadastro/:id', component: CadastrarTipoParametroComponent },
  { path: 'tiposparametros/deletar/:id', component: DeletarTipoParametroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class TiposParametrosRoutingModule { }
