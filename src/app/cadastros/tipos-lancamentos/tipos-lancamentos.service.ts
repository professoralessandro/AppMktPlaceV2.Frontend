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
export class TiposLancamentosService {
  public parameters: QueryParameter[];

  constructor(
    private service: HttpCommonService,
    private loaderService: LoaderService,
    private alertService: AlertModalService,
    private gridService: GridService
  ) { }

  public async searchPaginated(pageNumber: number, rownpPage: number, id?: number, descricao?: string, ativo?: boolean) {
    this.gridService.initializeAtributtes();
    this.gridService.model = 'Tiposlancamentos';
    this.loaderService.SetLoaderState(true);
    this.parameters = [
      {parameter: 'id', value: id},
      {parameter: 'descricao', value: descricao},
      {parameter: 'ativo', value: ativo},
      {parameter: 'pageNumber', value: pageNumber},
      {parameter: 'rowspPage', value: rownpPage}
    ];

    this.service.getAll('cadastros_url', 'tiposlancamentos/paginated', this.parameters)
    .toPromise()
    .then(c => {
      if (c.length > 0) {
        this.gridService.gridBind.gridObjectBinded = c;
        this.gridService.addGridTitles(['#', 'Descrição', 'Ativo'], ['tipoLancamentoId', 'descricao', 'ativo']);
        let actions: ColunmAction[] = [];
        c.map(element => {
          actions.push(this.gridService
            .makeActionGridLine('edit', element.tipoLancamentoId, false
            , 'far fa-edit', '/cadastros/tiposlancamentos/cadastro/', element.descricao));
          actions.push(this.gridService.makeActionGridLine('delete', element.tipoLancamentoId, !element.ativo,
          'far fa-trash-alt', '/cadastros/tiposlancamentos/deletar/', element.descricao));
          this.gridService.addGridLine([element.tipoLancamentoId, element.descricao, element.ativo.toString()], actions);
          actions = [];
        });
        this.gridService.isExistsData = true;
      } else {
        this.gridService.isExistsData = false;
      }
      this.loaderService.SetLoaderState(false);
      this.gridService.routeRegister = '/cadastros/tiposlancamentos/cadastro/';
    })
    .catch(e => {
      this.loaderService.SetLoaderState(false);
      this.alertService.showAlert(e.error, 'error');
    });
  }
}
