import { Injectable } from '@angular/core';
import { QueryParameter } from '../models/query-parameter';
import { HttpCommonService } from './app-http-service';
import { LoaderService } from '../components/loader/loader.service';
import { AlertModalService } from '../components/alert-modal/alert-modal.service';
import { GridService } from '../components/grid/grid.service';
import { ColunmAction } from '../components/grid/colunn-action';
import { ActionPermissions } from '../models/action-permissions';
import { DatePipe } from '@angular/common';
import { CommonService } from './common.service';

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
      private gridService: GridService,
      private commonService: CommonService
    ) { }

    //BUSCA PAGINADA
    public async searchPaginated(parameters: QueryParameter[], model: string, apiUrl: string, endpointUrl: string, objectTitle: string, registerUpdateRoute: string, deleteRoute: string, gridTitles :string[], gridElements :string[]) {
      // PERMISSION RESEARCH
      var permission = new ActionPermissions();

      this.parameters = parameters;

      this.gridService.initializeAtributtes();

      this.gridService.model = model;
      this.loaderService.SetLoaderState(true);

      this.service.getAll(apiUrl, endpointUrl, this.parameters)
      .toPromise()
      .then(c => {
        if (c.length > 0) {
          this.gridService.gridBind.gridObjectBinded = c;

          this.gridService.addGridTitles(gridTitles, gridElements);

          let actions: ColunmAction[] = [];
          c.map(element => {

            actions.push(this.gridService.makeActionGridLine('edit', element.identifier, permission.isUpdateDisabled, 'far fa-edit', registerUpdateRoute, objectTitle));

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
        if (this.commonService.isNullOrUndefined(elements[element])) {
          // HERE DEFINES GRID LINE VALUE NULL OR UNDEFINED HAS -
          elements[element] = "";
        }

        if (element.toLocaleLowerCase().indexOf('enum') > -1) {
          elements[element] = this.commonService.ReturnEnumObjectByName(element, elements[element]);
        }

        if (typeof(elements[element]) === 'string') {
          if (this.validateStringDate(elements[element]) && this.containsDateOrData(element)) {
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
    private validateStringDate(value): boolean {
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

    /*
    This method converts the input string to lowercase and then checks whether it contains “data” or “date”.
    Returns true if the input string contains “data” or “date”, and false otherwise.
    */
    private containsDateOrData(inputString: string): boolean {
      const lowerCaseString = inputString.toLowerCase();
      return lowerCaseString.includes('data') || lowerCaseString.includes('date');
    }
}
