import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposWorkflows } from '../tipos-workflows';

@Component({
  selector: 'app-deletar-tipo-workflow',
  templateUrl: './deletar-tipo-workflow.component.html',
  styleUrls: ['./deletar-tipo-workflow.component.scss']
})
export class DeletarTipoWorkflowComponent implements OnInit, OnDestroy {
public title: string;
private rotaAnterior: string;
private parameters: QueryParameter[];
public label: string;
private tipoWorkflow: TiposWorkflows;

constructor(
  private service: HttpCommonService,
  private router: ActivatedRoute,
  private commonService: CommonService
) { }

public ngOnInit(): void {
  this.initializeComponent();
  this.router.paramMap.subscribe((params) => {
    if (!this.commonService.isNullOrUndefined(params.get('id')) && params.get('id') !== '') {
      this.parameters = [
        {parameter: 'id', value: Number(params.get('id'))}
      ];
      this.service.getSingle('cadastros_url', 'TiposWorkflows', this.parameters)
      .toPromise()
      .then(c => {
        this.tipoWorkflow = c;
        this.label = `Tem certerza que deseja deletar o item ${this.tipoWorkflow.descricao} ?`;
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de workflow.', false);
      });
    }
  });
}

public ngOnDestroy(): void {
  this.destroyComponent();
}

private initializeComponent(): void {
  this.title = 'Deletar tipo de workflow';
  this.label = '';
  this.rotaAnterior = './cadastros/tiposworkflows';
  this.parameters = [];
  this.tipoWorkflow = new TiposWorkflows();
}

private destroyComponent(): void {
  this.title = null;
  this.label = null;
  this.rotaAnterior = null;
  this.parameters = null;
  this.tipoWorkflow = null;
}

public deletar(): void {
  this.service.delete('cadastros_url', 'TiposWorkflows', this.tipoWorkflow.tipoWorkFlowId)
  .toPromise()
  .then(c => {
    this.commonService.responseActionWithNavigation(this.rotaAnterior, `Tipo de workflow<br>${this.tipoWorkflow.descricao}<br>Deletado com sucesso.`, true);
  })
  .catch(e => {
    this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
  });
}
}
