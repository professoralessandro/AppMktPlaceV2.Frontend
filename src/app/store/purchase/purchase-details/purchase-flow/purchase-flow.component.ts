import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-purchase-flow',
  templateUrl: './purchase-flow.component.html',
  styleUrls: ['./purchase-flow.component.scss']
})
export class PurchaseFlowComponent implements OnInit {
  /**
   * CLASS ATRIBUTTES
   */
  public isOpinate: boolean;
  public title: string;

  /**
   * PUBLIC CONSTRUCTOR
   */
  constructor(private commonService: CommonService) { }

  /**
   * PUBLIC METHOD
   */
  public ngOnInit(): void {
  }

  public enviarOpiniao(): void {
    // Lógica para enviar a opinião
    console.log('Opinião enviada!');
    this.isOpinate = !this.isOpinate;
  }

  /**
   * PRIVATE METHOD
   */
  public initializeComponent(): void
  {
    this.isOpinate = false;
    this.title = 'Status da compra';
  }
}
