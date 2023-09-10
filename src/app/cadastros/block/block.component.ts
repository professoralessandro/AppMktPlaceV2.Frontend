import { Component, OnInit } from '@angular/core';
import { TipoBloqueioEnum } from 'src/app/Enums/tipo-bloqueio.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { GridCommonService } from 'src/app/services/grid-common-service';
import { projectUrls } from 'src/environments/endpoints-environment';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  public title = 'Busca por block';
  public gridTitle = 'Bloqueio';
  public model = 'Block';
  public id: string;
  public itemBloqueadoId: string;
  public descricao: string;
  public ativo: boolean;
  public isBloqueiaAcesso: boolean;
  public parameters: QueryParameter[];
  public pageNumber: number = 1;
  public rownpPage: number = 10;
  public gridTitles: string[];
  public gridElements: string[];
  public apiUrl: string;
  public endpointUrl: string;
  public registerUrl: string;
  public deleteUrl: string;

  public blockTypes = Object.values(TipoBloqueioEnum).filter(c => typeof(c) == 'string');
  public tipoBloqueio: string;

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

    this.gridTitle = 'Bloqueio';
    this.title = 'Busca de block';
    this.gridTitles = ['Tipo de bloqueio', 'Id Item Bloqueiado', 'Data inicio', 'Data fim'];
    this.gridElements = ['blockTypeEnum', 'itemBloqueadoId', 'dataInicio', 'dataFim'];
    this.apiUrl = 'cadastros_url';
    this.endpointUrl = projectUrls.GetAllBlockPaginated;
    this.registerUrl = projectUrls.RegisterGroupUrl;
    this.deleteUrl = projectUrls.DeleteGroupUrl;
    //QUERY PARAMETERS
    this.parameters = [
      {parameter: 'id', value: this.id},
      {parameter: 'nomeBloqueio', value: this.descricao},
      {parameter: 'itemBloqueadoId', value: this.itemBloqueadoId},
      {parameter: 'tipoBloqueio', value: this.tipoBloqueio},
      {parameter: 'isBloqueiaAcesso', value: this.isBloqueiaAcesso},
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
      {parameter: 'nomeBloqueio', value: this.descricao},
      {parameter: 'itemBloqueadoId', value: this.itemBloqueadoId},
      {parameter: 'tipoBloqueio', value: this.tipoBloqueio},
      {parameter: 'isBloqueiaAcesso', value: this.isBloqueiaAcesso},
      {parameter: 'ativo', value: this.ativo},
      {parameter: 'pageNumber', value: this.pageNumber},
      {parameter: 'rowspPage', value: this.rownpPage}
    ];
    // SETAR VALORES DO GRID
    this.gridService.setSetParameters(this.parameters, true);
  }

  public ReturnDescriptionBlockType(blockTypes) : string {
    if (blockTypes === 0) {
      return "Usuario";
    } else if (blockTypes === 1) {
      return "Produto";
    } else if (blockTypes === 2) {
      return "Serviço";
    } else if (blockTypes === 3) {
      return "Pagamento";
    } else if (blockTypes === 4) {
      return "Preventivo";
    } else {
      return "Definitivo";
    }
  }
}
