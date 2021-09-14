import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTipoLancamentoComponent } from './deletar-tipo-lancamento.component';

describe('DeletarTipoLancamentoComponent', () => {
  let component: DeletarTipoLancamentoComponent;
  let fixture: ComponentFixture<DeletarTipoLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarTipoLancamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTipoLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
