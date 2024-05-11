import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ProductComponent } from './product.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: 'test', component: ProductComponent },
  { path: 'test/details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class ProductRoutingModule { }
