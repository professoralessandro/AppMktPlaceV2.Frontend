import { Component, OnInit } from '@angular/core';
import { ProductTypeMapping } from 'src/app/Enums/product-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { CommonService } from 'src/app/services/common.service';
import { GridCommonService } from 'src/app/services/grid-common-service';
import { projectUrls } from 'src/environments/endpoints-environment';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {
  // MODEL COMPONENT AREA
  public title = 'Busca por Produto';
  public gridTitle = 'Produto';
  public model = 'Produto';
  // MODEL COMPONENT AREA

  // PARAMETERS AREA
  public id: string;
  public tipoProduto: number;
  public descricao: string;
  public marca: string;
  public codigoBarras: string;
  public isBloqueado: boolean;
  public ativo: boolean;
  public parameters: QueryParameter[];
  public pageNumber: number = 1;
  public rownpPage: number = 10;
  // PARAMETER AREA

  // GRID AREA
  public gridTitles: string[];
  public gridElements: string[];
  // GRID AREA

  // URL AREA
  public apiUrl: string;
  public endpointUrl: string;
  public registerUrl: string;
  public deleteUrl: string;
  // URL AREA

  // ENUM AREA
  public ProdutoTypes = Object.values(ProductTypeMapping).filter(c => typeof (c) == 'string');
  public ProdutoType: number;

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

    this.gridTitle = 'Produtos';
    this.title = 'Busca de Produto';
    this.gridTitles = ['Descrição', 'Tipo de produto', 'Marca'];
    this.gridElements = ['descricao', 'productTypeEnum', 'marca'];
    this.apiUrl = 'cadastros_url';
    this.endpointUrl = projectUrls.GetAllProductPaginated;
    this.registerUrl = projectUrls.RegisterGroupUrl;
    this.deleteUrl = projectUrls.DeleteGroupUrl;
    //QUERY PARAMETERS
    this.parameters = [
      { parameter: 'id', value: this.id },
      { parameter: 'tipoProduto', value: this.tipoProduto },
      { parameter: 'descricao', value: this.descricao },
      { parameter: 'marca', value: this.marca },
      { parameter: 'codigoBarras', value: this.codigoBarras },
      { parameter: 'isBloqueado', value: this.isBloqueado },
      { parameter: 'ativo', value: this.ativo },
      { parameter: 'pageNumber', value: this.pageNumber },
      { parameter: 'rowspPage', value: this.rownpPage },
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
    this.LoadGridComponent();
  }

  public LoadGridComponent() {
    //QUERY PARAMETERS
    this.pageNumber = 1;
    this.rownpPage = 10;

    this.parameters = [
      { parameter: 'id', value: this.id },
      { parameter: 'tipoProduto', value: this.tipoProduto },
      { parameter: 'descricao', value: this.descricao },
      { parameter: 'marca', value: this.marca },
      { parameter: 'codigoBarras', value: this.codigoBarras },
      { parameter: 'isBloqueado', value: this.isBloqueado },
      { parameter: 'ativo', value: this.ativo },
      { parameter: 'pageNumber', value: this.pageNumber },
      { parameter: 'rowspPage', value: this.rownpPage },
    ];
    // SETAR VALORES DO GRID
    this.gridService.setSetParameters(this.parameters, true);
  }
}
