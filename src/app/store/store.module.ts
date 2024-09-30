import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { NgxMaskModule } from 'ngx-mask';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product/product.routing';
import { DeliveryComponent } from './purchase/delivery/delivery.component';
import { DetailsComponent } from './product/details/details.component';
import { DEFAULT_CURRENCY_CODE } from '@angular/core'
import { PurchaseDetailsComponent } from './purchase/purchase-details/purchase-details.component';
import { PurchaseRoutingModule } from './purchase/purchase-details/purchase.routing';
import { StarRatingComponent } from '../components/star-rating/star-rating.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { OrderRoutingModule } from './order/order.routing';

@NgModule({
  declarations: [
    ProductComponent,
    DetailsComponent,
    DeliveryComponent,
    DetailsComponent,
    PurchaseDetailsComponent,
    StarRatingComponent,
    OrderComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    PurchaseRoutingModule,
    RouterModule,
    OrderRoutingModule,
    InfiniteScrollModule,
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
