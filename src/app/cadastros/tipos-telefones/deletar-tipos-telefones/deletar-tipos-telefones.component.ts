import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QueryParameter } from 'src/app/models/query-parameter';
import { HttpCommonService } from 'src/app/services/app-http-service';
import { CommonService } from 'src/app/services/common.service';
import { TiposTelefones } from '../tipos-telefones';

@Component({
  selector: 'app-deletar-tipos-telefones',
  templateUrl: './deletar-tipos-telefones.component.html',
  styleUrls: ['./deletar-tipos-telefones.component.scss']
})
export class DeletarTiposTelefonesComponent implements OnInit, OnDestroy {
  // ATRIBUTTES
  public title: string;
  private rotaAnterior: string;
  private parameters: QueryParameter[];
  public label: string;
  private tipoTelefone: TiposTelefones;

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
        this.service.getSingle('cadastros_url', 'TiposTelefones', this.parameters)
        .toPromise()
        .then(c => {
          this.tipoTelefone = c;
          this.label = `Tem certerza que deseja deletar o item ${this.tipoTelefone.descricao} ?`;
        })
        .catch(e => {
          this.commonService.responseActionWithNavigation(this.rotaAnterior, 'Houve um erro buscar o tipo de telefone.', false);
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroyComponent();
  }

  private initializeComponent(): void {
    this.title = 'Deletar tipo de telefone';
    this.label = '';
    this.rotaAnterior = './cadastros/tipostelefones';
    this.parameters = [];
    this.tipoTelefone = new TiposTelefones();
  }

  private destroyComponent(): void {
    this.title = null;
    this.label = null;
    this.rotaAnterior = null;
    this.parameters = null;
    this.tipoTelefone = null;
  }

  public deletar(): void {
    this.service.delete('cadastros_url', 'TiposTelefones', this.tipoTelefone.tipoTelefoneId)
    .toPromise()
    .then(c => {
      this.commonService.responseActionWithNavigation(this.rotaAnterior, `Tipo de telefone<br>${this.tipoTelefone.descricao}<br>Deletado com sucesso.`, true);
    })
    .catch(e => {
      this.commonService.responseActionWithNavigation(this.rotaAnterior, e.error, false);
    });
  }
}
