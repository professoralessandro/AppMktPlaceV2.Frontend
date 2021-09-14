import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarTipoDadoComponent } from './cadastrar-tipo-dado.component';

describe('CadastrarTipoDadoComponent', () => {
  let component: CadastrarTipoDadoComponent;
  let fixture: ComponentFixture<CadastrarTipoDadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarTipoDadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarTipoDadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
