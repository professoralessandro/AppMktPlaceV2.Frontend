import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './user/login/login.component';
import { LoginRoutingModule } from './user/login/login.routing';

@NgModule({
    declarations: [
      LoginComponent,
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
      ]
  })

export class SecurityModule { }