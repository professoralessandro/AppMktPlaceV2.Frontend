import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductTypeEnum } from 'src/app/Enums/product-type.enum';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  /**
   * CLASS ATIBUTTES
   */
  public product: Product;
  public title: string;

  /**
   * CONSTRUCTOR
   */
  constructor() { }

  /**
   * PUBLIC METHOD
   */
  public ngOnInit(): void {
    // START THE DETAILS COMPONENT
    this.initializeAtributtes();
  }

  public buyProduct(): void {
    // Implement your logic for purchasing the product
    // For example, navigate to a checkout page
    // You can use Angular Router for navigation
  }

  /**
   * PRIVATE METHOD
   */
  private initializeAtributtes()
  {
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
    this.product.precoVenda = 50.10;
    this.product.quantidade = 50;
    this.product.rating = 4.5;

    // TITLE
    this.title = 'Detalhes do produto ';
  }
}
