import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { CommonService } from "src/app/services/common.service";
import { NgModule } from "@angular/core";
import { ResetPasswordComponent } from "../reset-password/reset-password.component";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:id/:token', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class LoginRoutingModule { }