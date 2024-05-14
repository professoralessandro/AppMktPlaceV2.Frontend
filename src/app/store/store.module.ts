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
import { DetailsComponent } from './product/details/details.component';
import { DEFAULT_CURRENCY_CODE } from '@angular/core'
import { PurchaseDetailsComponent } from './purchase/purchase-details/purchase-details.component';
import { PurchaseFlowComponent } from './purchase/purchase-details/purchase-flow/purchase-flow.component';
import { PurchaseRoutingModule } from './purchase/purchase-details/purchase.routing';

@NgModule({
  declarations: [
    ProductComponent,
    DetailsComponent,
    DeliveryComponent,
    OpinateComponent,
    DetailsComponent,
    PurchaseDetailsComponent,
    PurchaseFlowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    PurchaseRoutingModule,
    RouterModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ]
})
export class StoreModule { }
