import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {
  public text: string;
  public isError: boolean;
  public img: string;
  [x: string]: any;
  constructor(
    public modalService: BsModalService
  ) {
    this.text = '';
    this.img = '';
    this.isError = false;
  }

  public modalConfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: 'modal-dialog-mini'
  };

  showAlert(message: string, type: string) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

  }
}
