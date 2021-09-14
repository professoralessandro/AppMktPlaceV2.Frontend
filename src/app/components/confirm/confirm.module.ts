import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  declarations: [
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ConfirmComponent
  ],
  providers: [],
  entryComponents: [
    ConfirmComponent
  ],
})

export class ConfirmModule { }
