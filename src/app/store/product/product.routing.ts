import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ProductComponent } from './product.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'product/details/:id', component: DetailsComponent },
  { path: 'product/shopping-cart', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class ProductRoutingModule { }
