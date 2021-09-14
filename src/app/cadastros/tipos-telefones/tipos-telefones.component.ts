import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { TiposTelefonesService } from './tipos-telefones.service';
@Component({
  selector: 'app-tipos-telefones',
  templateUrl: './tipos-telefones.component.html',
  styleUrls: ['./tipos-telefones.component.scss']
})
export class TiposTelefonesComponent implements OnInit, OnDestroy {
  public title = 'Busca de tipos de telefones';
  public gridTitle = 'Tipos de telefones';
  public model = 'TiposTelefones';
  public id: number;
  public descricao: string;
  public ativo: boolean;

  public constructor(
    private loaderService: LoaderService,
    private tiposTelefonesService: TiposTelefonesService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.loaderService.SetLoaderState(true);
    this.model = 'TiposTelefones';
    this.gridTitle = 'Tipos de telefones';
    this.title = 'Busca de tipos de telefones';
    this.tiposTelefonesService.searchPaginated(1, 10);
  }

  private destroyComponent(): void {
    this.loaderService.SetLoaderState(false);
    this.model = null;
    this.gridTitle = null;
    this.title = null;
  }

  public search() {
    this.tiposTelefonesService.searchPaginated(1, 10, this.id, this.descricao, this.ativo == null ||
      this.ativo.toString() === 'undefined' ? undefined : this.ativo);
  }
}
