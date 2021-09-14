import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTiposConfiguracoesComponent } from './deletar-tipos-configuracoes.component';

describe('DeletarTiposConfiguracoesComponent', () => {
  let component: DeletarTiposConfiguracoesComponent;
  let fixture: ComponentFixture<DeletarTiposConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarTiposConfiguracoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTiposConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
