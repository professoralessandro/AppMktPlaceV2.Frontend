import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposParametros } from '../tipos-parametros';

@Component({
  selector: 'app-cadastrar-tipo-parametro',
  templateUrl: './cadastrar-tipo-parametro.component.html',
  styleUrls: ['./cadastrar-tipo-parametro.component.scss']
})
export class CadastrarTipoParametroComponent implements OnInit {
  public get router(): ActivatedRoute {
    return this._router;
  }
  public set router(value: ActivatedRoute) {
    this._router = value;
  }
  public model: TiposParametros;
  public isNew: boolean;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private rotaAnterior: string;

  public constructor(
    private service: HttpCommonService,
    private _router: ActivatedRoute,
    private commonService: CommonService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
    this.router.paramMap.subscribe((params) => {
      if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
        this.isNew = false;
        this.title = 'Editar tipos de parametros';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          {parameter: 'id', value: Number(params.get('id'))}
        ];
        this.service.getSingle('cadastros_url', 'TiposParametros', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c;
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de parametro.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar tipos de parametros';
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
    this.model = new TiposParametros();
    this.isNew = false;
    this.rotaAnterior = './cadastros/tiposparametros';
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
      this.service.insert('cadastros_url', 'TiposParametros', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Tipo de parametro incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.service.edit('cadastros_url', 'TiposParametros', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Tipo de parametro editado com sucesso.', true);
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
