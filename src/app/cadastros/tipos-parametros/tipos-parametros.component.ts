import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { TiposParametrosService } from './tipos-parametros.service';

@Component({
  selector: 'app-tipos-parametros',
  templateUrl: './tipos-parametros.component.html',
  styleUrls: ['./tipos-parametros.component.scss']
})
export class TiposParametrosComponent implements OnInit, OnDestroy {
  public title = 'Busca de tipos de parametros';
  public gridTitle = 'Tipos de parametros';
  public model = 'TiposParametros';
  public id: number;
  public descricao: string;
  public ativo: boolean;

  public constructor(
    private loaderService: LoaderService,
    private tiposParametrosService: TiposParametrosService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.loaderService.SetLoaderState(true);
    this.model = 'TiposParametros';
    this.gridTitle = 'Tipos de parametros';
    this.title = 'Busca de tipos de parametros';
    this.tiposParametrosService.searchPaginated(1, 10);
  }

  private destroyComponent(): void {
    this.loaderService.SetLoaderState(false);
    this.model = null;
    this.gridTitle = null;
    this.title = null;
  }

  public search() {
    this.tiposParametrosService.searchPaginated(1, 10, this.id, this.descricao, this.ativo == null ||
      this.ativo.toString() === 'undefined' ? undefined : this.ativo);
  }
}
