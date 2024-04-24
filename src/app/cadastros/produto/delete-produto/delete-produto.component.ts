import { Component, OnInit } from '@angular/core';
import { QueryParameter } from 'src/app/models/query-parameter';
import { Produto } from '../produto';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-delete-produto',
  templateUrl: './delete-produto.component.html',
  styleUrls: ['./delete-produto.component.scss']
})
export class DeleteProdutoComponent implements OnInit {
  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public label: string;
  private product: Produto;

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
        this.service.getSingle('cadastros_url', 'product/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            this.product = c;
            this.label = `Tem certerza que deseja deletar o item ${this.product.descricao} ?`;
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o product.', false);
          });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.title = 'Deletar produto';
    this.label = '';
    this.rotaAnterior = './cadastros/teste';
    this.parameters = [];
    this.product = new Produto();
  }

  private destroyComponent(): void {
    this.title = null;
    this.label = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.product = null;
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'product', this.product.descricao)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.rotaAnterior, `Item<br>${this.product.descricao}<br>Deletado com sucesso.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
      });
  }
}
