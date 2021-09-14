import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrosTiposConfiguracoesComponent } from './cadastros-tipos-configuracoes.component';

describe('CadastrosTiposConfiguracoesComponent', () => {
  let component: CadastrosTiposConfiguracoesComponent;
  let fixture: ComponentFixture<CadastrosTiposConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrosTiposConfiguracoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrosTiposConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
