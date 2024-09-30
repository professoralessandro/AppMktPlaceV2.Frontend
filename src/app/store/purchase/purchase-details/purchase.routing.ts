import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PurchaseDetailsComponent } from './purchase-details.component';

const routes: Routes = [
  { path: 'purchase/details', component: PurchaseDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class PurchaseRoutingModule { }
