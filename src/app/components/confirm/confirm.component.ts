import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public message: any;
  public label: string;
  constructor(
    private confirmDialogService: ConfirmService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.label = '';
    // this function waits for a message from alert service, it gets
    // triggered when we call this from any other component
    this.confirmDialogService.getMessage().subscribe(message => {
      this.message = message;
      this.label = message.text;
    });
  }
}
