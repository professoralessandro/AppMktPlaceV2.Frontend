import { Component, OnInit } from '@angular/core';
import { Groups } from '../groups';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-delete-groups',
  templateUrl: './delete-groups.component.html',
  styleUrls: ['./delete-groups.component.scss']
})
export class DeleteGroupsComponent implements OnInit {
  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public label: string;
  private grupo: Groups;

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
          { parameter: 'groupId', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'Group/GetById', this.parameters)
          .toPromise()
          .then(c => {
            this.grupo = c;
            this.label = `Tem certerza que deseja deletar o item ${this.grupo.groupName} ?`;
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o grupo.', false);
          });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.title = 'Deletar grupo';
    this.label = '';
    this.rotaAnterior = './cadastros/test';
    this.parameters = [];
    this.grupo = new Groups();
  }

  private destroyComponent(): void {
    this.title = null;
    this.label = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.grupo = null;
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'Group', this.grupo.identifier)
      .toPromise()
      .then(c => {
        this.commonService.responseActionWithNavigation
          (this.rotaAnterior, `Grupo<br>${this.grupo.groupName}<br>Deletado com sucesso.`, true);
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
      });
  }
}
