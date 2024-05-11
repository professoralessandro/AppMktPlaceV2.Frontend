import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './product/details/details.component';
import { PurchaseComponent } from './product/purchase/purchase.component';
import { DeliveryComponent } from './product/delivery/delivery.component';
import { OpinateComponent } from './product/opinate/opinate.component';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product/product.routing';



@NgModule({
  declarations: [
    ProductComponent,
    DetailsComponent,
    PurchaseComponent,
    DeliveryComponent,
    OpinateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
  ]
})
export class StoreModule { }
