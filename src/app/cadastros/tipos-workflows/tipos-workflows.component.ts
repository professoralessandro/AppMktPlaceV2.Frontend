import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { TiposWorkflowsService } from './tipos-workflows.service';

@Component({
  selector: 'app-tipos-workflows',
  templateUrl: './tipos-workflows.component.html',
  styleUrls: ['./tipos-workflows.component.scss']
})
export class TiposWorkflowsComponent implements OnInit, OnDestroy {
  public title = 'Busca de tipos de workflows';
  public gridTitle = 'Tipos de workflows';
  public model = 'TiposWorkflows';
  public id: number;
  public descricao: string;
  public ativo: boolean;

  public constructor(
    private loaderService: LoaderService,
    private tiposWorkflowsService: TiposWorkflowsService
  ) { }

  public ngOnInit(): void {
    this.initializeComponent();
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.loaderService.SetLoaderState(true);
    this.model = 'TiposWorkflows';
    this.gridTitle = 'Tipos de workflows';
    this.title = 'Busca de tipos de workflows';
    this.tiposWorkflowsService.searchPaginated(1, 10);
  }

  private destroyComponent(): void {
    this.loaderService.SetLoaderState(false);
    this.model = null;
    this.gridTitle = null;
    this.title = null;
  }

  public search() {
    this.tiposWorkflowsService.searchPaginated(1, 10, this.id, this.descricao, this.ativo == null ||
      this.ativo.toString() === 'undefined' ? undefined : this.ativo);
  }
}
