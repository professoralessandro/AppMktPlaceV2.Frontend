import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DeliveryComponent } from './delivery.component';
import { InsertDeliveryComponent } from './insert-delivery/insert-delivery.component';
import { DeleteDeliveryComponent } from './delete-delivery/delete-delivery.component';

const routes: Routes = [
  { path: 'delivery', component: DeliveryComponent },
  { path: 'delivery/cadastro', component: InsertDeliveryComponent },
  { path: 'delivery/cadastro/:id', component: InsertDeliveryComponent },
  { path: 'delivery/deletar/:id', component: DeleteDeliveryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class DeliveryRoutingModule { }
