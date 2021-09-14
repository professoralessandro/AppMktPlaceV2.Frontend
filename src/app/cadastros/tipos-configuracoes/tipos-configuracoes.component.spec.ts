import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposConfiguracoesComponent } from './tipos-configuracoes.component';

describe('TiposConfiguracoesComponent', () => {
  let component: TiposConfiguracoesComponent;
  let fixture: ComponentFixture<TiposConfiguracoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiposConfiguracoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiposConfiguracoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
