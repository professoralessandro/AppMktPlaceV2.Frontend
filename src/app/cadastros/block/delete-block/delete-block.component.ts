import { Component, OnInit } from '@angular/core';
import { Block } from '../block';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-delete-block',
  templateUrl: './delete-block.component.html',
  styleUrls: ['./delete-block.component.scss']
})
export class DeleteBlockComponent implements OnInit {
  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public label: string;
  private block: Block;

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
          { parameter: 'blockId', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'block/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            this.block = c;
            this.label = `Tem certerza que deseja deletar o item ${this.block.nomeBloqueio} ?`;
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o block.', false);
          });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.title = 'Deletar block';
    this.label = '';
    this.rotaAnterior = './cadastros/testee';
    this.parameters = [];
    this.block = new Block();
  }

  private destroyComponent(): void {
    this.title = null;
    this.label = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.block = null;
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'block', this.block.identifier)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.rotaAnterior, `Item<br>${this.block.nomeBloqueio}<br>Deletado com sucesso.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
      });
  }
}
