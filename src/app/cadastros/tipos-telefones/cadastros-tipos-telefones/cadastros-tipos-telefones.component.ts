import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposTelefones } from '../tipos-telefones';

@Component({
  selector: 'app-cadastros-tipos-telefones',
  templateUrl: './cadastros-tipos-telefones.component.html',
  styleUrls: ['./cadastros-tipos-telefones.component.scss']
})
export class CadastrosTiposTelefonesComponent implements OnInit {
  public model: TiposTelefones;
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
        this.title = 'Editar tipos de telefones';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          {parameter: 'id', value: Number(params.get('id'))}
        ];
        this.service.getAll('cadastros_url', 'TiposTelefones', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c[0];
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de telefone.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar tipos de telefones';
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
    this.model = new TiposTelefones();
    this.isNew = false;
    this.rotaAnterior = './cadastros/tipostelefones';
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
      this.service.insert('cadastros_url', 'TiposTelefones', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Tipo de telefone incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.service.edit('cadastros_url', 'TiposTelefones', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Tipo de telefone editado com sucesso.', true);
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
