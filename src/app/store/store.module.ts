import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product/product.routing';
import { DeliveryComponent } from './purchase/delivery/delivery.component';
import { DetailsComponent } from './product/details/details.component';
import { DEFAULT_CURRENCY_CODE } from '@angular/core'
import { PurchaseDetailsComponent } from './purchase/purchase-details/purchase-details.component';
import { PurchaseFlowComponent } from './purchase/purchase-details/purchase-flow/purchase-flow.component';
import { PurchaseRoutingModule } from './purchase/purchase-details/purchase.routing';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
  declarations: [
    ProductComponent,
    DetailsComponent,
    DeliveryComponent,
    DetailsComponent,
    PurchaseDetailsComponent,
    PurchaseFlowComponent,
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    PurchaseRoutingModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ]
})
export class StoreModule { }
