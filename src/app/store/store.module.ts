import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ProductComponent } from './product/product.component';
import { ProductRoutingModule } from './product/product.routing';
@NgModule({
  declarations: [
    ProductComponent,
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
