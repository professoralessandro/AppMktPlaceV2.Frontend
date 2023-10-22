import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ProdutoComponent } from './produto.component';
import { DeleteProdutoComponent } from './delete-produto/delete-produto.component';
import { InsertProdutoComponent } from './insert-produto/insert-produto.component';

const routes: Routes = [
  { path: 'test', component: ProdutoComponent },
  { path: 'test/cadastro', component: InsertProdutoComponent },
  { path: 'test/cadastro/:id', component: InsertProdutoComponent },
  { path: 'test/deletar/:id', component: DeleteProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class ProdutoRoutingModule { }
