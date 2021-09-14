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
export class TiposParametrosService {
  public parameters: QueryParameter[];

  constructor(
    private service: HttpCommonService,
    private loaderService: LoaderService,
    private alertService: AlertModalService,
    private gridService: GridService
  ) { }

  public async searchPaginated(pageNumber: number, rownpPage: number, id?: number, descricao?: string, ativo?: boolean) {
    this.gridService.initializeAtributtes();
    this.gridService.model = 'TiposParametros';
    this.loaderService.SetLoaderState(true);
    this.parameters = [
      {parameter: 'id', value: id},
      {parameter: 'descricao', value: descricao},
      {parameter: 'ativo', value: ativo},
      {parameter: 'pageNumber', value: pageNumber},
      {parameter: 'rowspPage', value: rownpPage}
    ];

    this.service.getAll('cadastros_url', 'tiposparametros/paginated', this.parameters)
    .toPromise()
    .then(c => {
      if (c.length > 0) {
        this.gridService.gridBind.gridObjectBinded = c;
        this.gridService.addGridTitles(['#', 'Descrição', 'Ativo'], ['tipoParametroId', 'descricao', 'ativo']);
        let actions: ColunmAction[] = [];
        c.map(element => {
          actions.push(this.gridService
            .makeActionGridLine('edit', element.tipoParametroId, false
            , 'far fa-edit', '/cadastros/tiposparametros/cadastro/', element.descricao));
          actions.push(this.gridService.makeActionGridLine('delete', element.tipoParametroId, !element.ativo,
          'far fa-trash-alt', '/cadastros/tiposparametros/deletar/', element.descricao));
          this.gridService.addGridLine([element.tipoParametroId, element.descricao, element.ativo.toString()], actions);
          actions = [];
        });
        this.gridService.isExistsData = true;
      } else {
        this.gridService.isExistsData = false;
      }
      this.loaderService.SetLoaderState(false);
      this.gridService.routeRegister = '/cadastros/tiposparametros/cadastro/';
    })
    .catch(e => {
      this.loaderService.SetLoaderState(false);
      this.alertService.showAlert(e.error, 'error');
    });
  }
}
