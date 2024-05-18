import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
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

  public post: any = [];
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
    this.loaderService.SetLoaderState(true);
    this.initializeAtributtes();
    this.searchForProduct(this.param, this.pageNumber, this.rowspPage);

    for (let i=1; i <= 100; i++) {
      this.post.push(i);
    }
  }

  public currencyFormatterBRL(value) {
    return this.commonService.currencyFormatterBRL(value);
  }

  public search() {
    this.pageNumber = 1;
    this.searchForProduct(this.param, this.pageNumber, this.rowspPage);
  }

  public loadMoreProducts() {
    this.pageNumber = (this.pageNumber + 1);

    this.searchForProduct(this.param, this.pageNumber, this.rowspPage, true);
  }

  /**
   * PRIVATEE METHOD
   */
  private searchForProduct(param, pageNumber, rowspPage, concat?): void {
    this.loaderService.SetLoaderState(true);
    this.parameters = [
      { parameter: 'param', value: param },
      { parameter: 'pageNumber', value: pageNumber },
      { parameter: 'rowspPage', value: rowspPage }
    ];

    this.service.getAll('cadastros_url', 'product/store-paginated', this.parameters)
      .toPromise()
      .then(c => {
        if (concat)
          this.productList = [...this.productList, ...c]
        else
          this.productList = c;

        this.loaderService.SetLoaderState(false);
      })
      .catch(e => {
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