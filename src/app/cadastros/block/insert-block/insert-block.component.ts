import { Component, OnInit } from '@angular/core';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters.enum';
import { Block } from '../block';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { TipoBloqueioMapping } from 'src/app/Enums/tipo-bloqueio.enum';
import { SelectParameter } from 'src/app/models/select-parameter';

@Component({
  selector: 'app-insert-block',
  templateUrl: './insert-block.component.html',
  styleUrls: ['./insert-block.component.scss']
})
export class InsertBlockComponent implements OnInit {
  public model: Block;
  public isNew: boolean;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private rotaAnterior: string;
  public itensToBlock: SelectParameter[] = [];
  public itemToBlockId: string;

  public blockTypes = Object.values(TipoBloqueioMapping).filter(c => typeof (c) == 'string');
  public blockTypesString: string[] = [];

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
        this.title = 'Editar bloqueio';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          { parameter: 'blockId', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'Block/GetById', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c;
            this.model.dataInicio = this.model.dataInicio.toString().split("T")[0];
            this.model.dataFim = this.model.dataFim.toString().split("T")[0];
            this.model.blockTypeEnum = this.commonService.ReturnEnumObjectByName('blockTypeEnum', this.model.blockTypeEnum);
            this.LoadItemToBlockOption();
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o grupo.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar bloqueio';
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
    this.model = new Block();
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

    if (this.model.itemBloqueadoId === '00000000-0000-0000-0000-000000000000' || this.commonService.isNullOrUndefined(this.model.itemBloqueadoId)) {
      this.commonService.ReturnModalMessagErrorSuccess('Item para ser bloqueado e invalido.', false);
      return;
    }
    this.model.blockTypeEnum = this.commonService.ReturnValueMyEnumDescription('blockTypeEnum', this.model.blockTypeEnum);
    if (this.isNew) {
      this.model.usuarioInclusaoId = new SystemParameterEnum().systemUser;
      this.model.dataInclusao = new Date();
      this.service.insert('cadastros_url', 'block', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Grupo incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.model.usuarioUltimaAlteracaoId = new SystemParameterEnum().systemUser;
      this.model.dataUltimaAlteracao = new Date();

      this.service.edit('cadastros_url', 'block', this.model)
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

  public onChange() {
    this.LoadItemToBlockOption();
  }

  private LoadItemToBlockOption() {
    var item = this.commonService.ReturnValueMyEnumDescription('blockTypeEnum', this.model.blockTypeEnum);

    this.parameters = [
      { parameter: 'BlockTypeEnum', value: item }
    ];

    this.service.getAll('cadastros_url', 'block/getitemtoblockbytype', this.parameters)
      .toPromise()
      .then(c => {
        this.itensToBlock = [];
        if (c.length > 0) {
          this.itensToBlock = c;
        } else {
          this.itensToBlock = [
            { parameter: '00000000-0000-0000-0000-000000000000', value: 'Item Desconhecido' }
          ];
        }
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o grupo.', false);
      })
  }
}
