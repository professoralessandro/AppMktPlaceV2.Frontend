import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { GridCommonService } from 'src/app/services/grid-common-service';
import { projectUrls } from 'src/environments/endpoints-environment';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  public title = 'Entregas';
  public gridTitle = 'Delivery';
  public model = 'Delivery';
  public id: string;
  public responsavelEntrega: string;
  public destinatario: string;
  public nmrDocumento: string;
  public nomeRecebedor: string;
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
    private gridService: GridCommonService
    ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {

    this.loaderService.SetLoaderState(true);

    this.gridTitle = 'Entregas';
    this.title = 'Entregas';
    this.gridTitles = ['Entregador', 'Destinatario', 'Tipo de entrega', 'Data Prevista', 'Data efetiva', 'Ativo'];
    this.gridElements = ['deliverymanDescription', 'receiverDescription', 'deliveryTypeEnum', 'dataPrevistaEntrega', 'dataEfetivaEnrega', 'ativo'];
    this.apiUrl = 'cadastros_url';
    this.endpointUrl = projectUrls.GetAllDeliveryPaginated;
    this.registerUrl = projectUrls.RegisterGroupUrl;
    this.deleteUrl = projectUrls.DeleteGroupUrl;
    //QUERY PARAMETERS
    this.parameters = [
      {parameter: 'id', value: this.id},
      {parameter: 'responsavelEntrega', value: this.responsavelEntrega},
      {parameter: 'destinatario', value: this.destinatario},
      {parameter: 'nmrDocumento', value: this.nmrDocumento},
      {parameter: 'nomeRecebedor', value: this.nomeRecebedor},
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
      {parameter: 'responsavelEntrega', value: this.responsavelEntrega},
      {parameter: 'destinatario', value: this.destinatario},
      {parameter: 'nmrDocumento', value: this.nmrDocumento},
      {parameter: 'nomeRecebedor', value: this.nomeRecebedor},
      {parameter: 'ativo', value: this.ativo},
      {parameter: 'pageNumber', value: this.pageNumber},
      {parameter: 'rowspPage', value: this.rownpPage}
    ];

    // SETAR VALORES DO GRID
    this.gridService.setSetParameters(this.parameters, true);
  }
}
