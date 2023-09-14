import { Component, OnInit } from '@angular/core';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters.enum';
import { Block } from '../block';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { TipoBloqueioEnum, TipoBloqueioMapping } from 'src/app/Enums/tipo-bloqueio.enum';

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
  public itensToBlock: string[] = [];

  public blockTypes = Object.values(TipoBloqueioMapping).filter(c => typeof(c) == 'string');
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
          {parameter: 'blockId', value: params.get('id')}
        ];
        this.service.getSingle('cadastros_url', 'Block/GetById', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c;
            this.model.blockTypeEnum = this.commonService.ReturnEnumObjectByName('tipobloqueioenum' ,this.model.blockTypeEnum);
            debugger;
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
    debugger;
    var item = this.commonService.ReturnValueMyEnumDescription('tipobloqueioenum', this.model.blockTypeEnum);
    debugger;

    if (item === 0) {
      this.parameters = [
        {parameter: 'BlockTypeEnum', value: item}
      ];
      
      this.service.getAll('cadastros_url', 'block/getitemtoblockbytype', this.parameters)
            .toPromise()
            .then(c => {
              debugger;
              this.itensToBlock = [];
              c.forEach(element => {
                debugger;
                this.itensToBlock.push(element.ItemId);
              });
              // this.model.blockTypeEnum = this.commonService.ReturnEnumObjectByName('tipobloqueioenum' ,this.model.blockTypeEnum);
              debugger;
            })
            .catch(e => {
              this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o grupo.', false);
            });
    }
    
  }
}
