import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AddressComponent } from './address.component';
import { InsertAddressComponent } from './insert-address/insert-address.component';
import { DeleteAddressComponent } from './delete-address/delete-address.component';

const routes: Routes = [
  { path: 'address', component: AddressComponent },
  { path: 'address/cadastro', component: InsertAddressComponent },
  { path: 'address/cadastro/:id', component: InsertAddressComponent },
  { path: 'address/deletar/:id', component: DeleteAddressComponent },
  { path: 'address/user/:userId', component: InsertAddressComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class AddressRoutingModule { }
