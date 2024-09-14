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
  public title = 'Produtos';
  public gridTitle = 'Produto';
  public model = 'Produto';
  // MODEL COMPONENT AREA

  // PARAMETERS AREA
  public id: string;
  public tipoProduto: number;
  public titulo: string;
  public marca: string;
  public codigoBarras: string;
  public isBloqueado: boolean;
  public isAtivo: boolean;
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

  // ENUM VALUE FORMATER
  public productTypes = Object.values(ProductTypeMapping).filter(c => typeof (c) == 'string');
  public productTypeString: string[] = [];

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

  /**
   * INITIALIZE THE COMPONENT GRID THEN THE PAGE IS LOADED
   */
  private initializeComponent(): void {

    this.loaderService.SetLoaderState(true);

    this.gridTitle = 'Produtos';
    this.title = 'Produtos';
    this.gridTitles = ['Descrição', 'Tipo de produto', 'Marca'];
    this.gridElements = ['titulo', 'productTypeEnum', 'marca'];
    this.apiUrl = 'cadastros_url';
    this.endpointUrl = projectUrls.GetAllProductPaginated;
    this.registerUrl = projectUrls.RegisterGroupUrl;
    this.deleteUrl = projectUrls.DeleteGroupUrl;
    //QUERY PARAMETERS

    this.parameters = [
      { parameter: 'id', value: this.id },
      { parameter: 'tipoProduto', value: this.tipoProduto },
      { parameter: 'titulo', value: this.titulo },
      { parameter: 'marca', value: this.marca },
      { parameter: 'codigoBarras', value: this.codigoBarras },
      { parameter: 'isBloqueado', value: this.isBloqueado },
      { parameter: 'ativo', value: this.isAtivo },
      { parameter: 'pageNumber', value: this.pageNumber },
      { parameter: 'rowspPage', value: this.rownpPage },
    ];

    // SETAR VALORES DO GRID
    this.gridService.setGridServiceValues(this.model, this.gridTitles, this.gridElements, this.apiUrl, this.endpointUrl, this.parameters, this.registerUrl, this.deleteUrl, true);
  }

  /**
   * ON THE COMPONENT HAS DESTROYED
   */
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
      { parameter: 'tipoProduto', value: this.commonService.isNullOrUndefined(this.tipoProduto) ? undefined : this.commonService.ReturnValueMyEnumDescription('productTypeEnum', this.tipoProduto)},
      { parameter: 'titulo', value: this.titulo },
      { parameter: 'marca', value: this.marca },
      { parameter: 'codigoBarras', value: this.codigoBarras },
      { parameter: 'isBloqueado', value: this.isBloqueado },
      { parameter: 'ativo', value: this.isAtivo },
      { parameter: 'pageNumber', value: this.pageNumber },
      { parameter: 'rowspPage', value: this.rownpPage },
    ];
    // SETAR VALORES DO GRID
    this.gridService.setSetParameters(this.parameters, true);
  }
}
