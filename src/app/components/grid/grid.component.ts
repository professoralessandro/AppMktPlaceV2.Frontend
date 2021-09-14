import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TiposConfiguracoesService } from 'src/app/cadastros/tipos-configuracoes/tipos-configuracoes.service';
import { TiposDadosService } from 'src/app/cadastros/tipos-dados/tipos-dados.service';
import { TiposDocumentosService } from 'src/app/cadastros/tipos-documentos/tipos-documentos.service';
import { TiposLancamentosService } from 'src/app/cadastros/tipos-lancamentos/tipos-lancamentos.service';
import { TiposTelefonesService } from 'src/app/cadastros/tipos-telefones/tipos-telefones.service';
import { TiposWorkflowsService } from 'src/app/cadastros/tipos-workflows/tipos-workflows.service';
import { CommonService } from 'src/app/services/common.service';
import { GridService } from './grid.service';

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

  constructor(
    private route: Router,
    private commonService: CommonService,
    public gridService: GridService,
    private tiposTelefonesService: TiposTelefonesService,
    private tiposConfiguracoesService: TiposConfiguracoesService,
    private tiposDocumentosService: TiposDocumentosService,
    private tiposLancamentosService: TiposLancamentosService,
    private tiposWorkflowsService: TiposWorkflowsService,
    private tiposDadosService: TiposDadosService
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

  public paginate(page: number, rowspPage: number = 10, event?: any): void {
    if (!this.commonService.isNullOrUndefined(event)) {
      this.currentPage = Number(event.target.innerText);
      page = this.currentPage;
    } else {
      this.currentPage = page;
    }
    this.nextPage = (page + 1);
    this.previusPage = (page - 1);
    const model = this.gridService.model;
    this.gridService.initializeAtributtes();

    if (this.gridService.model.toLocaleLowerCase() === 'tipostelefones') {
      this.tiposTelefonesService.searchPaginated(page, rowspPage);
    } else if (this.gridService.model.toLocaleLowerCase() === 'tiposconfiguracoes') {
      this.tiposConfiguracoesService.searchPaginated(page, rowspPage);
    } else if (this.gridService.model.toLocaleLowerCase() === 'tiposdocumentos') {
      this.tiposDocumentosService.searchPaginated(page, rowspPage);
    } else if (this.gridService.model.toLocaleLowerCase() === 'tiposlancamentos') {
      this.tiposLancamentosService.searchPaginated(page, rowspPage);
    } else if (this.gridService.model.toLocaleLowerCase() === 'tiposworkflows') {
      this.tiposWorkflowsService.searchPaginated(page, rowspPage);
    } else if (this.gridService.model.toLocaleLowerCase() === 'tiposdados') {
      this.tiposDadosService.searchPaginated(page, rowspPage);
    }
  }
}
