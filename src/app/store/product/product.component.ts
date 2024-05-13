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

  public redirectToProductPage(productId: number): void {
    // Redirecionar para a página de compra com o ID do produto
    this.router.navigate(['/product', productId]);
  }

  /**
   * PRIVATEE METHOD
   */
  private initializeAtributtes() {
    this.title = "List da produtos"
    this.productList = [
      {
        identifier: '000000',
        productTypeEnum: 1,
        descricao: 'Descrição do Produto 1',
        detalhes: 'Detalhes Teste 1',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 1',
        image: 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 50.20
      },
      {
        identifier: '000000',
        productTypeEnum: 1,
        descricao: 'Descrição do Produto 2',
        detalhes: 'Detalhes Teste 2',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 2',
        image: 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 52.10
      },
      {
        identifier: '000000',
        productTypeEnum: 2,
        descricao: 'Descrição do Produto 3',
        detalhes: 'Detalhes Teste 3',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 3',
        image: 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 54.20
      },
      {
        identifier: '000000',
        productTypeEnum: 1,
        descricao: 'Descrição do Sevico 4',
        detalhes: 'Detalhes Sevico 4',
        codigoBarras: '',
        marca: '',
        image: 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 53.10
      },
      {
        identifier: '000000',
        productTypeEnum: 2,
        descricao: 'Descrição do Produto 5',
        detalhes: 'Detalhes Teste 5',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 5',
        image: 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 56.20
      },
      {
        identifier: '000000',
        productTypeEnum: 1,
        descricao: 'Descrição do Produto 6',
        detalhes: 'Detalhes Teste 6',
        codigoBarras: '12345678910',
        marca: 'Marca Teste 6',
        image: 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg',
        precoVenda: 58.10
      },
    ];


  }
  
}
