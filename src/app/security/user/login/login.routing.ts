import { RouterModule, Routes } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import { NgModule } from "@angular/core";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";
import { RegisterComponent } from "../register/register.component";

// TODO: THEN REMOVE IT

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})

export class LoginRoutingModule { }