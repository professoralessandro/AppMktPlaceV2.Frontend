import { Injectable } from '@angular/core';
import { AlertModalService } from 'src/app/components/alert-modal/alert-modal.service';
import { ColunmAction } from 'src/app/components/grid/colunn-action';
import { GridService } from 'src/app/components/grid/grid.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  public parameters: QueryParameter[];

  constructor(
    private service: HttpCommonService,
    private loaderService: LoaderService,
    private alertService: AlertModalService,
    private gridService: GridService
  ) { }

  public async searchPaginated(pageNumber: number, rownpPage: number, id?: number | string, descricao?: string, ativo?: boolean) {
    this.gridService.initializeAtributtes();
    this.gridService.model = 'Groups';
    this.loaderService.SetLoaderState(true);
    this.service.getAll('cadastros_url', 'Group/GetAll')
    .toPromise()
    .then(c => {
      if (c.length > 0) {
        this.gridService.gridBind.gridObjectBinded = c;
        this.gridService.addGridTitles(['#', 'Descrição', 'Ativo'], ['grupoId', 'groupName', 'ativo']);
        let actions: ColunmAction[] = [];
        c.map(element => {
          actions.push(this.gridService
            .makeActionGridLine('edit', element.grupoId, false
            , 'far fa-edit', '/cadastros/teste/cadastro/', element.groupName));
          actions.push(this.gridService.makeActionGridLine('delete', element.grupoId, !element.ativo,
          'far fa-trash-alt', '/cadastros/teste/deletar/', element.groupName));
          this.gridService.addGridLine([element.grupoId, element.groupName, element.ativo.toString()], actions);
          actions = [];
        });
        this.gridService.isExistsData = true;
      } else {
        this.gridService.isExistsData = false;
      }
      this.loaderService.SetLoaderState(false);
      this.gridService.routeRegister = '/cadastros/teste/cadastro/';
    })
    .catch(e => {
      this.loaderService.SetLoaderState(false);
      this.alertService.showAlert(e.error, 'error');
    });
  }
}
