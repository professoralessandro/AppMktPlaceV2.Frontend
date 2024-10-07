import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Product } from '../../product/product';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { Address } from 'src/app/cadastros/address/address';
import { projectUrls } from 'src/environments/endpoints-environment';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutItem, CheckoutRequest } from './checkout-request';
import { TipoEntregaEnum } from 'src/app/Enums/tipo-entrega.enum';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent implements OnInit {

  /**
   * CLASS ATIBUTTES
   */
  public title: string;

  // DELYVERY ATRIBUTTES
  public totalDeliveryCalculateDayValue: number;
  public totalDeliveryCalculateValue: number;
  public inHandDelivery: boolean;

  // SHOPCART PRODUCTS
  public productList: Product[];

  // SHOPPIING CART ATTIBUTTES
  public totalShoppingCartValue: number;

  // HTTP REQUEST ATRIBUTTES
  private parameters: QueryParameter[];
  public pageNumber: number;
  public rowspPage: number;
  public apiUrl: string;
  public endpointUrl: string;

  // ADRESS ATRIBUTTES
  public address: Address;
  public tipoEndereco: string;
  public endereco: string;
  public pontoReferencia: string;
  public registerAddressRoute: string;

  // USER ATRIBUTTES
  public user: any;

  // PRODUCT ATRIBUTTES
  public product: Product;

  // PAYMENT ATRIBUTTES
  public formaPagamento: string;

  public routePaymentNavigation: string;

  // CHECKOUTREQUEST
  private checkoutRequest: CheckoutRequest;

  constructor(
    private commonService: CommonService,
    private loaderService: LoaderService,
    private service: HttpCommonService,
    private auth: AuthService
  ) { }

  /**
   * PUBLIC METHOD
   */

  public ngOnInit(): void {
    // INITIALIZE COMPONENT
    this.initializeComponent();
  }

  public currencyFormatterBRL(value): string {
    return this.commonService.currencyFormatterBRL(value);
  }

  public goToPaymentMethod() {
    try {
      this.loaderService.SetLoaderState(true);
      this.checkoutRequest = {
        totalValue: this.totalShoppingCartValue,
        totalDeliveryValue: this.totalDeliveryCalculateValue,
        typeOfDelivery: this.inHandDelivery ? TipoEntregaEnum.HandDelivery : TipoEntregaEnum.MktPlaceDelivery,
        item: this.convertProductListToPurchaseItem(this.productList),
      };
      this.service.insert('cadastros_url', 'checkoutintegration/mercado-pago-checkout', this.checkoutRequest)
        .toPromise()
        .then(c => {
          const alertMessage: string = 'Voce sera redirecionado para o metodo de pagamento: ' + this.formaPagamento;
          const routePaymentNavigation: string = this.routePaymentNavigation.replace('{id}', c.jsonObject.purchaseId);
          window.open(c.jsonObject.externalPaymentLink, '_blank');
          this.commonService.responseActionWithNavigation(routePaymentNavigation, alertMessage, true);
        })
        .catch(e => {
          const messageType = 'error';
          const messageText = 'Houve um erro ao fazer o checkout: ' + e.error;
          this.commonService.responseActionWithoutNavigation(messageType, messageText);
        });
    }
    catch (ex) {
      this.loaderService.SetLoaderState(false);
      const alertType: string = 'error';
      const errorMessage: string = 'Houve um erro ao tentar efetivar o pagamento: \n' + ex.error;
      this.commonService.responseActionWithoutNavigation(alertType, errorMessage);
    }
  }

  public loadUserAdressByUserId(userId) {
    this.loaderService.SetLoaderState(true);
    //QUERY PARAMETERS
    this.parameters = [
      { parameter: 'userId', value: userId },
      { parameter: 'pageNumber', value: 1 },
      { parameter: 'rowspPage', value: 1 }
    ];
    this.service.getAll('cadastros_url', 'address/paginated', this.parameters)
      .toPromise()
      .then(c => {
        this.loaderService.SetLoaderState(false);
        if (c.length > 0) {
          this.address = c[0];
          this.address.addressTypeEnum = this.commonService.ReturnEnumObjectByName('addressTypeEnum', this.address.addressTypeEnum);
          this.buildAdressAtributtes(this.address);
        } else {
          const messageType = 'error';
          const messageText = 'Você deve cadastrar um endereço para continuar com o pagamento.';
          this.commonService.responseActionWithNavigation(this.registerAddressRoute, messageText, false);
        }
      })
      .catch(e => {
        this.loaderService.SetLoaderState(false);
        const messageType = 'error';
        const messageText = 'Houve um erro ao buscar os produtos.';
        this.commonService.responseActionWithoutNavigation(messageType, messageText);
      });
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

  /**
     * THIS METHOD GET THE SHOPPING CART LIST AND RETURNS THE TOTAL AMOUNT VALUE OF THEY
     * @param value 
     * @returns TOTAL AMOUNT
     */
  public calculateFreteInHandDeliveryValue(): number {
    try {
      if (this.inHandDelivery) {
        this.totalShoppingCartValue += this.totalDeliveryCalculateValue;
      } else {
        this.totalShoppingCartValue -= this.totalDeliveryCalculateValue;
      }
    }
    catch {
      this.commonService.ReturnModalMessagErrorSuccess("Error: Houve um erro ao calcular o valor total do frete", false);
      return 0;
    }
  }

  /**
   * PRIVATE METHOD
   */
  private initializeComponent() {
    // ACRESS
    this.address = new Address();
    this.tipoEndereco = '';
    this.registerAddressRoute = '/cadastros/address/cadastro/';

    this.formaPagamento = 'App MKT Place'; // Exemplo: substitua pela forma real
    this.title = 'Confirmacao da compra';

    // PRODUCT
    this.product = new Product();

    // GET SHOPPING CART PRODUCT
    this.productList = JSON.parse(localStorage.getItem('shoppingcart'));
    // GET USER INFORMATION
    this.user = this.auth.getUser();
    // HTTP CLASS ATRIBUTTES
    this.endpointUrl = projectUrls.GetAllAddressPaginated;
    this.apiUrl = environment.cadastros_url;
    // SHOPPIING CART ATTIBUTTES
    this.totalShoppingCartValue = this.calculateTotalShoppingCartValue(this.productList);
    // GETTING THE USER ADRES
    this.loadUserAdressByUserId(this.user.identifier);
    // DELYVERY ATRIBUTTES
    this.totalDeliveryCalculateDayValue = this.calculateTotalDeliveryTimeValue(this.productList); // Exemplo: substitua pelo prazo real
    this.totalDeliveryCalculateValue = this.calculateTotalDeliveryValue(this.productList); // Exemplo: substitua pelo prazo real
    this.inHandDelivery = false;
    // SUM DELIVERY VALUE TO TOTAL VALUE
    this.totalShoppingCartValue += this.totalDeliveryCalculateDayValue;
    // ROUTE
    this.routePaymentNavigation = '/store/order/details/{id}';

    // CHECKOUT REQUEST
    this.checkoutRequest = new CheckoutRequest();
  }

  /**
   * THIS METHOD GET THE SHOPPING CART LIST AND RETURNS THE TOTAL AMOUNT VALUE OF THEY
   * @param productList 
   * @returns TOTAL AMOUNT
   */
  private calculateTotalShoppingCartValue(productList: Product[]): number {
    try {
      let totalAmount = 0;
      productList.forEach(product => totalAmount += (Number(product.precoVenda) * product.productQuantity))
      return totalAmount;
    }
    catch {
      this.commonService.ReturnModalMessagErrorSuccess("Error: Houve um erro ao calcular o valor total dos produtos", false);
      return 0;
    }
  }

  /**
     * THIS METHOD GET THE SHOPPING CART LIST AND RETURNS THE TOTAL AMOUNT VALUE OF THEY
     * @param productList 
     * @returns TOTAL AMOUNT
     */
  private calculateTotalDeliveryTimeValue(productList: Product[]): number {
    try {
      let totalDeliveryDaysTime = 5;
      return totalDeliveryDaysTime;
    }
    catch {
      this.commonService.ReturnModalMessagErrorSuccess("Error: Houve um erro ao calcular o valor total dos produtos", false);
      return 0;
    }
  }

  /**
     * THIS METHOD GET THE SHOPPING CART LIST AND RETURNS THE TOTAL AMOUNT VALUE OF THEY
     * @param productList 
     * @returns TOTAL AMOUNT
     */
  private calculateTotalDeliveryValue(productList: Product[]): number {
    try {
      let totalDeliveryValue = 25;
      return totalDeliveryValue;
    }
    catch {
      this.commonService.ReturnModalMessagErrorSuccess("Error: Houve um erro ao calcular o valor total dos produtos", false);
      return 0;
    }
  }

  private buildAdressAtributtes(_address: Address): void {
    this.endereco = `
    ${!this.commonService.isNullOrUndefined(_address.logradouro) ? _address.logradouro.trim() : ''}
    ${!this.commonService.isNullOrUndefined(_address.numero) ? 'N' + _address.numero.trim() : ''}
    ${!this.commonService.isNullOrUndefined(_address.complemento) ? ' ' + _address.complemento.trim() : ''}
    ${!this.commonService.isNullOrUndefined(_address.bairro) ? ' ,' + _address.bairro.trim() : ''}
    ${!this.commonService.isNullOrUndefined(_address.complemento) ? ' ,' + _address.complemento.trim() : ''}
    ${!this.commonService.isNullOrUndefined(_address.cidade) ? ' ,' + _address.cidade.trim() : ''}
    ${!this.commonService.isNullOrUndefined(_address.estado) ? ' ,' + _address.estado.trim() : ''}
    ${!this.commonService.isNullOrUndefined(_address.cep) ? ' ,' + _address.cep.trim() : ''}`;
    this.pontoReferencia = `${!this.commonService.isNullOrUndefined(_address.pontoReferencia) ? _address.pontoReferencia : ''}`;
    this.tipoEndereco = `${!this.commonService.isNullOrUndefined(_address.addressTypeEnum) ? _address.addressTypeEnum : ''}`;
  }

  /**
   * THIS METHOD GET THE SHOPPING CART LIST AND RETURNS THE TOTAL AMOUNT VALUE OF THEY
   * @param productList 
   * @returns TOTAL AMOUNT
   */
  private convertProductListToPurchaseItem(productList: Product[]): Array<CheckoutItem> {

    let checkoutReq = [];

    productList.forEach(item => {
      let reqItem = new CheckoutItem();
      reqItem.Quantity = item.productQuantity;
      reqItem.productId = item.identifier;
      reqItem.value = !this.commonService.isNullOrUndefined(Number(item.precoVenda)) ? Number(item.precoVenda) : null;

      checkoutReq.push(reqItem);
    });

    return checkoutReq;
  }
}
