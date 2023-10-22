import { Component, OnInit } from '@angular/core';
import { QueryParameter } from 'src/app/models/query-parameter';
import { Delivery } from '../delivery';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-delete-delivery',
  templateUrl: './delete-delivery.component.html',
  styleUrls: ['./delete-delivery.component.scss']
})
export class DeleteDeliveryComponent implements OnInit {
  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public label: string;
  private delivery: Delivery;

  constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
    this.router.paramMap.subscribe((params) => {
      if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
        this.parameters = [
          { parameter: 'id', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'delivery/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            this.delivery = c;
            this.label = `Tem certerza que deseja deletar o item ${this.delivery.nomeRecebedor} ?`;
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o delivery.', false);
          });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.title = 'Deletar delivery';
    this.label = '';
    this.rotaAnterior = './cadastros/test';
    this.parameters = [];
    this.delivery = new Delivery();
  }

  private destroyComponent(): void {
    this.title = null;
    this.label = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.delivery = null;
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'delivery', this.delivery.identifier)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.rotaAnterior, `Item<br>${this.delivery.nomeRecebedor}<br>Deletado com sucesso.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
      });
  }
}
