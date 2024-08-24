import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './user/login/login.component';
import { LoginRoutingModule } from './user/login/login.routing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
      LoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        RouterModule,
      ]
  })

export class SecurityModule { }