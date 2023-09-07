import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UsersComponent } from './users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

const routes: Routes = [
  { path: 'user', component: UsersComponent },
  { path: 'user/cadastro', component: UpdateUserComponent },
  { path: 'user/cadastro/:id', component: UpdateUserComponent },
  { path: 'user/deletar/:id', component: DeleteUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class UserRoutingModule { }
