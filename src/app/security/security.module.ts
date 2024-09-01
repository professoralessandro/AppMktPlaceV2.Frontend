import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './user/login/login.component';
import { LoginRoutingModule } from './user/login/login.routing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { ActiveAccountComponent } from './user/active-account/active-account.component';
import { RegisterComponent } from './user/register/register.component';

@NgModule({
    declarations: [
      LoginComponent,
      ForgotPasswordComponent,
      ResetPasswordComponent,
      ActiveAccountComponent,
      RegisterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        RouterModule,
      ]
  })

export class SecurityModule { }