import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductComponent } from '../product/product.component';

const routes: Routes = [
  { path: 'order', component: ProductComponent },
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
