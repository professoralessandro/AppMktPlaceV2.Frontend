import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposLancamentos } from '../tipos-lancamentos';

@Component({
  selector: 'app-deletar-tipo-lancamento',
  templateUrl: './deletar-tipo-lancamento.component.html',
  styleUrls: ['./deletar-tipo-lancamento.component.scss']
})
export class DeletarTipoLancamentoComponent implements OnInit, OnDestroy {
// ATRIBUTTES
public title: string;
private rotaAnterior: string;
private parameters: QueryParameter[];
public label: string;
private tipoLancamento: TiposLancamentos;

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
      this.service.getSingle('cadastros_url', 'TiposLancamentos', this.parameters)
      .toPromise()
      .then(c => {
        this.tipoLancamento = c;
        this.label = `Tem certerza que deseja deletar o item ${this.tipoLancamento.descricao} ?`;
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de lançamento.', false);
      });
    }
  });
}

public ngOnDestroy(): void {
  this.destroyComponent();
}

private initializeComponent(): void {
  this.title = 'Deletar tipo de lançamento';
  this.label = '';
  this.rotaAnterior = './cadastros/tiposlancamentos';
  this.parameters = [];
  this.tipoLancamento = new TiposLancamentos();
}

private destroyComponent(): void {
  this.title = null;
  this.label = null;
  this.rotaAnterior = null;
  this.parameters = null;
  this.tipoLancamento = null;
}

public deletar(): void {
  this.service.delete('cadastros_url', 'TiposLancamentos', this.tipoLancamento.tipoLancamentoId)
  .toPromise()
  .then(c => {
    this.commonService.responseActionWithNavigation(this.rotaAnterior, `Tipo de lançamento<br>${this.tipoLancamento.descricao}<br>Deletado com sucesso.`, true);
  })
  .catch(e => {
    this.commonService.responseActionWithNavigation
    (this.rotaAnterior, e.error, false);
  });
}
}
