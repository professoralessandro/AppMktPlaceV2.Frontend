import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order.component';

const routes: Routes = [
  { path: 'order', component: OrderComponent },
  { path: 'order/details/:id', component: OrderDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class OrderRoutingModule { }
