import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './product/details/details.component';
import { PurchaseComponent } from './product/purchase/purchase.component';



@NgModule({
  declarations: [
    ProductComponent,
    DetailsComponent,
    PurchaseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StoreModule { }
