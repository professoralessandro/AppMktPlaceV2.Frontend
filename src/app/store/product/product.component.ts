import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductTypeEnum } from 'src/app/Enums/product-type.enum';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  /**
   * CLASS ATRIBUTTES
   */
  public title: string;
  public productList = [];
  public testList = [1,2,3,4,5,6];

  constructor(private router: Router) { }

  /**
   * PUBLIC METHOD
   */
  public ngOnInit(): void {
    this.initializeAtributtes();
  }

  /**
   * PRIVATEE METHOD
   */
  private initializeAtributtes() {
    this.title = "List da produtos"
    this.productList = [
      {
        identifier: 'ffeb6c56-17a5-4fee-b23a-27b6c235ce33',
        productTypeEnum: 1,
        titulo: 'Descrição do Produto 1',
        resumoDetalhes: 'Resumo Detalhes Teste 1',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 1',
        image: './assets/img/test/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 50.20,
        quantidade: 50,
        rating: 4.5
      },
      {
        identifier: 'ffeb6c56-17a5-4fee-b23a-27b6c235ce34',
        productTypeEnum: 1,
        titulo: 'Descrição do Produto 2',
        resumoDetalhes: 'Resumo Detalhes Teste 2',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 2',
        image: './assets/img/test/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 52.10,
        quantidade: 70,
        rating: 4.8
      },
      {
        identifier: 'ffeb6c56-17a5-4fee-b23a-27b6c235ce35',
        productTypeEnum: 2,
        titulo: 'Descrição do Produto 3',
        resumoDetalhes: 'Resumo Detalhes Teste 3',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 3',
        image: './assets/img/test/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 54.20,
        quantidade: 60,
        rating: 4.3
      },
      {
        identifier: 'ffeb6c56-17a5-4fee-b23a-27b6c235ce36',
        productTypeEnum: 1,
        titulo: 'Descrição do Sevico 4',
        resumoDetalhes: 'Resumo Detalhes Sevico 4',
        codigoBarras: '',
        marca: '',
        image: './assets/img/test/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 53.10,
        quantidade: 40,
        rating: 4.2
      },
      {
        identifier: 'ffeb6c56-17a5-4fee-b23a-27b6c235ce37',
        productTypeEnum: 2,
        titulo: 'Descrição do Produto 5',
        resumoDetalhes: 'Resumo Detalhes Teste 5',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 5',
        image: './assets/img/test/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 56.20,
        quantidade: 20,
        rating: 4.1
      },
      {
        identifier: 'ffeb6c56-17a5-4fee-b23a-27b6c235ce38',
        productTypeEnum: 1,
        titulo: 'Descrição do Produto 6',
        resumoDetalhes: 'Resumo Detalhes Teste 6',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 6',
        image: './assets/img/test/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 58.10,
        quantidade: 10,
        rating: 4
      },
    ];
  }
}
