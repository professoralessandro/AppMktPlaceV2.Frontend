import { Component, OnInit } from '@angular/core';
import { AddressTypeMapping } from 'src/app/Enums/address-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { CommonService } from 'src/app/services/common.service';
import { GridCommonService } from 'src/app/services/grid-common-service';
import { projectUrls } from 'src/environments/endpoints-environment';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  public title = 'Busca por endereço';
  public gridTitle = 'Endereço';
  public model = 'Address';
  public id: string;
  public usuario: string;
  public addressTypeEnum: string;
  public logradouro: string;
  public isPrincipal: boolean;
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

  public addressTypeDescription = Object.values(AddressTypeMapping).filter(c => typeof(c) == 'string');

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

    this.gridTitle = 'Endereço';
    this.title = 'Endereços';
    this.gridTitles = ['Usuario', 'Tipo de endereço', 'Logradouro', 'Ativo'];
    this.gridElements = ['usuario', 'addressTypeEnum', 'logradouro', 'ativo'];
    this.apiUrl = 'cadastros_url';
    this.endpointUrl = projectUrls.GetAllAddressPaginated;
    this.registerUrl = projectUrls.RegisterGroupUrl;
    this.deleteUrl = projectUrls.DeleteGroupUrl;
    //QUERY PARAMETERS
    this.parameters = [
      {parameter: 'id', value: this.id},
      {parameter: 'usuario', value: this.usuario},
      {parameter: 'addressTypeEnum', value: this.addressTypeEnum},
      {parameter: 'logradouro', value: this.logradouro},
      {parameter: 'isPrincipal', value: this.isPrincipal},
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
    this.pageNumber = 1;
    this.rownpPage = 10;
    this.parameters = [
      {parameter: 'id', value: this.id},
      {parameter: 'usuario', value: this.usuario},
      {parameter: 'addressTypeEnum', value: this.commonService.isNullOrUndefined(this.addressTypeEnum) ? undefined : this.commonService.ReturnValueMyEnumDescription('addressTypeEnum', this.addressTypeEnum)},
      {parameter: 'logradouro', value: this.logradouro},
      {parameter: 'isPrincipal', value: this.isPrincipal},
      {parameter: 'ativo', value: this.ativo},
      {parameter: 'pageNumber', value: this.pageNumber},
      {parameter: 'rowspPage', value: this.rownpPage}
    ];

    // SETAR VALORES DO GRID
    this.gridService.setSetParameters(this.parameters, true);
  }
}
