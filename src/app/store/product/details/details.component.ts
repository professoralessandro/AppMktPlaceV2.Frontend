import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductTypeEnum } from 'src/app/Enums/product-type.enum';
import { CommonService } from 'src/app/services/common.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute, Router } from '@angular/router';

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
  public previusRoute: string;
  public imgError: string;
  public isBlockedToAddShopCart: boolean;
  public isShoppingCartVisualization: boolean;
  public paymentPurchaseRoute: string;

  public shoppingCartTitle: string;

  // SHOPCART PRODUCTS
  public productList: Product[];
  private parameters: QueryParameter[];
  public pageNumber: number;
  public rowspPage: number;
  public param: string;

  // USER
  public userId: string;

  // PRODUCT
  public productId: string;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private commonService: CommonService,
    private loaderService: LoaderService,
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private route: Router,
  ) { }

  /**
   * PUBLIC METHOD
   */
  public ngOnInit(): void {
    // START THE DETAILS COMPONENT
    this.initializeAtributtes();
  }

  public buyProduct(product): void {
    debugger;
    if (this.validatePurchaseProduct(product)) {
      //ADD PRODUCT TO SHOPCART
      localStorage.setItem('shoppingcart', JSON.stringify(Array<Product>().push(product)));
      this.route.navigate([this.paymentPurchaseRoute]).then();
    }
  }

  public buyShoppingCartProduct(productList): void {
    debugger;
    productList.forEach(product => {
      if (!this.validatePurchaseProduct(product)) {
        return;
      }
    });
    debugger;

    //PARA ADICIONAR
    localStorage.setItem('shoppingcart', JSON.stringify(productList));
    debugger;
    this.route.navigate([this.paymentPurchaseRoute]).then();
    debugger;
    // this.route.navigate([route]).then(e => {
    //   this.loaderService.SetLoaderState(false);
    //   this.alertService.showAlert(messege, isSucsess ? 'success' : 'error');
    // });
  }

  public currencyFormatterBRL(value) {
    return this.commonService.currencyFormatterBRL(value);
  }

  public addProductToShoppingcartProduct(product): void {
    debugger;
    this.service.insert('cadastros_url', 'store/shoppingcart', {
      usuarioId: this.userId,
      produtoId: product.identifier,
      usuarioInclusaoId: this.userId,
      dataInclusao: new Date(),
    })
      .toPromise()
      .then(c => {
        // SUCCESS MESSAGE
        this.loaderService.SetLoaderState(false);
        this.product
        // LOAD AGAIN THE SHOPPING CART
        this.commonService.responseActionWithoutNavigation('success', 'O produto: ' + this.product.titulo + ' foi adocionado com sucesso.');
        this.loadShoopingCart();
      })
      .catch(e => {
        // ERROR MESSAGE
        this.loaderService.SetLoaderState(false);
        const messageType = 'error';
        const messageText = 'Houve um erro ao adicionad o produto no carrinho de compras.';
        this.commonService.responseActionWithNavigation(this.previusRoute, e.error, false);
      });
  }

  public removeProductFromShoppingCart(product): void {
    this.service.delete('cadastros_url', 'store/shoppingcart', product.shoppingCartId)
      .toPromise()
      .then(c => {
        // LOAD AGAIN THE SHOPPING CART
        this.loadShoopingCart();
      })
      .then(c => {
        // SUCCESS MESSAGE
        this.loaderService.SetLoaderState(false);
        const messageType = 'success';
        const messageText = 'O produto foi removiso com sucesso.';
        this.commonService.responseActionWithoutNavigation(messageType, messageText);
      })
      .catch(e => {
        // ERROR MESSAGE
        this.loaderService.SetLoaderState(false);
        const messageType = 'error';
        const messageText = 'Houve um erro ao buscar os produtos.';
        this.commonService.responseActionWithNavigation(this.previusRoute, e.error, false);
      });
  }

  /**
   * THE METHOD CHECK IF EXISTS A IMAGE, IF IT HAVENT ANY IMAGE IT REPLACE FOR ERROR IMAGE
   * @param product 
   */
  public handleMissingImage(product) {
    try {
      if (this.commonService.isNullOrUndefined(product.mainImage) || product.mainImage === '') {
        product.mainImage = this.imgError;
      }
    }
    catch {
      product.mainImage = this.imgError;
    }
  }

  public isValueValid(value): boolean {
    let validation = true;
    try {
      if (this.commonService.isNullOrUndefined(value) || value === '') {
        validation = false;
      }
      return validation;
    }
    catch {
      return false;
    }
  }

  public returnServiceTYPE(productTypeEnum): String {
    try {
      let type = this.commonService.ReturnEnumObjectByName('productTypeEnum', productTypeEnum);
      return type;
    }
    catch {
      return undefined;
    }
  }

  /**
   * PRIVATE METHOD
   */
  private initializeAtributtes() {
    this.loaderService.SetLoaderState(true);

    // PRODUCT EMPTY INITIALIZED
    this.product = new Product();

    this.imgError = './assets/img/test/carregar-notificacao-de-erro-icone-de-sinal-de-aviso-ilustracao-vetorial-eps-10-imagem-stock_797523-2316.jpg';
    this.isBlockedToAddShopCart = false;
    this.isShoppingCartVisualization = false;

    // TITLE
    this.title = 'Detalhes do produto ';
    this.shoppingCartTitle = 'Carrinho de compras ';

    // ROUTE
    this.previusRoute = './store/test';

    // GRID
    this.pageNumber = 1;
    this.rowspPage = 10;

    // TODO: THEN REMOVE IT
    this.userId = "D2A833DE-5BB4-4931-A3C2-133C8994072A".toLocaleLowerCase();

    this.paymentPurchaseRoute = '/store/purchase/details';

    this.router.paramMap.subscribe((params) => {
      if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
        this.productId = params.get('id');

        // INITIALIZE SHOPPING CART ATTRIB
        this.loadShoopingCart(this.productId);

        // INITIALIZE PRODUCT
        this.loadProduct(this.productId);
      } else {
        // INITIALIZE SHOPPING CART ATTRIB
        this.loadShoopingCart();
      }
    });
  }

  private loadShoopingCart(prodId?) {
    this.loaderService.SetLoaderState(true);
    this.parameters = [
      { parameter: 'userId', value: this.userId },
      { parameter: 'pageNumber', value: this.pageNumber },
      { parameter: 'rowspPage', value: this.rowspPage }
    ];
    this.service.getAll('cadastros_url', 'store/GetAllShoppingCartProductByUserId', this.parameters)
      .toPromise()
      .then(c => {
        this.productList = this.ConvertAnyProductListToProductList(c);
        if (this.productList.length > 0) {
          if (!this.commonService.isNullOrUndefined(prodId)) {
            // IF EXISTS MORE THAN 10 OBJECS ON SHOPPING CART OR THE PRODUCT ALREDY THERE IT WILL BE BLOCKED TO ADDED ON SHOPPING CART
            if (this.productList.length >= 10 || !this.commonService.isNullOrUndefined(this.productList.find(c => c.identifier === prodId))) {
              this.isBlockedToAddShopCart = true;
            } else {
              this.isBlockedToAddShopCart = false;
            }
          }
          else {
            this.isShoppingCartVisualization = true;
            this.isBlockedToAddShopCart = false;
          }
          this.productList.forEach(x => {
            x.productTypeEnum = this.commonService.ReturnEnumObjectByName('productTypeEnum', x.productTypeEnum);
          });
          this.loaderService.SetLoaderState(false);
        }
      })
      .catch(e => {
        this.loaderService.SetLoaderState(false);
        const messageType = 'error';
        const messageText = 'Houve um erro ao buscar os produtos.';
        this.commonService.responseActionWithoutNavigation(messageType, messageText);
        this.loaderService.SetLoaderState(false);
      });
  }

  private loadProduct(productId) {
    this.loaderService.SetLoaderState(true);

    this.parameters = [
      { parameter: 'id', value: productId }
    ];

    this.service.getSingle('cadastros_url', 'Product/GetById', this.parameters)
      .toPromise()
      .then(c => {
        this.product = c;
        this.product.productTypeEnum = this.commonService.ReturnEnumObjectByName('productTypeEnum', this.product.productTypeEnum);
        this.loaderService.SetLoaderState(false);
      })
      .catch(e => {
        this.loaderService.SetLoaderState(false);
        this.commonService.ReturnModalMessagErrorSuccess('Houve um erro buscar o produto.', false);
      })
  }

  private ConvertAnyProductListToProductList(productList: any[]): Product[] {
    try {
      let products = new Array<Product>();
      if (productList.length > 0) {
        productList.forEach(c => {
          let product = new Product();
          product.identifier = c.identifier;
          product.productTypeEnum = c.productTypeEnum;
          product.titulo = c.titulo;
          product.resumoDetalhes = c.resumoDetalhes;
          product.detalhes = c.detalhes;
          product.codigoBarras = c.codigoBarras;
          product.marca = c.marca;
          product.mainImage = c.mainImage;
          product.precoVenda = c.precoVenda;
          product.quantidade = c.quantidade;
          product.rating = c.rating;
          product.shoppingCartId = c.shoppingCartId;
          product.usuarioInclusaoId = c.usuarioInclusaoId;
          product.dataInclusao = c.dataInclusao;
          product.productQuantity = 0;
          products.push(product);
        })
      }

      return products;
    }
    catch {
      return new Array<Product>();
    }
  }

  private validatePurchaseProduct(product: Product): boolean {
    if (product.productQuantity > 10 || product.productQuantity < 1) {
      this.commonService.ReturnModalMessagErrorSuccess(`A quantidade do produto: ${product.titulo}\ndeve ser maior 0 e menor que 11 produtos.`, false);
      return false;
    }

    if (product.productQuantity > product.productQuantity) {
      this.commonService.ReturnModalMessagErrorSuccess(`A quantidade do produto: ${product.titulo} indisponível.`, false);
      return false;
    }

    return true;
  }
}

