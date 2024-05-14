import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { NgxMaskModule } from 'ngx-mask';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product/product.routing';
import { DeliveryComponent } from './purchase/delivery/delivery.component';
import { OpinateComponent } from './purchase/opinate/opinate.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { DetailsComponent } from './product/details/details.component';
import { PurchaseDetailsComponent } from './purchase/purchase-details/purchase-details.component';
@NgModule({
  declarations: [
    ProductComponent,
    DetailsComponent,
    DeliveryComponent,
    OpinateComponent,
    PurchaseComponent,
    DetailsComponent,
    PurchaseDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ]
})
export class StoreModule { }
