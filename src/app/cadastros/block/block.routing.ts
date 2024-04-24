import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { BlockComponent } from './block.component';
import { InsertBlockComponent } from './insert-block/insert-block.component';
import { DeleteBlockComponent } from './delete-block/delete-block.component';

const routes: Routes = [
  { path: 'block', component: BlockComponent },
  { path: 'block/cadastro', component: InsertBlockComponent },
  { path: 'block/cadastro/:id', component: InsertBlockComponent },
  { path: 'block/deletar/:id', component: DeleteBlockComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class BlockRoutingModule { }
