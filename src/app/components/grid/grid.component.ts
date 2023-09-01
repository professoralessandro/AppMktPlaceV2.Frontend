import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { GridService } from './grid.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { GridCommonService } from 'src/app/services/grid-common-service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
  // INPUTS
  @Input() title: string;
  @Input() isExistsAction: boolean;
  @Input() previusLabel: string;
  @Input() nextLabel: string;
  public pager: any = {};
  public currentPage: number;
  public nextPage: number;
  public previusPage: number;

  // PAGINATION PARAMETERS
  public titleGrid = 'Busca por grupos';
  public gridTitle = 'Grupos';
  public id: string;
  public descricao: string;
  public ativo: boolean;
  public pageNumber: number = 1;
  public rownpPage: number = 10;

  constructor(
    private route: Router,
    private commonService: CommonService,
    public gridService: GridService,
    private gridCommonService: GridCommonService,
  ) { }

  public ngOnInit(): void {
    this.gridService.setIsExistsActionsValue(this.isExistsAction);
    this.gridService.initializeAtributtes();
    this.currentPage = 1;
    this.nextPage = 2;
    this.previusPage = 0;
  }

  public actions(item: any) {
    if (!this.commonService.isNullOrUndefined(item.title) && item.title !== '') {
      this.route.navigate([item.route + item.objectId]);
    }
  }

  public ngOnDestroy(): void {
    this.gridService.destroyAtributtes();
  }

  public paginate(pageNumber: number, rowspPage: number = 10, event?: any): void {
    if (!this.commonService.isNullOrUndefined(event)) {
      this.currentPage = Number(event.target.innerText);
      pageNumber = this.currentPage;
    } else {
      this.currentPage = pageNumber;
    }
    this.nextPage = (pageNumber + 1);
    this.previusPage = (pageNumber - 1);
    const model = this.gridService.model;
    this.gridService.initializeAtributtes();

    var parameters = this.getParameters();

    // SETAR O VALOR 
    parameters.forEach(param => {
      if (param.parameter === 'pageNumber') {
        param.value = pageNumber;
      }

      if (param.parameter === 'rowspPage') {
        param.value = rowspPage;
      }
    });

    this.gridCommonService.setSetParameters(parameters, true);
  }

  public searchPaginated(parameters: QueryParameter[], model: string, apiUrl: string, endpointUrl: string, objectTitle: string, registerUpdateRoute: string, deleteRoute: string, gridTitles :string[], gridElements :string[]) {
    this.gridCommonService.searchPaginated(parameters, model, apiUrl, endpointUrl, objectTitle, registerUpdateRoute, deleteRoute, gridTitles, gridElements);
  }

  private getParameters() : QueryParameter[] {
    return this.gridCommonService.parameters;
  }
}
