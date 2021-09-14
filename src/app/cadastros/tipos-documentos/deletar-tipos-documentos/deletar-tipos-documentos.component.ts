import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposDocumentos } from '../tipos-documentos';

@Component({
  selector: 'app-deletar-tipos-documentos',
  templateUrl: './deletar-tipos-documentos.component.html',
  styleUrls: ['./deletar-tipos-documentos.component.scss']
})
export class DeletarTiposDocumentosComponent implements OnInit, OnDestroy {
  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public label: string;
  private tipoDocumento: TiposDocumentos;

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
        this.service.getAll('cadastros_url', 'TiposDocumentos', this.parameters)
        .toPromise()
        .then(c => {
          this.tipoDocumento = c[0];
          this.label = `Tem certerza que deseja deletar o item ${this.tipoDocumento.descricao} ?`;
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de documento.', false);
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.title = 'Deletar tipo de documento';
    this.label = '';
    this.rotaAnterior = './cadastros/tiposdocumentos';
    this.parameters = [];
    this.tipoDocumento = new TiposDocumentos();
  }

  private destroyComponent(): void {
    this.title = null;
    this.label = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.tipoDocumento = null;
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'TiposDocumentos', this.tipoDocumento.tipoDocumentoId)
    .toPromise()
    .then(c => {
      this.commonService.responseActionWithNavigation(this.rotaAnterior, `Tipo de documento<br>${this.tipoDocumento.descricao}<br>Deletado com sucesso.`, true);
    })
    .catch(e => {
      this.commonService.responseActionWithNavigation
      (this.rotaAnterior, e.error, false);
    });
  }
}

