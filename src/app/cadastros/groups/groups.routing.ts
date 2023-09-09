import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { GroupsComponent } from './groups.component';
import { InsertGroupsComponent } from './insert-groups/insert-groups.component';
import { DeleteGroupsComponent } from './delete-groups/delete-groups.component';

const routes: Routes = [
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/cadastro', component: InsertGroupsComponent },
  { path: 'groups/cadastro/:id', component: InsertGroupsComponent },
  { path: 'groups/deletar/:id', component: DeleteGroupsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class GroupsRoutingModule { }
