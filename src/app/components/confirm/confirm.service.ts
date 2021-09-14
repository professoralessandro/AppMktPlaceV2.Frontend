import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { ConfirmComponent } from './confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private subject = new Subject<any>();
  constructor(public modalService: BsModalService) { }

  private bsModalRef: BsModalRef;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.bsModalRef = new BsModalRef();
  }

  public confirmThis(message: string, siFn: () => void, noFn: () => void) {
    this.setConfirmation(message, siFn, noFn);
  }

  public setConfirmation(message: string, siFn: () => void, noFn: () => void) {
    this.bsModalRef = this.modalService.show(ConfirmComponent);
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      siFn: function () {
        that.subject.next();
        // this will close the modal
        siFn();
        that.ngOnDestroy();
      },
      noFn: function () {
        that.subject.next();
        noFn();
        that.ngOnDestroy();
      },
    });
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy() {
    setTimeout(() => this.bsModalRef.hide(), 1000);
  }
}
