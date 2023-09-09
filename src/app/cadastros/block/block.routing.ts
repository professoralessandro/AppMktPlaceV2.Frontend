import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { BlockComponent } from './block.component';
import { InsertBlockComponent } from './insert-block/insert-block.component';
import { DeleteBlockComponent } from './delete-block/delete-block.component';

const routes: Routes = [
  { path: 'teste', component: BlockComponent },
  { path: 'teste/cadastro', component: InsertBlockComponent },
  { path: 'teste/cadastro/:id', component: InsertBlockComponent },
  { path: 'teste/deletar/:id', component: DeleteBlockComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class BlockRoutingModule { }
