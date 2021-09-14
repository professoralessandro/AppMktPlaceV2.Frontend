import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { TiposConfiguracoesService } from './tipos-configuracoes.service';

@Component({
  selector: 'app-tipos-configuracoes',
  templateUrl: './tipos-configuracoes.component.html',
  styleUrls: ['./tipos-configuracoes.component.scss']
})
export class TiposConfiguracoesComponent implements OnInit, OnDestroy {
  public title = 'Busca de tipos de configurações';
  public gridTitle = 'Tipos de configurações';
  public model = 'TiposConfigurações';
  public id: number;
  public descricao: string;
  public ativo: boolean;

  public constructor(
    private loaderService: LoaderService,
    private tiposConfiguracoesService: TiposConfiguracoesService
  ) { }

 public ngOnInit(): void {
   this.initializeComponent();
 }

 public ngOnDestroy(): void {
   this.destroyComponent();
 }

 private initializeComponent(): void {
   this.loaderService.SetLoaderState(true);
   this.model = 'TiposConfiguracoes';
   this.gridTitle = 'Tipos de configurações';
   this.title = 'Busca de tipos de configurações';
   this.tiposConfiguracoesService.searchPaginated(1, 10);
 }

 private destroyComponent(): void {
   this.loaderService.SetLoaderState(false);
   this.model = null;
   this.gridTitle = null;
   this.title = null;
 }

  public search() {
    this.tiposConfiguracoesService.searchPaginated(1, 10, this.id, this.descricao, this.ativo == null ||
      this.ativo.toString() === 'undefined' ? undefined : this.ativo);
  }
}
