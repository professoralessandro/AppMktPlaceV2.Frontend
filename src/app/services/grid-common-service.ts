import { Injectable } from '@angular/core';
import { QueryParameter } from '../models/query-parameter';
import { HttpCommonService } from './app-http-service';
import { LoaderService } from '../components/loader/loader.service';
import { AlertModalService } from '../components/alert-modal/alert-modal.service';
import { GridService } from '../components/grid/grid.service';
import { ColunmAction } from '../components/grid/colunn-action';
import { ActionPermissions } from '../models/action-permissions';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GridCommonService {

  public model: string;
  public parameters: QueryParameter[];
  public pageNumber: number = 1;
  public rownpPage: number = 10;
  public gridTitles: string[];
  public gridElements: string[];
  public apiUrl: string;
  public endpointUrl: string;
  // public getAllPaginatedUrl: string;
  public registerUpdateRoute: string;
  public deleteRoute: string;

    constructor(
      private service: HttpCommonService,
      private loaderService: LoaderService,
      private alertService: AlertModalService,
      private gridService: GridService
    ) { }

    //BUSCA PAGINADA
    public async searchPaginated(parameters: QueryParameter[], model: string, apiUrl: string, endpointUrl: string, objectTitle: string, registerUpdateRoute: string, deleteRoute: string, gridTitles :string[], gridElements :string[]) {
      // PERMISSION RESEARCH
      var permission = new ActionPermissions();

      this.parameters = parameters;

      this.gridService.initializeAtributtes();

      // VERIFICAR AONDE USA ISSO
      this.gridService.model = model;
      this.loaderService.SetLoaderState(true);

      this.service.getAll(apiUrl, endpointUrl, this.parameters)
      .toPromise()
      .then(c => {
        if (c.length > 0) {
          this.gridService.gridBind.gridObjectBinded = c;
          // ADICIONAR GRID TITLES ATTRIBUTES E ATRIBUTOS DINAMICOS
          this.gridService.addGridTitles(gridTitles, gridElements);

          let actions: ColunmAction[] = [];
          c.map(element => {
            actions.push(this.gridService
              // .makeActionGridLine('edit', element.Id, false, 'far fa-edit', '/cadastros/teste/cadastro/', element.descricao));
              .makeActionGridLine('edit', element.identifier, permission.isUpdateDisabled, 'far fa-edit', registerUpdateRoute, objectTitle));
              // actions.push(this.gridService.makeActionGridLine('delete', element.Id, !element.ativo, 'far fa-trash-alt', '/cadastros/teste/deletar/', element.descricao));
            actions.push(this.gridService.makeActionGridLine('delete', element.identifier, !element.ativo ? !element.ativo : permission.isDeleteDisabled, 'far fa-trash-alt', deleteRoute, objectTitle));

            this.gridService.addGridLine(this.ReturnaddGridLineValues(element, gridElements), actions);

            actions = [];
          });
          this.gridService.isExistsData = true;
        } else {
          this.gridService.isExistsData = false;
        }
        this.loaderService.SetLoaderState(false);
        this.gridService.routeRegister = registerUpdateRoute;
      })
      .catch(e => {
        this.loaderService.SetLoaderState(false);
        this.alertService.showAlert(e.error, 'error');
      });
    }

    private ReturnaddGridLineValues(elements: any[], gridElements:string[]): string[] {
      let gridValues: string[] = [];

      gridElements.forEach(element => {
        // VALIDACAO DE O OBJETO E UM TIPO DATA PARA FORMACACAO
        if (typeof(elements[element]) === 'string') {
          if (this.ValidateStringDate(elements[element])) {
            elements[element] = new DatePipe('en-US').transform(elements[element], 'dd/MM/yyyy  HH:mm:ss');
          }
        }
        gridValues.push(elements[element].toString());
      });

      return gridValues;
    }

    public async setGridServiceValues(model: string, gridTitles: string[], gridElements: string[], apiUrl: string, endpointUrl: string, parameters: QueryParameter[], registerUpdateRoute: string, deleteRoute: string, loadGrid: boolean) 
    {
      this.model = model;
      this.gridTitles = gridTitles;
      this.gridElements = gridElements;
      this.apiUrl = apiUrl;
      this.endpointUrl = endpointUrl;
      this.parameters = parameters;
      this.registerUpdateRoute = registerUpdateRoute;
      this.deleteRoute = deleteRoute;

      if (loadGrid) {
        // EVETIVAR BUSCA
        await this.searchPaginated(this.parameters, this.model, this.apiUrl, this.endpointUrl, this.model, this.registerUpdateRoute, this.deleteRoute, this.gridTitles, this.gridElements);
      }
    }

    public async setSetParameters(parameters: QueryParameter[], loadGrid: boolean) {
      this.parameters = parameters;
      if (loadGrid) {
        // EVETIVAR BUSCA
        await this.searchPaginated(this.parameters, this.model, this.apiUrl, this.endpointUrl, this.model, this.registerUpdateRoute, this.deleteRoute, this.gridTitles, this.gridElements);
      }
    }

    // METODO QUE VALIDA SE A DATA E VALIDA
    private ValidateStringDate(value): boolean {
      try{
        var data = new Date(value);
        if (data.toString().toLocaleLowerCase() === 'invalid date') {
          return false;
        }
        return true;
      }
      catch
      {
        return false;
      }
    }
}
