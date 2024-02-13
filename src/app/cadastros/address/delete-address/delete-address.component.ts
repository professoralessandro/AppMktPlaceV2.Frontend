import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-delete-address',
  templateUrl: './delete-address.component.html',
  styleUrls: ['./delete-address.component.scss']
})
export class DeleteAddressComponent implements OnInit {
  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public label: string;
  private address: Address;

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
          { parameter: 'addressId', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'address/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            this.address = c;
            this.label = `Tem certerza que deseja deletar o item ${this.address.logradouro} ?`;
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o address.', false);
          });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.title = 'Deletar address';
    this.label = '';
    this.rotaAnterior = './cadastros/test';
    this.parameters = [];
    this.address = new Address();
  }

  private destroyComponent(): void {
    this.title = null;
    this.label = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.address = null;
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'address', this.address.identifier)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.rotaAnterior, `Item<br>${this.address.logradouro}<br>Deletado com sucesso.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
      });
  }
}
