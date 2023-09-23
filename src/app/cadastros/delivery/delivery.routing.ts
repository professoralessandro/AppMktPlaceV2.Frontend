import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DeliveryComponent } from './delivery.component';
import { InsertDeliveryComponent } from './insert-delivery/insert-delivery.component';
import { DeleteDeliveryComponent } from './delete-delivery/delete-delivery.component';

const routes: Routes = [
  { path: 'teste', component: DeliveryComponent },
  { path: 'teste/cadastro', component: InsertDeliveryComponent },
  { path: 'teste/cadastro/:id', component: InsertDeliveryComponent },
  { path: 'teste/deletar/:id', component: DeleteDeliveryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class DeliveryRoutingModule { }
