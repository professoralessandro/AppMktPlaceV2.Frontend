import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTipoLancamentoComponent } from './cadastrar-tipo-lancamento.component';

describe('CadastrarTipoLancamentoComponent', () => {
  let component: CadastrarTipoLancamentoComponent;
  let fixture: ComponentFixture<CadastrarTipoLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarTipoLancamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarTipoLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
