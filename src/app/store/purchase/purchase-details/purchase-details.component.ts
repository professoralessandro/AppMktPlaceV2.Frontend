import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Product } from '../../product/product';
import { ProductTypeEnum } from 'src/app/Enums/product-type.enum';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {

  /**
   * CLASS ATIBUTTES
   */
  public product: Product;
  public title: string;

  public valorTotal: number; // Exemplo: substitua pelo valor real
  public endereco: string;
  public prazoEntrega: string; // Exemplo: substitua pelo prazo real
  public formaPagamento: string; // Exemplo: substitua pela forma real
  public identifier: string;

  constructor(private commonService: CommonService) { }

  /**
   * PUBLIC METHOD
   */

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public currencyFormatterBRL(value): string {
    return this.commonService.currencyFormatterBRL(value);
  }

  public goToPaymentMethod() {
    try {
      debugger;
      // TODO: IMPLEMENTS HERE THE PAYMENT METHOD

      const alertMessage: string = 'Voce sera redirecionado para o metodo de pagamento: ' + this.formaPagamento;
      const routePaymentNavigation: string = '/store/purchase/flow/' + this.identifier;
      this.commonService.responseActionWithNavigation(routePaymentNavigation, alertMessage, true);
      debugger;
    }
    catch(ex) {
      const alertType: string = 'error';
      const errorMessage: string = 'Houve um erro ao tentar efetivar o pagamento: \n' + ex.error;
      this.commonService.responseActionWithoutNavigation(alertType, errorMessage);
    }
  }

  /**
   * PRIVATE METHOD
   */
  private initializeComponent() {
    // CLASS ATRIBUTTES
    this.valorTotal = 1000; // Exemplo: substitua pelo valor real
    this.endereco = 'Rua Exemplo, 123 - Cidade';
    this.prazoEntrega = '3 dias úteis'; // Exemplo: substitua pelo prazo real
    this.formaPagamento = 'Mercado Pago'; // Exemplo: substitua pela forma real
    this.identifier = 'ffeb6c56-17a5-4fee-b23a-27b6c235ce33';
    this.title = 'Confirmacao da compra';

    // PRODUCT
    this.product = new Product();
    this.product.identifier = 'ffeb6c56-17a5-4fee-b23a-27b6c235ce33';
    this.product.productTypeEnum = ProductTypeEnum.Produto;
    this.product.titulo = 'Descrição do Produto 1';
    this.product.resumoDetalhes = 'resumo detalhes do Produto 1';
    this.product.detalhes = 'Detalhes do Produto 1';
    this.product.codigoBarras = '12345678910';
    this.product.marca = 'Marca Teste 1';
    this.product.image = './assets/img/test/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg';
    this.product.precoVenda = 50;
    this.product.quantidade = 50;
    this.product.rating = 4.5;
  }
}
