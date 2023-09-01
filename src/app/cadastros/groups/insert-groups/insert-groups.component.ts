import { Component, OnInit } from '@angular/core';
import { Groups } from '../groups';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters-enum';

@Component({
  selector: 'app-insert-groups',
  templateUrl: './insert-groups.component.html',
  styleUrls: ['./insert-groups.component.scss']
})
export class InsertGroupsComponent implements OnInit {
  public model: Groups;
  public isNew: boolean;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private rotaAnterior: string;

  public constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
    this.router.paramMap.subscribe((params) => {
      if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
        this.isNew = false;
        this.title = 'Editar grupos';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          {parameter: 'groupId', value: params.get('id')}
        ];
        this.service.getAll('cadastros_url', 'Group/GetById', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c;
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o grupo.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar grupos';
        this.titleButton = this.title.split(' ')[0] === 'Cadastrar' ? 'Salvar' : '';
        this.model.ativo = true;
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.model = new Groups();
    this.isNew = false;
    this.rotaAnterior = './cadastros/teste';
    this.parameters = [];
    this.title = '';
  }

  private destroyComponent(): void {
    this.model = null;
    this.isNew = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.title = null;
  }

  public async incluir() {
    if (this.isNew) {
      this.model.usuarioInclusaoId = new SystemParameterEnum().systemUser;
      // this.model.usuarioUltimaAlteracaoId = new SystemParameterEnum().systemUser;
      this.model.dataInclusao = new Date();
      // this.model.dataUltimaAlteracao = new Date();
      this.service.insert('cadastros_url', 'group', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Grupo incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      // this.model.usuarioInclusaoId = new SystemParameterEnum().systemUser;
      this.model.usuarioUltimaAlteracaoId = new SystemParameterEnum().systemUser;
      // this.model.dataInclusao = new Date();
      this.model.dataUltimaAlteracao = new Date();
      this.service.edit('cadastros_url', 'group', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Grupo editado com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    }
  }

  public navigateToBack() {
    this.commonService.NavigateOnly(this.rotaAnterior);
  }

}
