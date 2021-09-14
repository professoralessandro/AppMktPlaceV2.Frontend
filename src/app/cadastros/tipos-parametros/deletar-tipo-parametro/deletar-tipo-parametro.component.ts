import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposParametros } from '../../tipos-parametros/tipos-parametros';

@Component({
  selector: 'app-deletar-tipo-parametro',
  templateUrl: './deletar-tipo-parametro.component.html',
  styleUrls: ['./deletar-tipo-parametro.component.scss']
})
export class DeletarTipoParametroComponent implements OnInit, OnDestroy {
// ATRIBUTTES
public title: string;
private rotaAnterior: string;
private parameters: QueryParameter[];
public label: string;
private tipoParametro: TiposParametros;

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
      this.service.getAll('cadastros_url', 'TiposParametros', this.parameters)
      .toPromise()
      .then(c => {
        this.tipoParametro = c[0];
        this.label = `Tem certerza que deseja deletar o item ${this.tipoParametro.descricao} ?`;
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de parametro.', false);
      });
    }
  });
}

public ngOnDestroy(): void {
  this.destroyComponent();
}

private initializeComponent(): void {
  this.title = 'Deletar tipo de parametro';
  this.label = '';
  this.rotaAnterior = './cadastros/tiposparametros';
  this.parameters = [];
  this.tipoParametro = new TiposParametros();
}

private destroyComponent(): void {
  this.title = null;
  this.label = null;
  this.rotaAnterior = null;
  this.parameters = null;
  this.tipoParametro = null;
}

public deletar(): void {
  this.service.delete('cadastros_url', 'TiposParametros', this.tipoParametro.tipoParametroId)
  .toPromise()
  .then(c => {
    this.commonService.responseActionWithNavigation(this.rotaAnterior, `Tipo de parametro<br>${this.tipoParametro.descricao}<br>Deletado com sucesso.`, true);
  })
  .catch(e => {
    this.commonService.responseActionWithNavigation
    (this.rotaAnterior, e.error, false);
  });
}
}
