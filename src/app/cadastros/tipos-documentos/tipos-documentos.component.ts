import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { TiposDocumentosService } from './tipos-documentos.service';
@Component({
  selector: 'app-tipos-documentos',
  templateUrl: './tipos-documentos.component.html',
  styleUrls: ['./tipos-documentos.component.scss']
})
export class TiposDocumentosComponent implements OnInit, OnDestroy {
  public title = 'Busca de tipos de documentos';
  public gridTitle = 'Tipos de documentos';
  public model = 'TiposDocumentos';
  public id: number;
  public descricao: string;
  public ativo: boolean;

  public constructor(
    private loaderService: LoaderService,
    private tiposDocumentosService: TiposDocumentosService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.loaderService.SetLoaderState(true);
    this.model = 'TiposDocumentos';
    this.gridTitle = 'Tipos de documentos';
    this.title = 'Busca de tipos de documentos';
    this.tiposDocumentosService.searchPaginated(1, 10);
  }

  private destroyComponent(): void {
    this.loaderService.SetLoaderState(false);
    this.model = null;
    this.gridTitle = null;
    this.title = null;
  }

  public search() {
    this.tiposDocumentosService.searchPaginated(1, 10, this.id, this.descricao, this.ativo == null ||
      this.ativo.toString() === 'undefined' ? undefined : this.ativo);
  }
}

