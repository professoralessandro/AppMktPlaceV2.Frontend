import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { PurchaseFlowComponent } from './purchase-flow/purchase-flow.component';
import { PurchaseDetailsComponent } from './purchase-details.component';

const routes: Routes = [
  { path: 'purchase/details', component: PurchaseDetailsComponent },
  { path: 'purchase/details/flow/:id', component: PurchaseFlowComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class PurchaseRoutingModule { }
