import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { User } from '../user';
import { QueryParameter } from 'src/app/models/query-parameter';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters.enum';
import { TipoDocumentoEnum } from 'src/app/Enums/tipo-documento.enum';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  public model: User;
  public replayPassWord: string;
  public isNew: boolean;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private rotaAnterior: string;
  public sexoOptions: string[];
  public estadoCivilOptions: string[];

  public documentTypes = Object.values(TipoDocumentoEnum).filter(c => typeof(c) == 'string');
  public documentTypesString: string[] = [];

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
        this.title = 'Editar usuários';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          {parameter: 'userId', value: params.get('id')}
        ];
        this.service.getSingle('security_url', 'user/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c;
            this.model.tipoDocumento = this.ReturnDPcumentType(this.model.tipoDocumento);
            this.model.sexo = this.ReturnSexoDescription(this.model.sexo);
            this.model.estadoCivil = this.ReturnEstadoCivilDescription(this.model.estadoCivil);
            this.replayPassWord = this.model.senha;
            this.model.dataNascimento = this.model.dataNascimento.toString().split("T")[0];
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o usuário.', false);
          });
      } else {
        this.isNew = true;
        this.title = 'Cadastrar usuários';
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
    this.model = new User();
    this.replayPassWord = '';
    this.sexoOptions = ['Masculino', 'Feminino', 'Outros'];
    this.estadoCivilOptions = ['Solteiro(a)', 'Casado(a)', 'Outros'];
    this.isNew = false;
    this.rotaAnterior = './cadastros/user';
    this.parameters = [];
    this.title = '';
    this.model.ativo = true;
    this.model.bloqueado = true;
  }

  private destroyComponent(): void {
    this.model = null;
    this.isNew = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.title = null;
  }

  public async incluir() {
    this.model.estadoCivil = this.ReturnEstadoCivil(this.model.estadoCivil);
    this.model.sexo = this.ReturnSexo(this.model.sexo);
    this.model.tipoDocumento = this.ReturnDocumentType(this.model.tipoDocumento);
    if (this.isNew) {
      this.model.usuarioInclusaoId = new SystemParameterEnum().systemUser;
      this.model.dataInclusao = new Date();
      // this.model.dataUltimaAlteracao = new Date();
      this.service.insert('security_url', 'user', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Usuário incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.model.usuarioUltimaAlteracaoId = new SystemParameterEnum().systemUser;
      this.model.dataUltimaAlteracao = new Date();
      this.service.edit('security_url', 'user', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Usuário editado com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    }
  }

  public navigateToBack() {
    this.commonService.NavigateOnly(this.rotaAnterior);
  }

  private ReturnSexo(value: string) : string {
    if (value === 'Masculino') {
      return 'M';
    } else if (value === 'Feminino') {
      return 'F';
    } else {
      return 'O';
    }
  }

  private ReturnEstadoCivil(value: string) : string {
    if (value === 'Solteiro(a)') {
      return 'ST';
    } else if (value === 'Casado(a)') {
      return 'CS';
    } else {
      return 'OT';
    }
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

  private ReturnDPcumentType(value) : string {
    if (value == TipoDocumentoEnum.RG) {
      return "RG";
    } else if (value == TipoDocumentoEnum.CPF) {
      return "CPF";
    } else if (value == TipoDocumentoEnum.CPF) {
      return "CNPJ";
    }
  }

  private ReturnEstadoCivilDescription(value: String): string {
    if (value.toUpperCase() === 'ST') {
      return 'Solteiro(a)';
    } else if (value.toUpperCase() == 'CS') {
      return 'Casado(a)';
    } else {
      return "Outros";
    }
  }

  private ReturnSexoDescription(value: String): string {
    if (value.toUpperCase() === 'F') {
      return 'Feminino';
    } else if (value.toUpperCase() == 'M') {
      return 'Masculino';
    } else {
      return "Outros";
    }
  }
}
