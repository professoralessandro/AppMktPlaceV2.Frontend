import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { QueryParameter } from 'src/app/models/query-parameter';
import { SelectParameter } from 'src/app/models/select-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters.enum';
import { ProductTypeEnum } from 'src/app/Enums/product-type.enum';

@Component({
  selector: 'app-insert-produto',
  templateUrl: './insert-produto.component.html',
  styleUrls: ['./insert-produto.component.scss']
})
export class InsertProdutoComponent implements OnInit {

  // Inicializa um objeto vazio para o produto
  public product: Produto;
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

  constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {

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
            this.isProductChange();
            this.calcularPercentualMargemLucro();
          })
          .catch(e => {
            this.commonService.ReturnModalMessagErrorSuccess('Houve um erro buscar o produto.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar produto';
        this.titleButton = this.title.split(' ')[0] === 'Cadastrar' ? 'Salvar' : '';
        this.product.ativo = true;
      }
    });
  }

  // PUBLIC METHOD
  incluir() {
    if (!this.productValidator(this.product)) return this.commonService.ReturnModalMessagErrorSuccess('Houve um erro na validacao do produto, verifique os campos e tente novamente', false);
    this.product.image = 'D:/Pictures/d90029fa-c1fc-4310-9913-4c64b57498c8.jpeg';
    this.product.productTypeEnum = Number(this.product.productTypeEnum);

    if (this.isNew) {
      this.product.usuarioInclusaoId = new SystemParameterEnum().systemUser;
      this.product.dataInclusao = new Date();

      this.service.insert('cadastros_url', 'product', this.product)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Produto incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.product.usuarioUltimaAlteracaoId = new SystemParameterEnum().systemUser;
      this.product.dataUltimaAlteracao = new Date();
      this.service.edit('cadastros_url', 'product', this.product)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Produto editado com sucesso.', true);
        })
        .catch(e => {
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
  }

  public isProductChange() {
    try {
      if (!this.commonService.isNullOrUndefined(this.product.productTypeEnum)) {
        if (Number(this.product.productTypeEnum) === ProductTypeEnum.Produto) {
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
  // PUBLIC METHOD


  // PRIVATE METHOD
  private initializeComponent(): void {
    this.product = new Produto();
    this.isNew = true;
    this.rotaAnterior = './cadastros/test';
    this.parameters = [];
    this.title = '';
    this.isProduct = true;
    this.product.productTypeEnum = undefined;
    this.profitMargin = 0;
    this.isInputBlocked = true;

    // Starts the product object attribute
    this.product.isIlimitado = false;
    this.product.ativo = true;
    this.product.bloqueado = false;

    this.calcularPercentualMargemLucro();
  }

  private productValidator(product: Produto): boolean {
    return true;
  }
  // PRIVATE METHOD
}
