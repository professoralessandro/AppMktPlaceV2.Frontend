import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposConfiguracoes } from '../tipos-configuracoes';

@Component({
  selector: 'app-deletar-tipos-configuracoes',
  templateUrl: './deletar-tipos-configuracoes.component.html',
  styleUrls: ['./deletar-tipos-configuracoes.component.scss']
})
export class DeletarTiposConfiguracoesComponent implements OnInit, OnDestroy {
// ATRIBUTTES
public title: string;
private rotaAnterior: string;
private parameters: QueryParameter[];
public label: string;
private model: TiposConfiguracoes;

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
      this.service.getAll('cadastros_url', 'TiposConfiguracoes', this.parameters)
      .toPromise()
      .then(c => {
        this.model = c[0];
        this.label = `Tem certerza que deseja deletar o item ${this.model.descricao} ?`;
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de configuracao.', false);
      });
    }
  });
}

public ngOnDestroy(): void {
  this.destroyComponent();
}

private initializeComponent(): void {
  this.title = 'Deletar tipo de configuração';
  this.label = '';
  this.rotaAnterior = './cadastros/teste';
  this.parameters = [];
  this.model = new TiposConfiguracoes();
}

private destroyComponent(): void {
  this.title = null;
  this.label = null;
  this.rotaAnterior = null;
  this.parameters = null;
  this.model = null;
}

public deletar(): void {
  this.service.delete('cadastros_url', 'TiposConfiguracoes', this.model.tipoConfiguracaoId)
  .toPromise()
  .then(c => {
    this.commonService.responseActionWithNavigation(this.rotaAnterior, `Tipo de configuração<br>${this.model.descricao}<br>Deletado com sucesso.`, true);
  })
  .catch(e => {
    this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
  });
}
}
