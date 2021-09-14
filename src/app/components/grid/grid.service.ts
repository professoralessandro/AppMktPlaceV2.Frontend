import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ColunmAction } from './colunn-action';
import { GridBinder } from './grid-binder';
import { GridBody } from './grid-body';
import { GridTitle } from './grid-title';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  // ATRIBUTTES
  public gridBind: GridBinder;
  public isExistsActions: boolean;
  private countGridLine: number;
  private countGridAction: number;
  public reverse: boolean;
  public isExistsData: boolean;
  public routeRegister: string;
  public model: string;

  // CONSTRUCTOR
  constructor(
    private commonService: CommonService
  ) { }

  // METHODS
  public destroyAtributtes(): void {
    this.gridBind = null;
    this.countGridLine = null;
    this.isExistsActions = null;
    this.countGridLine = null;
    this.countGridAction = null;
    this.reverse = null;
    this.isExistsData = null;
  }

  public initializeAtributtes(): void {
    this.gridBind = new GridBinder();
    this.gridBind.gridBodyAttibutes = [];
    this.gridBind.gridTitles = [];
    this.countGridLine = 0;
    this.countGridAction = 0;
    this.reverse = true;
    this.isExistsData = false;
  }

  // METHODS GETTERS AND SETTERS
  public setGridTableValue(value: any): void {
    this.gridBind = value;
  }

  public getGridTableValue(value: boolean): GridBinder {
    return this.gridBind;
  }

  public setIsExistsActionsValue(value: boolean): void {
    this.isExistsActions = value;
  }

  public getIsExistsActionsValue(): boolean {
    return this.isExistsActions;
  }

  // GRID METHODS
  public ConvertoToTitle(order: number, objTitle: string, tooltip?: string): GridTitle {
    const title = new GridTitle();
    title.order = order;
    title.title = objTitle;
    title.tooltip = tooltip;
    return title;
  }

  public addGridTitles(columnTitle: string[], columnAtributte: string[], titleToolTip?: string[], titleLink?: string[]): void {
    for (let i = 0; i < columnTitle.length; i++) {
      const gridTitle = new GridTitle();
      gridTitle.title = columnTitle[i];
      gridTitle.atributteName = columnAtributte[i];
      if (!this.commonService.isNullOrUndefined(titleToolTip)) {
        gridTitle.tooltip = titleToolTip[i];
      }
      if (!this.commonService.isNullOrUndefined(titleLink)) {
        gridTitle.link = titleLink[i];
      }
      gridTitle.active = true;
      gridTitle.order = i + 1;
      this.gridBind.gridTitles.push(gridTitle);
    }
  }

  public addGridLine(
    columnValue: string[],
    actions: ColunmAction[],
    columnLink?: string[],
    columnToolTip?: string[],
    columnDecorate?: string[]
  ): void {
    this.countGridLine++;
    const gridBody = new GridBody();
    gridBody.id = Number(columnValue[0]);
    gridBody.order = this.countGridLine;
    gridBody.titles = columnValue;
    gridBody.tooltip = columnToolTip;
    gridBody.link = columnLink;
    gridBody.active = true;
    gridBody.actions = actions;
    gridBody.decorate = columnDecorate;
    this.gridBind.gridBodyAttibutes.push(gridBody);
  }

  public makeActionGridLine(
    title: string,
    objectId: number,
    disabled: boolean,
    icon: string,
    routeNavigation?: string,
    objectTitle?: string,
    url?: string,
    endPoint?: string,
    toolTip?: string
  ): ColunmAction {
    const colunmAction = new ColunmAction();
    colunmAction.order = (this.countGridAction++);
    colunmAction.title = title;
    colunmAction.objectId = objectId;
    colunmAction.disabled = disabled;
    colunmAction.icon = icon;
    colunmAction.url = url;
    colunmAction.tooltip = toolTip;
    colunmAction.route = routeNavigation;
    colunmAction.endPoint = endPoint;
    colunmAction.objectTitle = objectTitle;
    return colunmAction;
  }

  public sortBy(item: string, pageNumber?: number, pageRows: number = 10): void {
      if (this.reverse === false) {
        this.reverse = true;
        // THIS PART OF CODE SORTE THE ORIGINAL ARRAY FOR ATRIBUTTE CLIKED ON HTMLGRID
        this.gridBind.gridObjectBinded.sort((a, b) => a[item].toString().localeCompare(b[item].toString()));
      } else {
        this.reverse = false;
        // THIS PART OF CODE SORTE THE ORIGINAL ARRAY FOR ATRIBUTTE CLIKED ON HTMLGRID
        this.gridBind.gridObjectBinded.sort((a, b) => b[item].toString().localeCompare(a[item].toString()));
      }
    // THIS PART OF CODE RETURN HOW ID THE ATRIBUTTE NAME THAT CONTAINS ID FROM ATRIBUTTE TITLE
    const idAtrubutte = this.howIsObjectIdAtributte(this.gridBind.gridTitles.map(x => x.atributteName));

    // THIS PARTE OF CODE RETURN GRID SORTED
    this.gridBind.gridBodyAttibutes = this
      .sortGridObjectTeste(this.gridBind.gridObjectBinded.map(x => x[idAtrubutte]));
  }

  // THIS PARTE OF CODE RETURN GRID SORTED
  private sortGridObjectTeste(ids: Number[]): GridBody[] {
    const gridBodySorted: GridBody[] = [];
    ids.map(x => {
      this.gridBind.gridBodyAttibutes.map(c => {
        if (x === c.id) {
          gridBodySorted.push(c);
        }
      });
    });
    return gridBodySorted;
  }

  // THIS PART OF CODE RETURN HOW ID THE ATRIBUTTE NAME THAT CONTAINS ID FROM ATRIBUTTE TITLE
  private howIsObjectIdAtributte(gridTitle: string[]): string {
    let gridTitleIdAtributte = '';
    gridTitle.forEach(item => {
      if (item.toLocaleLowerCase().includes('id')) {
        gridTitleIdAtributte = item;
      }
    });
    return gridTitleIdAtributte;
  }

  // NAVIGATE TO REGISTER PAGE
  public nagivateToRegister() {
    this.commonService.NavigateOnly(this.routeRegister);
  }
}
