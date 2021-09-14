import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { TiposDadosService } from './tipos-dados.service';

@Component({
  selector: 'app-tipos-dados',
  templateUrl: './tipos-dados.component.html',
  styleUrls: ['./tipos-dados.component.scss']
})
export class TiposDadosComponent implements OnInit, OnDestroy {
  public title = 'Busca de tipos de dados';
  public gridTitle = 'Tipos de dados';
  public model = 'TiposDados';
  public id: number;
  public descricao: string;
  public ativo: boolean;

  public constructor(
    private loaderService: LoaderService,
    private tiposDadosService: TiposDadosService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.loaderService.SetLoaderState(true);
    this.model = 'TiposDados';
    this.gridTitle = 'Tipos de dados';
    this.title = 'Busca de tipos de dados';
    this.tiposDadosService.searchPaginated(1, 10);
  }

  private destroyComponent(): void {
    this.loaderService.SetLoaderState(false);
    this.model = null;
    this.gridTitle = null;
    this.title = null;
  }

  public search() {
    this.tiposDadosService.searchPaginated(1, 10, this.id, this.descricao, this.ativo == null ||
      this.ativo.toString() === 'undefined' ? undefined : this.ativo);
  }
}
