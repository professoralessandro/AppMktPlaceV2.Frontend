import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-purchase-flow',
  templateUrl: './purchase-flow.component.html',
  styleUrls: ['./purchase-flow.component.scss']
})
export class PurchaseFlowComponent implements OnInit {
  /**
   * CRIAR UM FLOW DE COMPRA COM GRID PARA CHECAR AS INFORMAÇÕES DA COMPRA
   * CRIAR OUTRO FLOW DE COMPRAS QUE VAI RECEBER O ID DA COMPRA E CHECAR O STATUS DELA
   */

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
    this.initializeComponent();
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
