import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposDados } from '../tipos-dados';

@Component({
  selector: 'app-deletar-tipo-dado',
  templateUrl: './deletar-tipo-dado.component.html',
  styleUrls: ['./deletar-tipo-dado.component.scss']
})
export class DeletarTipoDadoComponent implements OnInit, OnDestroy {
// ATRIBUTTES
public title: string;
private rotaAnterior: string;
private parameters: QueryParameter[];
public label: string;
private tipodado: TiposDados;

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
      this.service.getSingle('cadastros_url', 'TiposDados', this.parameters)
      .toPromise()
      .then(c => {
        this.tipodado = c;
        this.label = `Tem certerza que deseja deletar o item ${this.tipodado.descricao} ?`;
      })
      .catch(e => {
        this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de dado.', false);
      });
    }
  });
}

public ngOnDestroy(): void {
  this.destroyComponent();
}

private initializeComponent(): void {
  this.title = 'Deletar tipo de dado';
  this.label = '';
  this.rotaAnterior = './cadastros/tiposdados';
  this.parameters = [];
  this.tipodado = new TiposDados();
}

private destroyComponent(): void {
  this.title = null;
  this.label = null;
  this.rotaAnterior = null;
  this.parameters = null;
  this.tipodado = null;
}

public deletar(): void {
  this.service.delete('cadastros_url', 'TiposDados', this.tipodado.tipoDadoId)
  .toPromise()
  .then(c => {
    this.commonService.responseActionWithNavigation
    (this.rotaAnterior, `Tipo de dado<br>${this.tipodado.descricao}<br>Deletado com sucesso.`, true);
  })
  .catch(e => {
    this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
  });
}
}
