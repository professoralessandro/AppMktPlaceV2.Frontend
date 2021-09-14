import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposConfiguracoes } from '../tipos-configuracoes';

@Component({
  selector: 'app-cadastros-tipos-configuracoes',
  templateUrl: './cadastros-tipos-configuracoes.component.html',
  styleUrls: ['./cadastros-tipos-configuracoes.component.scss']
})
export class CadastrosTiposConfiguracoesComponent implements OnInit, OnDestroy {
  public model: TiposConfiguracoes;
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
        this.title = 'Editar tipos de configurações';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          {parameter: 'id', value: Number(params.get('id'))}
        ];
        this.service.getAll('cadastros_url', 'TiposConfiguracoes', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c[0];
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de configuração.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar tipos de configuração';
        this.titleButton = this.title.split(' ')[0] === 'Cadastrar' ? 'Salvar' : '';
        this.model.ativo = true;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.model = new TiposConfiguracoes();
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
      this.model.usuarioInclusaoId = 1;
      this.model.usuarioUltimaAlteracaoId = 1;
      this.model.dataInclusao = new Date();
      this.model.dataUltimaAlteracao = new Date();
      this.service.insert('cadastros_url', 'TiposConfiguracoes', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Tipo de configuração incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.service.edit('cadastros_url', 'TiposConfiguracoes', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Tipo de configuração editado com sucesso.', true);
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
