import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { CommonService } from "src/app/services/common.service";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class LoginRoutingModule { }