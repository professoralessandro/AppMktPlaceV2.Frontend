import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { QueryParameter } from 'src/app/models/query-parameter';
import { SelectParameter } from 'src/app/models/select-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters.enum';
import { ProductTypeEnum, ProductTypeMapping } from 'src/app/Enums/product-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';

@Component({
  selector: 'app-insert-produto',
  templateUrl: './insert-produto.component.html',
  styleUrls: ['./insert-produto.component.scss']
})
export class InsertProdutoComponent implements OnInit {

  // Inicializa um objeto vazio para o produto
  public product: Produto;

  // STARTS THE COMPONENT OBJECT
  public isNew: boolean;
  public isProduct: boolean;
  public isInputBlocked: boolean;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private rotaAnterior: string;
  public itensToBlock: SelectParameter[] = [];
  public itemToBlockId: string;
  public profitMargin: number;
  public formatedCostPrice: string;
  public formatedSalePrice: string;

  // ENUM VALUE FORMATER
  public productTypes = Object.values(ProductTypeMapping).filter(c => typeof (c) == 'string');
  public productTypeString: string[] = [];

  constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {

    this.loaderService.SetLoaderState(true);
    this.initializeComponent();

    this.router.paramMap.subscribe((params) => {

      if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
        this.isNew = false;
        this.title = 'Editar produto';
        this.titleButton = this.title.split(' ')[0];

        this.parameters = [
          { parameter: 'id', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'Product/GetById', this.parameters)
          .toPromise()
          .then(c => {
            this.product = c;
            this.formatedSalePrice = this.commonService.currencyFormatterBRL(this.product.precoVenda);
            this.formatedCostPrice = this.commonService.currencyFormatterBRL(this.product.precoCusto);
            this.product.productTypeEnum = this.commonService.ReturnEnumObjectByName('productTypeEnum', this.product.productTypeEnum);
            this.isProductChange();
            this.calcularPercentualMargemLucro();
            this.loaderService.SetLoaderState(false);
          })
          .catch(e => {
            this.loaderService.SetLoaderState(false);
            this.commonService.ReturnModalMessagErrorSuccess('Houve um erro buscar o produto.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar produto';
        this.titleButton = this.title.split(' ')[0] === 'Cadastrar' ? 'Salvar' : '';
        this.product.ativo = true;
        this.loaderService.SetLoaderState(false);
      }
    });
  }

  // PUBLIC METHOD
  incluir() {

    // TODO: REMOVER ESTA IMAGEM MOCADA
    this.product.image = 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg';

    if (!this.productValidator(this.product)) return this.commonService.ReturnModalMessagErrorSuccess('Houve um erro na validacao do produto, verifique os campos e tente novamente', false);

    // this.product.productTypeEnum = Number(this.product.productTypeEnum);
    this.product.productTypeEnum = this.commonService.ReturnValueMyEnumDescription('productTypeEnum', this.product.productTypeEnum);

    // SET THE STAND VALUE OF KINDA SERVICE
    if(this.product.productTypeEnum === ProductTypeEnum.Servico) {
      this.product.quantidade = 0;
      this.product.length = 0;
      this.product.weight = 0;
      this.product.width = 0;
      this.product.height = 0;
    }

    if (this.isNew) {
      this.product.usuarioInclusaoId = new SystemParameterEnum().systemUser;
      this.product.dataInclusao = new Date();

      this.service.insert('cadastros_url', 'product', this.product)
        .toPromise()
        .then(c => {
          this.loaderService.SetLoaderState(false);
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Produto incluido com sucesso.', true);
        })
        .catch(e => {
          this.loaderService.SetLoaderState(false);
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.product.usuarioUltimaAlteracaoId = new SystemParameterEnum().systemUser;
      this.product.dataUltimaAlteracao = new Date();
      this.service.edit('cadastros_url', 'product', this.product)
        .toPromise()
        .then(c => {
          this.loaderService.SetLoaderState(false);
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Produto editado com sucesso.', true);
        })
        .catch(e => {
          this.loaderService.SetLoaderState(false);
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    }
  }

  public navigateToBack() {
    this.commonService.NavigateOnly(this.rotaAnterior);
  }

  public calcularPercentualMargemLucro(): void {
    if (this.product.precoCusto < 0 || this.product.precoVenda < 0) {
        throw new Error("Os preços não podem ser negativos.");
    }

    let margemLucro = this.product.precoVenda - this.product.precoCusto;

    let percentualMargemLucro = (margemLucro / this.product.precoCusto) * 100;

    this.profitMargin = percentualMargemLucro;
  }

  /*
  It first checks whether the cost price or profit margin is negative.
  If so, it throws an error. Otherwise, calculate the sales price by adding to the cost price the value of the percentage profit margin applied to the cost price
  */
  public calcularPrecoVenda(): void {
    if (this.product.precoCusto < 0 || this.profitMargin < 0) {
        throw new Error("O preço de custo e a margem de lucro não podem ser negativos.");
    }

    this.product.precoVenda = this.product.precoCusto + (this.product.precoCusto * this.profitMargin / 100);
    this.formatedSalePrice = this.commonService.currencyFormatterBRL(this.product.precoVenda);
  }

  public isProductChange() {
    try {
      if (!this.commonService.isNullOrUndefined(this.product.productTypeEnum)) {
        if (Number(this.product.productTypeEnum) === ProductTypeEnum.Produto || this.product.productTypeEnum.toString().toLocaleLowerCase() == "produto") {
          this.isInputBlocked = false;
          this.isProduct = true;
        }
        else {
          this.isInputBlocked = false;
          this.isProduct = false;
        }
      }
      else
      {
        this.isInputBlocked = true;
      }
    }
    catch {
      this.isInputBlocked = true;
      this.isProduct = false;
    }
  }

  /**
   * 
   * @param value 
   * @param isSalePrice 
   * @returns RETURNS THE VALUE PARAMETER FORMATED TO BRAZIL CURRENCY: R$ XXX,XX
   */
  public formatter(value, isSalePrice?: boolean): string {
    try {
      value = this.cleanCurrenceRealBRValue(value);
      if(isSalePrice){
        this.formatedSalePrice = this.commonService.currencyFormatterBRL(value);
        this.product.precoVenda = Number(this.cleanCurrenceRealBRValue(this.formatedSalePrice));
        return this.formatedSalePrice;
      } else if (!isSalePrice) {
        this.formatedCostPrice = this.commonService.currencyFormatterBRL(value);
        this.product.precoCusto = Number(this.cleanCurrenceRealBRValue(this.formatedCostPrice));
        return this.formatedCostPrice;
      } else {
        return this.commonService.currencyFormatterBRL(Number(this.cleanCurrenceRealBRValue(value)));
      }
    }
    catch {
      return "R$ 0,00";
    }
  }
  // PUBLIC METHOD


  // PRIVATE METHOD
  private initializeComponent(): void {
    this.product = new Produto();
    this.isNew = true;
    this.rotaAnterior = './produto/produto';
    this.parameters = [];
    this.title = '';
    this.isProduct = true;
    this.product.productTypeEnum = undefined;
    this.profitMargin = 0;
    this.isInputBlocked = true;
    this.formatedSalePrice = "R$ 0,00";
    this.formatedCostPrice = "R$ 0,00";

    // Starts the product object attribute
    this.product.isIlimitado = false;
    this.product.ativo = true;
    this.product.bloqueado = false;
    this.product.identifier = null;

    this.calcularPercentualMargemLucro();
  }

  private productValidator(product: Produto): boolean {
    // PRODUCT COMMON AREA VALIDATOR
    if(this.commonService.isNullOrUndefined(product.image))
      throw this.commonService.responseActionWithoutNavigation("error", "A imagem e obrigatória.");

    if(this.commonService.isNullOrUndefined(product.productTypeEnum))
      throw this.commonService.responseActionWithoutNavigation("error", "O tipo deve ser informado.");

    if(this.commonService.isNullOrUndefined(product.precoVenda))
      throw this.commonService.responseActionWithoutNavigation("error", "O preço de venda e obrigatório.");

    if(product.precoCusto > product.precoVenda)
      throw this.commonService.responseActionWithoutNavigation("error", "O preço de venda não pode ser menor que o preço de custo.");

    if(this.commonService.isNullOrUndefined(product.detalhes))
      throw this.commonService.responseActionWithoutNavigation("error", "O campo de detalhes e obrigatório.");

    if(product.productTypeEnum === ProductTypeEnum.Produto) {
      if (product.quantidade < 1)
        throw this.commonService.responseActionWithoutNavigation("error", "A quantidade do produto e obrigatória.");

      if (product.height < 1)
        throw this.commonService.responseActionWithoutNavigation("error", "A altura do produto e obrigatória.");

      if (product.weight < 1)
        throw this.commonService.responseActionWithoutNavigation("error", "O peso do produto e obrigatório.");

      if (product.width < 1)
        throw this.commonService.responseActionWithoutNavigation("error", "A largura do produto e obrigatória.");

      if (product.length < 1)
        throw this.commonService.responseActionWithoutNavigation("error", "O Comprimento do produto e obrigatória.");
    }

    return true;
  }

  private cleanCurrenceRealBRValue(value: string) {
    do {
      value = value.replace(" ", "").replace("R$", "").replace(",", ".");
    }
    while(value.includes(" ") || value.includes("R$") || value.includes(","))

    return value;
  }
  // PRIVATE METHOD
}
