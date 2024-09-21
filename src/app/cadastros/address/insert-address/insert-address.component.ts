import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { SystemParameterEnum } from 'src/app/Enums/system-parameters.enum';
import { AddressTypeMapping } from 'src/app/Enums/address-type.enum';
import { AuthService } from 'src/app/services/auth.service';
import { SelectAddressParameter } from 'src/app/models/select-address-parameter';

@Component({
  selector: 'app-insert-address',
  templateUrl: './insert-address.component.html',
  styleUrls: ['./insert-address.component.scss']
})
export class InsertAddressComponent implements OnInit {

  public model: Address;
  public isNew: boolean;
  public title: string;
  public titleButton: string;
  public parameters: QueryParameter[];
  private rotaAnterior: string;
  public usersSelect: SelectAddressParameter[] = [];
  public userIdAdressEdit: string;
  public isAdminUser: boolean;

  public addressTypes = Object.values(AddressTypeMapping).filter(c => typeof (c) == 'string');

  public constructor(
    private service: HttpCommonService,
    private router: ActivatedRoute,
    private commonService: CommonService,
    private auth: AuthService
  ) { }

  public ngOnInit(): void {
    // TODO: PEGAR USUARIOS ID
    this.initializeComponent();
    this.router.paramMap.subscribe((params) => {
      // EDIT ADDRESS AREA
      if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
        this.isNew = false;
        this.title = 'Editar endereço';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          { parameter: 'addressId', value: params.get('id') }
        ];
        this.service.getSingle('cadastros_url', 'address/getbyid', this.parameters)
          .toPromise()
          .then(c => {
            this.model = c;
            this.LoadUsersToSelect();
            this.model.addressTypeEnum = this.commonService.ReturnEnumObjectByName('addressTypeEnum', this.model.addressTypeEnum);
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o addres.', false);
          });
      }
      // EDIT USER ADRESS AREA
      else if (!this.commonService.isNullOrUndefined(params.get('userId')) && params.get('userId') !== '') {
        this.userIdAdressEdit = this.auth.getUser().identifier;
        this.isNew = false;
        this.title = 'Editar endereço';
        this.titleButton = this.title.split(' ')[0];
        this.parameters = [
          { parameter: 'userId', value: this.userIdAdressEdit }
        ];
        this.service.getSingle('cadastros_url', 'address/paginated', this.parameters)
          .toPromise()
          .then(c => {
            if (c.length > 0) {
              this.model = c[0];
              this.model.addressTypeEnum = this.commonService.ReturnEnumObjectByName('addressTypeEnum', this.model.addressTypeEnum);
            } else {
              throw new Error();
            }
          })
          .catch(e => {
            this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o addres.', false);
          });
      }
      else {
        this.isNew = true;
        this.title = 'Cadastrar endereço';
        this.titleButton = this.title.split(' ')[0] === 'Cadastrar' ? 'Salvar' : '';
        this.model.ativo = true;
        this.LoadUsersToSelect();
      }
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.model = new Address();
    this.isNew = false;
    this.rotaAnterior = './cadastros/address';
    this.parameters = [];
    this.title = '';
  }

  private destroyComponent(): void {
    this.model = null;
    this.isNew = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.title = null;
    this.isAdminUser = false;
  }

  public async incluir() {
    this.model.addressTypeEnum = this.commonService.ReturnValueMyEnumDescription('addressTypeEnum', this.model.addressTypeEnum);
    if (this.isNew) {
      this.model.dataInclusao = new Date();
      this.model.usuarioUltimaAlteracaoId = new SystemParameterEnum().systemUser;
      this.service.insert('cadastros_url', 'address', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Item incluido com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    } else {
      this.model.usuarioUltimaAlteracaoId = this.userIdAdressEdit;
      this.model.dataUltimaAlteracao = new Date();
      this.service.edit('cadastros_url', 'address', this.model)
        .toPromise()
        .then(c => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Item editado com sucesso.', true);
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
        });
    }
  }

  public navigateToBack() {
    this.commonService.NavigateOnly(this.rotaAnterior);
  }

  private LoadUsersToSelect() {

    this.usersSelect = [
      { Key: this.auth.getUser().identifier, Parameter: this.auth.getUser().nome, isUserAddress: true }
    ];

    // if(this.auth.isAdminUser()) {
    //   this.service.getAllNew('security_url', 'user/returnuserstoselect', this.parameters)
    //   .toPromise()
    //   .then(c => {
    //     this.usersSelect = [];
    //     if (c.isSuccess) {
    //       this.usersSelect = c.jsonObject;
    //       this.usersSelect.forEach(x => {
    //         if(x.Key === this.auth.getUser().identifier)
    //         {
    //           x.isUserAddress = true;
    //         }
    //       })
    //     } else {
    //       throw Error("Erro ao buscar informações do usuário");
    //     }
    //   })
    //   .catch(e => {
    //     this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o usuário.', false);
    //   })
    // }
    // else
    // {
    //   this.usersSelect = [
    //     { Key: this.auth.getUser().identifier, Parameter: this.auth.getUser().nome, isUserAddress: true }
    //   ];
    // }
  }
}
