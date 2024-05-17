import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTypeEnum } from 'src/app/Enums/product-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';

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
  private parameters: QueryParameter[];
  public pageNumber: number;
  public rowspPage: number;
  public param: string;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private commonService: CommonService,
    private loaderService: LoaderService,
    private service: HttpCommonService
  ) { }

  /**
   * PUBLIC METHOD
   */
  public ngOnInit(): void {
    debugger;
    this.loaderService.SetLoaderState(true);
    this.initializeAtributtes();
    this.searchForProduct(this.param, this.pageNumber, this.rowspPage);
  }

  public currencyFormatterBRL(value) {
    return this.commonService.currencyFormatterBRL(value);
  }

  public search() {
    debugger;
    this.searchForProduct(this.param, this.pageNumber, this.rowspPage);
    debugger;
  }

  public loadMoreProducts() {
    debugger;
    this.pageNumber = (this.pageNumber + 1);

    this.searchForProduct(this.param, this.pageNumber, this.rowspPage, true);
    debugger;
  }

  /**
   * PRIVATEE METHOD
   */
  private searchForProduct(param, pageNumber, rowspPage, concat?): void {
    debugger;
    this.loaderService.SetLoaderState(true);
    this.parameters = [
      { parameter: 'param', value: param },
      { parameter: 'pageNumber', value: pageNumber },
      { parameter: 'rowspPage', value: rowspPage }
    ];
    debugger;
    this.service.getAll('cadastros_url', 'product/store-paginated', this.parameters)
      .toPromise()
      .then(c => {
        debugger;
        if (concat)
          this.productList = [...this.productList, ...c]
        else
          this.productList = c;

        this.loaderService.SetLoaderState(false);
        debugger;
      })
      .catch(e => {
        debugger;
        const messageType = 'error';
        const messageText = 'Houve um erro ao buscar os produtos.';
        this.commonService.responseActionWithoutNavigation(messageType, messageText);
        this.loaderService.SetLoaderState(false);
      });
    this.loaderService.SetLoaderState(false);
  }

  private initializeAtributtes() {
    this.title = "List da produtos"
    this.param = null;
    this.pageNumber = 1;
    this.rowspPage = 10;
  }
}
