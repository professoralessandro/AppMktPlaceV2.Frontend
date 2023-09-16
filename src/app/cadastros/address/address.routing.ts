import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AddressComponent } from './address.component';
import { InsertAddressComponent } from './insert-address/insert-address.component';
import { DeleteAddressComponent } from './delete-address/delete-address.component';

const routes: Routes = [
  { path: 'teste', component: AddressComponent },
  { path: 'teste/cadastro', component: InsertAddressComponent },
  { path: 'teste/cadastro/:id', component: InsertAddressComponent },
  { path: 'teste/deletar/:id', component: DeleteAddressComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class AddressRoutingModule { }
