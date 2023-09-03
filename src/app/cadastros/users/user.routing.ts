import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { UsersComponent } from './users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

const routes: Routes = [
  { path: 'teste', component: UsersComponent },
  { path: 'teste/cadastro', component: UpdateUserComponent },
  { path: 'teste/cadastro/:id', component: UpdateUserComponent },
  { path: 'teste/deletar/:id', component: DeleteUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class UserRoutingModule { }
