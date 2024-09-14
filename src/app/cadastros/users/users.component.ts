import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { CommonService } from 'src/app/services/common.service';
import { GridCommonService } from 'src/app/services/grid-common-service';
import { projectUrls } from 'src/environments/endpoints-environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public title = 'Usuários';
  public gridTitle = 'Usuarios';
  public model = 'Groups';
  public id: string;
  public nome: string;
  public nmrDocumento: string;
  public email: string;
  public ativo: boolean;
  public parameters: QueryParameter[];
  public pageNumber: number = 1;
  public rownpPage: number = 10;
  public gridTitles: string[];
  public gridElements: string[];
  public apiUrl: string;
  public endpointUrl: string;
  public registerUrl: string;
  public deleteUrl: string;

  constructor(
    private loaderService: LoaderService,
    private gridService: GridCommonService,
    private commonService: CommonService
    ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {

    this.loaderService.SetLoaderState(true);

    this.gridTitle = 'Usuarios';
    this.title = 'Usuários';
    this.gridTitles = ['Nome', 'Nome de usuario', 'Email', 'Ativo'];
    this.gridElements = ['nome', 'userName', 'email', 'ativo'];
    this.apiUrl = 'cadastros_url';
    this.endpointUrl = projectUrls.GetAllUsersPaginated;
    this.registerUrl = projectUrls.RegisterUserUrl;
    this.deleteUrl = projectUrls.DeleteUserUrl;

    //QUERY PARAMETERS
    this.parameters = [
      {parameter: 'id', value: this.id},
      {parameter: 'nome', value: this.nome},
      {parameter: 'nmrDocumento', value: this.nmrDocumento},
      {parameter: 'email', value: this.email},
      {parameter: 'ativo', value: this.ativo},
      {parameter: 'pageNumber', value: this.pageNumber},
      {parameter: 'rowspPage', value: this.rownpPage}
    ];

    // SETAR VALORES DO GRID
    this.gridService.setGridServiceValues(this.model, this.gridTitles, this.gridElements, this.apiUrl, this.endpointUrl, this.parameters, this.registerUrl, this.deleteUrl, true);
  }

  private destroyComponent(): void {
    this.loaderService.SetLoaderState(false);
    this.model = null;
    this.gridTitle = null;
    this.title = null;
  }

  public search() {
    //QUERY PARAMETERS
    this.parameters = [
      {parameter: 'id', value: this.commonService.isNullOrUndefined(this.id) ? null : this.id },
      {parameter: 'nome', value: this.commonService.isNullOrUndefined(this.nome) ? null : this.nome},
      {parameter: 'nmrDocumento', value: this.commonService.isNullOrUndefined(this.nmrDocumento) ? null : this.nmrDocumento},
      {parameter: 'email', value: this.commonService.isNullOrUndefined(this.email) ? null : this.email},
      {parameter: 'ativo', value: this.commonService.isNullOrUndefined(this.ativo) ? null : this.ativo},
      {parameter: 'pageNumber', value: this.pageNumber},
      {parameter: 'rowspPage', value: this.rownpPage}
    ];
    // SETAR VALORES DO GRID
    this.gridService.setSetParameters(this.parameters, true);
  }

}
