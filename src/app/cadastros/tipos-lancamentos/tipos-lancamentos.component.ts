import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { TiposLancamentosService } from './tipos-lancamentos.service';

@Component({
  selector: 'app-tipos-lancamentos',
  templateUrl: './tipos-lancamentos.component.html',
  styleUrls: ['./tipos-lancamentos.component.scss']
})
export class TiposLancamentosComponent implements OnInit, OnDestroy {
  public title = 'Busca de tipos de lançamento';
  public gridTitle = 'Tipos de lançamento';
  public model = 'TiposLancamentos';
  public id: number;
  public descricao: string;
  public ativo: boolean;

  public constructor(
    private loaderService: LoaderService,
    private tiposlancamentosService: TiposLancamentosService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.loaderService.SetLoaderState(true);
    this.model = 'TiposLancamentos';
    this.gridTitle = 'Tipos de lançamentos';
    this.title = 'Busca de tipos de lançamentos';
    this.tiposlancamentosService.searchPaginated(1, 10);
  }

  private destroyComponent(): void {
    this.loaderService.SetLoaderState(false);
    this.model = null;
    this.gridTitle = null;
    this.title = null;
  }

  public search() {
    this.tiposlancamentosService.searchPaginated(1, 10, this.id, this.descricao, this.ativo == null ||
      this.ativo.toString() === 'undefined' ? undefined : this.ativo);
  }
}
