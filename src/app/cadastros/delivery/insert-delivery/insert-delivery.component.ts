import { Component, OnInit } from '@angular/core';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters.enum';
import { Delivery } from '../delivery';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SelectParameter } from 'src/app/models/select-parameter';
import { TipoDocumentoEnum, TipoDocumentoMapping } from 'src/app/Enums/tipo-documento.enum';
import { TipoEntregaEnum, TipoEntregaMapping } from 'src/app/Enums/tipo-entrega.enum';

@Component({
  selector: 'app-insert-delivery',
  templateUrl: './insert-delivery.component.html',
  styleUrls: ['./insert-delivery.component.scss']
})
export class InsertDeliveryComponent implements OnInit {
  public model: Delivery;
  public isNew: boolean;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private rotaAnterior: string;
  public usersSelect: SelectParameter[] = [];

  public documentTypes = Object.values(TipoDocumentoMapping).filter(c => typeof(c) == 'string');
  public deliveryTypes = Object.values(TipoEntregaMapping).filter(c => typeof(c) == 'string');

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
        this.title = 'Editar entregas';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          { parameter: 'id', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'delivery/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c;
            this.model.documentTypeEnum = this.ReturnDocumentTypeDescription(this.model.documentTypeEnum);
            this.model.deliveryTypeEnum = this.ReturnDeliveryTypeDescription(this.model.deliveryTypeEnum);
            if (!this.commonService.isNullOrUndefined(this.model.dataEfetivaEnrega)) {
              this.model.dataEfetivaEnrega = this.model.dataEfetivaEnrega.toString().split("T")[0];
            }
            if (!this.commonService.isNullOrUndefined(this.model.dataPrevistaEntrega)) {
              this.model.dataPrevistaEntrega = this.model.dataPrevistaEntrega.toString().split("T")[0];
            }
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o grupo.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar entregas';
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
    this.model = new Delivery();
    this.isNew = false;
    this.rotaAnterior = './cadastros/test';
    this.parameters = [];
    this.title = '';
    this.service.getAll('cadastros_url', 'user/ReturnUsersToSelect')
      .toPromise()
      .then(users => {
        this.usersSelect = users
      });
  }

  private destroyComponent(): void {
    this.model = null;
    this.isNew = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.title = null;
  }

  public async incluir() {
      this.model.documentTypeEnum = this.ReturnDocumentType(this.model.documentTypeEnum);
      this.model.deliveryTypeEnum = this.ReturnTipoEntrega(this.model.deliveryTypeEnum);
    if (this.isNew) {
      this.model.usuarioInclusaoId = new SystemParameterEnum().systemUser;
      this.model.dataInclusao = new Date();
      this.service.insert('cadastros_url', 'delivery', this.model)
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
      this.service.edit('cadastros_url', 'delivery', this.model)
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

  private ReturnDocumentType(value) : TipoDocumentoEnum {
    if (value === 'RG') {
      return TipoDocumentoEnum.RG;
    }
    else if (value === 'CNPJ') {
      return TipoDocumentoEnum.CNPJ;
    }
    else {
      return TipoDocumentoEnum.CPF;
    }
  }

  private ReturnDocumentTypeDescription(value) : string {
    if (value == TipoDocumentoEnum.RG) {
      return "RG";
    } else if (value == TipoDocumentoEnum.CPF) {
      return "CPF";
    } else if (value == TipoDocumentoEnum.CPF) {
      return "CNPJ";
    }
  }

  private ReturnTipoEntrega(value) : TipoEntregaEnum {
    if (value === 'Retirada em Mãos') {
      return TipoEntregaEnum.EmMaos;
    }
    else if (value === 'Correios') {
      return TipoEntregaEnum.Correios;
    }
    else {
      return TipoEntregaEnum.Terceiro;
    }
  }

  private ReturnDeliveryTypeDescription(value) : string {
    if (value == TipoEntregaEnum.EmMaos) {
      return "Retirada em Mãos";
    } else if (value == TipoEntregaEnum.Correios) {
      return "Correios";
    } else if (value == TipoEntregaEnum.Terceiro) {
      return "Terceiros";
    }
  }
}
