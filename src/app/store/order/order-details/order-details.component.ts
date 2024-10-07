import { Component, OnInit } from '@angular/core';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { Purchase } from '../../purchase';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { LoaderService } from 'src/app/components/loader/loader.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public imgError: string;

  // PURCHASE
  public purchase: Purchase;

  constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService,
    private loaderService: LoaderService,
  ) { }

  public ngOnInit(): void {
    this.loaderService.SetLoaderState(true);
    this.initializeComponent();
    debugger;
    this.router.paramMap.subscribe((params) => {
      debugger;
      if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
        this.parameters = [
          { parameter: 'purchaseId', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'purchase/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            debugger;
            this.purchase = c;
            this.purchase.purchaseImage = './assets/img/user.jpg';
            debugger;
            this.loaderService.SetLoaderState(false);
          })
          .catch(e => {
            debugger;
            this.loaderService.SetLoaderState(false);
            this.commonService.responseActionWithoutNavigation('error', 'Houve um erro buscar a compra.');
          });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  public handleMissingImage() {
    return this.imgError;
  }

  public cancelPurchase(product?)
  {
    debugger;
  }

  public postTrackingCode(product?)
  {
    debugger;
  }

  private initializeComponent(): void {

    this.title = 'Detalhes da compra';
    this.rotaAnterior = './store/order';
    this.parameters = [];
    this.purchase = new Purchase();
    this.imgError = './assets/img/user.jpg';
  }

  private destroyComponent(): void {
    this.title = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.purchase = null;
  }

  public cancelar(): void {
    this.service.delete('cadastros_url', 'purchase', this.purchase.identifier)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.rotaAnterior, `Item<br>${this.purchase.purchaseCode}<br>Cancelada com sucesso com sucesso.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
      });
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'purchase', this.purchase.identifier)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.rotaAnterior, `Item<br>${this.purchase.purchaseCode}<br>Deletada com sucesso com sucesso.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
      });
  }
}
